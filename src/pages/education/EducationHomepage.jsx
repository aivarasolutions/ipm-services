import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { educationPath } from '../../lib/educationShared';
import { ArticleCard, localeFromPath, StatusMessage, useCatalogue } from './EducationShared';

export default function EducationHomepage() {
  const locale=localeFromPath(); const es=locale==='es';
  const {catalogue,loading,error,retry}=useCatalogue(locale);
  const featured=useMemo(()=>catalogue?.articles?.slice(0,3) || [],[catalogue]);
  return <section className="education edu-wrap edu-section" lang={locale} aria-labelledby="education-home-title">
    <div className="edu-section-head"><div><div className="edu-kicker">{es?'Centro educativo IPM':'The IPM education hub'}</div><h2 id="education-home-title">{es?'La administración de propiedades es más que conseguir reservas':'Property Management Is More Than Just Getting Bookings'}</h2><p style={{maxWidth:760,lineHeight:1.75,color:'#536171'}}>{es?'Hay mucho más detrás de una propiedad de alquiler: mantenimiento, comunicación con huéspedes, precios, gastos y normas. Compartimos lo que hemos aprendido para ayudar a los propietarios a decidir mejor.':'There’s a lot that goes into running a rental property. From maintenance and guest communication to pricing, expenses, and regulations, we’re sharing what we’ve learned so owners can make better decisions.'}</p></div><Link className="edu-link" to={educationPath(locale)}>{es?'Explorar educación':'Explore education'} <ArrowRight size={17}/></Link></div>
    {loading ? <StatusMessage loading locale={locale}/> : error ? <StatusMessage loading={false} error={error} retry={retry} locale={locale}/> : featured.length ? <div className="edu-grid">{featured.map(a=><ArticleCard key={a.id || a.slug} article={a} locale={locale}/>)}</div> : <div className="edu-empty">{es?'Los artículos aparecerán cuando haya contenido publicado.':'Published articles will appear here when available.'}</div>}
  </section>;
}
