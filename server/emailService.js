// server/emailService.js
// Centralized email handler for all IPM website form submissions.
// Uses the Resend npm package with RESEND_API_KEY from Replit Secrets.
//
// DNS / email forwarding must be configured at the domain/DNS provider:
//   support@ipm.services       → Kevin@AivaraSolutions.com
//   info@ipm.services          → Kevin@AivaraSolutions.com
//   notifications@ipm.services → verified Resend sender domain
//
// Customer-facing confirmation emails are sent exclusively by Mailchimp
// (tag-triggered Customer Journey). This file sends only the internal
// admin notification so the IPM team is alerted to each new lead.

import { Resend } from 'resend';

// ─── Config ───────────────────────────────────────────────────────────────────
// Admin notifications go directly to Kevin's inbox.
// Once email forwarding is live on ipm.services, this can be changed back to
// support@ipm.services — but direct delivery is more reliable long-term.
const ADMIN_TO     = 'Kevin@AivaraSolutions.com';
const FROM_ADDRESS = 'notifications@ipm.services';
const FROM_LABEL   = `IPM Notifications <${FROM_ADDRESS}>`;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set — add it in Replit Secrets.');
  return new Resend(key);
}

// ─── HTML: admin notification ─────────────────────────────────────────────────
function buildAdminHtml(fields, source) {
  const rows = Object.entries(fields).map(([k, v]) =>
    `<tr>
      <td style="padding:10px 16px;font-weight:600;color:#0A1A30;border-right:3px solid #D4AF37;background:#F8F5EF;white-space:nowrap;">${k}</td>
      <td style="padding:10px 16px;color:#334155;">${v || '—'}</td>
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
            <p style="margin:8px 0 0;color:#C9D2DE;font-size:13px;">New Website Lead — ${source}</p>
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
export async function sendFormEmails({ fields, customerEmail, customerName, source = 'Website Form' }) {
  const resend = getResend();
  const errors = [];

  // Admin notification — reply_to set to the visitor so Kevin can reply directly
  try {
    await resend.emails.send({
      from:     FROM_LABEL,
      to:       [ADMIN_TO],
      reply_to: customerEmail || undefined,
      subject:  'New IPM Website Lead',
      html:     buildAdminHtml(fields, source),
      text:     Object.entries(fields).map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
    });
    console.log(`[emailService] Admin notification → ${ADMIN_TO} (${source})`);
  } catch (err) {
    console.error('[emailService] Admin notification failed:', err.message);
    errors.push({ type: 'admin', message: err.message });
  }

  return { ok: errors.length === 0, errors };
}
