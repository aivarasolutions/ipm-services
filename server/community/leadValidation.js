const clean = (value, max) => String(value || '').trim().slice(0, max);

export function validatePropertyReviewLead(input) {
  if (!input || typeof input !== 'object') throw new Error('Invalid request body');
  if (clean(input.website, 1)) throw new Error('Invalid submission');
  const lead = {
    name: clean(input.name, 120),
    email: clean(input.email, 254).toLowerCase(),
    phone: clean(input.phone, 40),
    propertyLocation: clean(input.propertyLocation, 240),
    listingUrl: clean(input.listingUrl, 1000),
    propertyCount: Number(input.propertyCount),
    bookingPlatforms: Array.isArray(input.bookingPlatforms)
      ? input.bookingPlatforms.map((value) => clean(value, 60)).filter(Boolean).slice(0, 12)
      : [],
    biggestProblem: clean(input.biggestProblem, 2000),
    wantsPropertyReview: input.wantsPropertyReview === true,
    consentAt: clean(input.consentAt, 40),
    source: clean(input.source, 80) || 'ipm-community',
  };
  if (!lead.name || !lead.propertyLocation || !lead.biggestProblem) throw new Error('Missing required lead fields');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) throw new Error('Invalid email address');
  if (!Number.isInteger(lead.propertyCount) || lead.propertyCount < 0 || lead.propertyCount > 10000) throw new Error('Invalid property count');
  if (!lead.bookingPlatforms.length) throw new Error('Select at least one booking platform');
  if (!lead.consentAt || Number.isNaN(Date.parse(lead.consentAt))) throw new Error('Consent timestamp is required');
  if (lead.listingUrl) {
    let url;
    try { url = new URL(lead.listingUrl); } catch { throw new Error('Invalid listing URL'); }
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid listing URL');
  }
  return lead;
}
