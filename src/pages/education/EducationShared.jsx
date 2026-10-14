/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, RefreshCw } from 'lucide-react';
import { getEducationCatalogue } from '../../services/educationApi';
import { EDUCATION_CATEGORIES, educationPath, resourcePath, readingMinutes } from '../../lib/educationShared';
import './Education.css';

export const localeFromPath = () => window.location.pathname.startsWith('/es/') || window.location.pathname === '/es' ? 'es' : 'en';
export const localized = (value, locale) => typeof value === 'string' ? value : value?.[locale] || value?.en || '';
export const safeExternal = (url) => {
  try { const parsed = new URL(url); return parsed.protocol === 'https:' ? parsed.href : null; } catch { return null; }
};
export const safeResourceHref = (url) => typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') ? url : safeExternal(url);
export function useCatalogue(locale) {
  const [catalogue, setCatalogue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = () => {
    setLoading(true); setError('');
    getEducationCatalogue(locale).then(setCatalogue).catch((e) => setError(e.message || (locale === 'es' ? 'No se pudo cargar el contenido.' : 'Education content could not be loaded.'))).finally(() => setLoading(false));
  };
  useEffect(load, [locale]);
  return { catalogue, loading, error, retry: load };
}
export function CategoryName({ category, locale }) {
  const known = EDUCATION_CATEGORIES.find((item) => item.id === category);
  return localized(known || category, locale) || (locale === 'es' ? 'Guía práctica' : 'Practical guide');
}
export function StatusMessage({ loading, error, retry, empty, locale }) {
  if (loading) return <div className="edu-grid" aria-label={locale === 'es' ? 'Cargando' : 'Loading'}>{[0,1,2].map((i) => <div className="edu-skeleton" key={i} />)}</div>;
  if (error) return <div className="edu-error" role="alert">{error}<br/><button className="edu-btn secondary" onClick={retry}><RefreshCw size={16}/>{locale === 'es' ? 'Reintentar' : 'Try again'}</button></div>;
  if (empty) return <div className="edu-empty">{locale === 'es' ? 'No hay contenido que coincida. Pruebe otra búsqueda o categoría.' : 'Nothing matches yet. Try another search or category.'}</div>;
  return null;
}
export function ArticleCard({ article, locale }) {
  return <Link className="edu-card" to={educationPath(locale, article.slug)}>
    <span className="edu-label"><CategoryName category={article.category} locale={locale}/></span>
    <h3>{article.title}</h3>
    <p>{article.excerpt}</p>
    <div className="edu-card-foot"><span>{article.author || (locale === 'es' ? 'Equipo IPM' : 'IPM team')} · {readingMinutes(article)} {locale === 'es' ? 'min de lectura' : 'min read'}</span><span className="edu-card-arrow" aria-hidden="true">↗</span></div>
  </Link>;
}
export function EducationMasthead({ locale, eyebrow, title, description }) {
  return <section className="edu-hero" lang={locale}><div className="edu-wrap edu-hero-inner">
    <div className="edu-kicker">{eyebrow}</div><h1>{title}</h1><p>{description}</p>
  </div></section>;
}
export function ResourceLinks({ catalogue, locale }) {
  const resources = catalogue?.resources || [];
  const legacy = catalogue?.existingResources || [];
  return <div className="edu-columns">
    <div className="edu-panel"><div className="edu-kicker">{locale === 'es' ? 'Recursos prácticos' : 'Useful in practice'}</div><h2>{locale === 'es' ? 'Herramientas para operar con más claridad' : 'Tools for running the operation clearly'}</h2><p>{locale === 'es' ? 'Materiales concretos para el trabajo cotidiano del propietario. Los requisitos de acceso se indican con honestidad.' : 'Practical materials for the owner’s day-to-day work. Access requirements are stated plainly.'}</p><Link className="edu-btn" to={resourcePath(locale)}>{locale === 'es' ? 'Explorar recursos' : 'Explore resources'} <ArrowRight size={17}/></Link></div>
    <div className="edu-panel" style={{background:'#e9e4d8',color:'#102235'}}><div className="edu-kicker">{locale === 'es' ? 'Ya disponible en IPM' : 'Already available from IPM'}</div>
      {[...legacy.slice(0,2), ...resources.slice(0,1)].length ? [...legacy.slice(0,2), ...resources.slice(0,1)].map((item, i) => {
        const href = safeResourceHref(item.url);
        return <div className="edu-resource-row" key={item.id || `${item.title}-${i}`}><div><h3>{item.title}</h3><p>{item.description}</p></div>{href && (href.startsWith('/') ? <Link className="edu-link" to={href}>{item.access || 'Open'} ↗</Link> : <a className="edu-link" href={href} target="_blank" rel="noreferrer">{item.access || 'Open'} ↗</a>)}</div>;
      }) : <p>{locale === 'es' ? 'Los recursos aparecerán aquí cuando estén disponibles.' : 'Resources will appear here when they are available.'}</p>}
    </div>
  </div>;
}
export function SearchField({ value, onChange, locale }) {
  return <div className="edu-search-row"><div style={{position:'relative',flex:1}}><Search size={18} aria-hidden="true" style={{position:'absolute',left:15,top:16,color:'#697787'}}/><input className="edu-search" style={{paddingLeft:44,width:'100%'}} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={locale === 'es' ? 'Buscar artículos, preguntas y temas…' : 'Search articles, questions and topics…'} aria-label={locale === 'es' ? 'Buscar contenido educativo' : 'Search education content'}/></div><span className="edu-label"><BookOpen size={15} style={{verticalAlign:'middle',marginRight:5}}/>{locale === 'es' ? 'Biblioteca abierta' : 'Open library'}</span></div>;
}
export function useFilteredArticles(articles, query, category) {
  const term = query.trim().toLowerCase();
  return (articles || []).filter((article) => (!category || article.category === category) && (!term || `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(term)));
}
