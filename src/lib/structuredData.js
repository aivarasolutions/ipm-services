export const SITE_URL = 'https://www.ipm.services';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const organizationReference = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'International Property Management',
  url: SITE_URL,
};

const absoluteUrl = (path) => new URL(path, `${SITE_URL}/`).toString();

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const getNewsArticleFragment = (title) => `news-${slugify(title)}`;

// This is the English content shown by the public Insights hub. The hub has
// no publication dates, so its entries are represented as CreativeWork items
// rather than dated Articles.
export const INSIGHT_ITEMS = [
  {
    title: 'Airbnb Fees Explained',
    description:
      'A direct, professional breakdown of how Airbnb fees actually work today — including the split-fee model, host-only fee model, and how hosts lose thousands per year without realizing it.',
    path: '/insights/airbnb-fees',
  },
  {
    title: 'API Connections & Hidden Costs',
    description:
      "A deeper look at PMS and channel manager integrations. Learn why an API connection triggers Airbnb's 15.5% host-only fee, why Airbnb keeps this quiet, and what it means for your earnings.",
    path: '/insights/api-costs',
  },
  {
    title: 'How to Avoid the 15.5% Fee',
    description:
      'A proven, step-by-step strategy to return your listings to the 3% fee model, eliminate unnecessary charges, and maintain full automation — safely and correctly.',
    path: '/insights/avoid-fees',
  },
  {
    title: 'Check-In System Design (IPM Method)',
    description:
      'Our professional, API-free system for guest communication, data collection, and automation. Clean, scalable, brand-consistent, and completely under your control.',
    path: '/insights/checkin-system',
  },
  {
    title: 'IPM Video Library',
    description:
      'A growing collection of educational videos, system breakdowns, tutorials, and expert host training designed to help you operate with clarity and confidence.',
    path: '/insights/video-library',
  },
];

// These dates are the publication dates displayed on the News page. No
// dateModified is emitted because the page does not provide one.
export const NEWS_ITEMS = [
  {
    title: 'Hotels Report Increased Occupancy but Lower Revenue Due to Price Wars',
    source: 'Newsday Caribe',
    datePublished: '2025-11-09',
    image: '/news-hotel-competition.jpg',
    summary:
      'Small hotels in Playa del Carmen are experiencing a 47% occupancy rate but cannot recover high-season rates. Average prices have plummeted from $160 USD to just $50 USD today.',
    url: 'https://newsdaycaribe.com/comunidad/playa/hoteles-de-playa-del-carmen-reportan-incremento-en-ocupacion-hotelera/',
  },
  {
    title: 'Vacation Rental Boom Drives Down Rates Across Mexican Caribbean',
    source: 'El Economista',
    datePublished: '2025-09-07',
    image: '/news-market-trends.jpg',
    summary:
      'The Cancun-Riviera Maya corridor has 17,275 active vacation rental listings on Airbnb alone, significantly lowering nightly rates compared to other Mexican beach destinations.',
    url: 'https://www.eleconomista.com.mx/amp/estados/auge-rentas-vacacionales-abaratan-tarifas-caribe-mexicano-20250907-776092.html',
  },
  {
    title: 'Insecurity and Unregulated Rentals Sink Hotel Occupancy in Cancun',
    source: 'La Jornada',
    datePublished: '2025-09-24',
    image: '/news-regulation.jpg',
    summary:
      'Hotel occupancy in the Mexican Caribbean continues well below expectations due to multiple factors, including lack of regulation for vacation rentals.',
    url: 'https://www.jornada.com.mx/noticia/2025/09/24/estados/inseguridad-y-rentas-no-reguladas-hunden-ocupacion-hotelera-en-cancun',
  },
  {
    title: 'Vacation Rentals Operating Below 30% Occupancy',
    source: 'Caribe Peninsular',
    datePublished: '2025-11-10',
    image: '/news-low-occupancy.jpg',
    summary:
      'Quintana Roo averages just 26% vacation rental occupancy, down from 29% last year, with Tulum at 20.5%.',
    url: 'https://caribepeninsular.mx/operan-debajo-del-30-sufren-rentas-vacacionales-caida-en-ocupacion/',
  },
];

