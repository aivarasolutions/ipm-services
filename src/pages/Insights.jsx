import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DollarSign, Link as LinkIcon, Shield, Smartphone, Video, ArrowRight, CheckCircle } from 'lucide-react';

export default function Insights() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'INSIGHTS',
      subtitle: 'Expert Knowledge, Transparent Guidance, and Professional Hosting Strategies',
      intro: 'Welcome to the IPM Insights Hub — the industry\'s most direct and transparent educational resource for short-term rental hosts.',
      mainDesc1: 'Airbnb, PMS platforms, and channel managers often keep hosts in the dark about how fees work, how systems interact, and how API connections can dramatically impact your payouts. At IPM, we believe hosts deserve clarity, control, and modern tools that protect their profits.',
      mainDesc2: 'This section of our website provides professional, no-nonsense explanations of how the industry really works, based on what we teach our global property management clients every day.',
      mainDesc3: 'Whether you\'re a new host or managing multiple properties, these guides will help you upgrade your operations, avoid hidden fees, and build systems that keep you in full control of your business.',
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
        'How to prevent Airbnb from taking 15–20% of your income',
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
          title: 'Airbnb Fees Explained',
          description: 'A direct, professional breakdown of how Airbnb fees actually work today — including the split-fee model, host-only fee model, and how hosts lose thousands per year without realizing it.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'API Connections & Hidden Costs',
          description: 'A deeper look at PMS and channel manager integrations. Learn why an API connection triggers Airbnb\'s 15.5% host-only fee, why Airbnb keeps this quiet, and what it means for your earnings.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'How to Avoid the 15.5% Fee',
          description: 'A proven, step-by-step strategy to return your listings to the 3% fee model, eliminate unnecessary charges, and maintain full automation — safely and correctly.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Check-In System Design (IPM Method)',
          description: 'Our professional, API-free system for guest communication, data collection, and automation. Clean, scalable, brand-consistent, and completely under your control.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
        {
          title: 'IPM Video Library',
          description: 'A growing collection of educational videos, system breakdowns, tutorials, and expert host training designed to help you operate with clarity and confidence.',
          path: '/insights/video-library',
          color: 'red'
        }
      ]
    },
    es: {
      title: 'INSIGHTS',
      subtitle: 'Conocimiento Experto, Orientación Transparente y Estrategias Profesionales de Hosting',
      intro: 'Bienvenido al Centro de Insights de IPM — el recurso educativo más directo y transparente de la industria para anfitriones de alquileres a corto plazo.',
      mainDesc1: 'Airbnb, las plataformas PMS y los gestores de canales a menudo mantienen a los anfitriones a oscuras sobre cómo funcionan las tarifas, cómo interactúan los sistemas y cómo las conexiones API pueden impactar dramáticamente sus pagos. En IPM, creemos que los anfitriones merecen claridad, control y herramientas modernas que protejan sus ganancias.',
      mainDesc2: 'Esta sección de nuestro sitio web proporciona explicaciones profesionales y directas sobre cómo funciona realmente la industria, basadas en lo que enseñamos a nuestros clientes de gestión de propiedades globales todos los días.',
      mainDesc3: 'Ya sea que sea un anfitrión nuevo o esté administrando múltiples propiedades, estas guías le ayudarán a mejorar sus operaciones, evitar tarifas ocultas y crear sistemas que lo mantengan en control total de su negocio.',
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
        'Cómo evitar que Airbnb se lleve el 15–20% de sus ingresos',
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
          title: 'Tarifas de Airbnb Explicadas',
          description: 'Un desglose directo y profesional de cómo funcionan realmente las tarifas de Airbnb hoy — incluyendo el modelo de tarifa dividida, el modelo de tarifa solo para anfitriones y cómo los anfitriones pierden miles por año sin darse cuenta.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'Conexiones API y Costos Ocultos',
          description: 'Un análisis más profundo de integraciones PMS y gestores de canales. Aprenda por qué una conexión API desencadena la tarifa solo para anfitriones del 15.5% de Airbnb, por qué Airbnb lo mantiene en secreto y qué significa para sus ganancias.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'Cómo Evitar la Tarifa del 15.5%',
          description: 'Una estrategia comprobada paso a paso para devolver sus anuncios al modelo de tarifa del 3%, eliminar cargos innecesarios y mantener automatización completa, de forma segura y correcta.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Diseño del Sistema de Check-In (Método IPM)',
          description: 'Nuestro sistema profesional sin API para comunicación con huéspedes, recopilación de datos y automatización. Limpio, escalable, coherente con la marca y completamente bajo su control.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
        {
          title: 'Biblioteca de Videos de IPM',
          description: 'Una colección creciente de videos educativos, desglose de sistemas, tutoriales y capacitación de expertos en hosting diseñados para ayudarle a operar con claridad y confianza.',
          path: '/insights/video-library',
          color: 'red'
        }
      ]
    },
    fr: {
      title: 'INSIGHTS',
      subtitle: 'Connaissance d\'Expert, Orientation Transparente et Stratégies d\'Hébergement Professionnelles',
      intro: 'Bienvenue au Centre IPM Insights — la ressource éducative la plus directe et transparente de l\'industrie pour les hôtes de location de vacances à court terme.',
      mainDesc1: 'Airbnb, les plateformes PMS et les gestionnaires de canaux gardent souvent les hôtes dans l\'ignorance sur le fonctionnement des frais, l\'interaction des systèmes et l\'impact dramatique des connexions API sur vos revenus. Chez IPM, nous croyons que les hôtes méritent la clarté, le contrôle et les outils modernes qui protègent leurs profits.',
      mainDesc2: 'Cette section de notre site Web fournit des explications professionnelles et directes sur le fonctionnement réel de l\'industrie, basées sur ce que nous enseignons à nos clients de gestion de propriété mondiaux chaque jour.',
      mainDesc3: 'Que vous soyez un nouvel hôte ou que vous gériez plusieurs propriétés, ces guides vous aideront à améliorer vos opérations, à éviter les frais cachés et à créer des systèmes qui vous maintiennent en contrôle total de votre entreprise.',
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
        'Comment empêcher Airbnb de prendre 15–20% de vos revenus',
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
          description: 'Une ventilation directe et professionnelle de la façon dont les frais Airbnb fonctionnent réellement aujourd\'hui, y compris le modèle de frais partagés, le modèle de frais réservés aux hôtes et comment les hôtes perdent des milliers par an sans s\'en rendre compte.',
          path: '/insights/airbnb-fees',
          color: 'blue'
        },
        {
          title: 'Connexions API et Coûts Cachés',
          description: 'Un regard plus approfondi sur les intégrations PMS et les gestionnaires de canaux. Découvrez pourquoi une connexion API déclenche les frais réservés aux hôtes de 15,5% d\'Airbnb, pourquoi Airbnb le garde secret et ce que cela signifie pour vos revenus.',
          path: '/insights/api-costs',
          color: 'indigo'
        },
        {
          title: 'Comment Éviter les Frais de 15,5%',
          description: 'Une stratégie étape par étape éprouvée pour ramener vos annonces au modèle de frais de 3%, éliminer les frais inutiles et maintenir une automatisation complète, en toute sécurité et correctement.',
          path: '/insights/avoid-fees',
          color: 'green'
        },
        {
          title: 'Conception du Système d\'Arrivée (Méthode IPM)',
          description: 'Notre système professionnel sans API pour la communication avec les clients, la collecte de données et l\'automatisation. Propre, évolutif, cohérent avec la marque et entièrement sous votre contrôle.',
          path: '/insights/checkin-system',
          color: 'purple'
        },
        {
          title: 'Bibliothèque Vidéo IPM',
          description: 'Une collection croissante de vidéos éducatives, de ventilations de systèmes, de tutoriels et de formation d\'experts en hébergement conçus pour vous aider à opérer avec clarté et confiance.',
          path: '/insights/video-library',
          color: 'red'
        }
      ]
    }
  };

  const t = translations[language] || translations.en;
  const iconMap = { DollarSign, LinkIcon, Shield, Smartphone, Video };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">{t.subtitle}</p>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">{t.intro}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{t.mainDesc1}</p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{t.mainDesc2}</p>
          <p className="text-lg text-slate-700 leading-relaxed">{t.mainDesc3}</p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{t.whatYouFind}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.topics.map((topic, index) => {
              const IconComponent = iconMap[['DollarSign', 'LinkIcon', 'Shield', 'Smartphone', 'Video'][index]];
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              };

              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <Link to={topic.path}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 h-full border-2 border-transparent hover:border-blue-200 group">
                      <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${colorClasses[topic.color]} mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{topic.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-4">{topic.description}</p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                        {t.learnMore} <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-16 border-l-4 border-amber-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.whyCreate}</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{t.whyCreatDesc}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {t.problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/70 rounded-lg p-4">
                <span className="text-amber-600 mt-1">⚠️</span>
                <span className="text-slate-800 font-medium">{problem}</span>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-slate-900 mb-2">{t.empowered}</p>
          <p className="text-lg text-slate-700">{t.mission}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.advantages}</h2>
          <p className="text-lg text-slate-700 mb-6">{t.advantagesDesc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {t.advList.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-slate-800 font-medium">{advantage}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-slate-700 mt-8 font-medium">{t.advConc}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t.ready}</h2>
          <p className="text-lg mb-8 opacity-90">{t.readyDesc}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-3">{t.bookConsultation}</h3>
            <p className="text-lg mb-6 opacity-90">{t.consultDesc}</p>
            <Link to="/contact">
              <button className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
                {t.scheduleCall}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
