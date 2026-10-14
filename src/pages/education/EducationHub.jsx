import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EDUCATION_CATEGORIES, educationPath, resourcePath } from '../../lib/educationShared';
import { EducationMasthead, ArticleCard, CategoryName, ResourceLinks, SearchField, StatusMessage, useCatalogue, useFilteredArticles, localeFromPath } from './EducationShared';

export default function EducationHub() {
  const locale = localeFromPath();
  const { catalogue, loading, error, retry } = useCatalogue(locale);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const articles = useMemo(() => catalogue?.articles || [], [catalogue]);
  const filtered = useFilteredArticles(articles, query, category);
  const featured = articles.slice(0, 3);
  const heroArticle = featured[0];
  const es = locale === 'es';
  return <main className="education" lang={locale}>
    <EducationMasthead locale={locale} eyebrow={es ? 'Educación e información IPM' : 'IPM education & insights'} title={es ? 'La operación completa de una propiedad de alquiler.' : 'Understand the whole rental operation.'} description={es ? 'Reservas, costos, sistemas, responsabilidades y las cosas que suelen quedar fuera de la conversación. Explicado de forma práctica y directa.' : 'Bookings, costs, systems, responsibilities, and the parts that are usually left out of the conversation. Explained plainly, from an operator’s point of view.'}/>
    {heroArticle && <section className="edu-wrap edu-featured" aria-label={es ? 'Artículo destacado' : 'Featured article'}>
      <div className="edu-featured-copy"><div className="edu-kicker">{es ? 'Para empezar' : 'A good place to start'}</div><h2>{heroArticle.title}</h2><p>{heroArticle.excerpt}</p><Link className="edu-link" to={educationPath(locale, heroArticle.slug)}>{es ? 'Leer artículo' : 'Read the article'} <ArrowRight size={17}/></Link></div>
      <div className="edu-featured-image">{heroArticle.imageUrl && <img src={heroArticle.imageUrl} alt={heroArticle.imageAlt || ''}/>}</div>
    </section>}
    <section className="edu-wrap edu-section" aria-labelledby="edu-library-title">
      <div className="edu-section-head"><div><div className="edu-kicker">{es ? 'Biblioteca educativa' : 'Education library'}</div><h2 id="edu-library-title">{es ? 'Respuestas para operar mejor' : 'Answers for running the business'}</h2></div><Link className="edu-link" to={resourcePath(locale)}>{es ? 'Ver recursos' : 'Browse resources'} <ArrowRight size={17}/></Link></div>
      <SearchField value={query} onChange={setQuery} locale={locale}/>
      <div className="edu-chips" aria-label={es ? 'Filtrar por categoría' : 'Filter by category'}>
        <button className={`edu-chip ${!category?'active':''}`} onClick={()=>setCategory('')}>{es ? 'Todos los temas' : 'All topics'}</button>
        {(catalogue?.categories?.length ? catalogue.categories : EDUCATION_CATEGORIES).map((item)=><button key={item.id} className={`edu-chip ${category===item.id?'active':''}`} onClick={()=>setCategory(item.id)} aria-pressed={category===item.id}><CategoryName category={item} locale={locale}/></button>)}
      </div>
      <div style={{marginTop:20}}><StatusMessage loading={loading} error={error} retry={retry} empty={!filtered.length} locale={locale}/></div>
      {!loading && !error && filtered.length > 0 && <div className="edu-grid">{filtered.map((article)=><ArticleCard key={article.id || article.slug} article={article} locale={locale}/>)}</div>}
    </section>
    <section className="edu-wrap edu-section" style={{paddingTop:0}}><h2>{es ? 'Guías por tema' : 'Explore a topic in depth'}</h2><div className="edu-grid">{EDUCATION_CATEGORIES.map(c => <Link className="edu-card" key={c.id} to={`${es ? '/es' : ''}/insights/topics/${c.id}`}><h3>{c[locale]}</h3><p>{c.description[locale]}</p><span className="edu-link">{es ? 'Ver guía' : 'Explore topic'} →</span></Link>)}</div></section>
    <section className="edu-wrap edu-section" style={{paddingTop:0}}><ResourceLinks catalogue={catalogue} locale={locale}/></section>
    <section className="edu-dark-section"><div className="edu-wrap edu-section"><div className="edu-columns"><div><div className="edu-kicker">{es ? 'Sin promesas fáciles' : 'No easy promises'}</div><h2>{es ? 'La ocupación no es lo mismo que la ganancia.' : 'Occupancy is not the same as profit.'}</h2><p>{es ? 'Una propiedad también implica limpieza, mantenimiento, comisiones, impuestos, temporadas lentas y decisiones del propietario. Aprender el sistema ayuda a hacer mejores preguntas.' : 'A rental also means cleaning, maintenance, platform fees, taxes, slow periods, and owner decisions. Understanding the system helps you ask better questions.'}</p></div><div><div className="edu-kicker">{es ? 'Contenido revisado' : 'Reviewed with care'}</div><h2>{es ? 'Lo que no esté confirmado se dice.' : 'If a detail is uncertain, we say so.'}</h2><p>{es ? 'Los temas legales, fiscales y las reglas de cada plataforma cambian por lugar y fecha. Revise las fuentes citadas y confirme los requisitos con las autoridades y asesores adecuados.' : 'Legal, tax, and platform rules change by place and over time. Check cited sources and confirm requirements with the relevant authorities and qualified advisers.'}</p></div></div></div></section>
    <section className="edu-wrap edu-section"><div className="edu-section-head"><div><div className="edu-kicker">{es ? 'Selección editorial' : 'Editor’s picks'}</div><h2>{es ? 'Tres guías para comenzar' : 'Three useful starting points'}</h2></div><Link className="edu-link" to={educationPath(locale)}>{es ? 'Todos los artículos' : 'All articles'} <ArrowRight size={17}/></Link></div>
      {loading ? <StatusMessage loading locale={locale}/> : error ? null : featured.length ? <div className="edu-grid">{featured.map((a)=><ArticleCard key={a.id || a.slug} article={a} locale={locale}/>)}</div> : <div className="edu-empty">{es ? 'Los artículos destacados aparecerán aquí cuando estén publicados.' : 'Featured articles will appear here as they are published.'}</div>}
    </section>
  </main>;
}
