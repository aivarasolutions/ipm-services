import test from 'node:test'
import { Buffer } from 'node:buffer'
import assert from 'node:assert/strict'
import express from 'express'
import { randomUUID } from 'node:crypto'
import { normalizeFurnishingInquiry, buildFurnishingFields, createFurnishingRouter, FurnishingInquiryStore } from './furnishingInquiry.js'
import { sendFormEmails } from './emailService.js'

const valid = () => ({ submissionId: randomUUID(), firstName: 'Test', lastName: 'Owner', email: 'furnishing-test@example.com', phone: '+1 555 123 4567', city: 'Lima', country: 'Peru', propertyType: 'apartment', bedrooms: '0', bathrooms: '1.5', condition: 'partial', budget: '', currency: 'USD', packageId: 'sourcing', language: 'es', files: [] })
const pdf = { name: 'inventory.pdf', type: 'application/pdf', data: Buffer.from('%PDF-1.4\nprivate inventory').toString('base64') }

test('Furnishing inquiry retains owner details and unknown budget without triggering onboarding', () => {
  const lead = normalizeFurnishingInquiry({ ...valid(), files: [pdf] })
  assert.equal(lead.budget, null)
  assert.equal(lead.plan, '')
  assert.equal(lead.source, 'Property Furnishing & Setup')
  assert.equal(lead.phone, '+15551234567')
  assert.equal(lead.bedrooms, 0)
  assert.equal(lead.bathrooms, 1.5)
  assert.deepEqual(lead.files, [pdf])
  assert.equal(buildFurnishingFields(lead)['Submitted Budget'], 'Not yet known')
  assert.equal(buildFurnishingFields(normalizeFurnishingInquiry({ ...valid(), budget: 1500 }))['Indicative IPM Fee (USD)'], '300.00')
})
test('Local budget is recorded as submitted, not silently converted into a USD fee', () => {
  const fields = buildFurnishingFields(normalizeFurnishingInquiry({ ...valid(), budget: 10000, currency: 'PEN' }))
  assert.equal(fields['Submitted Budget'], 'PEN 10000')
  assert.equal(fields['Indicative IPM Fee (USD)'], undefined)
})
test('Required fields, invalid numbers, choices, dates and country codes are enforced', () => {
  for (const patch of [{ firstName: '' }, { lastName: '' }, { email: 'invalid' }, { phone: '5551234567' }, { city: '' }, { country: '' }, { propertyType: 'unknown' }, { condition: 'unknown' }, { packageId: 'management' }, { currency: 'unknown' }, { bedrooms: '' }, { bedrooms: 1.5 }, { bathrooms: 1.2 }, { budget: -1 }, { budget: 'abc' }, { completionDate: '2026-02-30' }, { submissionId: 'bad' }]) assert.throws(() => normalizeFurnishingInquiry({ ...valid(), ...patch }), JSON.stringify(patch))
})
test('Uploads validate actual signatures, file names and limits, not just browser MIME labels', () => {
  for (const files of [
    [{ ...pdf, type: 'image/png' }],
    [{ ...pdf, name: '../inventory.pdf' }],
    [{ ...pdf, type: 'image/svg+xml' }],
    [{ ...pdf, data: 'garbage!' }],
    Array.from({ length: 6 }, () => pdf),
    [{ ...pdf, data: Buffer.concat([Buffer.from('%PDF-'), Buffer.alloc(2097152)]).toString('base64') }],
  ]) assert.throws(() => normalizeFurnishingInquiry({ ...valid(), files }))
})
test('Team email includes private attachments, reply address and idempotency key without an approval link', async () => {
  let payload, options
  const result = await sendFormEmails({ fields: { Source: 'Property Furnishing & Setup', Bedrooms: 0 }, customerEmail: 'furnishing-test@example.com', attachments: [{ filename: pdf.name, content: pdf.data }], idempotencyKey: 'furnishing-test', deliver: async (p, o) => { payload = p; options = o } })
  assert.equal(result.ok, true)
  assert.equal(payload.reply_to, 'furnishing-test@example.com')
  assert.equal(payload.attachments[0].content, pdf.data)
  assert.equal(options.idempotencyKey, 'furnishing-test')
  assert.doesNotMatch(payload.html, /Approve &amp; send|api\/lead-approvals/)
})

