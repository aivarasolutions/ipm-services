import { createSeoRouteContent } from './seoContent.js';
import { OWNER_FAQ_CONTENT } from './ownerFaq.js';

export const SITE_URL = 'https://www.ipm.services';

const staticSeoRoutes = {
  '/full-management': {
    title: '20% Full Property Management | International Property Management',
    description: 'Explore IPM’s 20% full-management plan for vacation rentals, including listing promotion, pricing, guest communication, cleaning coordination, and owner reporting.',
    h1: '20% Full Management',
    intro: 'Professional vacation rental management for owners who want IPM to handle day-to-day operations.',
  },
  '/listing-promotion': {
    title: '10% Listing Promotion | International Property Management',
    description: 'Fill available nights with IPM’s listing promotion: 10% on IPM-generated reservations or an agreed nightly rate, with no setup fee and two months free of subscription.',
    h1: 'Get More Reservations Without Paying Upfront',
    intro: 'IPM helps promote your property across additional booking channels. You only pay when we help generate revenue for you.',
  },
  '/faq': {
    title: 'Property Owner FAQs | International Property Management',
    description: 'Answers to property owners’ questions about IPM’s 10% commission, booking channels, calendar sync, owner portal, setup, and cancellation.',
    h1: OWNER_FAQ_CONTENT.en.title,
    intro: 'Clear answers about listing your property and generating more reservations with IPM.',
  },
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
  '/onboarding': {
    title: 'Client Onboarding | International Property Management',
    description:
      'Submit property details and schedule a client onboarding call with International Property Management.',
    h1: 'Client Onboarding',
    intro:
      'Provide the information IPM needs to prepare your property and coordinate a secure onboarding call.',
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
      'Understand Airbnb’s updated host-paid service fee, what it means for guest prices and your nightly payout, and how to respond.',
    h1: 'Airbnb Fees Explained',
    intro:
      'How the updated host-paid fee affects guest prices and your payout.',
  },
  '/insights/api-costs': {
    title: 'API Connections & Operating Costs | IPM Insights',
    description:
      'Compare PMS and channel-manager subscriptions, automation benefits, and Airbnb host fees without relying on an outdated workaround.',
    h1: 'API Connections & Operating Costs',
    intro:
      'Evaluate your tools for the work they do, not as a fee loophole.',
  },
  '/insights/avoid-fees': {
    title: 'How to Offset Airbnb’s Host Fee | IPM Insights',
    description:
      'See how IPM reviews comparable listings and adjusts your nightly rate to protect your payout under Airbnb’s host-paid fee.',
    h1: 'How to Offset Airbnb’s Host Fee',
    intro:
      'Price for your target payout while staying competitive in your local market.',
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

const localizedSeoRoutes = {
  es: {
    '/full-management': ['Gestión Integral del 20% | IPM', 'Conozca el plan de gestión integral del 20% de IPM: promoción, precios, atención al huésped, coordinación de limpieza e informes para propietarios.', 'Gestión Integral del 20%', 'Gestión profesional de alquileres vacacionales para propietarios que desean delegar las operaciones diarias a IPM.'],
    '/listing-promotion': ['Promoción de Anuncios del 10% | IPM', 'Genere más reservas con IPM: 10% de las reservas generadas por IPM o una tarifa nocturna acordada, sin costo de configuración ni suscripción los primeros dos meses.', 'Consiga Más Reservas Sin Pagar por Adelantado', 'IPM promociona su propiedad en canales de reserva adicionales. Solo paga cuando le ayudamos a generar ingresos.'],
    '/faq': ['Preguntas Frecuentes para Propietarios | IPM', 'Respuestas sobre la comisión del 10%, plataformas de reserva, calendarios, portal de propietarios, activación y cancelación de los servicios de IPM.', OWNER_FAQ_CONTENT.es.title, 'Respuestas claras sobre cómo publicar su propiedad y generar más reservaciones con IPM.'],
    '/': ['IPM | Gestión Internacional de Propiedades y Alquileres Vacacionales', 'Gestión profesional de alquileres vacacionales para propietarios en Playa del Carmen, Tulum, Lake Norman y otros destinos.', 'Más Reservas. Menos Vacantes.', 'Gestión profesional y promoción multiplataforma para aumentar sus ingresos con menos trabajo.'],
    '/about': ['Acerca de IPM | Gestión Internacional de Propiedades', 'Conozca cómo IPM combina experiencia local, estándares globales y sistemas profesionales de hospitalidad.', 'Acerca de IPM', 'Ayudamos a propietarios a maximizar resultados y ofrecer experiencias consistentes a sus huéspedes.'],
    '/services': ['Servicios de Gestión de Alquileres Vacacionales | IPM', 'Explore la gestión integral, optimización de ingresos, atención al huésped y promoción multiplataforma de IPM.', 'Nuestros Servicios', 'Servicios integrales diseñados para maximizar el potencial de su propiedad y su tranquilidad.'],
    '/properties': ['Alquileres Vacacionales de Lujo | Propiedades IPM', 'Explore alquileres vacacionales gestionados por IPM, consulte disponibilidad y reserve directamente.', 'Nuestras Propiedades', 'Descubra alquileres vacacionales gestionados profesionalmente en destinos privilegiados.'],
    '/real-estate': ['Propiedades de Inversión de Lujo | IPM', 'Explore oportunidades inmobiliarias seleccionadas en Playa del Carmen y el Caribe Mexicano.', 'Propiedades de Lujo', 'Residencias excepcionales y oportunidades de inversión en ubicaciones deseadas.'],
    '/insights': ['Guías para Anfitriones de Alquileres Vacacionales | IPM', 'Lea guías prácticas sobre tarifas, automatización y operaciones rentables de alquileres vacacionales.', 'IPM Insights', 'Conocimiento experto, orientación transparente y estrategias profesionales para anfitriones.'],
    '/news': ['Noticias del Mercado de Rentas Vacacionales | IPM', 'Actualizaciones sobre ocupación, precios, regulación y hospitalidad en Quintana Roo.', 'Noticias del Mercado de Rentas Vacacionales', 'Últimas noticias del mercado de rentas vacacionales y hotelería en Quintana Roo.'],
    '/contact': ['Contacte a IPM | Consulta de Gestión de Propiedades', 'Contacte a IPM para gestión de alquileres, evaluación de propiedades, reservas y consultas.', 'Contáctenos', 'Hable con nuestro equipo para obtener soluciones personalizadas de gestión de propiedades.'],
    '/onboarding': ['Incorporación de Cliente | International Property Management', 'Envíe los datos de su propiedad y programe una llamada de incorporación con International Property Management.', 'Incorporación de Cliente', 'Proporcione la información necesaria para preparar su propiedad y coordinar una incorporación segura.'],
  },
  fr: {
    '/': ['IPM | Gestion Internationale de Propriétés et Locations de Vacances', 'Gestion professionnelle de locations de vacances pour les propriétaires à Playa del Carmen, Tulum, Lake Norman et ailleurs.', 'Plus de Réservations. Moins de Vacance.', 'Gestion professionnelle et promotion multiplateforme pour augmenter vos revenus avec moins de travail.'],
    '/about': ['À propos d’IPM | Gestion Internationale de Propriétés', 'Découvrez comment IPM associe expertise locale, standards mondiaux et systèmes professionnels d’hospitalité.', 'À propos d’IPM', 'Nous aidons les propriétaires à maximiser leurs résultats et à offrir des expériences fiables.'],
    '/services': ['Services de Gestion de Locations de Vacances | IPM', 'Découvrez la gestion complète, l’optimisation des revenus, le service client et la diffusion multiplateforme d’IPM.', 'Nos Services', 'Des services complets conçus pour maximiser le potentiel de votre propriété et votre tranquillité.'],
    '/properties': ['Locations de Vacances de Luxe | Propriétés IPM', 'Découvrez les locations gérées par IPM, consultez les disponibilités et réservez directement.', 'Nos Propriétés', 'Découvrez des locations de vacances gérées professionnellement dans des destinations privilégiées.'],
    '/real-estate': ['Propriétés d’Investissement de Luxe | IPM', 'Découvrez des opportunités immobilières sélectionnées à Playa del Carmen et dans les Caraïbes mexicaines.', 'Propriétés de Luxe', 'Résidences exceptionnelles et opportunités d’investissement dans des lieux recherchés.'],
    '/insights': ['Conseils pour Hôtes de Locations de Vacances | IPM', 'Lisez des guides pratiques sur les frais, l’automatisation et les opérations rentables.', 'IPM Insights', 'Expertise, conseils transparents et stratégies professionnelles pour les propriétaires.'],
    '/news': ['Actualités du Marché des Locations de Vacances | IPM', 'Actualités sur l’occupation, les prix, la réglementation et l’hospitalité au Quintana Roo.', 'Actualités du Marché des Locations de Vacances', 'Dernières nouvelles du marché des locations de vacances et de l’hôtellerie au Quintana Roo.'],
    '/contact': ['Contacter IPM | Consultation en Gestion de Propriétés', 'Contactez IPM pour la gestion locative, l’évaluation, les réservations et les consultations.', 'Nous Contacter', 'Échangez avec notre équipe pour des solutions personnalisées de gestion de propriétés.'],
  },
  vi: {
    '/vietnam': ['Quản Lý Bất Động Sản Đà Nẵng | Quản Lý Căn Hộ Cho Thuê Việt Nam | IPM', 'IPM cung cấp dịch vụ quản lý Airbnb và cho thuê ngắn hạn chuyên nghiệp tại Đà Nẵng, Việt Nam.', 'Quản Lý Bất Động Sản tại Đà Nẵng, Việt Nam', 'Quản lý căn hộ cho thuê, quảng bá đa nền tảng và hỗ trợ chủ sở hữu tại Việt Nam.'],
    '/onboarding': ['Đăng Ký Dịch Vụ Cho Chủ Nhà | IPM', 'Gửi thông tin chỗ nghỉ, xem điều khoản Quảng Bá Chỗ Nghỉ và đặt lịch trao đổi với IPM.', 'Đăng Ký Dịch Vụ Cho Chủ Nhà', 'Chuẩn bị chỗ nghỉ và phối hợp cấp quyền truy cập Airbnb an toàn cùng IPM.'],
  },
};

export const LOCALIZED_ROUTE_PATHS = Object.freeze({
  es: Object.keys(localizedSeoRoutes.es),
  fr: Object.keys(localizedSeoRoutes.fr),
  vi: Object.keys(localizedSeoRoutes.vi),
});

const localizedMetadata = Object.fromEntries(
  Object.entries(localizedSeoRoutes).map(([locale, routes]) => [
    locale,
    Object.fromEntries(Object.entries(routes).map(([path, [title, description, h1, intro]]) => [
      path,
      { title, description, h1, intro },
    ])),
  ]),
);

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

export const getLocaleRouteInfo = (pathname = '/') => {
  const normalized = normalizePathname(pathname);
  const match = normalized.match(/^\/(es|fr|vi)(\/.*|$)/);
  if (!match) return { locale: 'en', routePath: normalized, localized: false };
  const routePath = normalizePathname(match[2] || '/');
  const locale = match[1];
  return {
    locale,
    routePath,
    localized: Boolean(localizedMetadata[locale]?.[routePath]),
  };
};

export const localizeRoutePath = (routePath, locale = 'en') =>
  locale === 'en' ? normalizePathname(routePath) : `/${locale}${normalizePathname(routePath) === '/' ? '' : normalizePathname(routePath)}`;

const getAlternates = (routePath) => {
  const locales = ['es', 'fr', 'vi'].filter((locale) => localizedMetadata[locale]?.[routePath]);
  if (!locales.length) return [];
  return [
    { hreflang: 'en', href: `${SITE_URL}${routePath === '/' ? '/' : routePath}` },
    ...locales.map((locale) => ({ hreflang: locale, href: `${SITE_URL}${localizeRoutePath(routePath, locale)}` })),
    { hreflang: 'x-default', href: `${SITE_URL}${routePath === '/' ? '/' : routePath}` },
  ];
};

const humanizeSlug = (slug) =>
  decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const getSeoMetadata = (pathname, options = {}) => {
  const path = normalizePathname(pathname);
  const { locale, routePath, localized } = getLocaleRouteInfo(path);
  if (locale !== 'en' && !localized) return null;
  const exact = locale === 'en'
    ? INDEXABLE_SEO_ROUTES[routePath]
    : localizedMetadata[locale]?.[routePath];
  if (exact) {
    return {
      ...exact,
      canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
      indexable: true,
      locale,
      routePath,
      alternates: getAlternates(routePath),
    };
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

  // The source-visible homepage must look like the homepage before React takes
  // over. The generic text-only SEO shell caused a conspicuous first-paint flash.
  if (metadata.routePath === '/' || normalizePathname(pathname) === '/') {
    const locale = metadata.locale || 'en';
    const home = {
      en: {
        first: 'More Bookings.', second: 'Less Vacancy.',
        intro: 'Get your property listed where travelers are searching. IPM promotes your home across every major booking platform and manages the details — so you earn more with less work.',
        benefits: ['More Exposure', 'More Reservations', 'Higher Occupancy', 'Calendar Sync', 'No Double Bookings'],
        cta: 'Get Listed Worldwide', secondary: 'Request Full Management',
        note: '10% on IPM-generated reservations, or an agreed nightly rate',
      },
      es: {
        first: 'Más Reservas.', second: 'Menos Vacantes.',
        intro: 'Publique su propiedad donde los viajeros están buscando. IPM la promueve en todas las plataformas principales y gestiona los detalles — gana más con menos trabajo.',
        benefits: ['Más Exposición', 'Más Reservas', 'Mayor Ocupación', 'Sincronización', 'Sin Dobles Reservas'],
        cta: 'Publique su Propiedad', secondary: 'Solicitar Gestión Completa',
        note: '10% sobre reservas generadas por IPM, o tarifa nocturna acordada',
      },
      fr: {
        first: 'Plus de Réservations.', second: 'Moins de Vacances.',
        intro: 'Référencez votre propriété là où les voyageurs cherchent. IPM la promeut sur toutes les grandes plateformes et gère les détails — gagnez plus avec moins d’effort.',
        benefits: ['Plus de Visibilité', 'Plus de Réservations', 'Meilleure Occupation', 'Synchronisation', 'Pas de Doubles Réservations'],
        cta: 'Référencer ma Propriété', secondary: 'Demander la Gestion Complète',
        note: '10 % sur les réservations générées par IPM, ou tarif par nuit convenu',
      },
    }[locale] || null;
    if (home) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
       return `<main class="seo-route-shell seo-home-shell" style="background:#06121F;color:#fff;font-family:Montserrat,system-ui,sans-serif">
<style>
.seo-route-shell{margin:0}.seo-route-shell *{box-sizing:border-box}
.seo-route-shell .seo-nav{height:64px;background:#0A1A30;border-bottom:1px solid #d4af3733;display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,calc((100vw - 1280px)/2))}
.seo-route-shell .seo-nav img{width:48px;height:48px;object-fit:contain}
.seo-route-shell .seo-nav-links{display:flex;gap:20px;align-items:center}
.seo-route-shell a{color:inherit;text-decoration:none}
.seo-route-shell .seo-nav-links a{font-size:13px;font-weight:600}
.seo-route-shell .seo-hero{min-height:92vh;display:flex;align-items:center;background:linear-gradient(0deg,#06121F,transparent 52%,#06121F66),linear-gradient(90deg,#06121F,#06121Feb 50%,#06121F4d),url('/luxury_beachfront_resort-optimized.webp') center/cover}
.seo-route-shell .seo-hero-inner{width:100%;max-width:1280px;margin:auto;padding:112px 48px}
.seo-route-shell .seo-hero-copy{max-width:760px}
.seo-route-shell .seo-eyebrow{display:inline-block;border:1px solid #d4af3766;border-radius:99px;background:#d4af371a;padding:8px 16px;color:#F2D98D;font-size:12px;font-weight:700;letter-spacing:.17em;text-transform:uppercase}
.seo-route-shell h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,6vw,72px);line-height:1.12;margin:24px 0;font-weight:800}
.seo-route-shell h1 span{display:block;color:#F2D98D}
.seo-route-shell .seo-intro{font-size:18px;line-height:1.65;color:#C9D2DE;max-width:670px;margin:0 0 28px}
.seo-route-shell .seo-pills,.seo-route-shell .seo-benefits,.seo-route-shell .seo-actions{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:26px}
.seo-route-shell .seo-pills span{border:1px solid #d4af3788;border-radius:99px;background:#0a1a3088;padding:8px 14px;font-size:13px}
.seo-route-shell .seo-benefits span{font-size:13px;font-weight:600;margin-right:10px}.seo-route-shell .seo-benefits span::before{content:'✓';color:#D4AF37;margin-right:8px}
.seo-route-shell .seo-actions a{border-radius:6px;padding:13px 25px;font-size:16px;font-weight:700}
.seo-route-shell .seo-actions a:first-child{background:#D4AF37;color:#06121F}.seo-route-shell .seo-actions a:last-child{border:2px solid #d4af3788;background:#ffffff0d}
.seo-route-shell .seo-note{color:#F2D98D;font-size:14px;font-weight:600;margin:30px 0 0}
.seo-route-shell .seo-content{max-width:72rem;margin:0 auto;padding:3rem 1.5rem 5rem}
@media(max-width:767px){.seo-route-shell .seo-nav-links{display:none}.seo-route-shell .seo-hero-inner{padding:80px 24px}.seo-route-shell .seo-hero{background-position:center}.seo-route-shell .seo-actions{flex-direction:column}.seo-route-shell .seo-actions a{text-align:center}.seo-route-shell .seo-intro{font-size:18px}}
</style>
<div class="seo-nav"><a href="${prefix || '/'}"><img src="/images/ipm-logo-new-optimized.webp" width="48" height="48" alt="IPM International Property Management"></a><nav class="seo-nav-links"><a href="${prefix}/services">Services</a><a href="${prefix}/properties">Properties</a><a href="${prefix}/real-estate">Real Estate</a><a href="${prefix}/insights">Insights</a><a href="${prefix}/contact">Contact</a></nav></div>
<header class="seo-hero"><div class="seo-hero-inner"><div class="seo-hero-copy">
<div class="seo-eyebrow">International Property Management</div>
<h1>${escape(home.first)}<span>${escape(home.second)}</span></h1>
<p class="seo-intro">${escape(home.intro)}</p>
<div class="seo-pills">${['Airbnb', 'Booking.com', 'Vrbo', 'Expedia', 'Google'].map((name) => `<span>${name}</span>`).join('')}</div>
<div class="seo-benefits">${home.benefits.map((label) => `<span>${escape(label)}</span>`).join('')}</div>
<div class="seo-actions"><a href="${prefix}/contact">${escape(home.cta)}</a><a href="${prefix}/contact">${escape(home.secondary)}</a></div>
<p class="seo-note">${escape(home.note)}</p>
</div></div></header>
<div class="seo-content">${createSeoRouteContent('/', metadata, { ...options, locale })}</div>
</main>`;
    }
  }

  return `<main class="seo-route-shell" style="box-sizing:border-box;max-width:72rem;margin:0 auto;padding:3rem 1.5rem 5rem;font-family:Montserrat,Arial,sans-serif;background:#06121F;color:#fff">
  <header style="padding:2rem 0 2.5rem">
    <p style="margin:0 0 1rem;color:#F2D98D;font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase">International Property Management</p>
    <h1 style="margin:0 0 1.25rem;font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.25rem,6vw,4.5rem);line-height:1.1">${escape(metadata.h1)}</h1>
    <p style="max-width:52rem;margin:0;color:#C9D2DE;font-size:1.2rem;line-height:1.7">${escape(metadata.intro)}</p>
  </header>
  ${createSeoRouteContent(metadata.routePath || normalizePathname(pathname), metadata, { ...options, locale: metadata.locale || 'en' })}
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
  output = upsertMeta(output, 'property', 'og:locale', {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    vi: 'vi_VN',
  }[metadata.locale || 'en']);
  output = upsertMeta(output, 'name', 'twitter:url', metadata.canonical);
  output = upsertMeta(output, 'name', 'twitter:title', metadata.title);
  output = upsertMeta(output, 'name', 'twitter:description', metadata.description);

  const canonicalTag = `<link rel="canonical" href="${escapeAttribute(metadata.canonical)}" />`;
  output = /<link\s+rel="canonical"[^>]*>/i.test(output)
    ? output.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag)
    : output.replace('</head>', `    ${canonicalTag}\n  </head>`);

  output = output.replace(/\s*<link[^>]*data-seo-alternate[^>]*>/gi, '');
  const alternateTags = (metadata.alternates || [])
    .map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${escapeAttribute(href)}" data-seo-alternate />`)
    .join('\n    ');
  if (alternateTags) output = output.replace('</head>', `    ${alternateTags}\n  </head>`);
  output = output.replace(/<html\b[^>]*\blang=["'][^"']*["']/i, `<html lang="${metadata.locale || 'en'}"`);
  if (metadata.routePath === '/') {
    output = output.replace('</head>', '    <link rel="preload" as="image" href="/luxury_beachfront_resort-optimized.webp" fetchpriority="high" />\n  </head>');
  }

  // Build output may already contain a nested SEO route shell (the homepage
  // document is also the production fallback source). Match the complete
  // known shell rather than stopping at the first nested closing div.
  const rootPattern =
    /<div id="root">(?:\s*<main class="seo-route-shell(?:\s[^"]*)?"[\s\S]*?<\/main>\s*)?<\/div>/i;
  output = rootPattern.test(output)
    ? output.replace(rootPattern, `<div id="root">${createSeoShell(metadata, path, options)}</div>`)
    : output;
  return output;
};

export const getIndexableRoutePaths = () => [
  ...Object.keys(INDEXABLE_SEO_ROUTES),
  ...Object.entries(LOCALIZED_ROUTE_PATHS).flatMap(([locale, paths]) =>
    paths.map((path) => localizeRoutePath(path, locale))),
];

export const getRealEstateSeoMetadata = (pathname, listing) =>
  getSeoMetadata(pathname, { realEstateListing: listing });

export const getDynamicPropertySeoMetadata = (pathname, property) =>
  getSeoMetadata(pathname, { property });

export const getPropertySlugFromPath = (pathname) => {
  const match = getLocaleRouteInfo(pathname).routePath.match(/^\/properties\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const getRealEstateSlugFromPath = (pathname) => {
  const match = getLocaleRouteInfo(pathname).routePath.match(/^\/real-estate\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export { humanizeSlug };