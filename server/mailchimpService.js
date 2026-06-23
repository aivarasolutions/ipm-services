// server/mailchimpService.js
// Adds/updates IPM website leads in the Mailchimp audience.
// Uses @mailchimp/mailchimp_marketing with MAILCHIMP_API_KEY from Replit Secrets.
// The server prefix (e.g. "us18") is parsed from the API key automatically.
//
// Target audience is controlled by MAILCHIMP_LIST_ID (set to the dedicated
// "IPM - International Property Management" audience). Falls back to a name match
// on "IPM" / "International Property", then the first audience.

import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

function md5(str) {
  return crypto.createHash('md5').update(str.toLowerCase()).digest('hex');
}

function configure() {
  const key = process.env.MAILCHIMP_API_KEY;
  if (!key) throw new Error('MAILCHIMP_API_KEY is not set — add it in Replit Secrets.');
  const server = key.split('-').pop(); // API key format: <key>-<dc>
  mailchimp.setConfig({ apiKey: key, server });
  return mailchimp;
}

let _listIdCache = null;

async function getListId(client) {
  if (_listIdCache) return _listIdCache;

  // 1. Explicit env var wins
  if (process.env.MAILCHIMP_LIST_ID) {
    _listIdCache = process.env.MAILCHIMP_LIST_ID;
    return _listIdCache;
  }

  // 2. Match by name, then fall back to the first audience
  const res = await client.lists.getAllLists({ count: 50 });
  if (!res.lists?.length) throw new Error('No Mailchimp audiences found.');
  const ipm = res.lists.find(l =>
    /ipm|international property/i.test(l.name)
  );
  const chosen = ipm || res.lists[0];
  _listIdCache = chosen.id;
  console.log(`[mailchimp] Using audience: ${chosen.name} (${_listIdCache})`);
  return _listIdCache;
}

/**
 * Add or update a contact in the IPM Mailchimp audience.
 *
 * Captured fields: First Name, Last Name, Email, Phone, Property Location,
 *                  Form Source, Date Submitted.
 *
 * Baseline tags (every lead): Website Lead, IPM Inquiry, Property Owner, Management Inquiry
 * Conditional tags (by form type): Contact Form, Listing Promotion Inquiry, Full Management Inquiry
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

    // Baseline tags applied to every website lead
    const tags = ['Website Lead', 'IPM Inquiry', 'Property Owner', 'Management Inquiry'];

    // Conditional tags based on the known form type
    const src = (formSource || '').toLowerCase();
    if (src.includes('contact')) tags.push('Contact Form');
    if (src.includes('listing') || src.includes('promotion') || src.includes('real estate') || src.includes('10%')) {
      tags.push('Listing Promotion Inquiry');
    }
    if (src.includes('full') || src.includes('20%') || src.includes('management')) {
      tags.push('Full Management Inquiry');
    }
    const uniqueTags = [...new Set(tags)];

    const hash = md5(email);

    // PUT is idempotent — creates or updates the subscriber
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
      tags: uniqueTags,
    });

    console.log(`[mailchimp] Synced: ${email} → ${member.status} | tags: ${uniqueTags.join(', ')}`);
    return { ok: true, id: member.id, status: member.status, tags: uniqueTags };
  } catch (err) {
    console.error('[mailchimp] Error:', err.response?.body || err.message);
    return { ok: false, error: err.message };
  }
}
