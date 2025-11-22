import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  BarChart3,
  Star,
  Clock,
  Users
} from 'lucide-react'

// Airbnb Widget Components
const AirbnbWidget = ({ id, href, description }) => {
  return (
    <div 
      className="airbnb-embed-frame" 
      data-id={id}
      data-view="home" 
      data-hide-price="true" 
      style={{width: '450px', height: '300px', margin: 'auto'}}
    >
      <a 
        href={href}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        View On Airbnb
      </a>
      <a 
        href={href}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {description}
      </a>
    </div>
  );
};

const AirbnbSection = () => {
  useEffect(() => {
    // Load Airbnb embed script
    const script = document.createElement('script');
    script.src = 'https://www.airbnb.com/embeddable/airbnb_jssdk';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.airbnb.com/embeddable/airbnb_jssdk"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const properties = [
    {
      id: "1347342374342049672",
      href: "https://www.airbnb.com/rooms/1347342374342049672?guests=1&adults=1&s=66&source=embed_widget",
      description: "Home in Mooresville · ★4.79 · 3 bedrooms · 5 beds · 3 baths"
    },
    {
      id: "1471379203731591914",
      href: "https://www.airbnb.com/rooms/1471379203731591914?guests=1&adults=1&s=66&source=embed_widget",
      description: "Villa in Playa del Carmen · ★5.0 · 2 bedrooms · 2 beds · 2 baths"
    },
    {
      id: "797383249287358281",
      href: "https://www.airbnb.com/rooms/797383249287358281?guests=1&adults=1&s=66&source=embed_widget",
      description: "Rental unit in Playa del Carmen · ★4.75 · 3 bedrooms · 6 beds · 3 baths"
    },
    {
      id: "1360603145357884662",
      href: "https://www.airbnb.com/rooms/1360603145357884662?guests=1&adults=1&s=66&source=embed_widget",
      description: "Treehouse in Playa del Carmen · ★5.0 · 1 bedroom · 3 beds · 1 bath"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {properties.map((property, index) => (
        <div key={property.id} className="flex justify-center">
          <AirbnbWidget 
            id={property.id}
            href={property.href}
            description={property.description}
          />
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      elevating: 'Elevating Property Management',
      maxROI: 'Maximize your ROI with our comprehensive vacation rental management. We specialize in large family properties and waterfront locations, maintaining 75-85% occupancy rates year-round.',
      ownerPortal: 'Owner Portal Login',
      viewProperties: 'View Properties',
      stats: [
        { number: '30+', label: 'Properties Managed' },
        { number: '75-85%', label: 'Average Occupancy' },
        { number: '10+', label: 'Years Experience' },
        { number: 'Always', label: '24/7 Support' }
      ],
      ourServices: 'Our Services',
      servicesDesc: 'Comprehensive property management solutions designed to maximize your rental income',
      services: [
        {
          title: 'Multi-Platform Optimization',
          description: 'List your property on Airbnb, Booking.com, and Expedia to maximize exposure and reach all travelers'
        },
        {
          title: '24/7 Support & Maintenance',
          description: 'Round-the-clock property care and guest support to ensure seamless experiences'
        },
        {
          title: 'Revenue Optimization',
          description: 'Maintain 75-85% occupancy rates year-round through strategic pricing and marketing'
        },
        {
          title: 'Monthly Payouts',
          description: 'Reliable monthly payments with detailed reporting and transparent financial statements'
        }
      ]
    },
    es: {
      elevating: 'Elevando la Gestión de Propiedades',
      maxROI: 'Maximice su ROI con nuestra gestión integral de alquileres vacacionales. Nos especializamos en propiedades familiares grandes y ubicaciones frente al agua, manteniendo tasas de ocupación del 75-85% todo el año.',
      ownerPortal: 'Acceso al Portal del Propietario',
      viewProperties: 'Ver Propiedades',
      stats: [
        { number: '30+', label: 'Propiedades Gestionadas' },
        { number: '75-85%', label: 'Ocupación Promedio' },
        { number: '10+', label: 'Años de Experiencia' },
        { number: 'Siempre', label: 'Soporte 24/7' }
      ],
      ourServices: 'Nuestros Servicios',
      servicesDesc: 'Soluciones completas de gestión de propiedades diseñadas para maximizar ingresos de alquiler',
      services: [
        {
          title: 'Optimización Multi-Plataforma',
          description: 'Liste su propiedad en Airbnb, Booking.com y Expedia para maximizar exposición'
        },
        {
          title: 'Soporte y Mantenimiento 24/7',
          description: 'Cuidado de propiedad y soporte a huéspedes disponible las 24 horas'
        },
        {
          title: 'Optimización de Ingresos',
          description: 'Mantenga tasas de ocupación del 75-85% todo el año con estrategias de precios'
        },
        {
          title: 'Pagos Mensuales',
          description: 'Pagos mensuales confiables con reportes detallados y estados financieros transparentes'
        }
      ]
    },
    fr: {
      elevating: 'Élever la Gestion des Propriétés',
      maxROI: 'Maximisez votre ROI avec notre gestion complète des locations de vacances. Nous nous spécialisons dans les grandes propriétés familiales et les emplacements en bord de mer.',
      ownerPortal: 'Connexion au Portail Propriétaire',
      viewProperties: 'Voir les Propriétés',
      stats: [
        { number: '30+', label: 'Propriétés Gérées' },
        { number: '75-85%', label: 'Taux d\'Occupation Moyen' },
        { number: '10+', label: 'Années d\'Expérience' },
        { number: 'Toujours', label: 'Support 24/7' }
      ],
      ourServices: 'Nos Services',
      servicesDesc: 'Solutions complètes de gestion de propriétés conçues pour maximiser vos revenus de location',
      services: [
        {
          title: 'Optimisation Multi-Plateforme',
          description: 'Listez votre propriété sur Airbnb, Booking.com et Expedia pour une exposition maximale'
        },
        {
          title: 'Support et Maintenance 24/7',
          description: 'Soins de propriété et support client disponibles 24 heures sur 24'
        },
        {
          title: 'Optimisation des Revenus',
          description: 'Maintenez des taux d\'occupation de 75-85% toute l\'année grâce à des stratégies tarifaires'
        },
        {
          title: 'Paiements Mensuels',
          description: 'Paiements mensuels fiables avec rapports détaillés et états financiers transparents'
        }
      ]
    }
  }

  const t = translations[language] || translations.en
  const stats = t.stats.map((stat, idx) => ({
    icon: [Building2, TrendingUp, Star, Clock][idx],
    number: stat.number,
    label: stat.label
  }))
  const services = t.services.map((svc, idx) => ({
    icon: [BarChart3, Shield, TrendingUp, DollarSign][idx],
    title: svc.title,
    description: svc.description
  }))


  return (
    <div className="min-h-screen">
      {/* Hero Image Section */}
      <section className="w-full">
        <img 
          src="/ipm-hero.png" 
          alt="IPM Hero"
          className="w-full h-auto object-cover"
          style={{ maxHeight: '100vh' }}
        />
      </section>

      {/* Elevating Property Management Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.elevating}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t.maxROI}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/owner-portal">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <Users className="mr-2 h-5 w-5" />
                {t.ownerPortal}
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="border-2 border-gray-300 px-8 py-3 text-lg">
                {t.viewProperties}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.ourServices}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.servicesDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our exceptional vacation rental properties available for booking directly through Airbnb.
            </p>
          </div>
          <AirbnbSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Maximize Your Property's Potential?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 30+ property owners who trust IPM to manage their vacation rentals. 
            Get started today and see the difference professional management makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg border-2 border-white">
                Property Evaluation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

