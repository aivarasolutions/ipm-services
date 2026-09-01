import { INSIGHT_ITEMS, NEWS_ITEMS, REAL_ESTATE_SCHEMA_LISTINGS } from './structuredData.js';

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));

const safeUrl = (value) => {
  const url = String(value || '');
  return /^(?:https?:\/\/|\/(?!\/)|mailto:|tel:)/i.test(url) ? escapeHtml(url) : '';
};

const section = (heading, paragraphs = [], items = []) => ({ heading, paragraphs, items });

const STATIC_ROUTE_CONTENT = {
  '/': {
    sections: [
      section('Global Exposure for Your Property', [
        'IPM promotes vacation rentals across Airbnb, Booking.com, VRBO, Expedia, Hotels.com, Google Vacation Rentals, and direct-booking channels.',
      ]),
      section('What We Handle for Owners', [
        'Our international property management team coordinates listing optimization, dynamic pricing, guest verification, communications, cleaning, maintenance, and transparent owner reporting.',
      ], ['Multi-platform listing promotion', 'Revenue optimization', 'Guest support and verification', 'Owner dashboards and reports']),
      section('Featured Vacation Rentals', [
        'Browse professionally managed homes with live Hostaway availability, transparent pricing, and secure direct-booking options.',
      ]),
    ],
    links: [
      { href: '/services', label: 'Explore property management services' },
      { href: '/properties', label: 'Browse vacation rentals' },
      { href: '/contact', label: 'Request a property consultation' },
    ],
  },
  '/about': {
    sections: [
      section('Our Story', [
        'IPM combines local market knowledge with international hospitality standards to help owners protect their properties, improve occupancy, and deliver dependable guest experiences.',
      ]),
      section('Our Values', [], ['Trust and reliability', 'Excellence in service', 'Personalized owner care']),
      section('What We Do', [
        'We manage the complete vacation-rental lifecycle, from listing distribution and pricing to guest support, property care, and performance reporting.',
      ]),
    ],
    links: [
      { href: '/services', label: 'See what IPM manages' },
      { href: '/properties', label: 'View managed properties' },
      { href: '/contact', label: 'Partner with IPM' },
    ],
  },
  '/services': {
    sections: [
      section('Complete Property Management Solutions', [
        'From listing optimization to guest services, IPM handles every aspect of a vacation-rental business so owners can focus on their investment.',
      ]),
      section('Property Management', [
        'End-to-end guest communication, check-in and check-out coordination, cleaning, maintenance, inventory, inspections, and owner reporting.',
      ]),
      section('Revenue Optimization', [
        'Data-informed pricing, competitive market analysis, seasonal rate adjustments, forecasting, and performance insights designed to maximize rental income.',
      ]),
      section('24/7 Guest and Owner Support', [
        'Round-the-clock multilingual support, emergency maintenance coordination, and real-time issue resolution.',
      ]),
      section('Multi-Platform Listing', [
        'Listing optimization and synchronized distribution across Airbnb, Booking.com, Expedia, VRBO, HomeAway, and direct-booking channels.',
      ]),
      section('Proven Results', [], ['30+ properties managed', '75–85% average occupancy', '10+ years of experience', '24/7 support']),
    ],
    links: [
      { href: '/properties', label: 'View IPM properties' },
      { href: '/contact', label: 'Schedule a consultation' },
    ],
  },
  '/properties': {
    sections: [
      section('Featured Properties', [
        'Browse IPM’s live portfolio of professionally managed vacation rentals. Each detail page provides property information, amenities, live availability, and direct-booking prices.',
      ]),
      section('Book Direct with IPM', [
        'Choose available dates, receive a live Hostaway quote, and continue to secure payment without sharing card details with this website.',
      ]),
    ],
    links: [
      { href: '/contact', label: 'Ask about a stay' },
      { href: '/services', label: 'Learn about property management' },
    ],
  },
  '/real-estate': {
    sections: [
      section('Current Luxury Real Estate Listings', [
        'Explore curated pre-sale and investment properties in Playa del Carmen with pricing, amenities, location details, and rental-potential information.',
      ]),
      section('Explore Investment Destinations', [
        'IPM follows opportunities across Cancun, Tulum, Playa del Carmen, and the wider Riviera Maya.',
      ]),
      section('Comprehensive Property Management', [
        'After purchase, IPM can support property setup, rental listing, revenue strategy, guest operations, and ongoing care.',
      ]),
    ],
    links: [
      { href: '/services', label: 'Property management services' },
      { href: '/contact', label: 'Schedule an investment consultation' },
    ],
  },
  '/insights': {
    sections: [
      section('What You Will Find in IPM Insights', [
        'Straightforward guidance for short-term rental hosts on platform fees, API connections, automation, guest workflows, and profitable operations.',
      ]),
      section('Why IPM Creates These Resources', [
        'Hosts deserve clear explanations of payout structures, software costs, and operational systems so they can protect revenue and retain control.',
      ]),
      section('Our Expertise—Your Advantage', [], [
        'Understand Airbnb fee models',
        'Evaluate PMS and channel-manager costs',
        'Build professional guest check-in workflows',
        'Scale with practical hosting systems',
      ]),
    ],
    links: [
      ...INSIGHT_ITEMS.map((item) => ({ href: item.path, label: item.title })),
      { href: '/contact', label: 'Schedule a hosting consultation' },
    ],
  },
  '/news': {
    sections: [
      section('Market Impact on Vacation Rental Owners', [
        'Quintana Roo’s vacation-rental market faces oversupply, lower nightly rates, weaker occupancy, and changing regulatory expectations. Professional pricing, distribution, and compliance are increasingly important for owners.',
      ]),
      ...NEWS_ITEMS.map((item) => section(item.title, [item.summary, `Published ${item.datePublished} by ${item.source}.`])),
    ],
    links: [
      ...NEWS_ITEMS.map((item) => ({ href: item.url, label: `Read ${item.title}` })),
      { href: '/services', label: 'See IPM revenue and property management services' },
    ],
    images: NEWS_ITEMS.map((item) => ({ src: item.image, alt: item.title })),
  },
  '/vietnam': {
    sections: [
      section('Vacation Rental Management in Da Nang', [
        'IPM helps owners in Vietnam market short-term rentals, coordinate guests, optimize pricing, and maintain consistent service standards.',
      ]),
      section('Services for Vietnam Property Owners', [], [
        'Multi-platform listing promotion',
        'Dynamic pricing and occupancy strategy',
        'Guest communication and check-in support',
        'Cleaning, maintenance, and owner reporting',
      ]),
      section('Local Operations, International Standards', [
        'Our systems combine local coordination with professional hospitality workflows for owners serving domestic and international guests.',
      ]),
    ],
    links: [
      { href: '/services', label: 'Explore IPM services' },
      { href: '/contact', label: 'Discuss a property in Vietnam' },
    ],
  },
  '/location-guide': {
    sections: [
      section('Compare Riviera Maya Destinations', [
        'Use this guide to compare Cancun, Playa del Carmen, and Tulum for lifestyle, investment potential, tourism demand, and vacation-rental operations.',
      ]),
      section('Cancun', ['A major tourism hub with international air access, established hotel infrastructure, and year-round visitor demand.']),
      section('Playa del Carmen', ['A walkable coastal city with beaches, dining, entertainment, and strong access to the wider Riviera Maya.']),
      section('Tulum', ['A design-led destination known for beaches, wellness travel, archaeological sites, and a rapidly evolving rental market.']),
    ],
    links: [
      { href: '/real-estate', label: 'Explore Riviera Maya real estate' },
      { href: '/properties', label: 'Browse vacation rentals' },
      { href: '/contact', label: 'Ask IPM about a destination' },
    ],
  },
  '/contact': {
    sections: [
      section('Talk with International Property Management', [
        'Contact IPM for vacation-rental management, property evaluation, investment guidance, or help booking a professionally managed stay.',
      ]),
      section('Property Owner Consultations', [
        'Tell us about your property, market, and goals. Our team can explain listing promotion, pricing, guest support, and management options.',
      ]),
      section('Guest and Booking Support', [
        'Guests can ask about property details, availability, direct booking, and existing reservations.',
      ]),
    ],
    links: [
      { href: 'tel:+13104000032', label: 'Call +1 310-400-0032' },
      { href: '/services', label: 'Review services before contacting us' },
      { href: '/properties', label: 'Browse available stays' },
    ],
  },
  '/privacy-policy': {
    sections: [
      section('Information We Collect', [
        'IPM may receive information submitted through inquiry, consultation, lead, and reservation forms, together with basic website usage information.',
      ]),
      section('How Information Is Used', [
        'Information is used to respond to requests, provide property-management and booking services, maintain security, and improve website operations.',
      ]),
      section('Reservations and Payments', [
        'Live availability and reservations are handled through Hostaway. Secure payment details are entered in the hosted payment portal and are not collected by this website.',
      ]),
      section('Your Choices', [
        'You may contact IPM with questions about personal information, communications, or privacy practices.',
      ]),
    ],
    links: [
      { href: '/terms-and-conditions', label: 'Read the terms and conditions' },
      { href: '/contact', label: 'Contact IPM about privacy' },
    ],
  },
  '/terms-and-conditions': {
    sections: [
      section('Website Use', [
        'These terms govern use of the IPM website, its informational content, inquiry forms, and links to third-party services.',
      ]),
      section('Vacation Rental Reservations', [
        'Availability, rates, fees, booking rules, and reservation confirmation depend on live property information and the secure Hostaway booking process.',
      ]),
      section('Property Management Information', [
        'Service descriptions are general information. Final management scope, pricing, and responsibilities are established in a separate written agreement.',
      ]),
      section('Third-Party Services', [
        'The website may link to booking platforms, payment portals, maps, and other external services governed by their own terms.',
      ]),
    ],
    links: [
      { href: '/privacy-policy', label: 'Read the privacy policy' },
      { href: '/contact', label: 'Contact IPM with questions' },
    ],
  },
  '/insights/airbnb-fees': {
    sections: [
      section('The Two Airbnb Fee Models', [
        'Airbnb commonly uses a split-fee model or a host-only fee model. The structure determines how much the host pays and how the guest sees service charges.',
      ], ['Split-fee pricing', 'Host-only pricing', 'Guest-facing service fees']),
      section('How Fees Affect Rental Income', [
        'Owners should compare the advertised nightly rate, guest total, host payout, taxes, and software-related channel costs before evaluating performance.',
      ]),
      section('Review Your Current Setup', [
        'Check the fee model on each listing and understand whether a PMS or channel-manager connection changes the host payout.',
      ]),
    ],
    links: [
      { href: '/insights/api-costs', label: 'Understand API connection costs' },
      { href: '/insights/avoid-fees', label: 'Read the fee-reduction strategy' },
      { href: '/insights', label: 'Back to IPM Insights' },
    ],
  },
  '/insights/api-costs': {
    sections: [
      section('What an API Connection Changes', [
        'Property-management systems and channel managers can centralize calendars, messages, and rates, but their connection model may also change platform fees and payout calculations.',
      ]),
      section('Costs to Evaluate', [], [
        'Software subscription fees',
        'Host-only platform fees',
        'Payment processing costs',
        'Channel-specific commissions',
        'Operational time saved through automation',
      ]),
      section('Choose Systems Deliberately', [
        'Compare total operating cost and control—not only the advertised software price—before connecting a listing portfolio.',
      ]),
    ],
    links: [
      { href: '/insights/airbnb-fees', label: 'Review Airbnb fee models' },
      { href: '/insights/avoid-fees', label: 'Explore a lower-fee approach' },
      { href: '/insights', label: 'Back to IPM Insights' },
    ],
  },
  '/insights/avoid-fees': {
    sections: [
      section('A Practical Fee Strategy', [
        'Hosts can review how listings connect to Airbnb, remove unnecessary dependencies, and compare the operational value of automation against the cost of host-only fees.',
      ]),
      section('Keep Essential Operations Organized', [], [
        'Maintain reliable calendar synchronization',
        'Preserve guest communication workflows',
        'Track reservations and payouts',
        'Test changes before disconnecting production systems',
      ]),
      section('Protect Listing Performance', [
        'Fee changes should not come at the expense of availability accuracy, response time, guest service, or reservation reliability.',
      ]),
    ],
    links: [
      { href: '/insights/airbnb-fees', label: 'Understand the fee models first' },
      { href: '/insights/checkin-system', label: 'Build a professional check-in workflow' },
      { href: '/insights', label: 'Back to IPM Insights' },
    ],
  },
  '/insights/checkin-system': {
    sections: [
      section('The IPM Check-In Method', [
        'A professional check-in system gives guests timely instructions while keeping identity, property, reservation, and access information organized.',
      ]),
      section('Core Workflow', [], [
        'Confirm reservation details',
        'Collect required guest information securely',
        'Send scheduled arrival instructions',
        'Provide property-specific access guidance',
        'Maintain a clear support path',
      ]),
      section('Reliable Without Unnecessary Complexity', [
        'A well-designed workflow can combine forms, email, calendars, and simple automation without forcing every operation into an expensive PMS connection.',
      ]),
    ],
    links: [
      { href: '/insights/api-costs', label: 'Compare PMS and API costs' },
      { href: '/contact', label: 'Ask IPM about guest operations' },
      { href: '/insights', label: 'Back to IPM Insights' },
    ],
  },
};

