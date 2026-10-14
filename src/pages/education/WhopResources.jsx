import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { getWhopResources } from '../../services/educationApi';
import { EducationMasthead, localeFromPath, safeExternal } from './EducationShared';
import CommunityResourceLink from './CommunityResourceLink';

export default function WhopResources() {
  const locale=localeFromPath(); const es=locale==='es';
  const [result,setResult]=useState(null); const [error,setError]=useState(''); const [loading,setLoading]=useState(true);
  const load=useCallback(()=>{setLoading(true);setError('');getWhopResources().then(setResult).catch(e=>setError(e.message || (es?'No se pudo verificar la tienda de Whop.':'The Whop store could not be verified.'))).finally(()=>setLoading(false));},[es]);
  useEffect(()=>{load();},[load]);
  const storeUrl=safeExternal(result?.store?.url);
  return <main className="education" lang={locale}>
    <EducationMasthead locale={locale} eyebrow="IPM · Whop" title={es?'Más recursos para aprender.':'Learn more with IPM.'} description={es?'Material educativo, herramientas y formación accesibles a través de la tienda verificada de IPM. Mostramos únicamente ofertas reales que el servicio puede confirmar.':'Practical education, tools, and learning resources available through IPM’s verified Whop storefront. We show only real offerings the service can confirm.'}/>
    <section className="edu-wrap edu-section">
      {loading && <div className="edu-skeleton" style={{maxWidth:780}} aria-label={es?'Cargando tienda verificada':'Loading verified storefront'}/>}
      {!loading && error && <div className="edu-error" role="alert"><strong>{es?'No se pudo verificar la cuenta de Whop.':'The Whop account could not be verified.'}</strong><p>{error}</p><p>{es?'No mostramos productos, precios ni enlaces de tienda no confirmados. Vuelva a intentarlo más tarde.':'Unverified store links, products, and prices are intentionally not shown. Please try again later.'}</p><button className="edu-btn secondary" onClick={load}>{es?'Volver a intentar':'Retry'}</button></div>}
      {!loading && !error && result?.verified && <><div className="edu-section-head"><div><div className="edu-kicker"><ShieldCheck size={16} style={{verticalAlign:'middle',marginRight:6}}/>{es?'Cuenta verificada':'Verified account'}</div><h2>{result.store?.name || 'IPM'}</h2><p>{es?'Tienda de recursos de International Property Management.':'International Property Management’s verified resource storefront.'}</p></div>{storeUrl && <a className="edu-btn" href={storeUrl} target="_blank" rel="noopener noreferrer">{es?'Visitar tienda':'Visit storefront'} <ExternalLink size={16}/></a>}</div>
        {result.offerings?.length ? <div className="edu-grid">{result.offerings.map(item=><article className="edu-card" key={item.id}>{item.imageUrl && <img src={item.imageUrl} alt="" style={{width:'100%',height:160,objectFit:'cover',marginBottom:12}}/>}<span className="edu-label">{item.access || (es?'Acceso indicado en la oferta':'Access shown on offer')} {item.priceLabel ? ` · ${item.priceLabel}` : ''}</span><h3>{item.title}</h3><p>{item.description}</p>{safeExternal(item.url) && <a className="edu-link" href={safeExternal(item.url)} target="_blank" rel="noopener noreferrer">{es?'Ver recurso':'View resource'} <ExternalLink size={15}/></a>}</article>)}</div> : <div className="edu-empty">{es?'La cuenta se verificó, pero no hay ofertas públicas disponibles en este momento.':'The account is verified, but there are no public offerings available at this time.'}</div>}
        <div className="edu-notice" style={{marginTop:22}}>{es?'El acceso, los precios y las condiciones se determinan en cada oferta de Whop.':'Access, pricing, and terms are determined by each Whop offering.'}</div>
      </>}
      {!loading && !error && !result?.verified && <div className="edu-error">{es?'La respuesta de la tienda no confirmó una cuenta verificada. No se muestran ofertas.':'The storefront response did not confirm a verified account. No offerings are shown.'}<button className="edu-btn secondary" onClick={load}>{es?'Reintentar':'Retry'}</button></div>}
      <CommunityResourceLink locale={locale}/>
    </section>
  </main>;
}
