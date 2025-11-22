import { motion } from 'framer-motion';
import { ExternalLink, Calendar, TrendingDown, AlertTriangle, Building2, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function News() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Vacation Rental Market News',
      subtitle: 'Latest updates on the Quintana Roo vacation rental and hospitality market',
      toggleLabel: 'Español',
      readMore: 'Read Full Article',
      published: 'Published',
      executiveSummary: {
        title: 'Market Impact on Vacation Rental Owners',
        content: 'The Quintana Roo vacation rental market is experiencing unprecedented challenges that directly impact property owner revenues. With over 17,275 listings in the Cancun-Riviera Maya corridor, severe oversupply has driven nightly rates down to less than half of competing markets like Puerto Vallarta. Occupancy rates have plummeted to just 26% statewide (down from 29%), with Tulum at a concerning 20.5%. This represents a projected 6% revenue decline from 2024\'s $588 million. Additionally, regulatory uncertainty and competition from the Dominican Republic are creating downward pressure on pricing power. Professional property management is now more critical than ever to maintain occupancy, maximize revenue per available night, ensure regulatory compliance, and differentiate properties in an increasingly crowded marketplace.',
        keyTakeaways: [
          'Oversupply Crisis: 17,275 listings driving rates down 50%+ vs. competing markets',
          'Occupancy Collapse: Average 26% occupancy with Tulum at just 20.5%',
          'Revenue Impact: 6% projected decline from $588M USD in 2024',
          'Regulatory Risk: Unregulated properties face zoning and safety compliance issues',
          'Professional Management Essential: Expert management crucial for maximizing returns'
        ]
      },
      articles: [
        {
          title: 'Hotels Report Increased Occupancy but Lower Revenue Due to Price Wars',
          source: 'Newsday Caribe',
          date: 'November 9, 2025',
          category: 'Hotel Industry',
          icon: Building2,
          image: '/news-hotel-competition.jpg',
          summary: 'Small hotels in Playa del Carmen are experiencing a 47% occupancy rate but cannot recover high-season rates. Average prices have plummeted from $160 USD (14 years ago) to just $50 USD today. The destination faces intense competition from the Dominican Republic, while Playa del Carmen struggles with the lowest rates in the region compared to Tulum, Bacalar, and Holbox.',
          keyPoints: [
            'Current average rate: 850 pesos ($50 USD) per night for two people',
            'High season rates reached 1,400-1,600 pesos but couldn\'t be sustained',
            'Dominican Republic emerging as strong Caribbean competitor',
            'October occupancy: 47% with upward trend'
          ],
          url: 'https://newsdaycaribe.com/comunidad/playa/hoteles-de-playa-del-carmen-reportan-incremento-en-ocupacion-hotelera/'
        },
        {
          title: 'Vacation Rental Boom Drives Down Rates Across Mexican Caribbean',
          source: 'El Economista',
          date: 'September 7, 2025',
          category: 'Market Analysis',
          icon: TrendingDown,
          image: '/news-market-trends.jpg',
          summary: 'The Cancun-Riviera Maya corridor has 17,275 active vacation rental listings on Airbnb alone, five times more than Puerto Vallarta and 21 times more than Los Cabos. This oversupply is significantly lowering nightly rates compared to other Mexican beach destinations, with prices running at less than half those of competing markets.',
          keyPoints: [
            'Cancun: $146 USD average per night',
            'Playa del Carmen: $141 USD per night',
            'Tulum: $165 USD per night',
            'Puerto Vallarta commands $327 USD (more than double)',
            'Los Cabos averages $295 USD per night'
          ],
          url: 'https://www.eleconomista.com.mx/amp/estados/auge-rentas-vacacionales-abaratan-tarifas-caribe-mexicano-20250907-776092.html'
        },
        {
          title: 'Insecurity and Unregulated Rentals Sink Hotel Occupancy in Cancun',
          source: 'La Jornada',
          date: 'September 24, 2025',
          category: 'Regulation & Safety',
          icon: AlertTriangle,
          image: '/news-regulation.jpg',
          summary: 'Hotel occupancy in the Mexican Caribbean continues well below expectations due to multiple factors, including lack of regulation for vacation rentals. Industry leaders warn that unregulated rentals in unsafe areas are prone to serious crimes including child abuse, creating unfair competition while compromising visitor safety.',
          keyPoints: [
            'Vacation rentals need proper zoning and neighbor approval',
            'Safety concerns in unregulated rental areas',
            'Aviation capacity down 2.1% (172 fewer flights)',
            'Call for rentals to be concentrated in city centers with proper infrastructure'
          ],
          url: 'https://www.jornada.com.mx/noticia/2025/09/24/estados/inseguridad-y-rentas-no-reguladas-hunden-ocupacion-hotelera-en-cancun'
        },
        {
          title: 'Vacation Rentals Operating Below 30% Occupancy',
          source: 'Caribe Peninsular',
          date: 'November 10, 2025',
          category: 'Industry Impact',
          icon: DollarSign,
          image: '/news-low-occupancy.jpg',
          summary: 'The drop in hotel occupancy has also severely impacted vacation rental operators using platforms like Airbnb and VRBO. Quintana Roo averages just 26% occupancy, down from 29% last year. Cancun sits at 28%, Playa del Carmen at 25.4%, and Tulum at just 20.5% - representing a 6% drop that will significantly reduce the $588 million USD generated in 2024.',
          keyPoints: [
            'State average: 26% occupancy (down from 29%)',
            'Cancun: 28% occupancy',
            'Playa del Carmen: 25.4% occupancy',
            'Tulum: 20.5% occupancy (lowest)',
            'Expected 6% revenue decline from 2024\'s $588M USD'
          ],
          url: 'https://caribepeninsular.mx/operan-debajo-del-30-sufren-rentas-vacacionales-caida-en-ocupacion/'
        }
      ]
    },
    es: {
      title: 'Noticias del Mercado de Rentas Vacacionales',
      subtitle: 'Últimas actualizaciones sobre el mercado de rentas vacacionales y hotelería en Quintana Roo',
      toggleLabel: 'English',
      readMore: 'Leer Artículo Completo',
      published: 'Publicado',
      executiveSummary: {
        title: 'Impacto del Mercado en Propietarios de Rentas Vacacionales',
        content: 'El mercado de rentas vacacionales de Quintana Roo está experimentando desafíos sin precedentes que impactan directamente los ingresos de los propietarios. Con más de 17,275 anuncios en el corredor Cancún-Riviera Maya, la grave sobreoferta ha reducido las tarifas nocturnas a menos de la mitad de mercados competidores como Puerto Vallarta. Las tasas de ocupación han caído a solo 26% a nivel estatal (bajando del 29%), con Tulum en un preocupante 20.5%. Esto representa una caída proyectada del 6% en ingresos desde los $588 millones de 2024. Además, la incertidumbre regulatoria y la competencia de República Dominicana están creando presión a la baja en el poder de fijación de precios. La gestión profesional de propiedades es ahora más crítica que nunca para mantener la ocupación, maximizar ingresos por noche disponible, asegurar el cumplimiento regulatorio y diferenciar propiedades en un mercado cada vez más saturado.',
        keyTakeaways: [
          'Crisis de Sobreoferta: 17,275 anuncios reduciendo tarifas 50%+ vs. mercados competidores',
          'Colapso de Ocupación: Promedio 26% de ocupación con Tulum en solo 20.5%',
          'Impacto en Ingresos: Caída proyectada del 6% desde $588M USD en 2024',
          'Riesgo Regulatorio: Propiedades no reguladas enfrentan problemas de zonificación y seguridad',
          'Gestión Profesional Esencial: Administración experta crucial para maximizar retornos'
        ]
      },
      articles: [
        {
          title: 'Hoteles Reportan Incremento en Ocupación pero Menores Ingresos por Guerra de Precios',
          source: 'Newsday Caribe',
          date: '9 de noviembre, 2025',
          category: 'Industria Hotelera',
          icon: Building2,
          image: '/news-hotel-competition.jpg',
          summary: 'Los pequeños hoteles de Playa del Carmen registran un 47% de ocupación pero no pueden recuperar las tarifas de temporada alta. Los precios promedio han caído de $160 dólares (hace 14 años) a solo $50 dólares hoy. El destino enfrenta intensa competencia de República Dominicana, mientras Playa del Carmen tiene las tarifas más bajas de la región comparado con Tulum, Bacalar y Holbox.',
          keyPoints: [
            'Tarifa promedio actual: 850 pesos ($50 USD) por noche para dos personas',
            'Las tarifas de temporada alta alcanzaron 1,400-1,600 pesos pero no se sostuvieron',
            'República Dominicana emerge como fuerte competidor caribeño',
            'Ocupación de octubre: 47% con tendencia al alza'
          ],
          url: 'https://newsdaycaribe.com/comunidad/playa/hoteles-de-playa-del-carmen-reportan-incremento-en-ocupacion-hotelera/'
        },
        {
          title: 'Auge de Rentas Vacacionales Abaratan Tarifas en el Caribe Mexicano',
          source: 'El Economista',
          date: '7 de septiembre, 2025',
          category: 'Análisis de Mercado',
          icon: TrendingDown,
          image: '/news-market-trends.jpg',
          summary: 'El corredor Cancún-Riviera Maya cuenta con 17,275 anuncios activos de rentas vacacionales solo en Airbnb, cinco veces más que Puerto Vallarta y 21 veces más que Los Cabos. Esta sobreoferta está reduciendo significativamente las tarifas nocturnas en comparación con otros destinos de playa mexicanos, con precios a menos de la mitad de mercados competidores.',
          keyPoints: [
            'Cancún: $146 USD promedio por noche',
            'Playa del Carmen: $141 USD por noche',
            'Tulum: $165 USD por noche',
            'Puerto Vallarta cobra $327 USD (más del doble)',
            'Los Cabos promedia $295 USD por noche'
          ],
          url: 'https://www.eleconomista.com.mx/amp/estados/auge-rentas-vacacionales-abaratan-tarifas-caribe-mexicano-20250907-776092.html'
        },
        {
          title: 'Inseguridad y Rentas No Reguladas Hunden Ocupación Hotelera en Cancún',
          source: 'La Jornada',
          date: '24 de septiembre, 2025',
          category: 'Regulación y Seguridad',
          icon: AlertTriangle,
          image: '/news-regulation.jpg',
          summary: 'La ocupación hotelera en el Caribe Mexicano continúa muy por debajo de las expectativas debido a múltiples factores, incluyendo la falta de regulación de rentas vacacionales. Líderes de la industria advierten que las rentas no reguladas en áreas inseguras son propensas a delitos graves incluyendo abuso infantil, creando competencia desleal mientras comprometen la seguridad de visitantes.',
          keyPoints: [
            'Las rentas vacacionales necesitan zonificación adecuada y aprobación vecinal',
            'Preocupaciones de seguridad en áreas de rentas no reguladas',
            'Capacidad aérea bajó 2.1% (172 vuelos menos)',
            'Llamado a concentrar rentas en centros urbanos con infraestructura adecuada'
          ],
          url: 'https://www.jornada.com.mx/noticia/2025/09/24/estados/inseguridad-y-rentas-no-reguladas-hunden-ocupacion-hotelera-en-cancun'
        },
        {
          title: 'Rentas Vacacionales Operan Debajo del 30% de Ocupación',
          source: 'Caribe Peninsular',
          date: '10 de noviembre, 2025',
          category: 'Impacto Industrial',
          icon: DollarSign,
          image: '/news-low-occupancy.jpg',
          summary: 'La caída en la ocupación hotelera también ha impactado severamente a operadores de rentas vacacionales usando plataformas como Airbnb y VRBO. Quintana Roo promedia solo 26% de ocupación, bajando del 29% del año pasado. Cancún tiene 28%, Playa del Carmen 25.4%, y Tulum apenas 20.5% - representando una caída del 6% que reducirá significativamente los $588 millones USD generados en 2024.',
          keyPoints: [
            'Promedio estatal: 26% de ocupación (bajó del 29%)',
            'Cancún: 28% de ocupación',
            'Playa del Carmen: 25.4% de ocupación',
            'Tulum: 20.5% de ocupación (el más bajo)',
            'Caída esperada de 6% en ingresos desde los $588M USD de 2024'
          ],
          url: 'https://caribepeninsular.mx/operan-debajo-del-30-sufren-rentas-vacacionales-caida-en-ocupacion/'
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            {currentContent.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            {currentContent.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-12 border-l-4 border-amber-500"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {currentContent.executiveSummary.title}
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {currentContent.executiveSummary.content}
          </p>
          <div className="bg-white/70 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">📊</span>
              {language === 'en' ? 'Key Takeaways:' : 'Puntos Clave:'}
            </h3>
            <ul className="space-y-3">
              {currentContent.executiveSummary.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span className="text-slate-800 font-medium">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="grid gap-8">
          {currentContent.articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{currentContent.published}: {article.date}</span>
                      </div>
                      <span className="text-slate-400 text-sm">•</span>
                      <span className="text-slate-500 text-sm font-medium">{article.source}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {article.title}
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {article.summary}
                    </p>

                  <div className="bg-slate-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      {language === 'en' ? 'Key Points:' : 'Puntos Clave:'}
                    </h3>
                    <ul className="space-y-2">
                      {article.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-blue-600 mt-1">▸</span>
                          <span className="text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                  >
                    {currentContent.readMore}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100"
        >
          <p className="text-sm text-slate-600 text-center">
            {language === 'en' 
              ? 'These articles provide insights into the current state of the vacation rental market in Quintana Roo. For professional property management services, contact International Property Management.'
              : 'Estos artículos proporcionan información sobre el estado actual del mercado de rentas vacacionales en Quintana Roo. Para servicios profesionales de gestión de propiedades, contacte a International Property Management.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