const renderSections = (sections) => sections.map(({ heading, paragraphs, items }) => `
    <section style="padding:1.75rem 0;border-top:1px solid rgba(212,175,55,.24)">
      <h2 style="margin:0 0 .85rem;font-family:'Playfair Display',Georgia,serif;font-size:1.75rem;line-height:1.2">${escapeHtml(heading)}</h2>
      ${paragraphs.map((paragraph) => `<p style="max-width:58rem;margin:.6rem 0;color:#C9D2DE;line-height:1.75">${escapeHtml(paragraph)}</p>`).join('')}
      ${items.length ? `<ul style="margin:.85rem 0 0;padding-left:1.25rem;color:#E5E7EB;line-height:1.8">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    </section>`).join('');

const renderImages = (images) => images.length ? `
    <section aria-label="Page images" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;padding:1.75rem 0;border-top:1px solid rgba(212,175,55,.24)">
      ${images.map((image) => `<img src="${safeUrl(image.src)}" alt="${escapeHtml(image.alt)}" width="640" height="420" loading="lazy" style="display:block;width:100%;height:auto;border-radius:.75rem" />`).join('')}
    </section>` : '';

const renderLinks = (links) => links.length ? `
    <nav aria-label="Related IPM pages" style="padding:1.75rem 0;border-top:1px solid rgba(212,175,55,.24)">
      <h2 style="margin:0 0 1rem;font-family:'Playfair Display',Georgia,serif;font-size:1.6rem">Continue exploring IPM</h2>
      <ul style="display:flex;flex-wrap:wrap;gap:.75rem;margin:0;padding:0;list-style:none">
        ${links.map((link) => `<li><a href="${safeUrl(link.href)}" style="display:inline-block;padding:.7rem 1rem;border:1px solid #D4AF37;border-radius:999px;color:#F2D98D;text-decoration:none">${escapeHtml(link.label)}</a></li>`).join('')}
      </ul>
    </nav>` : '';

const propertyContent = (property) => {
  const details = [
    property.location,
    property.guests ? `Sleeps up to ${property.guests} guests` : '',
    property.bedrooms ? `${property.bedrooms} bedrooms` : '',
    property.bathrooms ? `${property.bathrooms} bathrooms` : '',
  ].filter(Boolean);
  const images = (property.images || [])
    .filter((image) => image?.url)
    .slice(0, 6)
    .map((image) => ({ src: image.url, alt: image.caption || property.name }));
  return {
    sections: [
      section('About This Stay', [
        property.description || `A professionally managed IPM vacation rental${property.location ? ` in ${property.location}` : ''}.`,
      ], details),
      ...(property.amenities?.length ? [section('Property Amenities', [], property.amenities.slice(0, 24))] : []),
      section('Live Availability and Direct Booking', [
        'Use the interactive booking calendar to select available check-in and check-out dates, receive a live Hostaway price, and continue to secure hosted payment.',
      ]),
    ],
    images,
    links: [
      { href: '/properties', label: 'View all vacation rentals' },
      { href: '/contact', label: 'Ask IPM about this property' },
    ],
  };
};

const realEstateContent = (listing) => ({
  sections: [
    section('Property Overview', [
      listing.description,
      `${listing.status} opportunity in ${listing.location}, listed from $${Number(listing.price || 0).toLocaleString('en-US')} USD.`,
    ], listing.features || []),
    ...(listing.details ? [section('Residence Details', [], [
      listing.details.bedrooms ? `${listing.details.bedrooms} bedrooms` : '',
      listing.details.bathrooms ? `${listing.details.bathrooms} bathrooms` : '',
      listing.details.sqft ? `${listing.details.sqft} square feet` : '',
      ...(listing.details.amenities || []),
    ].filter(Boolean))] : []),
    section('Investment and Management Support', [
      'Contact IPM for current availability, purchase guidance, rental-potential information, and ongoing property management options.',
    ]),
  ],
  images: [listing.image, ...(listing.gallery || [])]
    .filter(Boolean)
    .slice(0, 6)
    .map((src, index) => ({ src, alt: `${listing.title}${index ? ` gallery image ${index + 1}` : ` in ${listing.location}`}` })),
  links: [
    { href: '/real-estate', label: 'View all real estate listings' },
    { href: '/contact', label: `Ask about ${listing.title}` },
    { href: '/services', label: 'Explore property management services' },
  ],
});

const propertyCards = (properties = []) => properties
  .filter((property) => property?.slug && property?.name)
  .slice(0, 24)
  .map((property) => ({
    heading: property.name,
    paragraphs: [
      [property.location, property.guests ? `Up to ${property.guests} guests` : ''].filter(Boolean).join(' · '),
    ].filter(Boolean),
    items: [],
    link: { href: `/properties/${property.slug}`, label: `View ${property.name}` },
    image: property.images?.[0]?.url || property.thumbnailUrl,
  }));

export const createSeoRouteContent = (pathname, metadata, options = {}) => {
  let content = STATIC_ROUTE_CONTENT[pathname];
  if (options.property) content = propertyContent(options.property);
  if (options.realEstateListing) content = realEstateContent(options.realEstateListing);

  const listingCards = pathname === '/properties' ? propertyCards(options.properties) : [];
  const realEstateCards = pathname === '/real-estate'
    ? REAL_ESTATE_SCHEMA_LISTINGS.map((listing) => ({
        heading: listing.title,
        paragraphs: [listing.description, `${listing.location} · From $${listing.price.toLocaleString('en-US')} USD`],
        items: listing.features,
        link: { href: `/real-estate/${listing.slug}`, label: `View ${listing.title}` },
        image: listing.cardImage || listing.image,
      }))
    : [];
  const cards = [...listingCards, ...realEstateCards];

  const resolved = content || {
    sections: [section(metadata.h1, [metadata.intro])],
    links: [{ href: '/', label: 'Return to IPM home' }],
  };
  const cardMarkup = cards.length ? `
    <section aria-label="${pathname === '/properties' ? 'Vacation rental listings' : 'Real estate listings'}" style="padding:1.75rem 0;border-top:1px solid rgba(212,175,55,.24)">
      <h2 style="margin:0 0 1rem;font-family:'Playfair Display',Georgia,serif;font-size:1.75rem">${pathname === '/properties' ? 'Live Property Portfolio' : 'Featured Investment Properties'}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem">
        ${cards.map((card) => `<article style="padding:1rem;border:1px solid rgba(212,175,55,.24);border-radius:.75rem">
          ${card.image ? `<img src="${safeUrl(card.image)}" alt="${escapeHtml(card.heading)}" width="640" height="420" loading="lazy" style="display:block;width:100%;height:auto;border-radius:.5rem" />` : ''}
          <h3 style="margin:1rem 0 .5rem;font-size:1.25rem">${escapeHtml(card.heading)}</h3>
          ${card.paragraphs.map((paragraph) => `<p style="color:#C9D2DE;line-height:1.6">${escapeHtml(paragraph)}</p>`).join('')}
          ${card.items.length ? `<ul style="padding-left:1.2rem;color:#E5E7EB">${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
          <a href="${safeUrl(card.link.href)}" style="color:#F2D98D">${escapeHtml(card.link.label)}</a>
        </article>`).join('')}
      </div>
    </section>` : '';

  return `${renderSections(resolved.sections || [])}${cardMarkup}${renderImages(resolved.images || [])}${renderLinks(resolved.links || [])}`;
};