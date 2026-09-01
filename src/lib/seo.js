import { createSeoRouteContent } from './seoContent.js';

export const SITE_URL = 'https://www.ipm.services';

const staticSeoRoutes = {
  '/': {
    title: 'IPM | International Property Management & Vacation Rentals',
    description:
      'IPM (International Property Management) provides professional vacation rental and property management for owners in Playa del Carmen, Tulum, Lake Norman, and beyond.',
    h1: 'More Bookings. Less Vacancy.',
    intro:
      'Professional vacation rental management and multi-platform listing promotion that helps property owners earn more with less work.',
  },
  '/about': {
    title: 'About IPM | International Property Management',
    description:
      'Learn how International Property Management combines local expertise, global standards, and professional hospitality systems for vacation rental owners.',
    h1: 'About IPM',
    intro:
      'International Property Management helps property owners maximize returns while delivering consistent, professional guest experiences.',
  },
  '/services': {
    title: 'Vacation Rental Management Services | IPM',
    description:
      'Explore IPM vacation rental management, revenue optimization, guest support, and multi-platform listing services for property owners.',
    h1: 'Our Services',
    intro:
      'Comprehensive vacation rental management services designed to maximize your property’s potential and your peace of mind.',
  },
  '/properties': {
    title: 'Luxury Vacation Rentals | IPM Properties',
    description:
      'Browse IPM’s professionally managed vacation rentals, check live availability, and book stays in prime destinations.',
    h1: 'Our Properties',
    intro:
      'Discover professionally managed vacation rentals in prime destinations, with live availability and direct booking options.',
  },
  '/real-estate': {
    title: 'Luxury Real Estate Investment Properties | IPM',
    description:
      'Explore curated luxury real estate investment opportunities in Playa del Carmen and the Mexican Caribbean with IPM.',
    h1: 'Luxury Properties',
    intro:
      'Exceptional residences and investment opportunities in the world’s most desirable locations.',
  },
  '/insights': {
    title: 'Vacation Rental Hosting Insights | IPM',
    description:
      'Read IPM’s practical guides to Airbnb fees, hosting systems, automation, and profitable short-term rental operations.',
    h1: 'IPM Insights',
    intro:
      'Expert knowledge, transparent guidance, and professional hosting strategies for short-term rental owners.',
  },
  '/news': {
    title: 'Vacation Rental Market News | IPM',
    description:
      'Follow the latest Quintana Roo vacation rental, hospitality, occupancy, pricing, and regulation updates from IPM.',
    h1: 'Vacation Rental Market News',
    intro:
      'Latest updates on the Quintana Roo vacation rental and hospitality market.',
  },
  '/vietnam': {
    title: 'Property Management Da Nang | Vacation Rental Management Vietnam | IPM',
    description:
      'International Property Management offers professional Airbnb and short-term rental management in Da Nang, Vietnam.',
    h1: 'Property Management in Da Nang, Vietnam',
    intro:
      'Professional vacation rental management, listing promotion, and owner support for properties in Vietnam.',
  },
  '/location-guide': {
    title: 'Riviera Maya Location Guide | IPM',
    description:
      'Compare Cancun, Playa del Carmen, and Tulum with IPM’s practical guide to living, investing, and hosting in the Riviera Maya.',
    h1: 'Riviera Maya Location Guide',
    intro:
      'Compare the best destinations for living, investing, and vacation rentals across the Riviera Maya.',
  },
  '/contact': {
    title: 'Contact IPM | Vacation Rental Management Consultation',
    description:
      'Contact International Property Management for vacation rental management, property evaluation, booking, and owner consultation.',
    h1: 'Contact Us',
    intro:
      'Get in touch with IPM’s expert team for personalized property management and vacation rental solutions.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | IPM International Property Management',
    description:
      'Read the International Property Management privacy policy covering website inquiries, reservations, and property management services.',
    h1: 'Privacy Policy',
    intro:
      'How International Property Management collects, uses, and protects your information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | IPM International Property Management',
    description:
      'Review the terms governing use of the IPM website, vacation rental reservations, and property management services.',
    h1: 'Terms & Conditions',
    intro: 'The terms that govern the use of our website and services.',
  },
};

