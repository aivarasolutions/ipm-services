import { EDUCATION_CATEGORIES } from '../../src/lib/educationShared.js';
import { articles } from './seedArticles.js';
import { resources } from './seedResources.js';
export { articles, resources };
export const categories = EDUCATION_CATEGORIES;
export const existingResources = (locale) => {
  const es = locale === 'es';
  const prefix = es ? '/es' : '';
  return [
    { id: 'calculator', title: es ? 'Calculadora de ingresos y gastos' : 'Rental payout calculator', description: es ? 'Estimaciones editables; no son una promesa de ingresos.' : 'Editable estimates, not an income promise.', url: `${prefix}/payout-calculator`, access: 'free' },
    { id: 'faq', title: es ? 'Preguntas de propietarios' : 'Owner questions and service terms', description: es ? 'Responsabilidades, servicios y condiciones vigentes de IPM.' : 'Current IPM responsibilities, service scope and terms.', url: `${prefix}/faq`, access: 'free' },
    { id: 'setup', title: es ? 'Amueblamiento y preparación' : 'Furnishing and property readiness', description: es ? 'Consulta, búsqueda de muebles y preparación: servicios pagados independientes.' : 'Consultation, sourcing and setup: separate paid services.', url: `${prefix}/services/property-furnishing-setup`, access: 'external' },
    { id: 'portal', title: es ? 'Portal del propietario' : 'Owner portal overview', description: es ? 'Información de reservas e informes; el acceso al portal es privado.' : 'Reservations and reporting; portal account access remains private.', url: '/owner-portal', access: 'external' },
    ...(!es ? [
      { id: 'fees', title: 'Airbnb fee guide', description: 'Existing IPM fee explanations; always check your current platform statement.', url: '/insights/airbnb-fees', access: 'free' },
      { id: 'checkin', title: 'IPM check-in workflow', description: 'Existing educational guide to arrival communication and access.', url: '/insights/checkin-system', access: 'free' },
      { id: 'software', title: 'API connections and operating costs', description: 'Existing guide to software, platform fees and operations.', url: '/insights/api-costs', access: 'free' },
    ] : []),
  ];
};
