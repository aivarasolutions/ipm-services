// server/emailService.js
// Centralized email handler for all IPM website form submissions.
//
// DNS / email forwarding must be configured separately at the domain/DNS provider:
//   support@ipm.services       → Kevin@AivaraSolutions.com
//   info@ipm.services          → Kevin@AivaraSolutions.com
//   notifications@ipm.services → verified sender alias (no inbox needed)
//
// To send FROM notifications@ipm.services you must verify that domain with your
// email provider (e.g. Resend) and add RESEND_API_KEY to Replit Secrets.
// Until then the Replit mailer sends from its own managed address.

import { sendEmail } from '../src/utils/replitmail.js';

// ─── Config ───────────────────────────────────────────────────────────────────
const ADMIN_TO   = 'support@ipm.services';   // receives every lead; forwards to Kevin
const SENDER_FROM = 'notifications@ipm.services'; // used when/if custom domain verified

// ─── HTML builders ────────────────────────────────────────────────────────────
function buildAdminHtml(fields, source) {
  const rows = Object.entries(fields)
    .map(([k, v]) =>
      `<tr>
        <td style="padding:8px 14px;font-weight:600;color:#0A1A30;
                   border-right:3px solid #D4AF37;white-space:nowrap;">${k}</td>
        <td style="padding:8px 14px;color:#334155;">${v || '—'}</td>
      </tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#06121F;padding:28px;text-align:center;">
        <h1 style="color:#D4AF37;margin:0;font-size:22px;letter-spacing:1px;">
          International Property Management
        </h1>
        <p style="color:#C9D2DE;margin:8px 0 0;font-size:14px;">New Website Lead — ${source}</p>
      </div>
      <div style="padding:28px;background:#F8F5EF;">
        <table style="width:100%;border-collapse:collapse;background:#fff;
                      border-radius:8px;overflow:hidden;
                      box-shadow:0 2px 10px rgba(0,0,0,0.08);">
          ${rows}
        </table>
        <p style="margin-top:16px;font-size:12px;color:#94A3B8;line-height:1.5;">
          Submitted via the IPM website. Reply-To is set to the visitor's email address
          (if provided) so you can reply directly from your inbox.
        </p>
      </div>
    </div>`;
}

function buildCustomerHtml(name) {
  const greeting = name ? `Hi ${name},` : 'Hello,';
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#06121F;padding:28px;text-align:center;">
        <h1 style="color:#D4AF37;margin:0;font-size:22px;letter-spacing:1px;">
          International Property Management
        </h1>
      </div>
      <div style="padding:32px;background:#F8F5EF;">
        <p style="color:#0A1A30;font-size:16px;font-weight:600;">${greeting}</p>
        <p style="color:#334155;line-height:1.8;font-size:15px;">
          Thank you for contacting International Property Management. We have received
          your message and our team will get back to you shortly.
        </p>
        <p style="color:#334155;line-height:1.8;font-size:15px;">
          For urgent matters you can also reach us on
          <a href="https://wa.me/13104000032" style="color:#B8932A;font-weight:600;">
            WhatsApp (+1 310-400-0032)
          </a>
          or email
          <a href="mailto:info@ipm.services" style="color:#B8932A;font-weight:600;">
            info@ipm.services
          </a>.
        </p>
        <hr style="border:none;border-top:1px solid #D4AF37;margin:28px 0;" />
        <p style="color:#94A3B8;font-size:12px;text-align:center;margin:0;">
          International Property Management · ipm.services
        </p>
      </div>
    </div>`;
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * Send an admin notification + optional customer confirmation for any IPM form.
 *
 * @param {object} opts
 * @param {Record<string,string>} opts.fields       All form fields to show in admin email
 * @param {string}  [opts.customerEmail]            Visitor's email → sets Reply-To + sends confirmation
 * @param {string}  [opts.customerName]             Visitor's name → personalises confirmation
 * @param {string}  [opts.source]                   Label for the email subject line
 */
export async function sendFormEmails({ fields, customerEmail, customerName, source = 'Website Form' }) {
  const errors = [];

  // 1. Admin notification ────────────────────────────────────────────────────
  try {
    await sendEmail({
      to:      ADMIN_TO,
      replyTo: customerEmail || undefined,
      subject: `New IPM Website Lead — ${source}`,
      text:    Object.entries(fields).map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
      html:    buildAdminHtml(fields, source),
    });
    console.log(`[emailService] Admin notification sent to ${ADMIN_TO} (${source})`);
  } catch (err) {
    console.error('[emailService] Admin notification failed:', err.message);
    errors.push({ type: 'admin', message: err.message });
  }

  // 2. Customer confirmation (only when we have their email) ─────────────────
  if (customerEmail) {
    try {
      await sendEmail({
        to:      customerEmail,
        // from:    `IPM Notifications <${SENDER_FROM}>`,
        // NOTE: Uncomment "from" once notifications@ipm.services is verified
        // with your email provider and RESEND_API_KEY is set in Replit Secrets.
        subject: 'We received your message — International Property Management',
        text:    [
          `Hi${customerName ? ' ' + customerName : ''},`,
          '',
          'Thank you for contacting International Property Management.',
          'We have received your message and our team will get back to you shortly.',
          '',
          'For urgent matters: WhatsApp +1 310-400-0032 or info@ipm.services',
          '',
          'International Property Management · ipm.services',
        ].join('\n'),
        html:    buildCustomerHtml(customerName),
      });
      console.log(`[emailService] Customer confirmation sent to ${customerEmail}`);
    } catch (err) {
      console.error('[emailService] Customer confirmation failed:', err.message);
      errors.push({ type: 'customer', message: err.message });
    }
  }

  return { ok: errors.length === 0, errors };
}