const insightSeoRoutes = {
  '/insights/airbnb-fees': {
    title: 'Airbnb Fees Explained | IPM Insights',
    description:
      'Understand Airbnb’s split-fee and host-only fee models, including how API-connected listings can affect vacation rental payouts.',
    h1: 'Airbnb Fees Explained',
    intro:
      'Understanding the true cost of hosting — what Airbnb does not tell you.',
  },
  '/insights/api-costs': {
    title: 'PMS API Connections & Hidden Costs | IPM Insights',
    description:
      'Learn how PMS and channel-manager API connections affect Airbnb fees, automation, and short-term rental earnings.',
    h1: 'API Connections & Hidden Costs',
    intro:
      'How property-management software integrations can change your fees and payouts.',
  },
  '/insights/avoid-fees': {
    title: 'How to Avoid Airbnb’s 15.5% Fee | IPM Insights',
    description:
      'Follow IPM’s practical strategy for reducing unnecessary Airbnb host fees while keeping short-term rental operations organized.',
    h1: 'How to Avoid the 15.5% Fee',
    intro:
      'A practical strategy to reduce unnecessary charges and protect your hosting revenue.',
  },
  '/insights/checkin-system': {
    title: 'Professional Vacation Rental Check-In System | IPM Insights',
    description:
      'Learn IPM’s API-free check-in system for guest communication, data collection, and reliable vacation rental automation.',
    h1: 'Check-In System Design',
    intro:
      'The IPM method for clean, scalable, and brand-consistent guest check-in workflows.',
  },
};

export const INDEXABLE_SEO_ROUTES = {
  ...staticSeoRoutes,
  ...insightSeoRoutes,
};

export const NON_INDEXABLE_ROUTES = [
  '/owner-portal',
  '/proposal/charlotte-downhaul',
  '/proposal/tampa-audrey',
  '/proposal/charlotte-timberbrook',
  '/proposal/staugustine-crossroad',
  '/insights/tegucigalpa-checklist',
];

export const normalizePathname = (pathname = '/') => {
  const path = String(pathname).split('?')[0].split('#')[0];
  if (!path || path === '/') return '/';
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
};

const humanizeSlug = (slug) =>
  decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const getSeoMetadata = (pathname, options = {}) => {
  const path = normalizePathname(pathname);
  const exact = INDEXABLE_SEO_ROUTES[path];
  if (exact) {
    return { ...exact, canonical: `${SITE_URL}${path === '/' ? '/' : path}`, indexable: true };
  }

  if (path === '/404') {
    return {
      title: 'Page Not Found | IPM International Property Management',
      description: 'The requested IPM page could not be found.',
      h1: 'Page not found',
      intro: 'The page you requested is not available. Explore IPM property management services and vacation rentals.',
      canonical: `${SITE_URL}/404`,
      indexable: false,
    };
  }

  const realEstateMatch = path.match(/^\/real-estate\/([^/]+)$/);
  if (realEstateMatch && options.realEstateListing) {
    const listing = options.realEstateListing;
    return {
      title: `${listing.title} | Luxury Real Estate | IPM`,
      description: listing.description,
      h1: listing.title,
      intro: `${listing.description}. Explore investment details, amenities, and rental potential in ${listing.location}.`,
      canonical: `${SITE_URL}${path}`,
      indexable: true,
    };
  }

  const propertyMatch = path.match(/^\/properties\/([^/]+)$/);
  if (propertyMatch && options.property) {
    const property = options.property;
    return {
      title: `${property.name} | Luxury Vacation Rental | IPM`,
      description:
        property.description ||
        `Book ${property.name}, a professionally managed vacation rental${property.location ? ` in ${property.location}` : ''}.`,
      h1: property.name,
      intro:
        property.description ||
        `Check live availability and booking details for this professionally managed vacation rental${property.location ? ` in ${property.location}` : ''}.`,
      canonical: `${SITE_URL}${path}`,
      indexable: true,
    };
  }

  if (NON_INDEXABLE_ROUTES.includes(path)) {
    return {
      title: 'IPM International Property Management',
      description: 'International Property Management client and consultation portal.',
      h1: path === '/owner-portal' ? 'Owner Portal' : 'International Property Management',
      intro: 'This IPM page is available to authorized users and direct visitors.',
      canonical: `${SITE_URL}${path}`,
      indexable: false,
    };
  }

  return null;
};