async function routeHarness(t, overrides = {}) {
  const rows = new Map()
  const calls = { team: [], mailchimp: [] }
  const store = {
    async receive(lead) {
      const existing = rows.get(lead.submissionId)
      if (existing) return existing
      const row = { id: lead.submissionId, lead: { ...lead, furnishingDelivery: {} }, status: 'furnishing_pending' }
      rows.set(row.id, row); return row
    },
    async claim(id) { const row = rows.get(id); if (row.status !== 'furnishing_pending') return null; row.status = 'furnishing_sending'; return row },
    async mark(id, channel) { rows.get(id).lead.furnishingDelivery[channel] = true },
    async finish(id) { rows.get(id).status = 'furnishing_sent' },
    async fail(id) { rows.get(id).status = 'furnishing_pending' },
  }
  const app = express()
  app.use('/api', createFurnishingRouter({ store, sendFormEmails: async args => { calls.team.push(args); return { ok: true } }, addToMailchimp: async args => { calls.mailchimp.push(args); return overrides.mailchimp ? overrides.mailchimp() : { ok: true } } }))
  const server = app.listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const post = body => fetch(`http://127.0.0.1:${server.address().port}/api/furnishing`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  return { post, calls, rows }
}

test('HTTP submission persists privately, notifies team, triggers established confirmation and deduplicates retries', async t => {
  const { post, calls, rows } = await routeHarness(t)
  const body = { ...valid(), files: [pdf] }
  assert.equal((await post(body)).status, 200)
  assert.equal((await post(body)).status, 200)
  assert.equal(rows.size, 1)
  assert.equal(calls.team.length, 1)
  assert.equal(calls.mailchimp.length, 1)
  assert.equal(calls.team[0].fields['Chosen Package'], 'sourcing')
  assert.equal(calls.team[0].attachments[0].content, pdf.data)
  assert.equal(calls.mailchimp[0].formSource, 'Property Furnishing & Setup')
  assert.equal(calls.team[0].approvalUrl, undefined)
  assert.equal(rows.get(body.submissionId).status, 'furnishing_sent')
})
test('Partial delivery returns an explicit error and retry sends only the missing channel', async t => {
  let attempt = 0
  const { post, calls } = await routeHarness(t, { mailchimp: () => ({ ok: ++attempt > 1 }) })
  const body = valid()
  assert.equal((await post(body)).status, 502)
  assert.equal((await post(body)).status, 200)
  assert.equal(calls.team.length, 1)
  assert.equal(calls.mailchimp.length, 2)
})
test('Invalid submissions produce no saved inquiry or external delivery', async t => {
  const { post, calls, rows } = await routeHarness(t)
  assert.equal((await post({ ...valid(), phone: 'no-country-code' })).status, 400)
  assert.equal(rows.size, 0)
  assert.equal(calls.team.length, 0)
})
test('Existing private lead store uses saved fingerprints to reject changed retries', async () => {
  const lead = normalizeFurnishingInquiry(valid())
  let saved, schema = false
  const pool = { async query(_sql, params) { if (!saved) saved = { id: params[0], lead: JSON.parse(params[2]), status: 'furnishing_pending' }; return { rows: [saved] } } }
  const store = new FurnishingInquiryStore({ pool, async ensureSchema() { schema = true } })
  await store.receive(lead)
  assert.equal(schema, true)
  assert.deepEqual(saved.lead.files, [])
  await assert.rejects(store.receive({ ...lead, budget: 5000 }), error => error.status === 409)
})
