import { educationPath, EDUCATION_CATEGORIES } from './educationShared.js';
import community from '../data/educationCommunity.json' with { type: 'json' };
const ORIGIN = 'https://www.ipm.services';
export const escapeEducationHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export function getEducationMetadata(path, options = {}) {
  const match = path.match(/^\/(es\/)?insights\/learn\/([a-z0-9-]+)$/);
  const topic = path.match(/^\/(es\/)?insights\/topics\/([a-z0-9-]+)$/);
  const privateRoute = /^\/(?:admin\/education|sign-in|sign-up)(?:\/|$)/.test(path);
  const resources = path.match(/^\/(es\/)?resources(?:\/(whop))?$/);
  if (!match && !topic && !resources && !privateRoute && !['/insights', '/es/insights'].includes(path)) return null;
  const locale = path.startsWith('/es/') ? 'es' : 'en';
  const es = locale === 'es';
  const article = options.educationArticle;
  const category = topic && EDUCATION_CATEGORIES.find(c => c.id === topic[2]);
  let title, description, h1, indexable = !privateRoute;
  if (match) {
    indexable = Boolean(article?.status === 'published' && article.locale === locale && article.slug === match[2]);
    title = indexable ? article.seoTitle || `${article.title} | IPM` : 'Article not found | IPM';
    h1 = indexable ? article.title : (es ? 'Artículo no disponible' : 'Article unavailable');
    description = indexable ? article.seoDescription || article.excerpt : 'This article is not publicly available.';
  } else if (topic) {
    indexable = Boolean(category);
    h1 = category ? category[locale] : 'Topic not found';
    title = `${h1} | IPM Education & Insights`;
    description = category ? category.description[locale] : 'This topic is not available.';
  } else if (resources) {
    h1 = resources[2] ? (es ? 'Aprenda más con IPM' : 'Learn More With IPM') : (es ? 'Biblioteca de recursos para propietarios' : 'Property Management Resource Library');
    title = `${h1} | IPM`;
    description = resources[2] ? (es ? 'Recursos verificados de la comunidad IPM en Whop. La educación gratuita de IPM no requiere membresía.' : 'Verified IPM Whop community resources. Free IPM educational content does not require membership.') : (es ? 'Listas y herramientas educativas gratuitas para preparar propiedades, coordinar limpieza y revisar gastos.' : 'Free educational checklists and tools for readiness, cleaning, maintenance, expenses and owner reviews.');
  } else if (privateRoute) {
    title = 'IPM Staff Education Editor'; h1 = 'IPM staff access'; description = 'Private staff access to the IPM education editor.';
  } else {
    h1 = es ? 'Educación y artículos de IPM' : 'IPM Education & Insights';
    title = `${h1} | Property Management Education`;
    description = es ? 'Reservas, gastos, sistemas, responsabilidades y decisiones prácticas para propietarios de alquileres temporales.' : 'Practical property management education: bookings, expenses, systems, responsibilities and the realities of running a rental.';
  }
  const alternates = match ? (options.educationAlternates || []).map(a => ({ hreflang: a.locale, href: `${ORIGIN}${educationPath(a.locale, a.slug)}` })) : privateRoute ? [] : ['en', 'es'].map(lang => ({ hreflang: lang, href: `${ORIGIN}${lang === 'es' ? '/es' : ''}${path.replace(/^\/es/, '')}` }));
  const english = alternates.find(a => a.hreflang === 'en');
  if (english) alternates.push({ hreflang: 'x-default', href: english.href });
  return { title, description, h1, intro: article?.introduction || description, locale, routePath: path.replace(/^\/es/, ''), canonical: `${ORIGIN}${path}`, indexable, alternates };
}
export function educationStructuredData(article, alternates = []) {
  const canonical = `${ORIGIN}${educationPath(article.locale, article.slug)}`;
  return [
    { '@context':'https://schema.org', '@type':'Article', headline:article.title, description:article.excerpt, inLanguage:article.locale, datePublished:article.publishedAt, dateModified:article.reviewedAt, author:{'@type':'Organization',name:article.author,url:`${ORIGIN}/about`}, publisher:{'@type':'Organization',name:'International Property Management',url:ORIGIN,logo:{'@type':'ImageObject',url:`${ORIGIN}/images/ipm-logo-new-optimized.webp`}}, mainEntityOfPage:canonical, ...(article.imageUrl ? { image: article.imageUrl.startsWith('/') ? `${ORIGIN}${article.imageUrl}` : article.imageUrl } : {}), ...(alternates.length > 1 ? { workTranslation: alternates.filter(a=>a.locale!==article.locale).map(a=>({'@type':'Article',inLanguage:a.locale,url:`${ORIGIN}${educationPath(a.locale,a.slug)}`})) } : {}) },
    { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem',position:1,name:'IPM',item:ORIGIN },{ '@type':'ListItem',position:2,name:article.locale==='es'?'Educación':'Education & Insights',item:`${ORIGIN}${educationPath(article.locale)}` },{ '@type':'ListItem',position:3,name:article.title,item:canonical }] },
  ];
}
export function createEducationSource(path, options, metadata) {
  const e = escapeEducationHtml;
  const es = metadata.locale === 'es';
  const article = options.educationArticle;
  let content;
  if (article && metadata.indexable) {
    content = `<p>${e(article.author)} · ${es?'Publicado':'Published'} ${e(article.publishedAt)} · ${es?'Revisado':'Reviewed'} ${e(article.reviewedAt)}</p><p>${e(article.introduction)}</p>${article.sections.map(s => `<section><h2>${e(s.heading)}</h2>${s.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}${s.bullets.length?`<ul>${s.bullets.map(b=>`<li>${e(b)}</li>`).join('')}</ul>`:''}</section>`).join('')}<h2>${es?'En resumen':'The practical takeaway'}</h2><p>${e(article.conclusion)}</p><h2>${es?'Fuentes':'Sources'}</h2><ul>${article.sources.map(s=>`<li><a href="${e(s.url)}">${e(s.title)}</a> · ${e(s.reviewedAt)}</li>`).join('')}</ul>${article.internalLinks.map(s=>`<p><a href="${e(s.url)}">${e(s.title)}</a></p>`).join('')}`;
  } else {
    const articles = options.educationCatalogue?.articles || [];
    const resources = options.educationCatalogue?.resources || [];
    const topic = path.match(/\/topics\/([a-z0-9-]+)$/)?.[1];
    content = `<p>${e(metadata.description)}</p>${(topic ? articles.filter(a=>a.category===topic) : articles).map(a=>`<section><h2><a href="${e(educationPath(a.locale,a.slug))}">${e(a.title)}</a></h2><p>${e(a.excerpt)}</p></section>`).join('')}${resources.map(r=>`<section><h2>${e(r.title)}</h2><p>${e(r.description)}</p><ul>${r.template.map(t=>`<li>${e(t)}</li>`).join('')}</ul></section>`).join('')}<p><a href="${es?'/es':''}/resources">${es?'Biblioteca de recursos':'Resource library'}</a></p>`;
    if (options.educationWhop?.verified) content += `<section><h2>IPM Whop</h2>${options.educationWhop.offerings.map(o=>`<h3><a href="${e(o.url)}">${e(o.title)}</a></h3><p>${e(o.description)}</p><p>${e(o.priceLabel)}</p>`).join('')}</section>`;
  }
  if (/^\/(?:es\/)?resources/.test(path)) content += `<section><h2>IPM Host &amp; Owner Club · Discord</h2><p><a href="${e(community.discordInviteUrl)}">${es?'Abrir comunidad en Discord':'Open the Discord community'}</a></p><p>${es?'La membresía de Whop y los permisos de cada canal se gestionan por separado.':'Whop membership and individual channel permissions are managed separately.'}</p></section>`;
  return `<main class="seo-route-shell" lang="${metadata.locale}" style="background:#f7f4ec;color:#102235;padding:4rem max(1rem,calc((100vw - 850px)/2));line-height:1.8"><nav><a href="${es?'/es/insights':'/insights'}">IPM · ${es?'Educación':'Education & Insights'}</a></nav><h1>${e(metadata.h1)}</h1>${content}</main>`;
}
