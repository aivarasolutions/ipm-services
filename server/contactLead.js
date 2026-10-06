export function buildContactLeadFields(lead) {
  const message = lead.message.split('\n').map(line =>
    (lead.listingUrl ? line.split(lead.listingUrl).join('') : line).trim()
  ).filter(line => line && !/^(?:airbnb\s+)?(?:property\s+)?(?:listing|url)(?:\s+(?:url|link))?\s*:\s*$/i.test(line)).join('\n')
  return {
    ...(lead.firstName ? { 'First Name': lead.firstName, 'Last Name': lead.lastName } : { Name: lead.name || '—' }),
    Email: lead.email, Phone: lead.phone || '—', Subject: lead.subject || '—',
    'Property Type': lead.propertyType || '—',
    ...(message ? { Message: message } : {}),
    Source: lead.source,
    ...(lead.listingUrl ? { 'Property Listing Link': lead.listingUrl } : {}),
  }
}

export function normalizeContactLead(body = {}) {
  const text = (value, max = 200) => typeof value === 'string' ? value.trim().slice(0, max) : ''
  const source = text(body.source) || 'Contact Form'
  const interest = `${source} ${text(body.propertyType)}`
  const plan = body.plan === 'full-management' || /full.management|20%/i.test(interest)
    ? 'full-management'
    : body.plan === 'listing-promotion' || /listing|promotion|10%/i.test(interest)
      ? 'listing-promotion' : ''
  const firstName = text(body.firstName, 100)
  const lastName = text(body.lastName, 100)
  const name = firstName && lastName ? `${firstName} ${lastName}` : text(body.name)
  const email = text(body.email, 254)
  const phone = text(body.phone, 40).replace(/[\s().-]/g, '')
  const listingUrl = text(body.listingUrl, 2000)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please provide a valid email address.')
  }
  if (plan || firstName || lastName) {
    if (!firstName || !lastName) throw new Error('Please provide both your first and last name.')
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      throw new Error('Please include your phone country code, for example +1 555 123 4567.')
    }
  }
  if (plan && !listingUrl) throw new Error('Please provide your property listing link.')
  if (listingUrl) {
    let url
    try { url = new URL(listingUrl) } catch { throw new Error('Please provide a valid property listing link.') }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
      throw new Error('Please provide an http or https property listing link without login details.')
    }
  }
  return {
    name, firstName, lastName, email, phone, listingUrl, plan, source,
    subject: text(body.subject), message: text(body.message, 6000),
    propertyType: text(body.propertyType),
    language: ['es', 'vi'].includes(body.language) ? body.language : 'en',
  }
}
