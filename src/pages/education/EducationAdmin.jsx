import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/react';
import { Check, Eye, LogOut, Plus, RefreshCw, Save, Trash2, Upload, UserPlus } from 'lucide-react';
import {
  deleteAdminArticle, deleteAdminResource, getAdminContent, getEducationSeoStatus,
  getStaffSession, inviteEducationStaff, revokeEducationStaff, saveAdminArticle,
  saveAdminResource, saveEducationSettings, uploadEducationImage,
} from '../../services/educationApi';
import { EDUCATION_CATEGORIES, educationPath } from '../../lib/educationShared';
import { localeFromPath, safeExternal } from './EducationShared';

const blankArticle = () => ({locale:'en',translationKey:'',slug:'',title:'',excerpt:'',category:EDUCATION_CATEGORIES[0].id,author:'',publishedAt:'',reviewedAt:'',status:'draft',verified:false,translationReviewed:false,specialistReviewRequired:false,specialistApproved:false,seoTitle:'',seoDescription:'',imageUrl:'',imageAlt:'',videoUrl:'',introduction:'',sections:[],conclusion:'',sources:[],internalLinks:[]});
const blankResource = () => ({locale:'en',title:'',description:'',category:'',url:'',access:'free',template:[],status:'published'});
const jsonText = (value) => typeof value === 'string' ? value : JSON.stringify(value || [],null,2);
const dateInput = (value) => value ? String(value).slice(0,10) : '';
const errorText = (e) => e?.message || 'The request could not be completed.';
function Field({label,children,full=false}) { return <div className={`edu-field-wrap ${full?'full':''}`}><label>{label}{children}</label></div>; }
function TextInput({value,onChange,...props}) { return <input className="edu-field" value={value ?? ''} onChange={e=>onChange(e.target.value)} {...props}/>; }
function TextArea({value,onChange,...props}) { return <textarea className="edu-area" value={value ?? ''} onChange={e=>onChange(e.target.value)} {...props}/>; }

