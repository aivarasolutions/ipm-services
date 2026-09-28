/* global process */
// server/emailService.js
// Centralized email handler for all IPM website form submissions.
// Uses the Resend API key where configured (e.g. Vercel) or the connected
// Replit Resend integration in the development workspace.
//
// notifications@ipm.services must be a verified Resend sender domain.
// Notifications are addressed directly to both team inboxes; no forwarding
// rule is required for these form notifications.
//
// Customer-facing confirmation emails are sent exclusively by Mailchimp
// (tag-triggered Customer Journey). This file sends only the internal
// admin notification so the IPM team is alerted to each new lead.

import { Resend } from 'resend';

// ─── Config ───────────────────────────────────────────────────────────────────
// Send one notification to both requested inboxes.
const ADMIN_TO     = ['Kevin@AivaraSolutions.com', 'info@richaf.global'];
const FROM_ADDRESS = 'notifications@ipm.services';
const FROM_LABEL   = `IPM Notifications <${FROM_ADDRESS}>`;

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));

async function deliverNotification(payload) {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const { error } = await new Resend(key).emails.send(payload);
    if (error) throw new Error(`Resend rejected the email: ${error.message}`);
    return;
  }
  // The connector supplies credentials in Replit without exposing an API key.
  // A non-Replit host (such as Vercel) must set RESEND_API_KEY.
  const { ReplitConnectors } = await import('@replit/connectors-sdk');
  const response = await new ReplitConnectors().proxy('resend', '/emails', {
    method: 'POST',
    body: payload,
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(`Resend rejected the email: ${result.message || response.status}`);
  }
}

// ─── HTML: admin notification ─────────────────────────────────────────────────
function buildAdminHtml(fields, source) {
  const rows = Object.entries(fields).map(([k, v]) =>
    `<tr>
      <td style="padding:10px 16px;font-weight:600;color:#0A1A30;border-right:3px solid #D4AF37;background:#F8F5EF;white-space:nowrap;">${escapeHtml(k)}</td>
      <td style="padding:10px 16px;color:#334155;">${escapeHtml(v || '—')}</td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New IPM Lead</title></head>
<body style="margin:0;padding:0;background:#F0EDE8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#F0EDE8;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(6,18,31,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#06121F 0%,#0A1A30 100%);padding:28px 36px;text-align:center;">
            <h1 style="margin:0;color:#D4AF37;font-size:20px;letter-spacing:1px;">International Property Management</h1>
            <p style="margin:8px 0 0;color:#C9D2DE;font-size:13px;">New Website Lead — ${escapeHtml(source)}</p>
          </td>
        </tr>
        <tr><td style="background:#D4AF37;height:3px;"></td></tr>
        <tr>
          <td style="background:#fff;padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #E2E8F0;">
              ${rows}
            </table>
            <p style="margin:16px 0 0;font-size:12px;color:#94A3B8;line-height:1.6;">
              Reply-To is set to the visitor's email — reply directly from your inbox.<br/>
              Submitted: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#06121F;padding:16px 36px;text-align:center;">
            <p style="margin:0;color:#C9D2DE;font-size:12px;">
              IPM Internal &middot; <a href="https://ipm.services" style="color:#D4AF37;text-decoration:none;">ipm.services</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * Send internal admin notification for any IPM form submission.
 * Customer-facing thank-you emails are handled exclusively by Mailchimp
 * (tag-triggered Customer Journey), so no customer email is sent here.
 *
 * @param {object} opts
 * @param {Record<string,string>} opts.fields
 * @param {string}  [opts.customerEmail]  Used for reply_to on admin email
 * @param {string}  [opts.customerName]
 * @param {string}  [opts.source]
 */
export async function sendFormEmails({ fields, customerEmail, source = 'Website Form', subject = 'New IPM Website Lead', deliver = deliverNotification }) {
  const errors = [];

  // Admin notification — reply_to lets either recipient respond to the visitor.
  try {
    await deliver({
      from:     FROM_LABEL,
      to:       ADMIN_TO,
      reply_to: customerEmail || undefined,
      subject,
      html:     buildAdminHtml(fields, source),
      text:     Object.entries(fields).map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
    });
    console.log(`[emailService] Admin notification accepted for ${ADMIN_TO.join(', ')} (${source})`);
  } catch (err) {
    console.error('[emailService] Admin notification failed:', err.message);
    errors.push({ type: 'admin', message: err.message });
  }

  return { ok: errors.length === 0, errors };
}
