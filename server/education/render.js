import { educationStructuredData } from '../../src/lib/educationSeo.js';
import { injectSeoMetadataIntoHtml } from '../../src/lib/seo.js';
import { injectStructuredDataIntoHtml } from '../../src/lib/structuredData.js';
import { categories, existingResources } from './seeds.js';
export const isEducationDocument = path => /^\/(?:es\/)?(?:insights(?:\/(?:learn|topics)\/[^/]+)?|resources(?:\/whop)?)$/.test(path) || /^\/(?:admin\/education|sign-in|sign-up)(?:\/.*)?$/.test(path);
export async function educationDocumentOptions(path, store, whop) {
  if (/^\/(?:admin\/education|sign-in|sign-up)/.test(path)) return {};
  const locale = path.startsWith('/es/') ? 'es' : 'en';
  const articleSlug = path.match(/\/learn\/([^/]+)$/)?.[1];
  const articles = await store.all('article', { published: true });
  if (articleSlug) {
    const educationArticle = articles.find(a => a.locale === locale && a.slug === articleSlug);
    if (!educationArticle) throw Object.assign(new Error('Article not found'), { status: 404 });
    const educationAlternates = articles.filter(a => a.translationKey === educationArticle.translationKey).map(a => ({ locale: a.locale, slug: a.slug }));
    return { educationArticle, educationAlternates };
  }
  const topic = path.match(/\/topics\/([^/]+)$/)?.[1];
  if (topic && !categories.some(c => c.id === topic)) throw Object.assign(new Error('Topic not found'), { status: 404 });
  const resources = await store.all('resource', { locale, published: true });
  const options = { educationCatalogue: { locale, articles: articles.filter(a => a.locale === locale), resources, categories, existingResources: existingResources(locale) } };
  if (path.endsWith('/whop')) options.educationWhop = await whop.get((await store.settings()).whopStoreUrl);
  return options;
}
export function renderEducationDocument(html, path, options) {
  let output = injectSeoMetadataIntoHtml(html, path, options);
  output = injectStructuredDataIntoHtml(output, path, options);
  if (options.educationArticle) {
    const tags = educationStructuredData(options.educationArticle, options.educationAlternates).map(schema => `<script data-education-schema type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`).join('\n');
    output = output.replace('</head>', `${tags}</head>`);
    output = output.replace(/(<meta[^>]*property="og:type"[^>]*content=")[^"]*/, '$1article');
  }
  return output;
}
