/* global process, Buffer */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import express from 'express'
import pg from 'pg'
import { get as httpGet } from 'node:http'
import { normalizeContactLead, buildContactLeadFields } from './contactLead.js'
import { LeadApprovalStore } from './leadApprovalStore.js'
import { createLeadApprovalRouter } from './leadApprovals.js'
import { buildOnboardingInvitation, sendOnboardingInvitation } from './onboardingInvitation.js'
import { sendFormEmails } from './emailService.js'

const sample = {
  firstName: 'Test Owner', lastName: 'Example', email: 'owner@example.com',
  phone: '+52 (555) 123-4567', listingUrl: 'https://www.airbnb.com/rooms/1234',
  source: '10% Promotion Page — Listing Promotion (10%)', language: 'es',
}
const lead = normalizeContactLead(sample)

test('owner leads require both names, international phone, email, and a safe listing link', () => {
  assert.equal(lead.name, 'Test Owner Example')
  assert.equal(lead.phone, '+525551234567')
  assert.equal(lead.plan, 'listing-promotion')
  for (const bad of [
    { firstName: '' }, { lastName: '' }, { phone: '5551234567' },
    { phone: '+00012345678' }, { email: 'not-an-email' },
    { listingUrl: '' }, { listingUrl: 'javascript:alert(1)' },
    { listingUrl: 'https://user:password@example.com/listing' },
  ]) assert.throws(() => normalizeContactLead({ ...sample, ...bad }))
  assert.equal(normalizeContactLead({ name: 'General Visitor', email: 'test@example.com', source: 'Real Estate Lead' }).plan, '')
  assert.equal(normalizeContactLead({ ...sample, plan: 'full-management' }).plan, 'full-management')
})

test('admin notifications include separate lead details and a private review button', async () => {
  let payload
  const result = await sendFormEmails({
    fields: buildContactLeadFields({ ...lead, message: `Airbnb listing URL: ${lead.listingUrl}` }),
    approvalUrl: 'https://example.com/api/lead-approvals/private-test-link',
    customerEmail: lead.email,
    deliver: async value => { payload = value },
  })
  assert.ok(result.ok)
  assert.equal(payload.reply_to, lead.email)
  assert.match(payload.html, /Approve &amp; send onboarding email/)
  assert.match(payload.text, /Private team link/)
  assert.match(payload.html, /Test Owner/)
  assert.match(payload.html, /Property Listing Link/)
  assert.doesNotMatch(payload.html, />Name</)
  assert.equal(payload.html.split(lead.listingUrl).length - 1, 2) // one link: href and label
  assert.equal(payload.text.split(lead.listingUrl).length - 1, 1)
  assert.doesNotMatch(payload.html, />Message</)
  assert.equal(buildContactLeadFields({ ...lead, message: `Bedrooms: 3\nAirbnb listing URL: ${lead.listingUrl}\nPlease call me.` }).Message, 'Bedrooms: 3\nPlease call me.')
})

test('approved invitations personalize names, choose matching PDFs, and use opaque online links', async () => {
  for (const language of ['en', 'es', 'vi']) {
    const payload = await buildOnboardingInvitation({ ...lead, language }, 'a'.repeat(64))
    assert.deepEqual(payload.to, ['owner@example.com'])
    assert.deepEqual(payload.reply_to, ['Kevin@AivaraSolutions.com', 'info@richaf.global'])
    assert.match(payload.html, /Test Owner Example/)
    assert.match(payload.html, /onboarding\?invite=a{64}/)
    assert.doesNotMatch(payload.html, /[?&](?:email|phone|fullName)=/)
    assert.equal(payload.attachments[0].filename, `IPM-Onboarding-${language}.pdf`)
    assert.ok(Buffer.from(payload.attachments[0].content, 'base64').subarray(0, 4).equals(Buffer.from('%PDF')))
  }
  let key
  await sendOnboardingInvitation(lead, 'a'.repeat(64), 'test-id', async (_payload, options) => { key = options.idempotencyKey })
  assert.equal(key, 'owner-onboarding/test-id')
})