// Keep this small, schema-focused projection in plain JavaScript so the same
// route heads can be generated during the Vite build without a TypeScript
// runtime. The displayed source of truth remains realEstateData.ts.
export const REAL_ESTATE_SCHEMA_LISTINGS = [
  {
    slug: 'paulus-condos',
    title: 'Paulus Condos',
    location: 'Playa del Carmen, Mexico',
    price: 162000,
    status: 'Pre-Sale',
    image: '/paulus-rooftop-main.jpg',
    description:
      'Modern luxury condos with premium finishes and rooftop terrace in the heart of Playa del Carmen',
    features: ['Pre-Sale Pricing', 'Modern Design', 'Rooftop Terrace', 'Downtown Location'],
    details: { bedrooms: 1, bathrooms: 1, sqft: 485, amenities: ['Rooftop Terrace', 'Modern Kitchen', 'Premium Finishes', 'Elevator', 'Security'] },
    gallery: ['/paulus-kitchen1.jpg', '/paulus-rooftop.jpg', '/paulus-floorplan.jpg', '/paulus-kitchen3.jpg'],
  },
  {
    slug: 'joshua-condos',
    title: 'Joshua Condos',
    location: 'Playa del Carmen, Mexico',
    price: 140700,
    status: 'Pre-Sale',
    image: '/joshua-rooftop.jpg',
    description:
      'Contemporary condos with spacious layouts, rooftop amenities, and modern finishes in prime Playa del Carmen location',
    features: ['Pre-Sale Pricing', 'Spacious Layout', 'Rooftop Pool', 'Prime Location'],
    details: { bedrooms: 2, bathrooms: 2, sqft: 592, amenities: ['Rooftop Pool', 'Modern Kitchen', 'Premium Finishes', 'Elevator', 'Security', 'Parking'] },
    gallery: ['/joshua-living-kitchen.jpg', '/joshua-bedroom.jpg', '/joshua-exterior.jpg', '/joshua-ground-floor.jpg', '/joshua-upper-level.jpg', '/joshua-roof-layout.jpg'],
  },
  {
    slug: 'ukana-condos',
    title: 'UKANA',
    location: 'Playa del Carmen, Mexico',
    price: 185000,
    status: 'Pre-Sale',
    image: '/ukana-main.jpg',
    description:
      'Exclusive development of 33 luxury condominiums with modern design, premium finishes, and exceptional amenities in the heart of Playa del Carmen',
    features: ['Pre-Sale Pricing', 'Exclusive Development', 'Modern Design', 'Premium Location'],
    details: { bedrooms: 2, bathrooms: 2, sqft: 764, amenities: ['Elevator', 'Rooftop Pool', 'Jacuzzi', 'Gym', 'Solarium', 'Lobby', 'Security'] },
    gallery: ['/ukana-gallery-1.jpg', '/ukana-gallery-2.jpg', '/ukana-gallery-3.jpg', '/ukana-gallery-4.jpg', '/ukana-gallery-5.jpg', '/ukana-gallery-6.jpg', '/ukana-gallery-7.jpg', '/ukana-gallery-8.jpg', '/ukana-exterior.jpg', '/ukana-aerial.jpg'],
  },
];

