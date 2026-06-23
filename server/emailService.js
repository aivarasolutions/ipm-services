// server/emailService.js
// Centralized email handler for all IPM website form submissions.
// Uses Resend via @replit/connectors-sdk for professional delivery.
//
// DNS / email forwarding must be configured at the domain/DNS provider:
//   support@ipm.services       → Kevin@AivaraSolutions.com
//   info@ipm.services          → Kevin@AivaraSolutions.com
//   notifications@ipm.services → verified Resend sender (domain must be verified in Resend dashboard)

import { ReplitConnectors } from '@replit/connectors-sdk';

// ─── Config ───────────────────────────────────────────────────────────────────
const ADMIN_TO     = 'support@ipm.services';
const FROM_ADDRESS = 'notifications@ipm.services';
const FROM_LABEL   = `IPM Notifications <${FROM_ADDRESS}>`;

// ─── Resend send helper ───────────────────────────────────────────────────────
async function sendViaResend({ to, from, replyTo, subject, html, text }) {
  // Fresh instance every call — tokens expire
  const connectors = new ReplitConnectors();
  const res = await connectors.proxy('resend', '/emails', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:     from || FROM_LABEL,
      to:       Array.isArray(to) ? to : [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });
  const body = await res.json();
  if (res.status >= 400) {
    throw new Error(body.message || body.name || `Resend error ${res.status}`);
  }
  return body;
}

// ─── HTML builder: customer confirmation ─────────────────────────────────────
function buildCustomerHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You — International Property Management</title>
</head>
<body style="margin:0;padding:0;background:#F8F5EF;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5EF;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(6,18,31,0.12);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#06121F 0%,#0A1A30 100%);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#D4AF37;font-size:24px;font-weight:700;letter-spacing:1px;">
              International Property Management
            </h1>
            <p style="margin:8px 0 0;color:#C9D2DE;font-size:13px;letter-spacing:2px;text-transform:uppercase;">
              More Bookings. Less Vacancy.
            </p>
          </td>
        </tr>

        <!-- Gold bar -->
        <tr><td style="background:#D4AF37;height:3px;"></td></tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 20px;color:#0A1A30;font-size:16px;font-weight:600;">
              Thank you for contacting International Property Management.
            </p>
            <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.8;">
              We have received your inquiry and a member of our team will review your request shortly.
            </p>
            <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.8;">
              Whether you're looking for full-service property management or help promoting your property
              across <strong>Airbnb, VRBO, Booking.com, Expedia,</strong> and
              <strong>Google Vacation Rentals</strong>, we're here to help maximize your property's potential.
            </p>
            <p style="margin:0 0 32px;color:#334155;font-size:15px;line-height:1.8;">
              One of our team members will contact you soon.
            </p>

            <!-- CTA button -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td style="background:#D4AF37;border-radius:6px;">
                  <a href="https://ipm.services" style="display:inline-block;padding:14px 32px;color:#06121F;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
                    Visit ipm.services
                  </a>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
              <tr><td style="border-top:1px solid #D4AF37;"></td></tr>
            </table>

            <p style="margin:0;color:#334155;font-size:15px;line-height:1.8;">
              Thank you,<br />
              <strong style="color:#0A1A30;">International Property Management</strong><br />
              <em style="color:#B8932A;">More Bookings. Less Vacancy.</em>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#06121F;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#C9D2DE;font-size:12px;">
              International Property Management &middot;
              <a href="https://ipm.services" style="color:#D4AF37;text-decoration:none;">ipm.services</a>
            </p>
            <p style="margin:6px 0 0;color:#6B7280;font-size:11px;">
              You're receiving this because you submitted a form on our website.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── HTML builder: admin notification ────────────────────────────────────────
function buildAdminHtml(fields, source) {
  const rows = Object.entries(fields)
    .map(([k, v]) =>
      `<tr>
        <td style="padding:10px 16px;font-weight:600;color:#0A1A30;border-right:3px solid #D4AF37;white-space:nowrap;background:#F8F5EF;">${k}</td>
        <td style="padding:10px 16px;color:#334155;">${v || '—'}</td>
      </tr>`
    ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New IPM Lead</title></head>
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
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #E2E8F0;">
              ${rows}
            </table>
            <p style="margin:16px 0 0;font-size:12px;color:#94A3B8;line-height:1.6;">
              Reply-To is set to the visitor's email address so you can reply directly from your inbox.<br/>
              Submitted: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#06121F;padding:16px 36px;text-align:center;">
            <p style="margin:0;color:#C9D2DE;font-size:12px;">
              IPM Internal Notification &middot; <a href="https://ipm.services" style="color:#D4AF37;text-decoration:none;">ipm.services</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Plain text builders ──────────────────────────────────────────────────────
function buildCustomerText() {
  return [
    'Thank you for contacting International Property Management.',
    '',
    'We have received your inquiry and a member of our team will review your request shortly.',
    '',
    "Whether you're looking for full-service property management or help promoting your property",
    'across Airbnb, VRBO, Booking.com, Expedia, and Google Vacation Rentals,',
    "we're here to help maximize your property's potential.",
    '',
    'One of our team members will contact you soon.',
    '',
    'Website: https://ipm.services',
    '',
    'Thank you,',
    'International Property Management',
    'More Bookings. Less Vacancy.',
  ].join('\n');
}

function buildAdminText(fields) {
  return Object.entries(fields).map(([k, v]) => `${k}: ${v || '—'}`).join('\n');
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * Send admin notification + customer confirmation for any IPM form.
 *
 * @param {object} opts
 * @param {Record<string,string>} opts.fields       All form fields (shown in admin email)
 * @param {string}  [opts.customerEmail]            Visitor email — sets Reply-To + sends confirmation
 * @param {string}  [opts.customerName]             Visitor name
 * @param {string}  [opts.source]                   Form label shown in subject + admin email
 */
export async function sendFormEmails({ fields, customerEmail, customerName, source = 'Website Form' }) {
  const errors = [];

  // 1. Admin notification ────────────────────────────────────────────────────
  try {
    await sendViaResend({
      to:      ADMIN_TO,
      replyTo: customerEmail || undefined,
      subject: 'New IPM Website Lead',
      html:    buildAdminHtml(fields, source),
      text:    buildAdminText(fields),
    });
    console.log(`[emailService] Admin notification → ${ADMIN_TO} (${source})`);
  } catch (err) {
    console.error('[emailService] Admin notification failed:', err.message);
    errors.push({ type: 'admin', message: err.message });
  }

  // 2. Customer confirmation ─────────────────────────────────────────────────
  if (customerEmail) {
    try {
      await sendViaResend({
        to:      customerEmail,
        from:    FROM_LABEL,
        subject: 'Thank You for Contacting International Property Management',
        html:    buildCustomerHtml(),
        text:    buildCustomerText(),
      });
      console.log(`[emailService] Customer confirmation → ${customerEmail}`);
    } catch (err) {
      console.error('[emailService] Customer confirmation failed:', err.message);
      errors.push({ type: 'customer', message: err.message });
    }
  }

  return { ok: errors.length === 0, errors };
}
