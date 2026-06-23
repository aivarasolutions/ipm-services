// server/mailchimpService.js
// Adds/updates IPM website leads in the Mailchimp audience.
// Uses @mailchimp/mailchimp_marketing with MAILCHIMP_API_KEY from Replit Secrets.
// The server prefix (e.g. "us14") is parsed from the API key automatically.

import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

function md5(str) {
  return crypto.createHash('md5').update(str.toLowerCase()).digest('hex');
}

function configure() {
  const key = process.env.MAILCHIMP_API_KEY;
  if (!key) throw new Error('MAILCHIMP_API_KEY is not set — add it in Replit Secrets.');
  // API key format: <key>-<dc>  e.g. abc123-us14
  const server = key.split('-').pop();
  mailchimp.setConfig({ apiKey: key, server });
  return mailchimp;
}

// Cache the audience list ID after first successful lookup
let _listIdCache = null;

async function getListId(client) {
  if (_listIdCache) return _listIdCache;
  const res = await client.lists.getAllLists({ count: 1 });
  if (!res.lists?.length) throw new Error('No Mailchimp audiences found.');
  _listIdCache = res.lists[0].id;
  console.log(`[mailchimp] Using audience: ${res.lists[0].name} (${_listIdCache})`);
  return _listIdCache;
}

/**
 * Add or update a contact in the IPM Mailchimp audience.
 *
 * Captured fields:
 *   First Name, Last Name, Email, Phone, Property Location, Form Source, Date Submitted
 *
 * Tags applied (where relevant):
 *   Website Lead, Contact Form, Property Owner, Management Inquiry, Listing Promotion Inquiry
 *
 * @param {object} opts
 * @param {string}   opts.email
 * @param {string}   [opts.firstName]
 * @param {string}   [opts.lastName]
 * @param {string}   [opts.phone]
 * @param {string}   [opts.propertyLocation]
 * @param {string}   [opts.formSource]
 */
export async function addToMailchimp({ email, firstName, lastName, phone, propertyLocation, formSource }) {
  if (!email) {
    console.warn('[mailchimp] No email — skipping audience sync');
    return { ok: false, reason: 'no email' };
  }

  try {
    const client = configure();
    const listId = await getListId(client);

    // Build tags
    const tags = ['Website Lead'];
    if (formSource) tags.push(formSource);
    const src = (formSource || '').toLowerCase();
    if (src.includes('contact'))    tags.push('Contact Form');
    if (src.includes('management')) tags.push('Management Inquiry');
    if (src.includes('listing') || src.includes('real estate')) {
      tags.push('Listing Promotion Inquiry');
    }
    if (src.includes('owner') || src.includes('management') || src.includes('property')) {
      tags.push('Property Owner');
    }

    const hash = md5(email);

    // PUT is idempotent — creates or updates subscriber
    const member = await client.lists.setListMember(listId, hash, {
      email_address: email,
      status_if_new: 'subscribed',
      merge_fields: {
        FNAME:    firstName        || '',
        LNAME:    lastName         || '',
        PHONE:    phone            || '',
        LOCATION: propertyLocation || '',
        SOURCE:   formSource       || 'Website Form',
        SIGNDATE: new Date().toISOString().split('T')[0],
      },
      tags,
    });

    console.log(`[mailchimp] Synced: ${email} → ${member.status}`);
    return { ok: true, id: member.id, status: member.status };
  } catch (err) {
    // Log full error but don't crash the form submission
    console.error('[mailchimp] Error:', err.response?.body || err.message);
    return { ok: false, error: err.message };
  }
}
