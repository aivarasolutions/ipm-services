/* global Buffer */
import { createHash } from 'node:crypto'
import express from 'express'
import config from '../src/data/furnishingService.json' with { type: 'json' }
import { normalizeContactLead } from './contactLead.js'
import { calculateFurnishingQuote } from '../src/lib/furnishingCalculator.js'

const hash = value => createHash('sha256').update(value).digest('hex')
const fail = message => { throw new Error(message) }
const clean = (value, max = 300) => {
  if (typeof value !== 'string') return ''
  if (value.length > max) fail('One of the text fields is too long.')
  return value.trim()
}

export function normalizeFurnishingInquiry(body = {}) {
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.submissionId || '')) fail('A valid submission ID is required.')
  const contact = normalizeContactLead({ firstName: body.firstName, lastName: body.lastName, email: body.email, phone: body.phone, language: body.language, source: 'Property Furnishing & Setup' })
  if (!contact.firstName || !contact.lastName) fail('Please provide your first and last name.')
  const city = clean(body.city, 150), country = clean(body.country, 150)
  if (!city || !country) fail('Please provide the property city and country.')
  for (const [field, choices] of Object.entries({ propertyType: config.propertyTypes, condition: config.conditions, packageId: config.packages, currency: config.currencies })) {
    if (!choices.includes(body[field])) fail(`Please choose a valid ${field}.`)
  }
  const rooms = {}
  for (const field of ['bedrooms', 'bathrooms']) {
    if (body[field] === '' || body[field] == null) fail(`Please enter the number of ${field}.`)
    const value = Number(body[field])
    if (!Number.isFinite(value) || value < 0 || value > 100 || (field === 'bedrooms' && !Number.isInteger(value)) || (field === 'bathrooms' && value * 2 % 1 !== 0)) fail(`Please enter a valid number of ${field}.`)
    rooms[field] = value
  }
  const budget = body.budget == null || body.budget === '' ? null : Number(body.budget)
  if (budget !== null && (!Number.isFinite(budget) || budget < 0 || budget > 10000000)) fail('Please enter a valid budget or leave it blank.')
  const completionDate = clean(body.completionDate, 10)
  if (completionDate && (!/^\d{4}-\d{2}-\d{2}$/.test(completionDate) || new Date(completionDate).toISOString().slice(0, 10) !== completionDate)) fail('Please enter a valid completion date.')
  const style = clean(body.style, 150)
  if (style && !config.styles.includes(style)) fail('Please choose a valid interior style.')
  const files = body.files ?? []
  if (!Array.isArray(files) || files.length > config.maxFiles) fail(`Upload up to ${config.maxFiles} files.`)
  let totalBytes = 0
  const attachments = files.map(file => {
    const name = clean(file?.name, 180)
    if (!name || /[/\\\r\n\0]/.test(name)) fail('Please use simple file names without directory paths.')
    const { type, data } = file
    if (typeof data !== 'string' || !data || data.length > config.maxUploadBytes * 1.4 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data)) fail('An uploaded file is invalid.')
    const buffer = Buffer.from(data, 'base64')
    const matches = type === 'image/jpeg' ? buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
      : type === 'image/png' ? buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : type === 'image/webp' ? buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
      : type === 'application/pdf' ? buffer.toString('ascii', 0, 5) === '%PDF-' : false
    if (!matches) fail('Upload only JPEG, PNG, WebP images or PDF inventories; file contents must match the type.')
    totalBytes += buffer.length
    if (totalBytes > config.maxUploadBytes) fail('Uploads must total no more than 2 MB.')
    return { name, type, data }
  })
  return { ...contact, submissionId: body.submissionId.toLowerCase(), city, country, address: clean(body.address, 500), propertyType: body.propertyType, ...rooms, size: clean(body.size, 150), condition: body.condition, retainFurniture: clean(body.retainFurniture, 3000), budget, currency: body.currency, packageId: body.packageId, completionDate, style, requests: clean(body.requests, 6000), files: attachments }
}

export function buildFurnishingFields(lead) {
  const quote = lead.budget !== null && lead.currency === 'USD' ? calculateFurnishingQuote({ furniture: lead.budget, packageId: lead.packageId }) : null
  return {
    'First Name': lead.firstName, 'Last Name': lead.lastName, Email: lead.email, Phone: lead.phone,
    Source: 'Property Furnishing & Setup', 'Chosen Package': lead.packageId,
    'Submitted Budget': lead.budget === null ? 'Not yet known' : `${lead.currency} ${lead.budget}`,
    ...(quote ? { 'Indicative IPM Fee (USD)': quote.serviceFee.toFixed(2), 'Fee Note': 'Planning estimate only. Excludes shipping, delivery, duties, taxes and third-party labor. Written quote required.' } : {}),
    'Property City': lead.city, 'Property Country': lead.country, 'Property Address': lead.address || 'Not provided',
    'Property Type': lead.propertyType, Bedrooms: lead.bedrooms, Bathrooms: lead.bathrooms, 'Approximate Size': lead.size || 'Not provided',
    'Furnishing Condition': lead.condition, 'Furniture to Retain': lead.retainFurniture || 'Not provided',
    'Desired Completion': lead.completionDate || 'Not provided', 'Preferred Style': lead.style || 'Not provided',
    'Additional Requests': lead.requests || 'None', 'Private Attachments': lead.files.map(file => file.name).join(', ') || 'None',
  }
}