export default function EducationAdmin() {
  const {isLoaded,isSignedIn,user}=useUser();
  const {signOut}=useClerk();
  const locale=localeFromPath(); const es=locale==='es';
  const [gate,setGate]=useState('loading'); const [gateError,setGateError]=useState('');
  const [content,setContent]=useState(null); const [seo,setSeo]=useState(null); const [tab,setTab]=useState('articles');
  const [article,setArticle]=useState(blankArticle); const [resource,setResource]=useState(blankResource);
  const [selectedArticle,setSelectedArticle]=useState(null); const [selectedResource,setSelectedResource]=useState(null);
  const [settingsUrl,setSettingsUrl]=useState(''); const [inviteEmail,setInviteEmail]=useState('');
  const [busy,setBusy]=useState(false); const [notice,setNotice]=useState(''); const [error,setError]=useState('');
  const [preview,setPreview]=useState(false);
  const previewSections = useMemo(() => {
    try {
      const sections = typeof article.sections === 'string' ? JSON.parse(article.sections) : article.sections;
      return Array.isArray(sections) ? sections : [];
    } catch { return []; }
  }, [article.sections]);
  const articles=useMemo(()=>content?.articles || [],[content]);
  const resources=useMemo(()=>content?.resources || [],[content]);
  const categories=useMemo(()=>content?.categories?.length ? content.categories : EDUCATION_CATEGORIES,[content]);
  const staff=useMemo(()=>content?.staff || [],[content]);

  const loadContent=async()=>{
    setBusy(true);setError('');setNotice('');
    try { const data=await getAdminContent(); setContent(data); setSettingsUrl(data.settings?.whopStoreUrl || ''); }
    catch(e){setError(errorText(e)); if(e.status===403){setGate('denied');setGateError(e.message || 'Your account is not authorized for education administration.');}}
    finally{setBusy(false);}
  };
  const loadSeo=async()=>{try{setSeo(await getEducationSeoStatus());}catch(e){setError(errorText(e));}};
  useEffect(()=>{
    if(!isLoaded) return;
    if(!isSignedIn){setGate('signed-out');return;}
    let active=true;
    getStaffSession().then(()=>{if(active){setGate('allowed');}}).catch(e=>{if(active){setGate(e.status===403?'denied':'error');setGateError(errorText(e));}});
    return ()=>{active=false;};
  },[isLoaded,isSignedIn]);
  useEffect(()=>{if(gate==='allowed') loadContent();},[gate]);
  useEffect(()=>{if(gate==='allowed' && tab==='seo') loadSeo();},[gate,tab]);
  const beginNewArticle=()=>{setSelectedArticle(null);setArticle(blankArticle());setPreview(false);setError('');setNotice('');};
  const editArticle=(item)=>{setSelectedArticle(item.id);setArticle({...blankArticle(),...item,publishedAt:dateInput(item.publishedAt),reviewedAt:dateInput(item.reviewedAt)});setPreview(false);setError('');setNotice('');};
  const beginNewResource=()=>{setSelectedResource(null);setResource(blankResource());setError('');setNotice('');};
  const editResource=(item)=>{setSelectedResource(item.id);setResource({...blankResource(),...item,template:item.template||[]});setError('');setNotice('');};
  const setArticleField=(key,value)=>setArticle(current=>({...current,[key]:value}));
  const saveArticle=async(event)=>{
    event.preventDefault();setBusy(true);setError('');setNotice('');
    try {
      const sections=typeof article.sections==='string'?JSON.parse(article.sections):article.sections;
      const sources=typeof article.sources==='string'?JSON.parse(article.sources):article.sources;
      const internalLinks=typeof article.internalLinks==='string'?JSON.parse(article.internalLinks):article.internalLinks;
      for(const source of sources){if(!safeExternal(source.url)) throw new Error('Every source must use a valid HTTPS URL.');}
      for(const item of internalLinks){if(!(item.url?.startsWith('/')||safeExternal(item.url))) throw new Error('Internal links must be relative paths or HTTPS URLs.');}
      const payload={...article,sections,sources,internalLinks,publishedAt:article.publishedAt||null,reviewedAt:article.reviewedAt||null};
      const result=await saveAdminArticle(payload);
      setArticle({...blankArticle(),...result.article,publishedAt:dateInput(result.article.publishedAt),reviewedAt:dateInput(result.article.reviewedAt)});
      setSelectedArticle(result.article.id);setNotice(es?'Artículo guardado.':'Article saved.');await loadContent();
    } catch(e){setError(errorText(e));}
    finally{setBusy(false);}
  };
  const removeArticle=async(item)=>{
    if(!window.confirm(es?`¿Eliminar “${item.title}”? Esta acción no se puede deshacer.`:`Delete “${item.title}”? This cannot be undone.`))return;
    setBusy(true);setError('');try{await deleteAdminArticle(item.id,item.revision);if(selectedArticle===item.id)beginNewArticle();setNotice(es?'Artículo eliminado.':'Article deleted.');await loadContent();}catch(e){setError(errorText(e));}finally{setBusy(false);}
  };
  const saveResourceForm=async(event)=>{
    event.preventDefault();setBusy(true);setError('');setNotice('');
    try{const result=await saveAdminResource({...resource,template:Array.isArray(resource.template)?resource.template:String(resource.template||'').split('\n').map(s=>s.trim()).filter(Boolean)});setResource({...blankResource(),...result.resource});setSelectedResource(result.resource.id);setNotice(es?'Recurso guardado.':'Resource saved.');await loadContent();}
    catch(e){setError(errorText(e));}finally{setBusy(false);}
  };
  const removeResource=async(item)=>{
    if(!window.confirm(es?`¿Eliminar “${item.title}”?`:`Delete “${item.title}”?`))return;
    setBusy(true);setError('');try{await deleteAdminResource(item.id,item.revision);if(selectedResource===item.id)beginNewResource();setNotice(es?'Recurso eliminado.':'Resource deleted.');await loadContent();}catch(e){setError(errorText(e));}finally{setBusy(false);}
  };
  const uploadImage=async(event)=>{
    const file=event.target.files?.[0]; if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){setError('Choose a JPG, PNG, or WebP image.');return;}
    if(file.size>1.5*1024*1024){setError('Images must be no larger than 1.5 MiB.');return;}
    setBusy(true);setError('');
    try{const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Image could not be read.'));reader.readAsDataURL(file);});const uploaded=await uploadEducationImage({name:file.name,mime:file.type,base64});setArticleField('imageUrl',uploaded.url);setNotice(es?'Imagen cargada.':'Image uploaded.');}
    catch(e){setError(errorText(e));}finally{setBusy(false);event.target.value='';}
  };
  const saveSettings=async(event)=>{event.preventDefault();setBusy(true);setError('');setNotice('');try{await saveEducationSettings({whopStoreUrl:settingsUrl});setNotice(es?'Configuración guardada.':'Settings saved.');await loadContent();}catch(e){setError(errorText(e));}finally{setBusy(false);}};
  const inviteStaff=async(event)=>{event.preventDefault();setBusy(true);setError('');try{await inviteEducationStaff(inviteEmail);setInviteEmail('');setNotice(es?'Invitación de personal enviada.':'Staff invitation added.');await loadContent();}catch(e){setError(errorText(e));}finally{setBusy(false);}};
  const revokeStaff=async(email)=>{if(!window.confirm(es?`¿Revocar acceso a ${email}?`:`Revoke access for ${email}?`))return;setBusy(true);setError('');try{await revokeEducationStaff(email);setNotice(es?'Acceso revocado.':'Staff access revoked.');await loadContent();}catch(e){setError(errorText(e));}finally{setBusy(false);}};

  if(!isLoaded || gate==='loading') return <main className="education edu-admin"><div className="edu-wrap"><div className="edu-skeleton" style={{height:260}}/></div></main>;
  if(gate==='signed-out') return <main className="education edu-admin"><div className="edu-wrap edu-empty"><div className="edu-kicker">IPM · CMS</div><h1>{es?'Acceso del personal':'Staff sign-in'}</h1><p>{es?'Inicie sesión con una cuenta autorizada para administrar contenido educativo.':'Sign in with an authorized staff account to manage education content.'}</p><a className="edu-btn" href="/sign-in">{es?'Ir a iniciar sesión':'Go to sign in'}</a></div></main>;
  if(gate==='denied' || gate==='error') return <main className="education edu-admin"><div className="edu-wrap edu-error" role="alert"><div className="edu-kicker">IPM · CMS</div><h1>{gate==='denied'?(es?'Acceso denegado':'Access denied'):(es?'No se pudo verificar el acceso':'Access check unavailable')}</h1><p>{gateError}</p>{gate==='denied' && <p>{es?'Pida a un administrador autorizado que le invite al equipo.':'Ask an authorized administrator to invite you to the staff team.'}</p>}<a className="edu-link" href="/sign-in">{es?'Volver a iniciar sesión':'Return to sign in'}</a></div></main>;

  return <main className="education edu-admin" lang={locale}><div className="edu-wrap">
    <div className="edu-admin-top"><div><div className="edu-kicker">IPM · Education CMS</div><h1>{es?'Administrar educación':'Education administration'}</h1><p style={{color:'#536171'}}>{user?.primaryEmailAddress?.emailAddress || 'Authorized staff'} · {es?'Los permisos se comprueban en el servidor':'Permissions are checked by the server'}</p></div><button className="edu-btn secondary" onClick={()=>signOut({redirectUrl:'/'} )}><LogOut size={16}/>{es?'Cerrar sesión':'Sign out'}</button></div>
    <div className="edu-admin-tabs" role="tablist">{[['articles',es?'Artículos':'Articles'],['resources',es?'Recursos':'Resources'],['settings',es?'Configuración':'Settings'],['staff',es?'Personal':'Staff'],['seo','SEO']].map(([id,label])=><button key={id} role="tab" aria-selected={tab===id} className={tab===id?'active':''} onClick={()=>{setTab(id);setNotice('');setError('');}}>{label}</button>)}</div>
    {(error||notice)&&<div className={error?'edu-error':'edu-admin-status'} role={error?'alert':'status'}>{error||notice}</div>}
    {tab==='articles'&&<div className="edu-admin-grid">
      <aside className="edu-admin-list"><button className="edu-btn" onClick={beginNewArticle}><Plus size={16}/>{es?'Nuevo artículo':'New article'}</button><div style={{marginTop:12}}>{articles.map(item=><button key={item.id} className={`edu-admin-list-item ${selectedArticle===item.id?'selected':''}`} onClick={()=>editArticle(item)}><strong>{item.title || item.slug}</strong><br/><small>{item.locale?.toUpperCase()} · {item.status || 'draft'} · rev {item.revision ?? '—'}</small></button>)}</div></aside>
      <form className="edu-admin-form" onSubmit={saveArticle}><div className="edu-section-head" style={{marginBottom:14}}><div><div className="edu-kicker">{selectedArticle?`${es?'Editar':'Edit'} · rev ${article.revision ?? '—'}`:(es?'Borrador nuevo':'New draft')}</div><h2>{article.title || (es?'Artículo sin título':'Untitled article')}</h2></div><button type="button" className="edu-btn secondary" onClick={()=>setPreview(v=>!v)}><Eye size={16}/>{preview?(es?'Cerrar vista previa':'Close preview'):(es?'Vista previa':'Preview')}</button></div>
        {preview&&<div className="edu-preview"><div className="edu-kicker">{article.locale?.toUpperCase()} · {article.status}</div><h2>{article.title || 'Title preview'}</h2><p>{article.excerpt || 'Excerpt preview'}</p>{article.imageUrl&&<img src={article.imageUrl} alt={article.imageAlt||''} style={{maxWidth:'100%',maxHeight:250,objectFit:'cover'}}/>}<p>{article.introduction}</p>{previewSections.map((s,i)=><section key={i}><h3>{s.heading}</h3>{(s.paragraphs||[]).map((p,j)=><p key={j}>{p}</p>)}{(s.bullets||[]).map((b,j)=><li key={j}>{b}</li>)}</section>)}<p>{article.conclusion}</p></div>}
        <div className="edu-fields">
          <Field label="Locale"><select className="edu-select" value={article.locale||'en'} onChange={e=>setArticleField('locale',e.target.value)}><option value="en">English</option><option value="es">Español</option></select></Field>
          <Field label={es?'Categoría':'Category'}><select className="edu-select" value={article.category||''} onChange={e=>setArticleField('category',e.target.value)}>{categories.map(c=><option key={c.id} value={c.id}>{c[article.locale||'en']||c.en||c.id}</option>)}</select></Field>
          <Field label="Slug"><TextInput value={article.slug} onChange={v=>setArticleField('slug',v)} required/></Field>
          <Field label={es?'Clave de traducción':'Translation key'}><TextInput value={article.translationKey} onChange={v=>setArticleField('translationKey',v)} placeholder="Shared ID for English / Spanish versions"/></Field>
          <Field label={es?'Título':'Title'} full><TextInput value={article.title} onChange={v=>setArticleField('title',v)} required/></Field>
          <Field label={es?'Resumen':'Excerpt'} full><TextArea value={article.excerpt} onChange={v=>setArticleField('excerpt',v)} required/></Field>
          <Field label={es?'Autor':'Author'}><TextInput value={article.author} onChange={v=>setArticleField('author',v)}/></Field>
          <Field label={es?'Estado editorial':'Editorial status'}><select className="edu-select" value={article.status||'draft'} onChange={e=>setArticleField('status',e.target.value)}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></Field>
          <Field label={es?'Fecha de publicación':'Publication date'}><TextInput type="date" value={article.publishedAt} onChange={v=>setArticleField('publishedAt',v)}/></Field>
          <Field label={es?'Última revisión':'Last reviewed'}><TextInput type="date" value={article.reviewedAt} onChange={v=>setArticleField('reviewedAt',v)}/></Field>
          <Field label="SEO title"><TextInput value={article.seoTitle} onChange={v=>setArticleField('seoTitle',v)}/></Field>
          <Field label="SEO description"><TextInput value={article.seoDescription} onChange={v=>setArticleField('seoDescription',v)}/></Field>
          <Field label={es?'Imagen destacada URL':'Image URL'}><TextInput value={article.imageUrl} onChange={v=>setArticleField('imageUrl',v)}/></Field>
          <Field label={es?'Texto alternativo':'Image alt text'}><TextInput value={article.imageAlt} onChange={v=>setArticleField('imageAlt',v)}/></Field>
          <Field label="Video URL"><TextInput value={article.videoUrl} onChange={v=>setArticleField('videoUrl',v)} placeholder="HTTPS video URL"/></Field>
          <Field label={es?'Subir imagen JPG/PNG/WebP (máx. 1,5 MiB)':'Upload JPG/PNG/WebP (max 1.5 MiB)'}><label className="edu-btn secondary"><Upload size={15}/>{es?'Seleccionar imagen':'Choose image'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} style={{display:'none'}}/></label></Field>
          <Field label={es?'Introducción':'Introduction'} full><TextArea value={article.introduction} onChange={v=>setArticleField('introduction',v)} required/></Field>
          <Field label={es?'Secciones (JSON: heading, paragraphs[], bullets[])':'Sections (JSON: heading, paragraphs[], bullets[])'} full><TextArea value={jsonText(article.sections)} onChange={v=>setArticleField('sections',v)} style={{minHeight:190,fontFamily:'monospace'}}/><small>Practical editing format: [{"{"}"heading":"Section heading","paragraphs":["Paragraph text"],"bullets":["Action item"]{"}"}].</small></Field>
          <Field label={es?'Conclusión':'Conclusion'} full><TextArea value={article.conclusion} onChange={v=>setArticleField('conclusion',v)}/></Field>
          <Field label={es?'Fuentes (JSON; cada URL HTTPS válida)':'Sources (JSON; each URL must be valid HTTPS)'} full><TextArea value={jsonText(article.sources)} onChange={v=>setArticleField('sources',v)} style={{minHeight:110,fontFamily:'monospace'}} placeholder='[{"title":"Official resource","url":"https://…","reviewedAt":"2025-01-01"}]'/></Field>
          <Field label={es?'Enlaces internos (JSON; ruta relativa o HTTPS)':'Internal links (JSON; relative path or HTTPS)'} full><TextArea value={jsonText(article.internalLinks)} onChange={v=>setArticleField('internalLinks',v)} style={{minHeight:90,fontFamily:'monospace'}}/></Field>
        </div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:8}}>
          {[
            ['verified',es?'Fuentes verificadas':'Sources verified'],
            ['translationReviewed',es?'Traducción revisada':'Translation reviewed'],
            ['specialistReviewRequired',es?'Requiere revisión especializada':'Specialist review required'],
            ['specialistApproved',es?'Aprobación especializada':'Specialist approval'],
          ].map(([key,label])=><label key={key} style={{display:'flex',alignItems:'center',gap:7,fontSize:'.82rem'}}><input type="checkbox" checked={!!article[key]} onChange={e=>setArticleField(key,e.target.checked)}/>{label}</label>)}
        </div>
        <div className="edu-notice" style={{marginTop:16}}>{es?'La publicación programada no está disponible. El estado publicado se aplica mediante el flujo editorial disponible; no se programan fechas futuras automáticamente.':'Scheduled publishing is not supported. Publishing is an editorial status change; future dates are not automatically scheduled.'}</div>
        <div className="edu-admin-actions"><button className="edu-btn" type="submit" disabled={busy}><Save size={16}/>{busy?(es?'Guardando…':'Saving…'):(es?'Guardar artículo':'Save article')}</button>{selectedArticle&&<button className="edu-btn secondary" type="button" disabled={busy} onClick={()=>removeArticle(article)}><Trash2 size={16}/>{es?'Eliminar':'Delete'}</button>}{article.slug&&<Link className="edu-btn secondary" target="_blank" to={educationPath(article.locale||'en',article.slug)}>{es?'Abrir vista pública':'Open public view'} ↗</Link>}</div>
      </form>
    </div>}
    {tab==='resources'&&<div className="edu-admin-grid"><aside className="edu-admin-list"><button className="edu-btn" onClick={beginNewResource}><Plus size={16}/>{es?'Nuevo recurso':'New resource'}</button>{resources.map(item=><button key={item.id} className={`edu-admin-list-item ${selectedResource===item.id?'selected':''}`} onClick={()=>editResource(item)}><strong>{item.title}</strong><br/><small>{item.locale?.toUpperCase()} · {item.status} · rev {item.revision ?? '—'}</small></button>)}</aside><form className="edu-admin-form" onSubmit={saveResourceForm}><div className="edu-kicker">{selectedResource?'Edit resource':'Create resource'}</div><h2>{resource.title || (es?'Recurso nuevo':'New resource')}</h2><div className="edu-fields">
      <Field label="Locale"><select className="edu-select" value={resource.locale||'en'} onChange={e=>setResource({...resource,locale:e.target.value})}><option value="en">English</option><option value="es">Español</option></select></Field>
      <Field label={es?'Estado':'Status'}><select className="edu-select" value={resource.status||'draft'} onChange={e=>setResource({...resource,status:e.target.value})}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option></select></Field>
      <Field label={es?'Título':'Title'} full><TextInput value={resource.title} onChange={v=>setResource({...resource,title:v})} required/></Field>
      <Field label={es?'Descripción':'Description'} full><TextArea value={resource.description} onChange={v=>setResource({...resource,description:v})}/></Field>
      <Field label={es?'Categoría':'Category'}><TextInput value={resource.category} onChange={v=>setResource({...resource,category:v})}/></Field>
      <Field label={es?'Acceso':'Access'}><select className="edu-select" value={resource.access||'free'} onChange={e=>setResource({...resource,access:e.target.value})}><option value="free">Free</option><option value="paid">Paid</option><option value="external">External</option></select></Field>
      <Field label="HTTPS URL" full><TextInput value={resource.url} onChange={v=>setResource({...resource,url:v})} placeholder="https://…"/></Field>
      <Field label={es?'Puntos de plantilla (una línea por punto)':'Template checklist (one item per line)'} full><TextArea value={Array.isArray(resource.template)?resource.template.join('\n'):resource.template} onChange={v=>setResource({...resource,template:v})} placeholder={es?'Revisar cerraduras\nConfirmar inventario':'Inspect locks\nConfirm supplies'}/></Field>
    </div><div className="edu-admin-actions"><button className="edu-btn" type="submit" disabled={busy}><Save size={16}/>{es?'Guardar recurso':'Save resource'}</button>{selectedResource&&<button type="button" className="edu-btn secondary" onClick={()=>removeResource(resource)} disabled={busy}><Trash2 size={16}/>{es?'Eliminar':'Delete'}</button>}</div></form></div>}
    {tab==='settings'&&<div className="edu-admin-form"><div className="edu-kicker">{es?'Tienda verificada':'Verified storefront'}</div><h2>{es?'Configuración de Whop':'Whop settings'}</h2><p>{es?'La API valida que sea una URL HTTPS de Whop asociada a una empresa verificada. No introduzca credenciales aquí.':'The server validates that this is an HTTPS Whop URL belonging to a verified company. Do not enter credentials here.'}</p><form onSubmit={saveSettings}><Field label="Whop storefront URL"><TextInput value={settingsUrl} onChange={setSettingsUrl} placeholder="https://whop.com/…" type="url"/></Field><button className="edu-btn" disabled={busy}><Save size={16}/>{es?'Guardar configuración':'Save settings'}</button></form><div className="edu-admin-status">{content?.whopAccountConfigured? (es?'La cuenta está configurada.':'Whop account is configured.'):(es?'No hay cuenta Whop confirmada.':'No verified Whop account is configured.')}</div></div>}
    {tab==='staff'&&<div className="edu-admin-grid"><section className="edu-admin-form"><div className="edu-kicker">{es?'Invitar personal autorizado':'Invite authorized staff'}</div><h2>{es?'Acceso de personal':'Staff access'}</h2><form onSubmit={inviteStaff}><Field label={es?'Correo electrónico':'Email address'}><TextInput value={inviteEmail} onChange={setInviteEmail} type="email" required placeholder="colleague@example.com"/></Field><button className="edu-btn" disabled={busy}><UserPlus size={16}/>{es?'Invitar':'Invite staff'}</button></form><p>{es?'El servidor determina permisos y elegibilidad.':'Permissions and eligibility are determined by the server.'}</p></section><section className="edu-admin-list"><div className="edu-kicker">{es?'Personal actual':'Current staff'}</div>{staff.map(person=><div className="edu-resource-row" key={person.email}><div><h3>{person.email}</h3><p>{person.bootstrap?(es?'Cuenta de configuración inicial':'Bootstrap account'):(es?'Personal autorizado':'Authorized staff')}</p></div>{!person.bootstrap&&<button className="edu-btn secondary" onClick={()=>revokeStaff(person.email)} disabled={busy}><Trash2 size={15}/>{es?'Revocar':'Revoke'}</button>}</div>)}</section></div>}
    {tab==='seo'&&<div className="edu-admin-form"><div className="edu-kicker">{es?'Estado real de SEO':'Live SEO status'}</div><h2>{es?'SEO, indexación y medición':'SEO, indexing & measurement'}</h2>{!seo?<button className="edu-btn secondary" onClick={loadSeo}><RefreshCw size={16}/>{es?'Cargar estado SEO':'Load SEO status'}</button>:<><div className="edu-columns">
      <div className="edu-notice"><strong>{es?'Artículos publicados':'Published articles'}</strong><p>{seo.published}</p></div><div className="edu-notice"><strong>{es?'Borradores':'Drafts'}</strong><p>{seo.drafts}</p></div><div className="edu-notice"><strong>{es?'En revisión':'In review'}</strong><p>{seo.review}</p></div><div className="edu-notice"><strong>Search Console</strong><p>{seo.searchConsole?.configured?(es?'Configurado':'Configured'):(seo.searchConsole?.verificationInstructions || (es?'Sin configurar':'Not configured'))}</p></div><div className="edu-notice"><strong>{es?'Analítica':'Analytics'}</strong><p>{seo.analytics?.configured?(es?'Configurada':'Configured'):(seo.analytics?.message || (es?'Sin datos de analítica':'No analytics data configured'))}</p></div><div className="edu-notice"><strong>Whop</strong><p>{seo.whop?.configured&&seo.whop?.companyVerified?(es?'Empresa verificada':'Company verified'):(es?'No verificado':'Not verified')}</p></div>
      </div><p>{es?'No se muestran impresiones, visitas ni posiciones si la integración no proporciona esos datos.':'Impressions, visits, and rankings are not shown unless the integration provides those data.'}</p><p><strong>{es?'Programación':'Scheduling'}:</strong> {seo.schedulingSupported?(es?'Disponible':'Supported'):(es?'No compatible. Los artículos se publican mediante estado editorial manual.':'Not supported. Articles are published by manually changing editorial status.')}</p><p><strong>{es?'Origen canónico':'Canonical origin'}:</strong> {seo.canonicalOrigin || '—'}</p><p><strong>{es?'Mapa del sitio':'Sitemap'}:</strong> {seo.sitemapUrl || '—'}</p><button className="edu-btn secondary" onClick={loadSeo}><RefreshCw size={16}/>{es?'Actualizar estado':'Refresh status'}</button></>}</div>}
    <div style={{marginTop:20,display:'flex',gap:9,flexWrap:'wrap'}}><button className="edu-btn secondary" onClick={loadContent} disabled={busy}><RefreshCw size={16}/>{es?'Actualizar contenido':'Refresh content'}</button>{content?.whopAccountConfigured&&<span className="edu-admin-status"><Check size={14} style={{verticalAlign:'middle'}}/> Whop configured</span>}</div>
  </div></main>;
}
