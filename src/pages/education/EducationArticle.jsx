import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3, CalendarDays, UserRound } from 'lucide-react';
import ClickToPlayVideo from '../../components/ClickToPlayVideo';
import { getEducationArticle } from '../../services/educationApi';
import { educationPath, readingMinutes, resourcePath } from '../../lib/educationShared';
import { CategoryName, localeFromPath, safeExternal } from './EducationShared';
import { getEducationMetadata, educationStructuredData } from '../../lib/educationSeo';
import { applySeoMetadataToDocument } from '../../lib/clientSeo';

function formatArticleDate(value, locale) {
  if (!value) return '';
  const raw = String(value);
  // Date-only values are calendar dates, not UTC instants; parse them locally
  // so western time zones do not display the previous day.
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale === 'es' ? 'es' : 'en', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function EducationArticle() {
  const { slug = '' } = useParams();
  const locale = localeFromPath();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = () => { setLoading(true); setError(''); getEducationArticle(locale, slug).then(setData).catch(e=>setError(e.message || 'Unable to load this article.')).finally(()=>setLoading(false)); };
  useEffect(load, [locale, slug]);
  const article = data?.article;
  useEffect(() => {
    const path = educationPath(locale, slug);
    applySeoMetadataToDocument(getEducationMetadata(path, { educationArticle: article, educationAlternates: data?.alternates || [] }));
    document.querySelectorAll('[data-education-schema]').forEach(s => s.remove());
    if (article) {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json'; tag.dataset.educationSchema = '';
      tag.textContent = JSON.stringify(educationStructuredData(article, data.alternates));
      document.head.appendChild(tag);
    }
    return () => document.querySelectorAll('[data-education-schema]').forEach(s => s.remove());
  }, [article, data, locale, slug]);
  if (loading) return <main className="education"><div className="edu-hero"><div className="edu-wrap edu-hero-inner"><div className="edu-skeleton" style={{maxWidth:650}}/></div></div><div className="edu-wrap edu-section"><div className="edu-skeleton"/></div></main>;
  if (error || !article) return <main className="education"><div className="edu-wrap edu-section"><div className="edu-error" role="alert">{error || (locale==='es'?'No se encontró este artículo.':'This article was not found.')}<br/><button className="edu-btn secondary" onClick={load}>{locale==='es'?'Reintentar':'Try again'}</button></div><Link className="edu-link" to={educationPath(locale)}>{locale==='es'?'Volver a educación':'Back to education'}</Link></div></main>;
  const es = locale === 'es';
  return <main className="education" lang={locale}>
    <header className="edu-article-head">
      <div className="edu-wrap edu-article-head-inner">
        <Link className="edu-link edu-article-back" to={educationPath(locale)}><ArrowLeft size={16}/>{es?'Educación':'Education'}</Link>
        <div className="edu-kicker edu-article-category"><CategoryName category={article.category} locale={locale}/></div>
        <h1>{article.title}</h1>
        <p className="edu-article-excerpt">{article.excerpt}</p>
        <div className="edu-meta" aria-label={es ? 'Información del artículo' : 'Article information'}>
          <span className="edu-meta-item"><UserRound size={15} aria-hidden="true"/>{article.author || (es?'Equipo IPM':'IPM team')}</span>
          <span className="edu-meta-item"><Clock3 size={15} aria-hidden="true"/>{readingMinutes(article)} {es?'min de lectura':'min read'}</span>
          {article.publishedAt && <span className="edu-meta-item"><CalendarDays size={15} aria-hidden="true"/>{es?'Publicado':'Published'} <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt, locale)}</time></span>}
        </div>
      </div>
    </header>
     {article.imageUrl && <div className="edu-wrap edu-article-image"><img src={article.imageUrl} alt={article.imageAlt || (es ? 'Imagen del artículo' : 'Article image')} width="1600" height="900"/></div>}
    <div className="edu-wrap edu-article-layout"><article className="edu-prose">
      <div className="edu-byline">{es?'Última revisión':'Last reviewed'}: {formatArticleDate(article.reviewedAt, locale) || (es?'No indicada':'Not specified')} · {es?'Contenido educativo; confirme las reglas locales vigentes.':'Educational information; verify current local requirements.'}</div>
      {article.introduction && <p>{article.introduction}</p>}
      {(article.sections || []).map((section,index)=><section key={`${section.heading}-${index}`}><h2>{section.heading}</h2>{(section.paragraphs || []).map((text,i)=><p key={i}>{text}</p>)}{section.bullets?.length>0 && <ul>{section.bullets.map((item,i)=><li key={i}>{item}</li>)}</ul>}</section>)}
      {article.conclusion && <section><h2>{es?'En resumen':'The practical takeaway'}</h2><p>{article.conclusion}</p></section>}
       {(article.sources?.length>0) && <section><h2>{es?'Fuentes y revisión':'Sources & review'}</h2><ul>{article.sources.map((source,i)=>{const href=safeExternal(source.url);return <li key={`${source.url}-${i}`}>{href?<a href={href} target="_blank" rel="noopener noreferrer">{source.title || href}</a>:source.title}{source.reviewedAt && <small> — {es?'consultado':'reviewed'} {formatArticleDate(source.reviewedAt, locale)}</small>}</li>})}</ul></section>}
      {article.internalLinks?.length>0 && <section><h2>{es?'Lecturas relacionadas':'Related IPM information'}</h2><ul>{article.internalLinks.map((link,i)=><li key={`${link.url}-${i}`}>{link.url?.startsWith('/') ? <Link to={link.url}>{link.title}</Link> : safeExternal(link.url) ? <a href={safeExternal(link.url)} target="_blank" rel="noreferrer">{link.title}</a> : link.title}</li>)}</ul></section>}
      {article.videoUrl && <section><h2>{es?'Video relacionado':'Related video'}</h2><div style={{maxWidth:360}}><ClickToPlayVideo video={{src:article.videoUrl,title:article.title,poster:article.imageUrl}} language={locale}/></div></section>}
      <p style={{fontSize:'.85rem',color:'#5d6975'}}>{es?'La información es educativa y no sustituye asesoramiento legal, fiscal o profesional local.':'This material is educational and is not a substitute for local legal, tax, or professional advice.'}</p>
    </article><aside className="edu-article-aside"><div className="edu-kicker">{es?'Sigue explorando':'Keep learning'}</div>{(data.related || []).slice(0,4).map((item)=><Link key={item.id || item.slug} to={educationPath(locale,item.slug)}>{item.title} <ArrowRight size={13}/></Link>)}<div style={{borderTop:'1px solid #d0c9ba',marginTop:16,paddingTop:16}}><Link to={resourcePath(locale)} className="edu-link">{es?'Biblioteca de recursos':'Practical resources'} <ArrowRight size={15}/></Link></div>{data.alternates?.filter(a=>a.locale!==locale).map(a=><Link key={`${a.locale}-${a.slug}`} to={educationPath(a.locale,a.slug)}>{a.locale==='es'?'Leer en español':'Read in English'}</Link>)}</aside></div>
  </main>;
}
