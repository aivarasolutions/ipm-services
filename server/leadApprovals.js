import express from 'express'
import { createHmac } from 'node:crypto'
import { escapeHtml } from './emailService.js'
import { sendOnboardingInvitation } from './onboardingInvitation.js'

// Verified published backend; Vercel's /api rewrites target this same service.
export const APPROVAL_ORIGIN = 'https://ipm-services-kevinajackson21.replit.app'
const validToken = token => /^[a-f0-9]{64}$/.test(token || '')
const invitationTokenFor = token => createHmac('sha256', token).update('owner-onboarding-invitation').digest('hex')

function page(title, content) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | IPM</title>
  <style>body{margin:0;background:#06121F;color:#334155;font:16px/1.6 Arial,sans-serif}main{max-width:640px;margin:40px auto;padding:28px;background:#F8F5EF;border-top:5px solid #D4AF37;border-radius:12px}h1{color:#0A1A30;font-size:28px}dt{font-weight:bold;margin-top:14px}dd{margin:0;overflow-wrap:anywhere}a{color:#735713}button{padding:15px 20px;background:#D4AF37;color:#06121F;border:0;border-radius:6px;font-weight:bold;font-size:16px;cursor:pointer}label{display:block;margin:22px 0}input{width:20px;height:20px;vertical-align:middle}@media(max-width:700px){main{margin:20px 12px;padding:22px}}</style></head>
  <body><main><p>IPM · PRIVATE OWNER LEAD REVIEW</p><h1>${escapeHtml(title)}</h1>${content}</main></body></html>`
}

export function createLeadApprovalRouter({ store, send = sendOnboardingInvitation, origin = APPROVAL_ORIGIN }) {
  const router = express.Router()
  router.use((_req, res, next) => {
    res.set({
      'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    })
    next()
  })
  router.get('/onboarding-invitations/:token', async (req, res) => {
    try {
      const lead = validToken(req.params.token) && await store.invitation(req.params.token)
      if (!lead) return res.status(404).json({ error: 'This invitation is unavailable or expired. Please complete the blank onboarding form instead.' })
      return res.json({
        fullName: lead.name, email: lead.email, phone: lead.phone,
        airbnbListingUrl: lead.listingUrl, plan: lead.plan,
      })
    } catch {
      return res.status(503).json({ error: 'Your invitation could not be loaded. Please try again.' })
    }
  })
  router.get('/lead-approvals/:token', async (req, res) => {
    try {
      const record = validToken(req.params.token) && await store.find(req.params.token)
      if (!record || new Date(record.expires_at) <= new Date()) {
        return res.status(410).send(page('Approval link unavailable', '<p>This private link is invalid or has expired. Reply to the original lead email to contact the owner.</p>'))
      }
      if (record.status !== 'pending') {
        return res.send(page(record.status === 'sent' ? 'Onboarding invitation already sent' : 'Invitation is being processed',
          '<p>No additional invitation will be sent by opening this link.</p>'))
      }
      const lead = record.lead
      const fields = {
        'First name': lead.firstName, 'Last name': lead.lastName,
        Email: lead.email, 'Phone (with country code)': lead.phone,
        Plan: lead.plan === 'full-management' ? 'Full Management (20%)' : 'Listing Promotion (10%)',
        'Email language': lead.language.toUpperCase(),
      }
      return res.send(page('Review & approve this property', `
        <dl>${Object.entries(fields).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join('')}
        <dt>Property listing</dt><dd><a href="${escapeHtml(lead.listingUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lead.listingUrl)}</a></dd></dl>
        <p>Approval sends a personalized onboarding email to the owner above, with the matching PDF attached and a link to complete onboarding online. This does not create a management agreement.</p>
        <form method="post"><label><input type="checkbox" name="confirm" value="yes" required> I reviewed this listing and approve sending the onboarding invitation.</label>
        <button type="submit">Approve & send onboarding email</button></form>
        <p><small>This private link expires 14 days after submission. Do not forward it to the owner or share it publicly.</small></p>`))
    } catch {
      return res.status(503).send(page('Review temporarily unavailable', '<p>Please try again later. No onboarding email was sent.</p>'))
    }
  })
  router.post('/lead-approvals/:token', express.urlencoded({ extended: false }), async (req, res) => {
    if (!validToken(req.params.token) || req.body?.confirm !== 'yes' ||
        (req.get('origin') && req.get('origin') !== origin)) {
      return res.status(403).send(page('Confirmation required', '<p>Open the private link in your notification email, review the listing, and confirm approval there.</p>'))
    }
    let record
    let delivered = false
    try {
      const invitationToken = invitationTokenFor(req.params.token)
      record = await store.claim(req.params.token, invitationToken)
      if (!record) return res.status(409).send(page('Invitation unavailable', '<p>This link is expired, already approved, or an invitation is being sent. No duplicate invitation was sent.</p>'))
      await send(record.lead, invitationToken, record.id)
      delivered = true
      await store.finish(record.id)
      return res.send(page('Onboarding email sent', `<p>The personalized invitation and PDF were accepted for delivery to <strong>${escapeHtml(record.lead.email)}</strong>.</p><p>You can close this page. Opening or approving this link again will not send another invitation.</p>`))
    } catch {
      // Never unlock a delivered invitation if recording the result failed.
      if (record && !delivered) await store.fail(record.id).catch(() => {})
      return res.status(502).send(page('Unable to confirm delivery',
        '<p>We could not confirm the invitation was sent. Reopen the original approval link to check its status. If it is still awaiting approval, you can retry; repeat attempts use the same email delivery key.</p>'))
    }
  })
  return router
}
