import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Users, 
  Award, 
  Globe, 
  TrendingUp, 
  Shield, 
  Heart,
  CheckCircle
} from 'lucide-react'

const About = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      aboutIPM: 'About IPM',
      intro: 'International Property Management is a leading vacation rental management company specializing in luxury properties across prime destinations. We combine local expertise with global standards to maximize your property\'s potential.',
      ourStory: 'Our Story',
      story1: 'Founded with a vision to revolutionize vacation rental management, IPM has grown from managing a handful of properties to becoming a trusted partner for luxury property owners across multiple destinations.',
      story2: 'Our journey began with a simple belief: every property owner deserves professional management that maximizes returns while maintaining the highest standards of guest experience. Today, we manage over 30 properties with an average occupancy rate of 75-85% year-round.',
      story3: 'We specialize in large family properties and waterfront locations, understanding the unique challenges and opportunities these premium properties present. Our team combines deep local knowledge with cutting-edge technology to deliver exceptional results.',
      ourValues: 'Our Values',
      whyGuide: 'The principles that guide everything we do',
      whatWeDo: 'What We Do',
      whatDesc: 'We provide comprehensive vacation rental management services that take the hassle out of property ownership while maximizing your investment returns.',
      whyChooseIPM: 'Why Choose IPM?',
      ready: 'Ready to Partner with IPM?',
      readyDesc: 'Join our growing family of satisfied property owners and start maximizing your rental income today.',
      scheduleConsultation: 'Schedule Consultation',
      viewProperties: 'View Our Properties',
      partners: 'Partnership with IPM',
      values: [
        { title: 'Trust & Reliability', description: 'We build lasting relationships with property owners through transparent communication and consistent results.' },
        { title: 'Excellence in Service', description: 'Our commitment to excellence drives us to continuously improve and exceed expectations.' },
        { title: 'Personalized Care', description: 'Every property is unique, and we tailor our services to meet your specific needs and goals.' },
        { title: 'Global Reach', description: 'With properties across multiple destinations, we bring international expertise to local markets.' }
      ],
      achievements: [
        { number: '30+', label: 'Properties Under Management' },
        { number: '85%', label: 'Average Occupancy Rate' },
        { number: '10+', label: 'Years of Experience' },
        { number: '24/7', label: 'Support Available' }
      ],
      services: [
        'Full-service property management',
        'Multi-platform listing optimization',
        'Professional photography and marketing',
        'Guest communication and support',
        'Maintenance and housekeeping coordination',
        'Revenue optimization and pricing strategy',
        'Financial reporting and monthly payouts',
        'Legal compliance and insurance management'
      ],
      whyChoiceTitle: 'Why Choose IPM?',
      whyChoiceList: [
        'Proven track record with 75-85% occupancy rates',
        'Dedicated team of hospitality professionals',
        'Multi-platform presence for maximum exposure',
        '24/7 support and emergency response'
      ]
    },
    es: {
      aboutIPM: 'Acerca de IPM',
      intro: 'International Property Management es una empresa líder en gestión de alquileres vacacionales que se especializa en propiedades de lujo en destinos principales. Combinamos experiencia local con estándares globales para maximizar el potencial de su propiedad.',
      ourStory: 'Nuestra Historia',
      story1: 'Fundada con la visión de revolucionar la gestión de alquileres vacacionales, IPM ha crecido desde gestionar un puñado de propiedades hasta convertirse en un socio de confianza para propietarios de lujo en múltiples destinos.',
      story2: 'Nuestro viaje comenzó con una creencia simple: cada propietario merece una gestión profesional que maximice retornos mientras mantiene los más altos estándares de experiencia de huéspedes. Hoy, gestionamos más de 30 propiedades con una tasa de ocupación promedio del 75-85% todo el año.',
      story3: 'Nos especializamos en propiedades familiares grandes y ubicaciones frente al agua, comprendiendo los desafíos únicos y oportunidades que presentan estas propiedades premium. Nuestro equipo combina conocimiento local profundo con tecnología de vanguardia para entregar resultados excepcionales.',
      ourValues: 'Nuestros Valores',
      whyGuide: 'Los principios que guían todo lo que hacemos',
      whatWeDo: 'Lo Que Hacemos',
      whatDesc: 'Proporcionamos servicios integrales de gestión de alquileres vacacionales que eliminan las complicaciones de ser propietario mientras maximizan los retornos de su inversión.',
      whyChooseIPM: '¿Por Qué Elegir IPM?',
      ready: '¿Listo para Asociarse con IPM?',
      readyDesc: 'Únase a nuestra creciente familia de propietarios satisfechos y comience a maximizar sus ingresos de alquiler hoy.',
      scheduleConsultation: 'Agendar Consulta',
      viewProperties: 'Ver Nuestras Propiedades',
      partners: 'Asociación con IPM',
      values: [
        { title: 'Confianza y Fiabilidad', description: 'Construimos relaciones duraderas con propietarios a través de comunicación transparente y resultados consistentes.' },
        { title: 'Excelencia en Servicio', description: 'Nuestro compromiso con la excelencia nos impulsa a mejorar continuamente y superar expectativas.' },
        { title: 'Cuidado Personalizado', description: 'Cada propiedad es única, y adaptamos nuestros servicios para satisfacer sus necesidades y objetivos específicos.' },
        { title: 'Alcance Global', description: 'Con propiedades en múltiples destinos, traemos experiencia internacional a mercados locales.' }
      ],
      achievements: [
        { number: '30+', label: 'Propiedades Bajo Gestión' },
        { number: '85%', label: 'Tasa Promedio de Ocupación' },
        { number: '10+', label: 'Años de Experiencia' },
        { number: '24/7', label: 'Soporte Disponible' }
      ],
      services: [
        'Gestión de propiedades de servicio completo',
        'Optimización de anuncios multi-plataforma',
        'Fotografía profesional y marketing',
        'Comunicación y soporte a huéspedes',
        'Coordinación de mantenimiento y housekeeping',
        'Optimización de ingresos y estrategia de precios',
        'Reportes financieros y pagos mensuales',
        'Cumplimiento legal y gestión de seguros'
      ],
      whyChoiceTitle: '¿Por Qué Elegir IPM?',
      whyChoiceList: [
        'Historial comprobado con tasas de ocupación del 75-85%',
        'Equipo dedicado de profesionales de hospitalidad',
        'Presencia multi-plataforma para máxima exposición',
        'Soporte 24/7 y respuesta de emergencia'
      ]
    },
    fr: {
      aboutIPM: 'À Propos d\'IPM',
      intro: 'International Property Management est une entreprise leader en gestion de locations de vacances spécialisée dans les propriétés de luxe dans les meilleures destinations. Nous combinons l\'expertise locale avec les normes mondiales pour maximiser le potentiel de votre propriété.',
      ourStory: 'Notre Histoire',
      story1: 'Fondée avec la vision de révolutionner la gestion des locations de vacances, IPM est passée de la gestion de quelques propriétés à devenir un partenaire de confiance pour les propriétaires de luxe dans plusieurs destinations.',
      story2: 'Notre parcours a commencé avec une conviction simple : chaque propriétaire mérite une gestion professionnelle qui maximise les retours tout en maintenant les plus hauts standards d\'expérience client. Aujourd\'hui, nous gé​rons plus de 30 propriétés avec un taux d\'occupation moyen de 75-85% toute l\'année.',
      story3: 'Nous nous spécialisons dans les grandes propriétés familiales et les emplacements en bord de mer, comprenant les défis uniques et les opportunités que présentent ces propriétés premium. Notre équipe combine une profonde connaissance locale avec la technologie de pointe pour livrer des résultats exceptionnels.',
      ourValues: 'Nos Valeurs',
      whyGuide: 'Les principes qui guident tout ce que nous faisons',
      whatWeDo: 'Ce Que Nous Faisons',
      whatDesc: 'Nous fournissons des services complets de gestion de locations de vacances qui éliminent les complications de la propriété tout en maximisant les retours de votre investissement.',
      whyChooseIPM: 'Pourquoi Choisir IPM?',
      ready: 'Prêt à S\'Associer avec IPM?',
      readyDesc: 'Rejoignez notre famille croissante de propriétaires satisfaits et commencez à maximiser vos revenus de location aujourd\'hui.',
      scheduleConsultation: 'Agendar une Consultation',
      viewProperties: 'Voir Nos Propriétés',
      partners: 'Partenariat avec IPM',
      values: [
        { title: 'Confiance et Fiabilité', description: 'Nous construisons des relations durables avec les propriétaires grâce à une communication transparente et des résultats cohérents.' },
        { title: 'Excellence du Service', description: 'Notre engagement envers l\'excellence nous pousse à nous améliorer continuellement et à dépasser les attentes.' },
        { title: 'Soins Personnalisés', description: 'Chaque propriété est unique, et nous adaptons nos services pour répondre à vos besoins et objectifs spécifiques.' },
        { title: 'Portée Mondiale', description: 'Avec des propriétés dans plusieurs destinations, nous apportons l\'expertise internationale aux marchés locaux.' }
      ],
      achievements: [
        { number: '30+', label: 'Propriétés Gérées' },
        { number: '85%', label: 'Taux Moyen d\'Occupation' },
        { number: '10+', label: 'Années d\'Expérience' },
        { number: '24/7', label: 'Support Disponible' }
      ],
      services: [
        'Gestion de propriétés de service complet',
        'Optimisation des annonces multi-plateformes',
        'Photographie professionnelle et marketing',
        'Communication et support aux clients',
        'Coordination de la maintenance et du ménage',
        'Optimisation des revenus et stratégie tarifaire',
        'Rapports financiers et paiements mensuels',
        'Conformité légale et gestion des assurances'
      ],
      whyChoiceTitle: 'Pourquoi Choisir IPM?',
      whyChoiceList: [
        'Historique éprouvé avec des taux d\'occupation de 75-85%',
        'Équipe dédiée de professionnels de l\'hôtellerie',
        'Présence multi-plateforme pour une exposition maximale',
        'Support 24/7 et réponse d\'urgence'
      ]
    }
  }

  const t = translations[language] || translations.en
  const values = t.values
  const achievements = t.achievements
  const services = t.services

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t.aboutIPM}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.ourStory}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.story1}</p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.story2}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t.story3}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.ourValues}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.whyGuide}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.whatWeDo}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.whatDesc}</p>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">{t.whyChoiceTitle}</h3>
              <ul className="space-y-3 mb-6">
                {t.whyChoiceList.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Award className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 w-full">
                  {t.scheduleConsultation}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.ready}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{t.readyDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                {t.scheduleConsultation}
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg border-2 border-white">
                {t.viewProperties}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

