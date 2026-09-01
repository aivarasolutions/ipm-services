import { INDEXABLE_SEO_ROUTES, SITE_URL } from './seo.js';
import { REAL_ESTATE_SCHEMA_LISTINGS } from './structuredData.js';

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[character]));

export const getSitemapEntries = (properties = []) => {
  const entries = Object.keys(INDEXABLE_SEO_ROUTES).map((path) => ({
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

  const unique = new Map(
    [...entries, ...realEstateEntries, ...propertyEntries].map((entry) => [entry.path, entry]),
  );
  return [...unique.values()];
};

export const createSitemapXml = (properties = [], lastmod = '2026-09-01') => {
  const urls = getSitemapEntries(properties)
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path === '/' ? '/' : path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
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