test('private review never sends on GET, requires explicit confirmation, and sends only once', async () => {
  const token = 'b'.repeat(64)
  const record = { id: 'test-id', lead, status: 'pending', expires_at: new Date(Date.now() + 86400000) }
  let sends = 0
  let invitationToken
  const store = {
    find: async value => value === token ? record : undefined,
    claim: async (value, invite) => {
      if (value !== token || record.status !== 'pending') return undefined
      record.status = 'sending'
      invitationToken = invite
      return record
    },
    finish: async () => { record.status = 'sent' },
    fail: async () => { record.status = 'pending' },
    invitation: async value => value === invitationToken ? lead : undefined,
  }
  const app = express()
  app.use(createLeadApprovalRouter({ store, send: async () => { sends++ }, origin: 'https://example.com' }))
  const server = app.listen(0)
  try {
    const base = `http://127.0.0.1:${server.address().port}`
    const url = `${base}/lead-approvals/${token}`
    const review = await fetch(url)
    assert.equal(review.status, 200)
    assert.equal(review.headers.get('cache-control'), 'no-store')
    assert.equal(review.headers.get('referrer-policy'), 'same-origin')
    assert.match(await review.text(), /Approve & send onboarding email/)
    assert.equal(sends, 0)
    const activated = await new Promise((resolve, reject) => {
      httpGet(url, { headers: { 'Sec-Fetch-User': '?1', 'Sec-Fetch-Mode': 'navigate' } }, response => {
        let text = ''
        response.on('data', chunk => { text += chunk })
        response.on('end', () => resolve({ text, headers: response.headers }))
      }).on('error', reject)
    })
    assert.match(activated.text, /body: 'confirm=yes'/)
    assert.match(activated.headers['content-security-policy'], /script-src 'nonce-/)
    assert.equal(sends, 0) // GET remains read-only; the activated browser performs a POST.
    const post = (body, origin) => fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(origin ? { Origin: origin } : {}) }, body,
    })
    assert.equal((await post('')).status, 403)
    assert.equal((await post('confirm=yes', 'https://untrusted.example')).status, 403)
    assert.equal((await post('confirm=yes', 'null')).status, 403)
    const responses = await Promise.all([post('confirm=yes', 'https://example.com'), post('confirm=yes', 'https://example.com')])
    assert.deepEqual(responses.map(r => r.status).sort(), [200, 409])
    assert.equal(sends, 1)
    assert.equal((await post('confirm=yes')).status, 409)
    assert.notEqual(invitationToken, token)
    assert.deepEqual(await (await fetch(`${base}/onboarding-invitations/${invitationToken}`)).json(), {
      fullName: lead.name, email: lead.email, phone: lead.phone,
      airbnbListingUrl: lead.listingUrl, plan: lead.plan,
    })
    assert.equal((await fetch(`${base}/onboarding-invitations/${token}`)).status, 404)
    assert.equal((await fetch(`${base}/lead-approvals/${'c'.repeat(64)}`)).status, 410)
    record.expires_at = new Date(0)
    assert.equal((await fetch(url)).status, 410)
  } finally { server.close() }
})

test('transport failure allows a safe retry and never reports a successful send', async () => {
  const token = 'c'.repeat(64)
  let status = 'pending'
  let failed = false
  const store = {
    claim: async () => { status = 'sending'; return { id: 'test', lead } },
    fail: async () => { failed = true; status = 'pending' },
  }
  const app = express()
  app.use(createLeadApprovalRouter({ store, send: async () => { throw new Error('Transport failure') } }))
  const server = app.listen(0)
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/lead-approvals/${token}`, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'confirm=yes',
    })
    assert.equal(response.status, 502)
    assert.ok(failed)
    assert.equal(status, 'pending')
  } finally { server.close() }
})

test('PostgreSQL approval state survives store recreation and blocks concurrent approvals', {
  skip: !process.env.DATABASE_URL,
}, async () => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
  const store = new LeadApprovalStore(pool)
  let token
  try {
    token = await store.create(lead)
    const secondStore = new LeadApprovalStore(pool)
    const record = await secondStore.find(token)
    assert.equal(record.lead.email, lead.email)
    const claims = await Promise.all([store.claim(token, 'd'.repeat(64)), secondStore.claim(token, 'd'.repeat(64))])
    assert.equal(claims.filter(Boolean).length, 1)
    await store.finish(record.id)
    assert.equal((await secondStore.find(token)).status, 'sent')
    assert.equal(await secondStore.claim(token, 'd'.repeat(64)), undefined)
    assert.equal((await store.invitation('d'.repeat(64))).phone, lead.phone)
  } finally {
    if (token) {
      const record = await store.find(token)
      if (record) await pool.query('DELETE FROM owner_lead_approvals WHERE id = $1', [record.id])
    }
    await pool.end()
  }
})