// Uses the existing private lead table and connection; no public upload URLs.
export class FurnishingInquiryStore {
  constructor(leadStore) { this.leadStore = leadStore; this.pool = leadStore.pool }
  async receive(lead) {
    await this.leadStore.ensureSchema()
    const fingerprint = hash(JSON.stringify(lead))
    const tokenHash = hash(`furnishing:${lead.submissionId}:${lead.email.toLowerCase()}`)
    const result = await this.pool.query(
      `INSERT INTO owner_lead_approvals (id, token_hash, lead, status)
       VALUES ($1, $2, $3, 'furnishing_pending') ON CONFLICT (token_hash) DO UPDATE SET token_hash = EXCLUDED.token_hash
       RETURNING id, lead, status`,
      [lead.submissionId, tokenHash, JSON.stringify({ ...lead, furnishingDelivery: { fingerprint } })],
    )
    const row = result.rows[0]
    if (row.lead.furnishingDelivery?.fingerprint !== fingerprint) {
      const error = new Error('This submission changed after it was saved. Start a new inquiry instead.')
      error.status = 409
      throw error
    }
    return row
  }
  async claim(id) {
    const result = await this.pool.query(
      `UPDATE owner_lead_approvals SET status = 'furnishing_sending',
       lead = jsonb_set(lead, '{furnishingDelivery,leaseUntil}', to_jsonb((NOW() + INTERVAL '5 minutes')::text))
       WHERE id = $1 AND (status = 'furnishing_pending' OR
         (status = 'furnishing_sending' AND (lead->'furnishingDelivery'->>'leaseUntil')::timestamptz < NOW()))
       RETURNING id, lead, status`, [id],
    )
    return result.rows[0]
  }
  async mark(id, channel) {
    await this.pool.query(`UPDATE owner_lead_approvals SET lead = jsonb_set(lead, $2::text[], 'true'::jsonb) WHERE id = $1`, [id, ['furnishingDelivery', channel]])
  }
  async finish(id) { await this.pool.query("UPDATE owner_lead_approvals SET status = 'furnishing_sent', sent_at = NOW() WHERE id = $1", [id]) }
  async fail(id) { await this.pool.query("UPDATE owner_lead_approvals SET status = 'furnishing_pending' WHERE id = $1 AND status = 'furnishing_sending'", [id]) }
}

export function createFurnishingRouter({ store, sendFormEmails, addToMailchimp }) {
  const router = express.Router()
  const attempts = new Map()
  router.post('/furnishing', (req, res, next) => {
    const now = Date.now(), key = req.ip
    for (const [ip, item] of attempts) if (item.until < now) attempts.delete(ip)
    const item = attempts.get(key) || { count: 0, until: now + 15 * 60 * 1000 }
    if (item.count >= 12 || attempts.size > 5000) return res.status(429).json({ error: 'Too many inquiries. Please try again later.' })
    item.count += 1; attempts.set(key, item); next()
  }, express.json({ limit: '3mb' }), async (req, res) => {
    let lead, row, claimed = false
    try { lead = normalizeFurnishingInquiry(req.body) } catch (error) { return res.status(400).json({ error: error.message }) }
    try {
      row = await store.receive(lead)
      if (row.status === 'furnishing_sent') return res.json({ ok: true, message: 'Message received. We will get back to you shortly.' })
      row = await store.claim(row.id)
      if (!row) return res.status(409).json({ error: 'This inquiry is being delivered. Please wait a moment and retry.' })
      claimed = true
      const delivery = row.lead.furnishingDelivery || {}
      if (!delivery.team) {
        const result = await sendFormEmails({
          fields: buildFurnishingFields(lead), customerEmail: lead.email,
          source: lead.source, subject: 'New IPM Furnishing & Setup Inquiry',
          attachments: lead.files.map(file => ({ filename: file.name, content: file.data })),
          idempotencyKey: `furnishing-${row.id}`,
        })
        if (!result?.ok) throw new Error('Team notification delivery failed.')
        await store.mark(row.id, 'team')
      }
      if (!delivery.mailchimp) {
        const result = await addToMailchimp({ email: lead.email, firstName: lead.firstName, lastName: lead.lastName, phone: lead.phone, propertyLocation: `${lead.city}, ${lead.country}`, formSource: lead.source })
        if (!result?.ok) throw new Error('Mailing list confirmation workflow failed.')
        await store.mark(row.id, 'mailchimp')
      }
      await store.finish(row.id)
      res.json({ ok: true, message: 'Message received. We will get back to you shortly.' })
    } catch (error) {
      if (claimed) await store.fail(row.id).catch(() => {})
      res.status(error.status || 502).json({ error: error.status === 409 ? error.message : 'Your inquiry could not complete delivery. Retry with the same form; your saved inquiry will not be duplicated.' })
    }
  })
  router.use((error, _req, res, next) => {
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Uploads must total no more than 2 MB.' })
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid inquiry data.' })
    next(error)
  })
  return router
}
