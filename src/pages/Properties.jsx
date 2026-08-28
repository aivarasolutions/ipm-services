import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import ReviewsSection from '../components/ReviewsSection'
import PropertyGrid from '../components/PropertyGrid'


const Properties = () => {
  const { language } = useLanguage()

  const translations = {
    en: {
      ourProperties: 'Our Properties',
      intro: 'Discover our curated collection of luxury vacation rentals in prime destinations. Each property is carefully selected and professionally managed to ensure exceptional experiences.',
      featured: 'Featured Properties',
      featuredDesc: 'Browse our live portfolio, check availability, and book directly with IPM.',
      notFound: 'Don\'t See What You\'re Looking For?',
      notFoundDesc: 'We\'re constantly adding new properties to our portfolio. Contact us to discuss your specific needs or to learn about upcoming listings.',
      contactUs: 'Contact Us',
      propertyEvaluation: 'Property Evaluation',
      portfolioLink: 'Explore Our Full Property Portfolio',
      portfolioNote: 'See all available stays and current booking options on RichAF Global.'
    },
    es: {
      ourProperties: 'Nuestras Propiedades',
      intro: 'Descubra nuestra colección seleccionada de alquileres vacacionales de lujo en destinos principales. Cada propiedad es cuidadosamente seleccionada y profesionalmente gestionada para garantizar experiencias excepcionales.',
      featured: 'Propiedades Destacadas',
      featuredDesc: 'Explore nuestro portafolio en vivo, consulte disponibilidad y reserve directamente con IPM.',
      notFound: '¿No Encuentra Lo Que Busca?',
      notFoundDesc: 'Estamos constantemente agregando nuevas propiedades a nuestro portafolio. Contáctenos para discutir sus necesidades específicas o para obtener información sobre próximos anuncios.',
      contactUs: 'Contáctenos',
      propertyEvaluation: 'Evaluación de Propiedad',
      portfolioLink: 'Explorar Nuestro Portafolio Completo',
      portfolioNote: 'Vea todas las estancias disponibles y las opciones de reserva actuales en RichAF Global.'
    },
    fr: {
      ourProperties: 'Nos Propriétés',
      intro: 'Découvrez notre collection curatée de locations de vacances de luxe dans les meilleures destinations. Chaque propriété est soigneusement sélectionnée et gérée professionnellement pour assurer des expériences exceptionnelles.',
      featured: 'Propriétés Vedettes',
      featuredDesc: 'Parcourez notre portefeuille en direct, vérifiez les disponibilités et réservez directement avec IPM.',
      notFound: 'Vous ne Trouvez Pas Ce que Vous Cherchez?',
      notFoundDesc: 'Nous ajoutons constamment de nouvelles propriétés à notre portefeuille. Contactez-nous pour discuter de vos besoins spécifiques ou pour en savoir plus sur les annonces à venir.',
      contactUs: 'Nous Contacter',
      propertyEvaluation: 'Évaluation de Propriété',
      portfolioLink: 'Explorer Notre Portefeuille Complet',
      portfolioNote: 'Consultez tous les séjours disponibles et les options de réservation sur RichAF Global.'
    }
  }

  const t = translations[language] || translations.en

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#06121F] via-[#0A1A30] to-[#0F2440] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">{t.ourProperties}</h1>
            <p className="text-xl text-[#C9D2DE] max-w-4xl mx-auto leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="py-20 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0A1A30] mb-6">{t.featured}</h2>
          <p className="text-xl text-[#334155] mb-12 max-w-3xl mx-auto">{t.featuredDesc}</p>
          <PropertyGrid />
        </div>
      </section>

      <section className="py-20 bg-[#06121F] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.notFound}</h2>
          <p className="text-xl text-[#C9D2DE] mb-8 max-w-3xl mx-auto">{t.notFoundDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] text-[#06121F] font-bold hover:from-[#F2D98D] hover:to-[#D4AF37] px-8 py-3 text-lg">
                {t.contactUs}
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="border-2 border-[#D4AF37]/50 bg-transparent text-white hover:bg-[#D4AF37]/10 px-8 py-3 text-lg">
                {t.propertyEvaluation}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Properties
