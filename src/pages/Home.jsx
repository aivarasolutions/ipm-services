import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Building2, TrendingUp, Shield, DollarSign,
  BarChart3, Globe, Calendar, Zap, HeartHandshake,
  CheckCircle, ArrowRight, Check
} from 'lucide-react'

/* ── Platform list (logos in /public/images/platforms) ─────── */
const PLATFORMS = [
  { name: 'Airbnb',      logo: '/images/platforms/airbnb.svg' },
  { name: 'Booking.com', logo: '/images/platforms/booking.svg' },
  { name: 'VRBO',        logo: null },
  { name: 'Expedia',     logo: '/images/platforms/expedia.svg' },
  { name: 'Hotels.com',  logo: '/images/platforms/hotels.svg' },
  { name: 'Google',      logo: '/images/platforms/google.svg' },
]

/* ── Gold crown ornament ───────────────────────────────────── */
const Crown = ({ className = '' }) => (
  <svg viewBox="0 0 24 18" className={className} fill="currentColor" aria-hidden="true">
    <path d="M2 16h20l-1.6-9-5 4L12 3 8.6 11l-5-4L2 16z" />
  </svg>
)

/* ── Airbnb Embed ──────────────────────────────────────────── */
const AirbnbWidget = ({ id, href, description }) => (
  <div
    className="airbnb-embed-frame"
    data-id={id}
    data-view="home"
    data-hide-price="true"
    style={{ width: '450px', height: '300px', margin: 'auto' }}
  >
    <a href={href} rel="nofollow noopener noreferrer" target="_blank">View On Airbnb</a>
    <a href={href} rel="nofollow noopener noreferrer" target="_blank">{description}</a>
  </div>
)

const AirbnbSection = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.airbnb.com/embeddable/airbnb_jssdk'
    script.async = true
    document.body.appendChild(script)
    return () => {
      const s = document.querySelector('script[src="https://www.airbnb.com/embeddable/airbnb_jssdk"]')
      if (s) s.remove()
    }
  }, [])

  const properties = [
    { id: '1347342374342049672', href: 'https://www.airbnb.com/rooms/1347342374342049672?guests=1&adults=1&s=66&source=embed_widget', description: 'Home in Mooresville · ★4.79 · 3 bedrooms · 5 beds · 3 baths' },
    { id: '1471379203731591914', href: 'https://www.airbnb.com/rooms/1471379203731591914?guests=1&adults=1&s=66&source=embed_widget', description: 'Villa in Playa del Carmen · ★5.0 · 2 bedrooms · 2 beds · 2 baths' },
    { id: '797383249287358281',  href: 'https://www.airbnb.com/rooms/797383249287358281?guests=1&adults=1&s=66&source=embed_widget',  description: 'Rental unit in Playa del Carmen · ★4.75 · 3 bedrooms · 6 beds · 3 baths' },
    { id: '1360603145357884662', href: 'https://www.airbnb.com/rooms/1360603145357884662?guests=1&adults=1&s=66&source=embed_widget', description: 'Treehouse in Playa del Carmen · ★5.0 · 1 bedroom · 3 beds · 1 bath' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {properties.map(p => (
        <div key={p.id} className="flex justify-center rounded-xl overflow-hidden border border-slate-200 shadow-md">
          <AirbnbWidget {...p} />
        </div>
      ))}
    </div>
  )
}