export function createRealEstateListingStructuredData(listing) {
  if (!listing) return null;

  const url = absoluteUrl(`/real-estate/${listing.slug}`);
  const galleryImages = listing.gallery?.images
    ? listing.gallery.images.map((image) => image.src)
    : listing.gallery || [];
  const images = [listing.image, ...galleryImages].filter(Boolean).map(absoluteUrl);
  const [addressLocality, addressCountry] = listing.location.split(',').map((part) => part.trim());
  const additionalProperty = [
    { '@type': 'PropertyValue', name: 'Bedrooms', value: listing.details.bedrooms },
    { '@type': 'PropertyValue', name: 'Bathrooms', value: listing.details.bathrooms },
    { '@type': 'PropertyValue', name: 'Square feet', value: listing.details.sqft, unitText: 'SQFT' },
    { '@type': 'PropertyValue', name: 'Listing status', value: listing.status },
    ...(addressLocality
      ? [
          {
            '@type': 'PropertyValue',
            name: 'Location',
            value: [addressLocality, addressCountry].filter(Boolean).join(', '),
          },
        ]
      : []),
    {
      '@type': 'PropertyValue',
      name: 'Amenities',
      value: listing.details.amenities.join(', '),
    },
    ...(listing.expectedROI
      ? [{ '@type': 'PropertyValue', name: 'Expected ROI', value: `${listing.expectedROI}%` }]
      : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: listing.title,
    description: listing.description,
    image: images,
    url,
    category: 'Real estate',
    brand: organizationReference,
    additionalProperty,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: listing.price,
      seller: organizationReference,
    },
  };
}

function createListItem(item, position) {
  const url = absoluteUrl(item.path || item.url);
  return {
    '@type': 'ListItem',
    position,
    item: {
      '@type': item.itemType || 'CreativeWork',
      '@id': url,
      url,
      name: item.title,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    },
  };
}

export function createItemListStructuredData({ id, name, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/${id}#item-list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map(createListItem),
  };
}

export function createNewsArticleStructuredData(article) {
  const articleId = `${SITE_URL}/news#${getNewsArticleFragment(article.title)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': articleId,
    url: articleId,
    mainEntityOfPage: absoluteUrl('/news'),
    headline: article.title,
    description: article.summary,
    image: [absoluteUrl(article.image)],
    datePublished: article.datePublished,
    author: organizationReference,
    publisher: organizationReference,
    isBasedOn: article.url,
    about: {
      '@type': 'Thing',
      name: `${article.source} source report`,
    },
  };
}

export function getRouteStructuredData(pathname, options = {}) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const listings = options.listings || REAL_ESTATE_SCHEMA_LISTINGS;
  const listingMatch = path.match(/^\/real-estate\/([^/]+)$/);

  if (path === '/real-estate') {
    return [
      createItemListStructuredData({
        id: 'real-estate',
        name: 'IPM luxury real estate listings',
        items: listings.map((listing) => ({
          title: listing.title,
          path: `/real-estate/${listing.slug}`,
          description: listing.description,
          image: listing.image,
          itemType: 'Product',
        })),
      }),
    ];
  }

  if (listingMatch) {
    const listing =
      options.listingSchema ||
      listings.find((candidate) => candidate.slug === listingMatch[1]);
    const schema = listing?.['@type'] ? listing : createRealEstateListingStructuredData(listing);
    return schema ? [schema] : [];
  }

  if (path === '/insights') {
    return [
      createItemListStructuredData({
        id: 'insights',
        name: 'IPM Insights guides',
        items: INSIGHT_ITEMS.map((item) => ({ ...item, itemType: 'Article' })),
      }),
    ];
  }

  if (path === '/news') {
    return [
      createItemListStructuredData({
        id: 'news',
        name: 'IPM vacation rental market news',
        items: NEWS_ITEMS.map((item) => ({
          ...item,
          path: `/news#${getNewsArticleFragment(item.title)}`,
          itemType: 'NewsArticle',
        })),
      }),
      ...NEWS_ITEMS.map(createNewsArticleStructuredData),
    ];
  }

  return [];
}

export function serializeStructuredDataScripts(schemas) {
  return schemas
    .map(
      (schema, index) =>
        `<script id="route-structured-data-${index}" data-route-structured-data type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n');
}

export function injectStructuredDataIntoHtml(html, pathname) {
  const schemas = getRouteStructuredData(pathname);
  const withoutRouteSchemas = html.replace(
    /\s*<script[^>]*data-route-structured-data[^>]*>[\s\S]*?<\/script>/gi,
    '',
  );
  if (!schemas.length) return withoutRouteSchemas;

  return withoutRouteSchemas.replace(
    '</head>',
    `    ${serializeStructuredDataScripts(schemas)}\n  </head>`,
  );
}