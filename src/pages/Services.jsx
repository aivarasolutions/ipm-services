import React from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  Globe, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ReviewsSection from '../components/ReviewsSection'

const Services = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      ourServices: 'Our Services',
      description: 'Comprehensive vacation rental management services designed to maximize your property\'s potential and your peace of mind.',
      getStarted: 'Get Started Today',
      viewProperties: 'View Our Properties',
      complete: 'Complete Property Management Solutions',
      completeDesc: 'From listing optimization to guest services, we handle every aspect of your vacation rental business so you can focus on what matters most.',
      servicesList: [
        { title: 'Property Management', description: 'Complete end-to-end property management services for vacation rentals. We handle everything from guest communications to maintenance coordination.', features: ['Guest check-in and check-out coordination', 'Property maintenance and repairs', 'Cleaning and housekeeping management', 'Inventory management and restocking', 'Property inspections and reporting'] },
        { title: 'Revenue Optimization', description: 'Maximize your rental income with our data-driven pricing strategies and market analysis. We maintain 75-85% occupancy rates year-round.', features: ['Dynamic pricing optimization', 'Market analysis and competitive research', 'Seasonal rate adjustments', 'Revenue forecasting and reporting', 'Performance analytics and insights'] },
        { title: '24/7 Support', description: 'Round-the-clock support for both property owners and guests. Our team is always available to handle any issues that may arise.', features: ['24/7 guest support hotline', 'Emergency maintenance coordination', 'Real-time issue resolution', 'Multilingual customer service', 'Owner communication and updates'] },
        { title: 'Multi-Platform Listing', description: 'List your property across all major booking platforms to maximize exposure and bookings. We manage listings on Airbnb, Booking.com, Expedia, and more.', features: ['Airbnb listing optimization', 'Booking.com and Expedia management', 'VRBO and HomeAway listings', 'Direct booking website integration', 'Channel management and synchronization'] }
      ],
      benefits: [
        { title: 'Premium Service Quality', description: 'White-glove service that exceeds guest expectations and maintains property standards.' },
        { title: 'Property Protection', description: 'Comprehensive insurance coverage and security measures to protect your investment.' },
        { title: 'Expert Team', description: 'Experienced professionals with deep knowledge of vacation rental management.' }
      ],
      whyChoose: 'Why Choose IPM?',
      whyChooseDesc: 'We\'re not just property managers – we\'re your partners in success. Here\'s what sets us apart.',
      proven: 'Proven Results',
      provenDesc: 'Our track record speaks for itself. See how we deliver exceptional results for property owners.',
      stats: [
        { number: '30+', label: 'Properties Managed' },
        { number: '75-85%', label: 'Average Occupancy' },
        { number: '10+', label: 'Years Experience' },
        { number: '24/7', label: 'Support Available' }
      ],
      ready: 'Ready to Maximize Your Property\'s Potential?',
      readyDesc: 'Join 30+ property owners who trust IPM to manage their vacation rentals. Get started today and see the difference professional management makes.',
      scheduleConsultation: 'Schedule Consultation',
      callPhone: 'Call +1 310-400-0032'
    },
    es: {
      ourServices: 'Nuestros Servicios',
      description: 'Servicios integrales de gestión de alquileres vacacionales diseñados para maximizar el potencial de su propiedad y su tranquilidad.',
      getStarted: 'Comenzar Hoy',
      viewProperties: 'Ver Nuestras Propiedades',
      complete: 'Soluciones Completas de Gestión de Propiedades',
      completeDesc: 'Desde la optimización de anuncios hasta los servicios para huéspedes, manejamos cada aspecto de su negocio de alquiler vacacional para que usted se enfoque en lo que importa.',
      servicesList: [
        { title: 'Gestión de Propiedades', description: 'Servicios completos de gestión de propiedades para alquileres vacacionales. Manejamos todo desde comunicaciones con huéspedes hasta coordinación de mantenimiento.', features: ['Coordinación de check-in y check-out de huéspedes', 'Mantenimiento y reparaciones de propiedades', 'Gestión de limpieza y housekeeping', 'Gestión de inventario y reabastecimiento', 'Inspecciones de propiedades e informes'] },
        { title: 'Optimización de Ingresos', description: 'Maximice sus ingresos de alquiler con nuestras estrategias de precios basadas en datos. Mantenemos tasas de ocupación del 75-85% todo el año.', features: ['Optimización de precios dinámicos', 'Análisis de mercado e investigación competitiva', 'Ajustes de tarifas estacionales', 'Pronóstico de ingresos e informes', 'Análisis de desempeño e información'] },
        { title: 'Soporte 24/7', description: 'Soporte continuo para propietarios y huéspedes. Nuestro equipo siempre está disponible para resolver cualquier problema.', features: ['Línea de soporte 24/7 para huéspedes', 'Coordinación de mantenimiento de emergencia', 'Resolución de problemas en tiempo real', 'Servicio al cliente multilingüe', 'Comunicación y actualizaciones para propietarios'] },
        { title: 'Anuncios Multi-Plataforma', description: 'Liste su propiedad en todas las principales plataformas de reservas para maximizar la exposición. Gestionamos anuncios en Airbnb, Booking.com, Expedia y más.', features: ['Optimización de anuncios en Airbnb', 'Gestión de Booking.com y Expedia', 'Anuncios en VRBO y HomeAway', 'Integración de sitio web de reservas directas', 'Gestión de canales y sincronización'] }
      ],
      benefits: [
        { title: 'Calidad Premium', description: 'Servicio de alto nivel que supera las expectativas de huéspedes y mantiene estándares de propiedad.' },
        { title: 'Protección de Propiedad', description: 'Cobertura de seguros integral y medidas de seguridad para proteger su inversión.' },
        { title: 'Equipo Experto', description: 'Profesionales experimentados con profundo conocimiento de gestión de alquileres vacacionales.' }
      ],
      whyChoose: '¿Por Qué Elegir IPM?',
      whyChooseDesc: 'No somos solo gestores de propiedades – somos sus socios en el éxito. Aquí está lo que nos diferencia.',
      proven: 'Resultados Comprobados',
      provenDesc: 'Nuestro historial habla por sí solo. Vea cómo entregamos resultados excepcionales para propietarios.',
      stats: [
        { number: '30+', label: 'Propiedades Gestionadas' },
        { number: '75-85%', label: 'Ocupación Promedio' },
        { number: '10+', label: 'Años de Experiencia' },
        { number: '24/7', label: 'Soporte Disponible' }
      ],
      ready: '¿Listo para Maximizar el Potencial de su Propiedad?',
      readyDesc: 'Únase a 30+ propietarios que confían en IPM para gestionar sus alquileres vacacionales. Comience hoy y vea la diferencia que hace la gestión profesional.',
      scheduleConsultation: 'Agendar Consulta',
      callPhone: 'Llamar +1 310-400-0032'
    },
    fr: {
      ourServices: 'Nos Services',
      description: 'Services complets de gestion de locations de vacances conçus pour maximiser le potentiel de votre propriété et votre tranquillité d\'esprit.',
      getStarted: 'Commencer Aujourd\'hui',
      viewProperties: 'Voir Nos Propriétés',
      complete: 'Solutions Complètes de Gestion de Propriétés',
      completeDesc: 'De l\'optimisation des annonces aux services aux clients, nous gérons tous les aspects de votre entreprise de location de vacances pour que vous puissiez vous concentrer sur ce qui compte.',
      servicesList: [
        { title: 'Gestion des Propriétés', description: 'Services complets de gestion de propriétés pour les locations de vacances. Nous gérons tout, des communications avec les clients à la coordination de la maintenance.', features: ['Coordination de l\'arrivée et du départ des clients', 'Maintenance et réparations des propriétés', 'Gestion du nettoyage et du ménage', 'Gestion des stocks et réapprovisionnement', 'Inspections des propriétés et rapports'] },
        { title: 'Optimisation des Revenus', description: 'Maximisez vos revenus de location avec nos stratégies de tarification basées sur les données. Nous maintenons des taux d\'occupation de 75-85% toute l\'année.', features: ['Optimisation dynamique des tarifs', 'Analyse de marché et recherche concurrentielle', 'Ajustements des tarifs saisonniers', 'Prévisions de revenus et rapports', 'Analyse des performances et insights'] },
        { title: 'Support 24/7', description: 'Support continu pour les propriétaires et les clients. Notre équipe est toujours disponible pour résoudre tout problème.', features: ['Ligne d\'assistance 24/7 pour les clients', 'Coordination de la maintenance d\'urgence', 'Résolution des problèmes en temps réel', 'Service client multilingue', 'Communication et mises à jour des propriétaires'] },
        { title: 'Annonces Multi-Plateforme', description: 'Listez votre propriété sur toutes les principales plateformes de réservation pour une exposition maximale. Nous gérons les annonces sur Airbnb, Booking.com, Expedia et plus.', features: ['Optimisation des annonces Airbnb', 'Gestion de Booking.com et Expedia', 'Annonces VRBO et HomeAway', 'Intégration du site web de réservation directe', 'Gestion des canaux et synchronisation'] }
      ],
      benefits: [
        { title: 'Qualité Premium', description: 'Service haut de gamme qui dépasse les attentes des clients et maintient les standards de propriété.' },
        { title: 'Protection de la Propriété', description: 'Couverture d\'assurance complète et mesures de sécurité pour protéger votre investissement.' },
        { title: 'Équipe Experte', description: 'Professionnels expérimentés avec une connaissance approfondie de la gestion des locations de vacances.' }
      ],
      whyChoose: 'Pourquoi Choisir IPM?',
      whyChooseDesc: 'Nous ne sommes pas seulement des gestionnaires de propriétés – nous sommes vos partenaires du succès. Voici ce qui nous différencie.',
      proven: 'Résultats Éprouvés',
      provenDesc: 'Notre bilan parle de lui-même. Voyez comment nous livrons des résultats exceptionnels pour les propriétaires.',
      stats: [
        { number: '30+', label: 'Propriétés Gérées' },
        { number: '75-85%', label: 'Taux d\'Occupation Moyen' },
        { number: '10+', label: 'Années d\'Expérience' },
        { number: '24/7', label: 'Support Disponible' }
      ],
      ready: 'Prêt à Maximiser le Potentiel de Votre Propriété?',
      readyDesc: 'Rejoignez 30+ propriétaires qui font confiance à IPM pour gérer leurs locations de vacances. Commencez aujourd\'hui et voyez la différence que fait la gestion professionnelle.',
      scheduleConsultation: 'Agendar une Consultation',
      callPhone: 'Appeler +1 310-400-0032'
    }
  }

  const t = translations[language] || translations.en

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.ourServices}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">{t.getStarted}</Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white">{t.viewProperties}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.complete}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.completeDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.servicesList.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {[<Building2 className="h-12 w-12 text-blue-600" />, <TrendingUp className="h-12 w-12 text-blue-600" />, <Clock className="h-12 w-12 text-blue-600" />, <Globe className="h-12 w-12 text-blue-600" />][index]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.whyChoose}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.whyChooseDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.benefits.map((benefit, index) => {
              const Icons = [Star, Shield, Users]
              const Icon = Icons[index]
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className={`h-8 w-8 ${['text-yellow-500', 'text-green-500', 'text-purple-500'][index]}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.proven}</h2>
            <p className="text-xl max-w-3xl mx-auto">{t.provenDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {t.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ready}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t.readyDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">{t.scheduleConsultation}</Button>
            </Link>
            <a href="tel:+13104000032">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white">
                <Phone className="h-5 w-5 mr-2" />
                {t.callPhone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
