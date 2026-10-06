// eslint-disable-next-line no-unused-vars -- JSX member expressions are not tracked by the base rule.
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DollarSign, Link as LinkIcon, Shield, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';

export default function Insights() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'INSIGHTS',
      subtitle: 'Expert Knowledge, Transparent Guidance, and Professional Hosting Strategies',
      intro: 'Welcome to the IPM Insights Hub — the industry\'s most direct and transparent educational resource for short-term rental hosts.',
      mainDesc1: 'Airbnb’s newer single-fee structure changes how hosts should set their nightly prices. At IPM, we explain the fee, review your market, and help you protect your net payout with the right pricing and operating tools.',
      mainDesc2: 'This section of our website provides professional, no-nonsense explanations of how the industry really works, based on what we teach our global property management clients every day.',
      mainDesc3: 'Whether you\'re a new host or managing multiple properties, these guides will help you understand platform fees, price for your target payout, and build systems that keep you in control of your business.',
      whatYouFind: 'What You\'ll Find in IPM Insights',
      learnMore: 'Learn more',
      whyCreate: 'Why IPM Creates These Resources',
      whyCreatDesc: 'Most hosts never receive transparent explanations from Airbnb, PMS platforms, or other property management companies. They are left with:',
      problems: [
        'Unexpected fee increases',
        'Confusing payout breakdowns',
        'Unnecessary dependence on expensive software',
        'Unclear automation workflows',
        'Limited control over their own operations'
      ],
      empowered: 'IPM believes hosts should be empowered — not confused.',
      mission: 'Our mission is to provide clarity, expertise, and proven systems so hosts can run profitable, efficient, and professional short-term rental businesses across the globe.',
      advantages: 'Our Expertise — Your Advantage',
      advantagesDesc: 'Through IPM Insights, you will learn:',
      advList: [
        'How to price for Airbnb’s host fee while staying competitive',
        'How to automate your hosting systems without expensive PMS software',
        'How to build a professional guest check-in workflow',
        'How to collect and control your own guest data',
        'How to scale operations with simple, effective systems',
        'How to operate like a multinational property management firm'
      ],
      advConc: 'These pages are designed to help you become a smarter, more profitable host — with real-world strategies used across hundreds of properties internationally.',
      ready: 'Ready to Optimize Your Operations?',
      readyDesc: 'If you want personalized help implementing any of these systems, or if you\'d like IPM to manage your properties professionally, we\'re here to help.',
      bookConsultation: 'Book a Consultation with IPM',
      consultDesc: 'Optimize your property, reduce costs, and increase profits. Click below to get started.',
      scheduleCall: 'Schedule a Call →',
      topics: [
        {
          title: 'IPM Payout Calculator',
          description: 'Estimate guest costs, platform fees, taxes and owner payouts. Work backwards from a target payout and compare booking channels.',
          path: '/payout-calculator',
          color: 'green'
        },
        {
          title: 'Airbnb Fees Explained',
          description: 'Understand Airbnb’s move toward a single host-paid fee, how it affects guest prices and your payout, and what to check on your listing.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'API Connections & Operating Costs',
          description: 'Compare software costs, automation benefits, and Airbnb’s host fee without relying on outdated API fee workarounds.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'How to Offset Airbnb’s Host Fee',
          description: 'See how we review your market and adjust nightly rates to protect your target payout under the updated host-paid fee.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Check-In System Design (IPM Method)',
          description: 'A flexible guest check-in workflow for communication and data collection. Use it for better operations, not as a way to avoid Airbnb fees.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
      ]
    },
    es: {
      title: 'INSIGHTS',
      subtitle: 'Conocimiento Experto, Orientación Transparente y Estrategias Profesionales de Hosting',
      intro: 'Bienvenido al Centro de Insights de IPM — el recurso educativo más directo y transparente de la industria para anfitriones de alquileres a corto plazo.',
      mainDesc1: 'La nueva estructura de tarifa única de Airbnb cambia la forma de fijar los precios por noche. En IPM explicamos la tarifa, analizamos su mercado y le ayudamos a proteger sus ingresos netos con precios adecuados.',
      mainDesc2: 'Esta sección de nuestro sitio web proporciona explicaciones profesionales y directas sobre cómo funciona realmente la industria, basadas en lo que enseñamos a nuestros clientes de gestión de propiedades globales todos los días.',
      mainDesc3: 'Ya sea que sea un anfitrión nuevo o administre varias propiedades, estas guías le ayudarán a comprender las tarifas, fijar precios según sus ingresos deseados y mantener el control de su negocio.',
      whatYouFind: 'Lo Que Encontrará en IPM Insights',
      learnMore: 'Aprende más',
      whyCreate: 'Por Qué IPM Crea Estos Recursos',
      whyCreatDesc: 'La mayoría de los anfitriones nunca reciben explicaciones transparentes de Airbnb, plataformas PMS u otras empresas de gestión de propiedades. Se quedan con:',
      problems: [
        'Aumentos inesperados de tarifas',
        'Desglose de pagos confuso',
        'Dependencia innecesaria de software costoso',
        'Flujos de trabajo de automatización poco claros',
        'Control limitado sobre sus propias operaciones'
      ],
      empowered: 'IPM cree que los anfitriones deben ser empoderados, no confundidos.',
      mission: 'Nuestra misión es proporcionar claridad, experiencia y sistemas comprobados para que los anfitriones ejecuten negocios de alquileres a corto plazo rentables, eficientes y profesionales en todo el mundo.',
      advantages: 'Nuestra Experiencia — Su Ventaja',
      advantagesDesc: 'A través de IPM Insights, aprenderá:',
      advList: [
        'Cómo ajustar sus precios para compensar la tarifa de Airbnb sin perder competitividad',
        'Cómo automatizar sus sistemas de hosting sin software PMS costoso',
        'Cómo crear un flujo de trabajo profesional de check-in de huéspedes',
        'Cómo recopilar y controlar sus propios datos de huéspedes',
        'Cómo escalar operaciones con sistemas simples y efectivos',
        'Cómo operar como una firma multinacional de gestión de propiedades'
      ],
      advConc: 'Estas páginas están diseñadas para ayudarle a convertirse en un anfitrión más inteligente y rentable, con estrategias del mundo real utilizadas en cientos de propiedades internacionalmente.',
      ready: '¿Listo para Optimizar Sus Operaciones?',
      readyDesc: 'Si desea ayuda personalizada para implementar cualquiera de estos sistemas, o si desea que IPM administre sus propiedades profesionalmente, estamos aquí para ayudar.',
      bookConsultation: 'Agendar una Consulta con IPM',
      consultDesc: 'Optimice su propiedad, reduzca costos y aumente ganancias. Haga clic a continuación para comenzar.',
      scheduleCall: 'Agendar una Llamada →',
      topics: [
        {
          title: 'Calculadora de Pagos de IPM',
          description: 'Estime costos del huésped, comisiones, impuestos y pagos al propietario. Calcule la tarifa necesaria y compare canales de reserva.',
          path: '/es/payout-calculator',
          color: 'green'
        },
        {
          title: 'Tarifas de Airbnb Explicadas',
          description: 'Comprenda el cambio hacia una tarifa única a cargo del anfitrión y cómo afecta al precio para los huéspedes y a sus ingresos netos.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'Conexiones API y Costos Operativos',
          description: 'Compare los costos del software y los beneficios de la automatización sin depender de métodos obsoletos para evitar la tarifa de Airbnb.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'Cómo Compensar la Tarifa de Airbnb',
          description: 'Descubra cómo analizamos su mercado y ajustamos las tarifas por noche para proteger los ingresos netos que desea obtener.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Diseño del Sistema de Check-In (Método IPM)',
          description: 'Un sistema flexible de llegada y comunicación con huéspedes para mejorar la operación, no para evitar las tarifas de Airbnb.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
      ]
    },
    fr: {
      title: 'INSIGHTS',
      subtitle: 'Connaissance d\'Expert, Orientation Transparente et Stratégies d\'Hébergement Professionnelles',
      intro: 'Bienvenue au Centre IPM Insights — la ressource éducative la plus directe et transparente de l\'industrie pour les hôtes de location de vacances à court terme.',
      mainDesc1: 'La nouvelle structure de frais uniques d’Airbnb change la façon de fixer les prix par nuit. IPM explique ces frais, analyse votre marché et vous aide à protéger votre revenu net grâce à une tarification adaptée.',
      mainDesc2: 'Cette section de notre site Web fournit des explications professionnelles et directes sur le fonctionnement réel de l\'industrie, basées sur ce que nous enseignons à nos clients de gestion de propriété mondiaux chaque jour.',
      mainDesc3: 'Que vous débutiez ou gériez plusieurs biens, ces guides vous aident à comprendre les frais de plateforme, à fixer vos tarifs selon votre revenu cible et à garder le contrôle de vos opérations.',
      whatYouFind: 'Ce Que Vous Trouverez dans IPM Insights',
      learnMore: 'En savoir plus',
      whyCreate: 'Pourquoi IPM Crée Ces Ressources',
      whyCreatDesc: 'La plupart des hôtes ne reçoivent jamais d\'explications transparentes d\'Airbnb, des plateformes PMS ou d\'autres entreprises de gestion de propriétés. Ils sont laissés avec:',
      problems: [
        'Augmentations de frais inattendues',
        'Ventilations de revenus confuses',
        'Dépendance inutile à des logiciels coûteux',
        'Flux de travail d\'automatisation peu clairs',
        'Contrôle limité sur leurs propres opérations'
      ],
      empowered: 'IPM croit que les hôtes doivent être autonomisés, pas confus.',
      mission: 'Notre mission est de fournir la clarté, l\'expertise et les systèmes éprouvés pour que les hôtes gèrent des entreprises de location de vacances à court terme rentables, efficaces et professionnelles dans le monde entier.',
      advantages: 'Notre Expertise — Votre Avantage',
      advantagesDesc: 'À travers IPM Insights, vous apprendrez:',
      advList: [
        'Comment ajuster vos tarifs pour compenser les frais Airbnb tout en restant compétitif',
        'Comment automatiser vos systèmes d\'hébergement sans logiciel PMS coûteux',
        'Comment construire un flux de travail professionnel d\'arrivée des clients',
        'Comment collecter et contrôler vos propres données de clients',
        'Comment mettre à l\'échelle les opérations avec des systèmes simples et efficaces',
        'Comment fonctionner comme une entreprise multinationale de gestion de propriétés'
      ],
      advConc: 'Ces pages sont conçues pour vous aider à devenir un hôte plus intelligent et plus rentable, avec des stratégies du monde réel utilisées dans des centaines de propriétés à l\'international.',
      ready: 'Prêt à Optimiser Vos Opérations?',
      readyDesc: 'Si vous souhaitez une aide personnalisée pour mettre en œuvre l\'un de ces systèmes, ou si vous aimeriez qu\'IPM gère vos propriétés de manière professionnelle, nous sommes là pour vous aider.',
      bookConsultation: 'Agendar une Consultation avec IPM',
      consultDesc: 'Optimisez votre propriété, réduisez les coûts et augmentez les bénéfices. Cliquez ci-dessous pour commencer.',
      scheduleCall: 'Agendar un Appel →',
      topics: [
        {
          title: 'Frais Airbnb Expliqués',
          description: 'Comprenez le passage aux frais uniques payés par l’hôte et leur effet sur le prix des voyageurs et votre revenu net.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'Connexions API et Coûts Opérationnels',
          description: 'Comparez les coûts des logiciels et les avantages de l’automatisation sans compter sur d’anciennes astuces pour éviter les frais Airbnb.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'Comment Compenser les Frais Airbnb',
          description: 'Découvrez comment nous analysons votre marché et adaptons vos tarifs par nuit pour protéger votre revenu net cible.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Conception du Système d\'Arrivée (Méthode IPM)',
          description: 'Un système d’arrivée et de communication flexible pour améliorer les opérations, pas pour éviter les frais Airbnb.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
      ]
    }
  };

  const t = translations[language] || translations.en;
  const iconMap = { DollarSign, LinkIcon, Shield, Smartphone };

  return (
    <div lang={language} className="min-h-screen bg-[#06121F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold mb-4">{t.subtitle}</p>
          <p className="text-lg text-[#C9D2DE] max-w-4xl mx-auto leading-relaxed">{t.intro}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#F8F5EF] rounded-2xl shadow-xl p-8 mb-16">
          <p className="text-lg text-[#334155] leading-relaxed mb-6">{t.mainDesc1}</p>
          <p className="text-lg text-[#334155] leading-relaxed mb-6">{t.mainDesc2}</p>
          <p className="text-lg text-[#334155] leading-relaxed">{t.mainDesc3}</p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.whatYouFind}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.topics.map((topic, index) => {
              const IconComponent = iconMap[['DollarSign', 'LinkIcon', 'Shield', 'Smartphone'][index]];
              const colorClasses = {
                blue: 'from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37]',
                indigo: 'from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37]',
                green: 'from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37]',
                purple: 'from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37]',
                red: 'from-[#D4AF37] to-[#F2D98D] hover:from-[#F2D98D] hover:to-[#D4AF37]'
              };

              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <Link to={topic.path}>
                    <div className="bg-[#0F2440] rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 h-full border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 group">
                      <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${colorClasses[topic.color]} mb-4`}>
                        <IconComponent className="w-8 h-8 text-[#06121F]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{topic.title}</h3>
                      <p className="text-[#C9D2DE] leading-relaxed mb-4">{topic.description}</p>
                      <div className="flex items-center text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform">
                        {t.learnMore} <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl shadow-xl p-8 mb-16 border-l-4 border-[#D4AF37]">
          <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">{t.whyCreate}</h2>
          <p className="text-lg text-[#334155] leading-relaxed mb-6">{t.whyCreatDesc}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {t.problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3 bg-[#F8F5EF] rounded-lg p-4">
                <span className="text-[#D4AF37] mt-1">⚠️</span>
                <span className="text-[#334155] font-medium">{problem}</span>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-[#0A1A30] mb-2">{t.empowered}</p>
          <p className="text-lg text-[#334155]">{t.mission}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[#0A1A30] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">{t.advantages}</h2>
          <p className="text-lg text-[#C9D2DE] mb-6">{t.advantagesDesc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {t.advList.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span className="text-[#C9D2DE] font-medium">{advantage}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-[#C9D2DE] mt-8 font-medium">{t.advConc}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] rounded-2xl shadow-2xl p-8 text-center text-[#06121F]">
          <h2 className="text-3xl font-bold mb-4">{t.ready}</h2>
          <p className="text-lg mb-8 opacity-90">{t.readyDesc}</p>
          <div className="bg-[#06121F]/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-3">{t.bookConsultation}</h3>
            <p className="text-lg mb-6 opacity-90">{t.consultDesc}</p>
            <Link
              to="/contact"
              className="inline-block bg-[#06121F] text-[#F2D98D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0A1A30] transition-colors shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06121F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D4AF37]"
            >
              {t.scheduleCall}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
