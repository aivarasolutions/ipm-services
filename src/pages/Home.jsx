import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Building2, TrendingUp, Shield, DollarSign,
  BarChart3, Star, Clock, Users,
  CheckCircle, Globe, Calendar, Award, Zap, HeartHandshake, ArrowRight
} from 'lucide-react'

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
        <div key={p.id} className="flex justify-center rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-lg shadow-black/40">
          <AirbnbWidget {...p} />
        </div>
      ))}
    </div>
  )
}

/* ── Platform badge list ───────────────────────────────────── */
const PLATFORMS = [
  'Airbnb', 'Booking.com', 'VRBO', 'Expedia', 'Hotels.com', 'Google Vacation Rentals'
]

/* ── Main component ────────────────────────────────────────── */
const Home = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      heroHeadline:    'More Bookings.\nLess Vacancy.',
      heroSub:         'IPM helps property owners increase exposure, fill empty dates, and grow revenue through multi-platform listing promotion and full-service vacation rental management.',
      cta1:            'Get Listed Worldwide',
      cta2:            'Request Full Management',
      listingBadge:    'Listing Promotion — Only 10% Commission',
      mgmtBadge:       'Full Management — 20% + Competitive Monthly Fee',
      statsLabel:      ['Properties Managed', 'Average Occupancy', 'Years Experience', '24/7 Support'],
      statsNum:        ['30+', '75–85%', '10+', 'Always'],
      platformHeading: 'Global Exposure for Your Property',
      platformSub:     'We list and promote your property across every major booking platform — one setup, maximum reach.',
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
        { title: 'Multi-Platform Listing',   desc: 'Your property promoted on Airbnb, Booking.com, VRBO, Expedia, Hotels.com, and Google Vacation Rentals from day one.' },
        { title: 'Revenue Optimization',     desc: 'Dynamic pricing, seasonal rate strategy, and occupancy analytics to maximize your monthly payout.' },
        { title: 'Guest Verification',       desc: 'We screen every reservation to verify guests, reduce chargebacks, and protect your property.' },
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
      heroHeadline:    'Más Reservas.\nMenos Vacantes.',
      heroSub:         'IPM ayuda a propietarios a aumentar la exposición, llenar fechas vacías y crecer sus ingresos a través de la promoción en múltiples plataformas y gestión completa de alquiler vacacional.',
      cta1:            'Publique su Propiedad',
      cta2:            'Solicitar Gestión Completa',
      listingBadge:    'Promoción — Solo 10% de Comisión',
      mgmtBadge:       'Gestión Completa — 20% + Cuota Mensual',
      statsLabel:      ['Propiedades Gestionadas', 'Ocupación Promedio', 'Años de Experiencia', 'Soporte 24/7'],
      statsNum:        ['30+', '75–85%', '10+', 'Siempre'],
      platformHeading: 'Exposición Global para su Propiedad',
      platformSub:     'Publicamos y promovemos su propiedad en todas las plataformas principales de reservas.',
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
        { title: 'Listado Multi-Plataforma',     desc: 'Su propiedad promovida en Airbnb, Booking.com, VRBO, Expedia, Hotels.com y Google.' },
        { title: 'Optimización de Ingresos',      desc: 'Precios dinámicos, estrategia estacional y analíticas de ocupación.' },
        { title: 'Verificación de Huéspedes',     desc: 'Revisamos cada reserva para verificar huéspedes y proteger su propiedad.' },
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
      heroHeadline:    'Plus de Réservations.\nMoins de Vacances.',
      heroSub:         'IPM aide les propriétaires à augmenter leur visibilité, remplir les dates vides et développer leurs revenus grâce à la promotion multi-plateformes.',
      cta1:            'Référencer ma Propriété',
      cta2:            'Demander la Gestion Complète',
      listingBadge:    'Promotion — Seulement 10% de Commission',
      mgmtBadge:       'Gestion Complète — 20% + Frais Mensuels',
      statsLabel:      ['Propriétés Gérées', 'Taux d\'Occupation Moyen', 'Années d\'Expérience', 'Support 24/7'],
      statsNum:        ['30+', '75–85%', '10+', 'Toujours'],
      platformHeading: 'Exposition Mondiale pour Votre Propriété',
      platformSub:     'Nous référençons et promouvons votre propriété sur toutes les grandes plateformes.',
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
  const heroLines = t.heroHeadline.split('\n')

  const serviceIcons = [Globe, BarChart3, Shield, Building2]

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#06111F' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/cancun-luxury-beach.jpg')" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#06111F]/75 to-[#050505]/90" />
        {/* Gold bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F2D98D] text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            International Property Management
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            {heroLines.map((line, i) => (
              <span key={i} className={`block ${i === 0 ? 'text-white' : 'text-gold-gradient'}`}>
                {line}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-[#CFCFCF] max-w-3xl mx-auto leading-relaxed mb-10">
            {t.heroSub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/contact">
              <Button className="bg-[#D4AF37] hover:bg-[#F2D98D] text-[#050505] font-bold px-8 py-4 text-base rounded-md shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 hover:shadow-[#D4AF37]/40 hover:scale-[1.02]">
                {t.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent border-2 border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 font-semibold px-8 py-4 text-base rounded-md transition-all duration-200">
                {t.cta2}
              </Button>
            </Link>
          </div>

          {/* Commission badges */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 text-sm">
            <span className="px-4 py-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F2D98D] font-medium">
              {t.listingBadge}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-[#CFCFCF] font-medium">
              {t.mgmtBadge}
            </span>
          </div>

          {/* Platform strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map(p => (
              <span key={p} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#CFCFCF] text-xs font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] border-y border-[#D4AF37]/20 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.statsNum.map((num, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gold-gradient mb-2">{num}</div>
                <div className="text-[#CFCFCF] text-sm tracking-wide">{t.statsLabel[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PLATFORM LOGOS STRIP ──────────────────────────── */}
      <section className="bg-[#06111F] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.platformHeading}
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#CFCFCF] text-lg mb-12 max-w-2xl mx-auto">{t.platformSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {PLATFORMS.map(p => (
              <div key={p} className="glass-card px-6 py-3 rounded-lg text-[#F2D98D] font-semibold text-sm tracking-wide hover:border-[#D4AF37]/60 transition-colors duration-200">
                {p}
              </div>
            ))}
          </div>
          <p className="mt-10 text-[#D4AF37] text-sm font-medium tracking-widest uppercase">
            More Exposure · More Reservations · Higher Occupancy · No Double Bookings
          </p>
        </div>
      </section>

      {/* ── 4. PRICING CARDS ─────────────────────────────────── */}
      <section className="bg-[#050505] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.pricingHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">{t.pricingSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Plan 1 — Listing */}
            <div className="glass-card rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">A</p>
                <h3 className="text-2xl font-bold text-white mb-4">{t.plan1Title}</h3>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-6xl font-bold text-gold-gradient">{t.plan1Price}</span>
                  <span className="text-[#CFCFCF] mb-2">{t.plan1Unit}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.plan1Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#CFCFCF] text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button className="w-full border-2 border-[#D4AF37]/60 bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050505] font-bold py-3 rounded-lg transition-all duration-200">
                  {t.plan1Cta}
                </Button>
              </Link>
            </div>

            {/* Plan 2 — Full Management */}
            <div className="relative rounded-2xl p-8 flex flex-col border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#D4AF37]/10 to-transparent shadow-xl shadow-[#D4AF37]/10">
              {/* Popular badge */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#050505] text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                {t.plan2Badge}
              </span>
              <div className="mb-6">
                <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">B</p>
                <h3 className="text-2xl font-bold text-white mb-4">{t.plan2Title}</h3>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-6xl font-bold text-gold-gradient">{t.plan2Price}</span>
                  <span className="text-[#CFCFCF] mb-2">{t.plan2Unit}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.plan2Features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#CFCFCF] text-sm">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button className="w-full bg-[#D4AF37] text-[#050505] hover:bg-[#F2D98D] font-bold py-3 rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 hover:scale-[1.02]">
                  {t.plan2Cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SERVICES ──────────────────────────────────────── */}
      <section className="bg-[#111111] py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.servicesHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">{t.servicesSub}</p>
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
                    <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-[#CFCFCF] text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. OWNER BENEFITS ────────────────────────────────── */}
      <section className="bg-[#06111F] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.benefitsHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">{t.benefitsSub}</p>
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

          {/* Messaging row */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[#D4AF37] font-medium tracking-widest uppercase">
            {[
              'Fill Your Empty Dates',
              'Stop Relying on Airbnb Alone',
              'Better Guests · Fewer Problems',
              'We Handle the Setup',
            ].map(msg => (
              <span key={msg} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {msg}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED PROPERTIES ───────────────────────────── */}
      <section className="bg-[#050505] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.featuredHeading}</h2>
            <div className="gold-divider max-w-xs mx-auto mb-4" />
            <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">{t.featuredSub}</p>
          </div>
          <AirbnbSection />
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────── */}
      <section className="relative bg-[#06111F] py-28 overflow-hidden">
        {/* Decorative gold glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.ctaHeading}</h2>
          <p className="text-xl text-[#CFCFCF] mb-10 max-w-2xl mx-auto leading-relaxed">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-[#D4AF37] text-[#050505] hover:bg-[#F2D98D] font-bold px-10 py-4 text-base rounded-md shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-200">
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
