export const COUNTRIES = [
  { code: 'US', label: { en: 'United States', es: 'Estados Unidos' } },
  { code: 'MX', label: { en: 'Mexico', es: 'México' } },
  { code: 'HN', label: { en: 'Honduras', es: 'Honduras' } },
  { code: 'CA', label: { en: 'Canada', es: 'Canadá' } },
  { code: 'GB', label: { en: 'United Kingdom', es: 'Reino Unido' } },
  { code: 'ES', label: { en: 'Spain', es: 'España' } },
  { code: 'OTHER', label: { en: 'Other', es: 'Otro' } },
];

export const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'],
  ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'],
  ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'],
  ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'],
  ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
].map(([code, name]) => ({ code, name }));

// No jurisdiction rates have been verified for this feature yet. Never insert
// demonstration percentages here. Populate only complete, sourced records.
// Schema:
// {country,state,county,city,tax_name,tax_rate,taxable_components,
//  platform_collection_notes,source,last_verified}
// taxable_components: subset of ['accommodation','cleaning','other'].
// An empty city/county means an explicitly verified jurisdiction-wide record,
// NOT a guessed combined local rate. Do not add partial/state-only rates as
// if they were the full combined lodging tax.
export const VERIFIED_TAX_RATES = [];

const normalized = (value) => String(value ?? '').trim().toLowerCase();

export function findVerifiedTaxRate(location, records = VERIFIED_TAX_RATES) {
  return records.find((record) =>
    record.source && /^https:\/\//.test(record.source) &&
    /^\d{4}-\d{2}-\d{2}$/.test(record.last_verified) &&
    Number.isFinite(record.tax_rate) && record.tax_rate >= 0 && record.tax_rate < 100 &&
    Array.isArray(record.taxable_components) &&
    record.taxable_components.every((key) => ['accommodation', 'cleaning', 'other'].includes(key)) &&
    ['country', 'state', 'county', 'city'].every((key) => normalized(record[key]) === normalized(location[key]))
  ) ?? null;
}
