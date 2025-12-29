import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { getRealEstateListings } from '../lib/realEstateData';
import { Building2, TrendingUp, Shield, Users, Phone, Mail, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const RealEstate = () => {
  const { language } = useLanguage();
  const listings = getRealEstateListings();
  const featuredListings = listings.filter(listing => listing.featured).slice(0, 6);

  const translations = {
    en: {
      heroTitle: 'Luxury Properties',
      heroSubtitle: 'Exceptional residences in the world\'s most desirable locations',
      viewListings: 'View Listings',
      contactUs: 'Contact Us',
      featured: 'Featured Properties',
      currentListings: 'Current Listings',
      startingAt: 'Starting at',
      roi: 'ROI:',
      viewDetails: 'View Details',
      destinations: 'Destinations',
      premierLocations: 'Premier Locations',
      properties: 'Properties',
      ourServices: 'Our Services',
      comprehensiveManagement: 'Comprehensive Property Management',
      servicesDesc: 'From acquisition to ongoing management, we provide complete solutions for luxury property owners seeking exceptional service and results.',
      learnMore: 'Learn More',
      propertySales: 'Property Sales',
      propertySalesDesc: 'Expert guidance through every stage of the transaction',
      investmentAdvisory: 'Investment Advisory',
      investmentAdvisoryDesc: 'Strategic insights for portfolio optimization',
      propertyManagement: 'Property Management',
      propertyManagementDesc: 'Comprehensive care and maintenance services',
      rentalServices: 'Rental Services',
      rentalServicesDesc: 'Premium rental management and guest experiences',
      getInTouch: 'Get In Touch',
      scheduleConsultation: 'Schedule a Private Consultation',
      consultationDesc: 'Discover how we can help you find or manage your luxury property investment',
      callUs: 'Call Us',
      emailUs: 'Email',
      whyInvest: 'Why Invest with IPM?',
      whyInvestDesc: 'Your trusted partner for international real estate investment',
      benefits: [
        { title: 'Guaranteed 8-12% ROI', desc: 'Professional management ensures consistent returns with our proven track record' },
        { title: 'Pre-sale Opportunities', desc: 'Access exclusive properties with 20-30% discounts before public release' },
        { title: 'Turnkey Solutions', desc: 'We handle everything from purchase to rental management' },
        { title: 'Prime Locations', desc: 'Strategic properties in high-demand vacation and investment areas' },
        { title: 'Legal Support', desc: 'Full legal assistance for international buyers and investors' },
        { title: 'Immediate Income', desc: 'Start earning rental income as soon as construction is complete' }
      ],
      investmentProcess: 'Investment Process',
      processDesc: 'Simple, transparent steps to secure your real estate investment',
      steps: [
        { title: 'Consultation', desc: 'Free consultation to understand your investment goals and preferences' },
        { title: 'Property Selection', desc: 'We present curated properties matching your criteria and budget' },
        { title: 'Due Diligence', desc: 'Complete legal review, market analysis, and detailed ROI projections' },
        { title: 'Purchase & Management', desc: 'Handle entire purchase process and provide immediate rental management' }
      ],
      readyToInvest: 'Ready to Start Investing?',
      freeAnalysis: 'Get your free investment analysis today',
      buyersCompanyTitle: 'Full-Service Real Estate Solutions',
      buyersCompanyDesc: 'IPM is a buyers company specializing in connecting international investors with premium real estate opportunities. While we feature our exclusive pre-sale and investment properties below, our professional real estate agents provide access to all properties available for sale throughout Quintana Roo, Mexico and the United States.',
      buyersCompanyNote: 'Whether you\'re interested in our curated investment opportunities or seeking other properties in our markets, our experienced team can help you find and secure the perfect real estate investment.'
    },
    es: {
      heroTitle: 'Propiedades de Lujo',
      heroSubtitle: 'Residencias excepcionales en las ubicaciones más deseables del mundo',
      viewListings: 'Ver Propiedades',
      contactUs: 'Contáctenos',
      featured: 'Propiedades Destacadas',
      currentListings: 'Listados Actuales',
      startingAt: 'Desde',
      roi: 'ROI:',
      viewDetails: 'Ver Detalles',
      destinations: 'Destinos',
      premierLocations: 'Ubicaciones Premium',
      properties: 'Propiedades',
      ourServices: 'Nuestros Servicios',
      comprehensiveManagement: 'Gestión Integral de Propiedades',
      servicesDesc: 'Desde la adquisición hasta la gestión continua, ofrecemos soluciones completas para propietarios de lujo que buscan servicio y resultados excepcionales.',
      learnMore: 'Más Información',
      propertySales: 'Venta de Propiedades',
      propertySalesDesc: 'Orientación experta en cada etapa de la transacción',
      investmentAdvisory: 'Asesoría de Inversión',
      investmentAdvisoryDesc: 'Insights estratégicos para optimización de portafolio',
      propertyManagement: 'Gestión de Propiedades',
      propertyManagementDesc: 'Servicios completos de cuidado y mantenimiento',
      rentalServices: 'Servicios de Alquiler',
      rentalServicesDesc: 'Gestión de alquileres premium y experiencias de huéspedes',
      getInTouch: 'Contáctenos',
      scheduleConsultation: 'Agende una Consulta Privada',
      consultationDesc: 'Descubra cómo podemos ayudarle a encontrar o gestionar su inversión inmobiliaria de lujo',
      callUs: 'Llámenos',
      emailUs: 'Email',
      whyInvest: '¿Por Qué Invertir con IPM?',
      whyInvestDesc: 'Su socio de confianza para inversión inmobiliaria internacional',
      benefits: [
        { title: 'ROI Garantizado 8-12%', desc: 'La gestión profesional asegura retornos consistentes con nuestro historial comprobado' },
        { title: 'Oportunidades Pre-venta', desc: 'Acceso a propiedades exclusivas con 20-30% de descuento antes del lanzamiento público' },
        { title: 'Soluciones Llave en Mano', desc: 'Manejamos todo desde la compra hasta la gestión de alquileres' },
        { title: 'Ubicaciones Premium', desc: 'Propiedades estratégicas en áreas de alta demanda vacacional y de inversión' },
        { title: 'Soporte Legal', desc: 'Asistencia legal completa para compradores e inversores internacionales' },
        { title: 'Ingresos Inmediatos', desc: 'Comience a ganar ingresos por alquiler tan pronto como se complete la construcción' }
      ],
      investmentProcess: 'Proceso de Inversión',
      processDesc: 'Pasos simples y transparentes para asegurar su inversión inmobiliaria',
      steps: [
        { title: 'Consulta', desc: 'Consulta gratuita para entender sus objetivos y preferencias de inversión' },
        { title: 'Selección de Propiedad', desc: 'Presentamos propiedades seleccionadas que coinciden con sus criterios y presupuesto' },
        { title: 'Due Diligence', desc: 'Revisión legal completa, análisis de mercado y proyecciones detalladas de ROI' },
        { title: 'Compra y Gestión', desc: 'Manejamos todo el proceso de compra y proporcionamos gestión de alquileres inmediata' }
      ],
      readyToInvest: '¿Listo para Empezar a Invertir?',
      freeAnalysis: 'Obtenga su análisis de inversión gratuito hoy',
      buyersCompanyTitle: 'Soluciones Inmobiliarias de Servicio Completo',
      buyersCompanyDesc: 'IPM es una empresa compradora especializada en conectar inversores internacionales con oportunidades inmobiliarias premium. Mientras presentamos nuestras propiedades exclusivas de pre-venta e inversión a continuación, nuestros agentes inmobiliarios profesionales proporcionan acceso a todas las propiedades disponibles para la venta en Quintana Roo, México y Estados Unidos.',
      buyersCompanyNote: 'Ya sea que esté interesado en nuestras oportunidades de inversión seleccionadas o busque otras propiedades en nuestros mercados, nuestro equipo experimentado puede ayudarle a encontrar y asegurar la inversión inmobiliaria perfecta.'
    },
    fr: {
      heroTitle: 'Propriétés de Luxe',
      heroSubtitle: 'Résidences exceptionnelles dans les emplacements les plus désirables du monde',
      viewListings: 'Voir les Propriétés',
      contactUs: 'Nous Contacter',
      featured: 'Propriétés Vedettes',
      currentListings: 'Annonces Actuelles',
      startingAt: 'À partir de',
      roi: 'ROI:',
      viewDetails: 'Voir Détails',
      destinations: 'Destinations',
      premierLocations: 'Emplacements Premium',
      properties: 'Propriétés',
      ourServices: 'Nos Services',
      comprehensiveManagement: 'Gestion Immobilière Complète',
      servicesDesc: 'De l\'acquisition à la gestion continue, nous fournissons des solutions complètes pour les propriétaires de luxe recherchant un service et des résultats exceptionnels.',
      learnMore: 'En Savoir Plus',
      propertySales: 'Ventes Immobilières',
      propertySalesDesc: 'Accompagnement expert à chaque étape de la transaction',
      investmentAdvisory: 'Conseil en Investissement',
      investmentAdvisoryDesc: 'Perspectives stratégiques pour l\'optimisation du portefeuille',
      propertyManagement: 'Gestion de Propriétés',
      propertyManagementDesc: 'Services complets de soins et d\'entretien',
      rentalServices: 'Services de Location',
      rentalServicesDesc: 'Gestion locative premium et expériences clients',
      getInTouch: 'Contactez-Nous',
      scheduleConsultation: 'Agendez une Consultation Privée',
      consultationDesc: 'Découvrez comment nous pouvons vous aider à trouver ou gérer votre investissement immobilier de luxe',
      callUs: 'Appelez-Nous',
      emailUs: 'Email',
      whyInvest: 'Pourquoi Investir avec IPM?',
      whyInvestDesc: 'Votre partenaire de confiance pour l\'investissement immobilier international',
      benefits: [
        { title: 'ROI Garanti 8-12%', desc: 'La gestion professionnelle assure des rendements constants avec notre bilan éprouvé' },
        { title: 'Opportunités Pré-vente', desc: 'Accès à des propriétés exclusives avec 20-30% de réduction avant le lancement public' },
        { title: 'Solutions Clé en Main', desc: 'Nous gérons tout, de l\'achat à la gestion locative' },
        { title: 'Emplacements Premium', desc: 'Propriétés stratégiques dans les zones de forte demande vacancière et d\'investissement' },
        { title: 'Support Juridique', desc: 'Assistance juridique complète pour les acheteurs et investisseurs internationaux' },
        { title: 'Revenus Immédiats', desc: 'Commencez à générer des revenus locatifs dès la fin de la construction' }
      ],
      investmentProcess: 'Processus d\'Investissement',
      processDesc: 'Des étapes simples et transparentes pour sécuriser votre investissement immobilier',
      steps: [
        { title: 'Consultation', desc: 'Consultation gratuite pour comprendre vos objectifs et préférences d\'investissement' },
        { title: 'Sélection de Propriété', desc: 'Nous présentons des propriétés sélectionnées correspondant à vos critères et budget' },
        { title: 'Due Diligence', desc: 'Examen juridique complet, analyse de marché et projections de ROI détaillées' },
        { title: 'Achat et Gestion', desc: 'Gestion de tout le processus d\'achat et fourniture immédiate de gestion locative' }
      ],
      readyToInvest: 'Prêt à Commencer à Investir?',
      freeAnalysis: 'Obtenez votre analyse d\'investissement gratuite aujourd\'hui',
      buyersCompanyTitle: 'Solutions Immobilières de Service Complet',
      buyersCompanyDesc: 'IPM est une entreprise d\'acheteurs spécialisée dans la connexion d\'investisseurs internationaux avec des opportunités immobilières premium. Bien que nous présentions nos propriétés exclusives de pré-vente et d\'investissement ci-dessous, nos agents immobiliers professionnels donnent accès à toutes les propriétés disponibles à la vente dans tout Quintana Roo, Mexique et États-Unis.',
      buyersCompanyNote: 'Que vous soyez intéressé par nos opportunités d\'investissement sélectionnées ou que vous recherchiez d\'autres propriétés sur nos marchés, notre équipe expérimentée peut vous aider à trouver et sécuriser l\'investissement immobilier parfait.'
    }
  };

  const t = translations[language] || translations.en;

  const locations = [
    { name: 'Playa del Carmen', count: '03', image: '/playa-del-carmen-beachfront-luxury.jpg' },
    { name: 'Tulum', count: '00', image: '/tulum-luxury-beachfront-resort.jpg' },
    { name: 'Lake Norman', count: '00', image: '/lake-norman-luxury-waterfront-estate.jpg' }
  ];

  const services = [
    { icon: Building2, title: t.propertySales, desc: t.propertySalesDesc },
    { icon: TrendingUp, title: t.investmentAdvisory, desc: t.investmentAdvisoryDesc },
    { icon: Shield, title: t.propertyManagement, desc: t.propertyManagementDesc },
    { icon: Users, title: t.rentalServices, desc: t.rentalServicesDesc }
  ];

  return (
    <div className="min-h-screen">
      {/* Luxury Dark Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-4">Premium Real Estate</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#listings" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-10 py-4 text-lg rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105">
              {t.viewListings}
            </a>
            <Link to="/contact" className="border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 text-lg rounded-full font-semibold transition-all duration-300 hover:bg-white/10">
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-50" id="listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-amber-600 uppercase tracking-widest text-sm font-medium">{t.featured}</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">{t.currentListings}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredListings.map(listing => (
              <div key={listing.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                    {listing.status}
                  </div>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{listing.title}</h3>
                  <p className="text-slate-500 mb-6 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                    {listing.location}
                  </p>
                  
                  <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{t.startingAt}</p>
                      <p className="text-2xl font-bold text-slate-900">${listing.price.toLocaleString()} USD</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400 mb-1">{t.roi}</p>
                      <p className="text-2xl font-bold text-emerald-600">{listing.expectedROI}%</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {listing.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {listing.features.slice(0, 4).map((feature, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/real-estate/${listing.slug}`}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-semibold text-center flex items-center justify-center group/btn transition-all duration-300"
                  >
                    {t.viewDetails}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premier Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-amber-600 uppercase tracking-widest text-sm font-medium">{t.destinations}</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">{t.premierLocations}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                  <p className="text-amber-400 font-medium">{location.count} {t.properties}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyers Company Information */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t.buyersCompanyTitle}</h2>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed">
              {t.buyersCompanyDesc}
            </p>
            <p className="text-slate-400">
              {t.buyersCompanyNote}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-amber-600 uppercase tracking-widest text-sm font-medium">{t.ourServices}</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">{t.comprehensiveManagement}</h2>
          <p className="text-xl text-slate-600 mb-16 text-center max-w-3xl mx-auto">
            {t.servicesDesc}
          </p>
          <div className="text-center mb-12">
            <Link to="/services" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors">
              {t.learnMore} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Invest with IPM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.whyInvest}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t.whyInvestDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-slate-50" id="consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.investmentProcess}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{t.processDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {t.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-amber-500/25">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t.readyToInvest}</h2>
            <p className="text-xl text-slate-300 mb-10">{t.freeAnalysis}</p>
            <div className="max-w-lg mx-auto bg-white rounded-2xl p-8">
              <LeadCaptureForm variant="detailed" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-4">{t.getInTouch}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.scheduleConsultation}</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">{t.consultationDesc}</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+13104000032" className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-slate-900 px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
              <Phone className="w-5 h-5 mr-3" />
              {t.callUs}
            </a>
            <a href="mailto:info@richaf.global" className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10">
              <Mail className="w-5 h-5 mr-3" />
              {t.emailUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;
