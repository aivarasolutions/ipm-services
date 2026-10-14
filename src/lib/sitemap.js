import { getIndexableRoutePaths, SITE_URL } from './seo.js';
import { REAL_ESTATE_SCHEMA_LISTINGS } from './structuredData.js';
import { EDUCATION_CATEGORIES, educationPath } from './educationShared.js';

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[character]));

export const getSitemapEntries = (properties = [], articles = []) => {
  const entries = getIndexableRoutePaths().map((path) => ({
    path,
    changefreq: path === '/' || path === '/properties' || path === '/insights' ? 'weekly' : 'monthly',
    priority: path === '/' ? '1.0' : ['/', '/services', '/properties'].includes(path) ? '0.9' : '0.7',
  }));

  const realEstateEntries = REAL_ESTATE_SCHEMA_LISTINGS.map((listing) => ({
    path: `/real-estate/${listing.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const propertyEntries = properties
    .filter((property) => property?.slug)
    .map((property) => ({
      path: `/properties/${property.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
    }));

  const educationEntries = [
    '/insights', '/es/insights', '/resources', '/es/resources', '/resources/whop', '/es/resources/whop',
    ...EDUCATION_CATEGORIES.flatMap(c => [`/insights/topics/${c.id}`, `/es/insights/topics/${c.id}`]),
    ...articles.filter(a => a.status === 'published').map(a => educationPath(a.locale, a.slug)),
  ].map(path => ({ path, changefreq: 'weekly', priority: '0.7' }));
  const unique = new Map(
    [...entries, ...realEstateEntries, ...propertyEntries, ...educationEntries].map((entry) => [entry.path, entry]),
  );
  return [...unique.values()];
};

export const createSitemapXml = (properties = [], articles = []) => {
  const urls = getSitemapEntries(properties, articles)
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path === '/' ? '/' : path}`)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};