/* ── Main component ────────────────────────────────────────── */
const Home = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      heroLine1:       'More Bookings.',
      heroLine2:       'Less Vacancy.',
      heroSub:         'Get your property listed where travelers are searching. IPM promotes your home across every major booking platform and manages the details — so you earn more with less work.',
      heroBullets:     ['More Exposure', 'More Reservations', 'Higher Occupancy', 'Calendar Sync', 'No Double Bookings'],
      cta1:            'Get Listed Worldwide',
      cta2:            'Request Full Management',
      commissionNote:  'Only 10% Commission',
      statsLabel:      ['Properties Managed', 'Average Occupancy', 'Years Experience', 'Owner Support'],
      statsNum:        ['30+', '75–85%', '10+', '24/7'],
      platformHeading: 'Global Exposure for Your Property',
      platformSub:     'We list and promote your property across every major booking platform — one setup, maximum reach.',
      platformTag:     'More Exposure · More Reservations · Higher Occupancy · No Double Bookings',
      pricingHeading:  'Simple, Transparent Pricing',
      pricingSub:      'Two ways to work with IPM — choose the level of support that fits your needs.',
      plan1Title:      'Multi-Platform Listing Promotion',
      plan1Price:      '10%',
      plan1Unit:       'commission only',
      plan1Features:   [
        'Listed on Airbnb, Booking.com, VRBO & more',
        'Calendar sync & no double bookings',
        'Professional listing creation',
        'Photo uploads & rate setup',
        'Platform integration & optimization',
        'Higher occupancy potential',
      ],
      plan1Cta:        'Get Listed Now',
      plan2Title:      'Full Property Management',
      plan2Price:      '20%',
      plan2Unit:       'commission + monthly fee',
      plan2Features:   [
        'Everything in Listing Promotion',
        'Guest communication & check-in coordination',
        'Cleaning & maintenance coordination',
        'Revenue optimization strategy',
        'Owner support & monthly reporting',
        'Multi-platform management & updates',
      ],
      plan2Cta:        'Request Management',
      plan2Badge:      'Most Popular',
      servicesHeading: 'What We Handle For You',
      servicesSub:     'From listing setup to guest checkout — we manage every detail so you don\'t have to.',
      services: [
        { title: 'Multi-Platform Listing',    desc: 'Your property promoted on Airbnb, Booking.com, VRBO, Expedia, Hotels.com, and Google Vacation Rentals from day one.' },
        { title: 'Revenue Optimization',      desc: 'Dynamic pricing, seasonal rate strategy, and occupancy analytics to maximize your monthly payout.' },
        { title: 'Guest Verification',        desc: 'We screen every reservation to verify guests, reduce chargebacks, and protect your property.' },
        { title: 'Owner Dashboard & Reports', desc: 'Real-time visibility into your bookings, revenue, and occupancy — available anytime via the owner portal.' },
      ],
      benefitsHeading: 'Why Owners Choose IPM',
      benefitsSub:     'Stop relying on a single platform. IPM gives your property global reach and professional management.',
      benefits: [
        { icon: Globe,          label: 'More Booking Channels' },
        { icon: TrendingUp,     label: 'Higher Occupancy Potential' },
        { icon: Calendar,       label: 'Calendar Sync' },
        { icon: Shield,         label: 'Guest Verification' },
        { icon: DollarSign,     label: 'Revenue Optimization' },
        { icon: BarChart3,      label: 'Monthly Reporting' },
        { icon: HeartHandshake, label: 'Dedicated Owner Support' },
        { icon: Zap,            label: 'Fast Platform Setup' },
      ],
      featuredHeading: 'Featured Properties',
      featuredSub:     'A selection of vacation rentals managed and promoted by IPM across Airbnb.',
      ctaHeading:      'Turn Vacancy Into Revenue',
      ctaSub:          'Join 30+ property owners who trust IPM to fill their calendars, protect their properties, and grow their rental income.',
      ctaBtn1:         'Schedule a Free Consultation',
      ctaBtn2:         'Get a Property Evaluation',
    },
    es: {
      heroLine1:       'Más Reservas.',
      heroLine2:       'Menos Vacantes.',
      heroSub:         'Publique su propiedad donde los viajeros están buscando. IPM la promueve en todas las plataformas principales y gestiona los detalles — gana más con menos trabajo.',
      heroBullets:     ['Más Exposición', 'Más Reservas', 'Mayor Ocupación', 'Sincronización', 'Sin Dobles Reservas'],
      cta1:            'Publique su Propiedad',
      cta2:            'Solicitar Gestión Completa',
      commissionNote:  'Solo 10% de Comisión',
      statsLabel:      ['Propiedades Gestionadas', 'Ocupación Promedio', 'Años de Experiencia', 'Soporte al Propietario'],
      statsNum:        ['30+', '75–85%', '10+', '24/7'],
      platformHeading: 'Exposición Global para su Propiedad',
      platformSub:     'Publicamos y promovemos su propiedad en todas las plataformas principales de reservas.',
      platformTag:     'Más Exposición · Más Reservas · Mayor Ocupación · Sin Dobles Reservas',
      pricingHeading:  'Precios Simples y Transparentes',
      pricingSub:      'Dos formas de trabajar con IPM — elija el nivel de servicio que necesita.',
      plan1Title:      'Promoción Multi-Plataforma',
      plan1Price:      '10%',
      plan1Unit:       'solo comisión',
      plan1Features:   [
        'Listado en Airbnb, Booking.com, VRBO y más',
        'Sincronización de calendario sin dobles reservas',
        'Creación profesional de anuncio',
        'Carga de fotos y configuración de tarifas',
        'Integración y optimización de plataformas',
        'Mayor potencial de ocupación',
      ],
      plan1Cta:        'Publicar Ahora',
      plan2Title:      'Gestión Completa de Propiedad',
      plan2Price:      '20%',
      plan2Unit:       'comisión + cuota mensual',
      plan2Features:   [
        'Todo lo incluido en Promoción',
        'Comunicación con huéspedes y coordinación de check-in',
        'Coordinación de limpieza y mantenimiento',
        'Estrategia de optimización de ingresos',
        'Soporte al propietario e informes mensuales',
        'Gestión y actualizaciones multi-plataforma',
      ],
      plan2Cta:        'Solicitar Gestión',
      plan2Badge:      'Más Popular',
      servicesHeading: 'Lo Que Manejamos Por Usted',
      servicesSub:     'Desde la configuración del anuncio hasta el check-out del huésped.',
      services: [
        { title: 'Listado Multi-Plataforma',         desc: 'Su propiedad promovida en Airbnb, Booking.com, VRBO, Expedia, Hotels.com y Google.' },
        { title: 'Optimización de Ingresos',         desc: 'Precios dinámicos, estrategia estacional y analíticas de ocupación.' },
        { title: 'Verificación de Huéspedes',        desc: 'Revisamos cada reserva para verificar huéspedes y proteger su propiedad.' },
        { title: 'Panel y Reportes del Propietario', desc: 'Visibilidad en tiempo real de reservas, ingresos y ocupación.' },
      ],
      benefitsHeading: 'Por Qué los Propietarios Eligen IPM',
      benefitsSub:     'Deje de depender de una sola plataforma.',
      benefits: [
        { icon: Globe,          label: 'Más Canales de Reserva' },
        { icon: TrendingUp,     label: 'Mayor Potencial de Ocupación' },
        { icon: Calendar,       label: 'Sincronización de Calendario' },
        { icon: Shield,         label: 'Verificación de Huéspedes' },
        { icon: DollarSign,     label: 'Optimización de Ingresos' },
        { icon: BarChart3,      label: 'Informes Mensuales' },
        { icon: HeartHandshake, label: 'Soporte Dedicado' },
        { icon: Zap,            label: 'Configuración Rápida' },
      ],
      featuredHeading: 'Propiedades Destacadas',
      featuredSub:     'Una selección de alquileres vacacionales gestionados por IPM.',
      ctaHeading:      'Convierta Vacantes en Ingresos',
      ctaSub:          'Únase a más de 30 propietarios que confían en IPM para llenar sus calendarios.',
      ctaBtn1:         'Agendar Consulta Gratuita',
      ctaBtn2:         'Evaluación de Propiedad',
    },
    fr: {
      heroLine1:       'Plus de Réservations.',
      heroLine2:       'Moins de Vacances.',
      heroSub:         'Référencez votre propriété là où les voyageurs cherchent. IPM la promeut sur toutes les grandes plateformes et gère les détails — gagnez plus avec moins d\'effort.',
      heroBullets:     ['Plus de Visibilité', 'Plus de Réservations', 'Meilleure Occupation', 'Synchronisation', 'Pas de Doubles Réservations'],
      cta1:            'Référencer ma Propriété',
      cta2:            'Demander la Gestion Complète',
      commissionNote:  'Seulement 10% de Commission',
      statsLabel:      ['Propriétés Gérées', 'Taux d\'Occupation Moyen', 'Années d\'Expérience', 'Support Propriétaire'],
      statsNum:        ['30+', '75–85%', '10+', '24/7'],
      platformHeading: 'Exposition Mondiale pour Votre Propriété',
      platformSub:     'Nous référençons et promouvons votre propriété sur toutes les grandes plateformes.',
      platformTag:     'Plus de Visibilité · Plus de Réservations · Meilleure Occupation · Pas de Doubles Réservations',
      pricingHeading:  'Tarification Simple et Transparente',
      pricingSub:      'Deux façons de travailler avec IPM.',
      plan1Title:      'Promotion Multi-Plateformes',
      plan1Price:      '10%',
      plan1Unit:       'commission uniquement',
      plan1Features:   [
        'Référencé sur Airbnb, Booking.com, VRBO et plus',
        'Synchronisation calendrier, pas de doubles réservations',
        'Création professionnelle d\'annonce',
        'Photos et configuration des tarifs',
        'Intégration et optimisation des plateformes',
        'Potentiel d\'occupation plus élevé',
      ],
      plan1Cta:        'Référencer Maintenant',
      plan2Title:      'Gestion Complète de Propriété',
      plan2Price:      '20%',
      plan2Unit:       'commission + frais mensuels',
      plan2Features:   [
        'Tout inclus dans la Promotion',
        'Communication clients et coordination check-in',
        'Coordination ménage et maintenance',
        'Stratégie d\'optimisation des revenus',
        'Support propriétaire et rapports mensuels',
        'Gestion et mises à jour multi-plateformes',
      ],
      plan2Cta:        'Demander la Gestion',
      plan2Badge:      'Le Plus Populaire',
      servicesHeading: 'Ce Que Nous Gérons Pour Vous',
      servicesSub:     'De la création de l\'annonce au départ du client — nous gérons chaque détail.',
      services: [
        { title: 'Référencement Multi-Plateformes', desc: 'Votre propriété promue sur Airbnb, Booking.com, VRBO, Expedia, Hotels.com et Google.' },
        { title: 'Optimisation des Revenus',         desc: 'Tarification dynamique, stratégie saisonnière et analyses d\'occupation.' },
        { title: 'Vérification des Voyageurs',       desc: 'Nous vérifions chaque réservation pour protéger votre propriété.' },
        { title: 'Tableau de Bord Propriétaire',     desc: 'Visibilité en temps réel de vos réservations, revenus et occupation.' },
      ],
      benefitsHeading: 'Pourquoi les Propriétaires Choisissent IPM',
      benefitsSub:     'Ne dépendez plus d\'une seule plateforme.',
      benefits: [
        { icon: Globe,          label: 'Plus de Canaux de Réservation' },
        { icon: TrendingUp,     label: 'Potentiel d\'Occupation Plus Élevé' },
        { icon: Calendar,       label: 'Synchronisation Calendrier' },
        { icon: Shield,         label: 'Vérification des Voyageurs' },
        { icon: DollarSign,     label: 'Optimisation des Revenus' },
        { icon: BarChart3,      label: 'Rapports Mensuels' },
        { icon: HeartHandshake, label: 'Support Propriétaire Dédié' },
        { icon: Zap,            label: 'Mise en Place Rapide' },
      ],
      featuredHeading: 'Propriétés en Vedette',
      featuredSub:     'Une sélection de locations gérées par IPM sur Airbnb.',
      ctaHeading:      'Transformez les Vacances en Revenus',
      ctaSub:          'Rejoignez 30+ propriétaires qui font confiance à IPM pour remplir leurs calendriers.',
      ctaBtn1:         'Planifier une Consultation Gratuite',
      ctaBtn2:         'Évaluation de Propriété',
    },
  }

  const t = translations[language] || translations.en
  const serviceIcons = [Globe, BarChart3, Shield, Building2]

  return (
    <div className="min-h-screen bg-[#06121F]">

      {/* ── 1. HERO (ad-style, left aligned) ─────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background villa image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/luxury_beachfront_resort.webp')" }}
        />
        {/* Navy gradient — heavy on the left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06121F] via-[#06121F]/92 to-[#06121F]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06121F] via-transparent to-[#06121F]/40" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">
          <div className="max-w-3xl animate-fade-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
              <Crown className="w-4 h-3 text-[#D4AF37]" />
              <span className="text-[#F2D98D] text-xs font-semibold tracking-[0.2em] uppercase">International Property Management</span>
            </div>

            {/* Headline */}
            <h1 className="font-hero text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-6">
              <span className="block text-white">{t.heroLine1}</span>
              <span className="block text-gold-gradient">{t.heroLine2}</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-[#C9D2DE] max-w-2xl leading-relaxed mb-7">
              {t.heroSub}
            </p>

            {/* Platform logo pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {PLATFORMS.map(p => (
                <div key={p.name} className="platform-pill">
                  {p.logo && <img src={p.logo} alt={p.name} loading="lazy" />}
                  <span>{p.name}</span>
                </div>
              ))}
            </div>

            {/* Benefit checks */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-9">
              {t.heroBullets.map(b => (
                <span key={b} className="flex items-center gap-2 text-white text-sm font-medium">
                  <Check className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37] text-[#06121F] font-bold px-8 py-4 text-base rounded-md shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 hover:scale-[1.02]">
                  {t.cta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-white/5 border-2 border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 font-semibold px-8 py-4 text-base rounded-md transition-all duration-200 backdrop-blur-sm">
                  {t.cta2}
                </Button>
              </Link>
            </div>

            {/* Commission line */}
            <div className="mt-9 gold-rule max-w-md">
              <span className="text-[#F2D98D] text-sm font-semibold tracking-wide whitespace-nowrap">
                {t.commissionNote}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────── */}
      <section className="bg-[#0A1A30] border-y border-[#D4AF37]/20 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.statsNum.map((num, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-bold text-gold-gradient mb-2">{num}</div>
                <div className="text-[#C9D2DE] text-sm tracking-wide">{t.statsLabel[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PLATFORM STRIP ────────────────────────────────── */}
      <section className="bg-[#06121F] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t.platformHeading}
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#C9D2DE] text-lg mb-12 max-w-2xl mx-auto">{t.platformSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map(p => (
              <div key={p.name} className="platform-pill !py-3 !px-6">
                {p.logo && <img src={p.logo} alt={p.name} loading="lazy" />}
                <span className="!text-base">{p.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">
            {t.platformTag}
          </p>
        </div>
      </section>

      {/* ── 4. PRICING CARDS ─────────────────────────────────── */}
      <section className="bg-[#0A1A30] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{t.pricingHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#C9D2DE] text-lg max-w-2xl mx-auto">{t.pricingSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="glass-card rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">Listing</p>
                <h3 className="font-display text-2xl font-bold text-white mb-4">{t.plan1Title}</h3>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display text-6xl font-bold text-gold-gradient">{t.plan1Price}</span>
                  <span className="text-[#C9D2DE] mb-2">{t.plan1Unit}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.plan1Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#C9D2DE] text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button className="w-full border-2 border-[#D4AF37]/60 bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06121F] font-bold py-3 rounded-lg transition-all duration-200">
                  {t.plan1Cta}
                </Button>
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="relative rounded-2xl p-8 flex flex-col border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#D4AF37]/12 to-transparent shadow-xl shadow-[#D4AF37]/10">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                {t.plan2Badge}
              </span>
              <div className="mb-6">
                <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">Full Management</p>
                <h3 className="font-display text-2xl font-bold text-white mb-4">{t.plan2Title}</h3>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display text-6xl font-bold text-gold-gradient">{t.plan2Price}</span>
                  <span className="text-[#C9D2DE] mb-2">{t.plan2Unit}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.plan2Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#C9D2DE] text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] hover:from-[#F2D98D] hover:to-[#D4AF37] font-bold py-3 rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 hover:scale-[1.02]">
                  {t.plan2Cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SERVICES ──────────────────────────────────────── */}
      <section className="bg-[#06121F] py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{t.servicesHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#C9D2DE] text-lg max-w-2xl mx-auto">{t.servicesSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.map((svc, i) => {
              const Icon = serviceIcons[i]
              return (
                <div key={i} className="glass-card rounded-xl p-7 flex items-start gap-5 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center group-hover:bg-[#D4AF37]/25 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-[#C9D2DE] text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. OWNER BENEFITS ────────────────────────────────── */}
      <section className="bg-[#0A1A30] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{t.benefitsHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#C9D2DE] text-lg max-w-2xl mx-auto">{t.benefitsSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {t.benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="glass-card rounded-xl p-5 text-center hover:border-[#D4AF37]/50 transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/25 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <p className="text-white text-sm font-medium leading-snug">{b.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED PROPERTIES (light) ───────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A1A30] mb-4">{t.featuredHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t.featuredSub}</p>
          </div>
          <AirbnbSection />
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────── */}
      <section className="relative bg-[#06121F] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-8 h-6 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{t.ctaHeading}</h2>
          <p className="text-xl text-[#C9D2DE] mb-10 max-w-2xl mx-auto leading-relaxed">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] hover:from-[#F2D98D] hover:to-[#D4AF37] font-bold px-10 py-4 text-base rounded-md shadow-lg shadow-[#D4AF37]/25 hover:scale-[1.02] transition-all duration-200">
                {t.ctaBtn1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent border-2 border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 font-semibold px-10 py-4 text-base rounded-md transition-all duration-200">
                {t.ctaBtn2}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
