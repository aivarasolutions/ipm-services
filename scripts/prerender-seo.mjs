import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { injectStructuredDataIntoHtml } from '../src/lib/structuredData.js';
import {
  getIndexableRoutePaths,
  injectSeoMetadataIntoHtml,
  NON_INDEXABLE_ROUTES,
} from '../src/lib/seo.js';
import { createSitemapXml } from '../src/lib/sitemap.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const sourceHtml = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');

const readPropertyFeed = async () => {
  const feedPath = path.join(projectRoot, 'public', 'properties.json');
  try {
    const feed = JSON.parse(await fs.readFile(feedPath, 'utf8'));
    return Array.isArray(feed) ? feed : Array.isArray(feed.properties) ? feed.properties : [];
  } catch {
    return [];
  }
};

const getPropertyInventory = async () => {
  const localFeed = await readPropertyFeed();
  if (localFeed.length) return localFeed;

  if (process.env.SEO_PROPERTY_FEED_URL) {
    try {
      const response = await fetch(process.env.SEO_PROPERTY_FEED_URL);
      if (response.ok) {
        const feed = await response.json();
        return Array.isArray(feed) ? feed : Array.isArray(feed.properties) ? feed.properties : [];
      }
    } catch (error) {
      console.warn('[seo] property feed unavailable:', error.message);
    }
  }

  // A production build may have Hostaway credentials available. Builds remain
  // independent of that service when they do not, while a configured build
  // can still emit the current live property URLs.
  if (process.env.HOSTAWAY_ACCOUNT_ID && process.env.HOSTAWAY_CLIENT_SECRET) {
    try {
      const { getListing, getListings } = await import('../server/hostawayService.js');
      const listings = await getListings();
      return await Promise.all(
        listings.map(async (listing) => {
          try {
            return await getListing(listing.slug);
          } catch (error) {
            console.warn(`[seo] property detail unavailable for ${listing.slug}:`, error.message);
            return listing;
          }
        }),
      );
    } catch (error) {
      console.warn('[seo] live property inventory unavailable:', error.message);
    }
  }

  return [];
};

const properties = await getPropertyInventory();
const realEstateRoutes = [
  '/real-estate/paulus-condos',
  '/real-estate/joshua-condos',
  '/real-estate/ukana-condos',
];
const routes = [
  ...getIndexableRoutePaths(),
  ...NON_INDEXABLE_ROUTES,
  ...realEstateRoutes,
  ...properties.filter((property) => property?.slug).map((property) => `/properties/${property.slug}`),
];

for (const route of routes) {
  const routeDirectory = path.join(distRoot, route.slice(1));
  await fs.mkdir(routeDirectory, { recursive: true });
  const listing = route.startsWith('/real-estate/')
    ? {
        slug: route.split('/').pop(),
        ...(await import('../src/lib/structuredData.js')).REAL_ESTATE_SCHEMA_LISTINGS.find(
          (candidate) => candidate.slug === route.split('/').pop(),
        ),
      }
    : undefined;
  const property = route.startsWith('/properties/')
    ? properties.find((candidate) => candidate.slug === route.split('/').pop())
    : undefined;
  const metadataHtml = injectSeoMetadataIntoHtml(sourceHtml, route, {
    properties,
    ...(listing ? { realEstateListing: listing } : {}),
    ...(property ? { property } : {}),
  });
  const routeHtml = injectStructuredDataIntoHtml(metadataHtml, route, {
    ...(property ? { property } : {}),
  });
  await fs.writeFile(path.join(routeDirectory, 'index.html'), routeHtml);
}

const homeHtml = injectSeoMetadataIntoHtml(sourceHtml, '/');
await fs.writeFile(path.join(distRoot, 'index.html'), injectStructuredDataIntoHtml(homeHtml, '/'));
await fs.writeFile(
  path.join(distRoot, '404.html'),
  injectSeoMetadataIntoHtml(sourceHtml, '/404') || sourceHtml,
);
await fs.writeFile(path.join(distRoot, 'sitemap.xml'), createSitemapXml(properties));