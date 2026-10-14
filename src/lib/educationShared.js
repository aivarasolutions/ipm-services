export const EDUCATION_CATEGORIES = [
  { id: 'fundamentals', en: 'Property Management 101', es: 'Fundamentos de administración', description: { en: 'Responsibilities, agreements and deciding who does the work.', es: 'Responsabilidades, acuerdos y quién se encarga del trabajo.' } },
  { id: 'reality', en: 'The Good, the Bad & the Reality', es: 'Lo bueno, lo difícil y la realidad', description: { en: 'Empty nights, complaints, unexpected costs and practical responses.', es: 'Noches vacías, quejas, gastos inesperados y respuestas prácticas.' } },
  { id: 'operations', en: 'How a Property Should Be Managed', es: 'Cómo administrar una propiedad', description: { en: 'A repeatable operating process from readiness to owner reporting.', es: 'Un proceso claro desde la preparación hasta los informes al propietario.' } },
  { id: 'requirements', en: 'Property Management Requirements', es: 'Requisitos y responsabilidades', description: { en: 'Questions to verify with local authorities and qualified advisers.', es: 'Preguntas para verificar con autoridades locales y asesores calificados.' } },
  { id: 'platforms', en: 'Booking Platforms & Revenue', es: 'Plataformas y reservas', description: { en: 'Channel differences, availability, fees and listing decisions.', es: 'Diferencias entre canales, disponibilidad, comisiones y anuncios.' } },
  { id: 'maintenance', en: 'Maintenance & Property Care', es: 'Mantenimiento y cuidado', description: { en: 'Turnovers, inspections, contractors and preventing avoidable failures.', es: 'Limpieza entre estancias, inspecciones, proveedores y prevención.' } },
  { id: 'technology', en: 'Technology & Automation', es: 'Tecnología y automatización', description: { en: 'Connected systems with human responsibility and escalation.', es: 'Sistemas conectados con supervisión y responsabilidad humana.' } },
  { id: 'finance', en: 'Owner Financial Education', es: 'Finanzas para propietarios', description: { en: 'Gross revenue, costs, reserves and cash flow—not income promises.', es: 'Ingresos, gastos, reservas y flujo de efectivo, sin promesas de rentabilidad.' } },
];
export const educationPath = (locale, slug = '') => `${locale === 'es' ? '/es' : ''}/insights${slug ? `/learn/${slug}` : ''}`;
export const resourcePath = (locale, suffix = '') => `${locale === 'es' ? '/es' : ''}/resources${suffix ? `/${suffix}` : ''}`;
export const articleText = (article) => [article.title, article.excerpt, article.introduction, ...(article.sections || []).flatMap(s => [s.heading, ...(s.paragraphs || []), ...(s.bullets || [])]), article.conclusion].filter(Boolean).join('\n\n');
export const readingMinutes = (article) => article.readingMinutes || Math.max(1, Math.ceil(articleText(article).split(/\s+/).length / 200));
