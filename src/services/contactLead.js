// Keep English plan keywords in sources: Mailchimp journeys depend on them.
export const CONTACT_PLANS = {
  'listing-promotion': {
    en: 'Listing Promotion (10%)',
    es: 'Promoción de anuncios (10%)',
    source: 'Listing Promotion (10%)',
  },
  'full-management': {
    en: 'Full Management (20%)',
    es: 'Gestión integral (20%)',
    source: 'Full Management (20%)',
  },
}

export const getContactPlan = (plan) =>
  Object.hasOwn(CONTACT_PLANS, plan) ? CONTACT_PLANS[plan] : null

export const getContactSource = (plan, propertyType = 'inquiry') => {
  const selected = getContactPlan(plan)
  return selected
    ? `Contact Form — ${selected.source}`
    : propertyType === 'management'
      ? 'Contact Form — Full Management (20%)'
      : 'Contact Form'
}