export const getPropertySeoMetadata = (pathname, property) =>
  getSeoMetadata(pathname, { property });

export const createSeoShell = (metadata, pathname = '/', options = {}) => {
  if (!metadata) return '';
  const escape = (value) =>
    String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[character]));

  return `<main class="seo-route-shell" style="box-sizing:border-box;max-width:72rem;margin:0 auto;padding:3rem 1.5rem 5rem;font-family:Montserrat,Arial,sans-serif;background:#06121F;color:#fff">
  <header style="padding:2rem 0 2.5rem">
    <p style="margin:0 0 1rem;color:#F2D98D;font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase">International Property Management</p>
    <h1 style="margin:0 0 1.25rem;font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.25rem,6vw,4.5rem);line-height:1.1">${escape(metadata.h1)}</h1>
    <p style="max-width:52rem;margin:0;color:#C9D2DE;font-size:1.2rem;line-height:1.7">${escape(metadata.intro)}</p>
  </header>
  ${createSeoRouteContent(normalizePathname(pathname), metadata, options)}
</main>`;
};

const escapeAttribute = (value) =>
  String(value).replace(/[&"]/g, (character) => (character === '&' ? '&amp;' : '&quot;'));

const upsertMeta = (html, attribute, key, value) => {
  const pattern = new RegExp(
    `<meta(?=[^>]*\\b${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'])[^>]*>`,
    'i',
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

export const injectSeoMetadataIntoHtml = (html, pathname, options = {}) => {
  const path = normalizePathname(pathname);
  const metadata = getSeoMetadata(path, options);
  if (!metadata) return null;
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${metadata.title}</title>`);
  output = upsertMeta(output, 'name', 'title', metadata.title);
  output = upsertMeta(output, 'name', 'description', metadata.description);
  output = upsertMeta(output, 'name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, nofollow');
  output = upsertMeta(output, 'property', 'og:url', metadata.canonical);
  output = upsertMeta(output, 'property', 'og:title', metadata.title);
  output = upsertMeta(output, 'property', 'og:description', metadata.description);
  output = upsertMeta(output, 'name', 'twitter:url', metadata.canonical);
  output = upsertMeta(output, 'name', 'twitter:title', metadata.title);
  output = upsertMeta(output, 'name', 'twitter:description', metadata.description);

  const canonicalTag = `<link rel="canonical" href="${escapeAttribute(metadata.canonical)}" />`;
  output = /<link\s+rel="canonical"[^>]*>/i.test(output)
    ? output.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag)
    : output.replace('</head>', `    ${canonicalTag}\n  </head>`);

  // Build output may already contain a nested SEO route shell (the homepage
  // document is also the production fallback source). Match the complete
  // known shell rather than stopping at the first nested closing div.
  const rootPattern =
    /<div id="root">(?:\s*<main class="seo-route-shell"[\s\S]*?<\/main>\s*)?<\/div>/i;
  output = rootPattern.test(output)
    ? output.replace(rootPattern, `<div id="root">${createSeoShell(metadata, path, options)}</div>`)
    : output;
  return output;
};

export const getIndexableRoutePaths = () => Object.keys(INDEXABLE_SEO_ROUTES);

export const getRealEstateSeoMetadata = (pathname, listing) =>
  getSeoMetadata(pathname, { realEstateListing: listing });

export const getDynamicPropertySeoMetadata = (pathname, property) =>
  getSeoMetadata(pathname, { property });

export const getPropertySlugFromPath = (pathname) => {
  const match = normalizePathname(pathname).match(/^\/properties\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const getRealEstateSlugFromPath = (pathname) => {
  const match = normalizePathname(pathname).match(/^\/real-estate\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export { humanizeSlug };