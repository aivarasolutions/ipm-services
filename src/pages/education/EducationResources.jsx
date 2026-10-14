import { useMemo, useState } from 'react';
import { Download, ExternalLink, Printer } from 'lucide-react';
import { resourcePath } from '../../lib/educationShared';
import { EducationMasthead, localeFromPath, safeResourceHref, SearchField, StatusMessage, useCatalogue } from './EducationShared';
import CommunityResourceLink from './CommunityResourceLink';

function downloadText(resource, locale) {
  const body = `${resource.title}\n${'='.repeat(Math.min(resource.title.length, 60))}\n\n${resource.description || ''}\n\n${(resource.template || []).map((line)=>`[ ] ${line}`).join('\n')}\n\n${locale==='es'?'Material educativo general de IPM. Adapte esta lista a su propiedad y a las normas locales.':'General educational material from IPM. Adapt this checklist to your property and local requirements.'}`;
  const blob = new Blob([body], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a'); anchor.href=url; anchor.download=`${resource.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.txt`; document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}

export default function EducationResources() {
  const locale=localeFromPath(); const es=locale==='es';
  const {catalogue,loading,error,retry}=useCatalogue(locale);
  const [query,setQuery]=useState('');
  const resources=useMemo(()=>catalogue?.resources || [],[catalogue]);
  const existing=useMemo(()=>catalogue?.existingResources || [],[catalogue]);
  const filtered=resources.filter(r=>`${r.title} ${r.description} ${r.category}`.toLowerCase().includes(query.toLowerCase()));
  const oldFiltered=existing.filter(r=>`${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="education" lang={locale}>
    <EducationMasthead locale={locale} eyebrow={es?'Biblioteca IPM':'IPM resource library'} title={es?'Material práctico para el trabajo real.':'Tools for the work that actually happens.'} description={es?'Listas de verificación, guías y enlaces existentes para ayudar a los propietarios a preparar, operar y revisar sus alquileres.' : 'Checklists, guides, and existing links to help owners prepare, operate, and review their rentals.'}/>
    <section className="edu-wrap edu-section"><div className="edu-section-head"><div><div className="edu-kicker">{es?'Descargas y enlaces':'Downloads & links'}</div><h2>{es?'Una biblioteca útil, sin adornos':'A useful library, without the pitch'}</h2></div></div>
      <SearchField value={query} onChange={setQuery} locale={locale}/>
      <StatusMessage loading={loading} error={error} retry={retry} empty={!filtered.length && !oldFiltered.length} locale={locale}/>
      {!loading && !error && <div className="edu-columns" style={{gridTemplateColumns:'1fr 1fr',marginTop:20}}>
        <div className="edu-admin-form"><div className="edu-kicker">{es?'Plantillas y guías IPM':'IPM templates & guides'}</div>
          {filtered.map(r=>{const href=safeResourceHref(r.url);return <div className="edu-resource-row" key={r.id}><div><div className="edu-label">{r.category || (es?'Guía':'Guide')} · {r.access || (es?'Acceso externo':'External access')}</div><h3>{r.title}</h3><p>{r.description}</p>{r.template?.length>0 && <p style={{marginTop:9}}>{r.template.length} {es?'puntos de lista':'checklist items'}</p>}</div><div style={{display:'grid',gap:8,alignContent:'start'}}>{r.template?.length>0 && <button className="edu-btn secondary" onClick={()=>downloadText(r,locale)}><Download size={15}/>{es?'Descargar':'Download'}</button>}{href && (href.startsWith('/')?<a className="edu-btn" href={href}><ExternalLink size={15}/>{es?'Abrir':'Open'}</a>:<a className="edu-btn" href={href} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>{es?'Abrir':'Open'}</a>)}</div></div>})}
          {!filtered.length && <p>{es?'No hay plantillas coincidentes.':'No matching templates.'}</p>}
        </div>
        <div className="edu-admin-form"><div className="edu-kicker">{es?'Recursos existentes':'Existing IPM resources'}</div>
          {oldFiltered.map((r,i)=>{const href=safeResourceHref(r.url);return <div className="edu-resource-row" key={r.id || `${r.title}-${i}`}><div><h3>{r.title}</h3><p>{r.description}</p><span className="edu-label">{r.access || (es?'Acceso indicado en el enlace':'Access shown at destination')}</span></div>{href && <a className="edu-btn secondary" href={href} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noopener noreferrer':undefined}>{es?'Visitar':'Visit'} <ExternalLink size={15}/></a>}</div>})}
          {!oldFiltered.length && <p>{es?'No hay enlaces existentes coincidentes.':'No matching existing links.'}</p>}
        </div>
      </div>}
      <div className="edu-notice" style={{marginTop:22}}>{es?'Las plantillas descargadas son material educativo general, no asesoramiento legal o fiscal. Para imprimir esta página, use la opción de impresión del navegador.':'Downloaded templates are general educational material, not legal or tax advice. To print this page, use your browser’s print function.'} <button className="edu-link" style={{background:'none',border:0,cursor:'pointer',marginLeft:8}} onClick={()=>window.print()}><Printer size={15}/>{es?'Imprimir':'Print'}</button></div>
      <CommunityResourceLink locale={locale}/>
    </section>
    <section className="edu-dark-section"><div className="edu-wrap edu-section"><div className="edu-columns"><div><div className="edu-kicker">Whop</div><h2>{es?'Más recursos de IPM':'Learn more with IPM'}</h2><p>{es?'Descubra recursos y formación verificados de IPM; las ofertas solo se muestran cuando se pueden confirmar.':'Explore verified IPM learning resources. Offerings appear only when they can be confirmed.'}</p></div><a className="edu-btn" href={resourcePath(locale,'whop')}>{es?'Ver recursos de Whop':'View Whop resources'} <ExternalLink size={16}/></a></div></div></section>
  </main>;
}
