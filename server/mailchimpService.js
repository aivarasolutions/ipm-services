// server/mailchimpService.js
// Adds form leads to the IPM Mailchimp audience via the Replit Connectors proxy.
// Uses @replit/connectors-sdk — do NOT cache the connectors instance (tokens expire).

import { ReplitConnectors } from '@replit/connectors-sdk';
import crypto from 'crypto';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function md5(str) {
  return crypto.createHash('md5').update(str.toLowerCase()).digest('hex');
}

async function getListId(connectors) {
  const res  = await connectors.proxy('mailchimp', '/3.0/lists', { method: 'GET' });
  const body = await res.json();
  if (!body.lists || body.lists.length === 0) {
    throw new Error('No Mailchimp lists found — make sure an audience exists.');
  }
  return body.lists[0].id; // uses the first audience
}

// ─── Main export ──────────────────────────────────────────────────────────────
/**
 * Add or update a contact in the IPM Mailchimp audience.
 *
 * @param {object} opts
 * @param {string}   opts.email
 * @param {string}   [opts.firstName]
 * @param {string}   [opts.lastName]
 * @param {string}   [opts.phone]
 * @param {string}   [opts.propertyLocation]
 * @param {string}   [opts.formSource]   e.g. "Contact Form" | "Real Estate Lead"
 */
export async function addToMailchimp({ email, firstName, lastName, phone, propertyLocation, formSource }) {
  if (!email) {
    console.warn('[mailchimp] No email provided — skipping audience sync');
    return { ok: false, reason: 'no email' };
  }

  try {
    // Fresh connectors instance on every call (tokens expire)
    const connectors = new ReplitConnectors();
    const listId     = await getListId(connectors);

    // Build tag list
    const tags = ['Website Lead', 'Contact Form'];
    if (formSource) tags.push(formSource);
    if (formSource?.toLowerCase().includes('management')) tags.push('Management Inquiry');
    if (formSource?.toLowerCase().includes('listing') || formSource?.toLowerCase().includes('real estate')) {
      tags.push('Listing Promotion Inquiry');
    }

    const subscriberHash = md5(email);
    const payload = {
      email_address: email,
      status_if_new: 'subscribed',
      merge_fields: {
        FNAME:     firstName        || '',
        LNAME:     lastName         || '',
        PHONE:     phone            || '',
        LOCATION:  propertyLocation || '',
        SOURCE:    formSource       || 'Website Form',
        SIGNDATE:  new Date().toISOString().split('T')[0],
      },
      tags,
    };

    // PUT is idempotent — creates or updates
    const res  = await connectors.proxy('mailchimp', `/3.0/lists/${listId}/members/${subscriberHash}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json();

    if (res.status >= 400) {
      console.error('[mailchimp] API error:', body);
      return { ok: false, error: body.detail || body.title };
    }

    console.log(`[mailchimp] Contact synced: ${email} (${body.status})`);
    return { ok: true, id: body.id, status: body.status };
  } catch (err) {
    console.error('[mailchimp] Unexpected error:', err.message);
    return { ok: false, error: err.message };
  }
}
