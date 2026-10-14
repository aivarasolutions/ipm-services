import test from 'node:test';
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import express from 'express';
import { articles, resources } from './seeds.js';
import { validateArticle, validateResource, safeUrl, validateImage } from './validation.js';
import { authorizeStaff, checkMutationOrigin, createEducationRouter } from './router.js';
import { createWhopResources } from './whopResources.js';
import { educationDocumentOptions, renderEducationDocument } from './render.js';
import { createSitemapXml } from '../../src/lib/sitemap.js';
const publicArticle = articles.find(a => a.status === 'published');
const payload = () => ({ ...structuredClone(publicArticle), revision: 1 });
test('all seed articles and bilingual resources pass their publication gates', () => {
  for (const article of articles) validateArticle({ ...article, revision: 1 });
  for (const resource of resources) validateResource({ ...resource, revision: 1 });
  assert.equal(articles.filter(a => a.locale === 'en').length, 20);
  assert.equal(articles.filter(a => a.locale === 'en' && a.status === 'draft').length, 3);
  assert.equal(resources.filter(r => r.locale === 'es').length, 10);
});
test('publication cannot skip approval, sources, language review or minimum content', () => {
  for (const patch of [{ verified:false }, { sources:[] }, { introduction:'', sections:[], conclusion:'' }, { publishedAt:'2099-01-01' }, { specialistReviewRequired:true, specialistApproved:false }]) {
    assert.throws(() => validateArticle({ ...payload(), ...patch }));
  }
  const spanish = articles.find(a => a.locale === 'es');
  assert.throws(() => validateArticle({ ...spanish, revision:1, translationReviewed:false }));
  assert.throws(() => validateArticle({ ...payload(), reviewedAt:'2026-02-30' }));
});
test('safe public links reject scripts, credential URLs, localhost and fake Whop domains', () => {
  for (const url of ['javascript:alert(1)', '//evil.test', 'http://example.com', 'https://name:password@example.com', 'https://127.0.0.1/a']) assert.throws(()=>safeUrl(url));
  assert.throws(()=>safeUrl('https://whop.com.evil.test', { whop:true }));
  assert.equal(safeUrl('/resources'), '/resources');
});
test('image validation rejects unsupported content and MIME spoofing', () => {
  assert.throws(()=>validateImage({ name:'x.svg',mime:'image/svg+xml',base64:Buffer.from('<svg/>').toString('base64') }));
  assert.throws(()=>validateImage({ name:'x.jpg',mime:'image/jpeg',base64:Buffer.from('<html>').toString('base64') }));
});
test('identity does not grant staff access; verified invited emails do', async () => {
  const store = { hasStaff: async email => email === 'invited@example.com' };
  const options = (email, verified=true, env={}) => ({ env, auth:()=>({userId:'test-user'}), users:{getUser:async()=>({emailAddresses:[{emailAddress:email,verification:{status:verified?'verified':'unverified'}}]})} });
  await assert.rejects(authorizeStaff({}, store, { auth:()=>({}), env:{} }), { status:401 });
  await assert.rejects(authorizeStaff({}, store, options('first@example.com')), { status:403 });
  await assert.rejects(authorizeStaff({}, store, options('invited@example.com', false)), { status:403 });
  assert.equal((await authorizeStaff({}, store, options('invited@example.com'))).bootstrap, false);
  assert.equal((await authorizeStaff({}, store, options('owner@example.com', true, { EDUCATION_ADMIN_EMAILS:'owner@example.com' }))).bootstrap, true);
});
test('mutations require a trusted Origin, never a spoofed Host', () => {
  assert.throws(()=>checkMutationOrigin({method:'PUT',get:()=>null}, {}), {status:403});
  assert.throws(()=>checkMutationOrigin({method:'PUT',get:k=>k==='origin'?'https://attacker.test':'https://www.ipm.services'}, {}), {status:403});
  checkMutationOrigin({method:'PUT',get:k=>k==='origin'?'https://www.ipm.services':'same-origin'}, {});
});
function fakeStore() {
  const items = structuredClone(articles).map(a=>({...a,revision:1}));
  return {
    all:async(kind, {locale,published}={}) => kind==='article'?items.filter(a=>(!locale||a.locale===locale)&&(!published||a.status==='published')):[],
    article:async(locale,slug)=>items.find(a=>a.locale===locale&&a.slug===slug&&a.status==='published'),
    save:async(_kind,value)=>{const index=items.findIndex(a=>a.id===value.id);if(index>=0&&items[index].revision!==value.revision)throw Object.assign(new Error('Concurrent edit'),{status:409});const saved={...value,revision:value.revision+1};if(index<0)items.push(saved);else items[index]=saved;return saved;},
    remove:async(_kind,id,revision)=>{const index=items.findIndex(a=>a.id===id&&a.revision===Number(revision));if(index<0)throw Object.assign(new Error('Concurrent edit'),{status:409});items.splice(index,1);},
    settings:async()=>({whopStoreUrl:''}), content:async()=>({articles:items,resources:[],staff:[],categories:[],settings:{}}),
  };
}
test('CMS API publish/edit/unpublish/delete and conflict paths preserve private drafts', async t => {
  const store=fakeStore();
  const app=express();
  app.use(express.json());
  app.use('/api/education',createEducationRouter({store,whop:{configured:()=>false},authorize:async req=>{if(req.get('x-test-auth')!=='staff')throw Object.assign(new Error('Sign in'),{status:401});return {email:'unit-test@example.com',bootstrap:true};},env:{}}));
  app.use((e,_req,res,next)=>{ void next; return res.status(e.status||500).json({error:e.message}); });
  const server=app.listen(0);
  await new Promise(r=>server.once('listening',r));
  t.after(()=>new Promise(r=>server.close(r)));
  const base=`http://127.0.0.1:${server.address().port}/api/education`;
  const request=(path,method='GET',body,auth=true)=>fetch(`${base}${path}`,{method,headers:{'Content-Type':'application/json',Origin:'https://www.ipm.services',...(auth?{'x-test-auth':'staff'}:{})},...(body?{body:JSON.stringify(body)}:{})});
  assert.equal((await request('/admin/content','GET',null,false)).status,401);
  const catalogue=await (await request('/catalogue')).json();
  assert.ok(catalogue.articles.every(a=>a.status==='published'));
  assert.equal(catalogue.articles.some(a=>a.slug==='guest-property-damage'),false);
  const draftPath='/articles/en/guest-property-damage';
  assert.equal((await request(draftPath)).status,404);
  const newArticle={...payload(),id:undefined,revision:undefined,slug:'test-lifecycle',status:'draft'};
  const created=await (await request('/admin/articles','PUT',newArticle)).json();
  assert.equal(created.article.revision,1);
  const publicPath='/articles/en/test-lifecycle';
  assert.equal((await request(publicPath)).status,404);
  const published=await (await request('/admin/articles','PUT',{...created.article,status:'published'})).json();
  assert.equal((await request(publicPath)).status,200);
  assert.equal((await request('/admin/articles','PUT',created.article)).status,409);
  const removed=await (await request('/admin/articles','PUT',{...published.article,status:'draft'})).json();
  assert.equal((await request(publicPath)).status,404);
  assert.equal((await request(`/admin/articles/${removed.article.id}?revision=${removed.article.revision}`,'DELETE')).status,200);
});
test('live source HTML, schema, alternates and sitemap exclude private drafts', async () => {
  const store=fakeStore();
  const route=`/insights/learn/${publicArticle.slug}`;
  const options=await educationDocumentOptions(route,store,{});
  const html=renderEducationDocument('<html lang="en"><head><title>IPM</title></head><body><div id="root"></div></body></html>',route,options);
  assert.ok(html.includes(publicArticle.sections[0].paragraphs[0]));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('hreflang="es"'));
  assert.ok(html.includes('index, follow'));
  await assert.rejects(educationDocumentOptions('/insights/learn/guest-property-damage',store,{}),{status:404});
  const sitemap=createSitemapXml([],articles);
  assert.ok(sitemap.includes(route));
  assert.ok(!sitemap.includes('/insights/learn/guest-property-damage'));
  const special={...options,educationArticle:{...options.educationArticle,title:'<script>alert(1)</script>'}};
  assert.ok(!renderEducationDocument('<html><head></head><body><div id="root"></div></body></html>',route,special).includes('<h1><script>'));
});
test('Whop catalogue uses recognized account_id and rejects a foreign storefront', async () => {
  const calls=[];
  const mock=async url=>{
    calls.push(url);
    const data=url.includes('/companies/')?{id:'biz_test',title:'IPM',route:'ipm-test'}:url.includes('/products')?{data:[{id:'prod_test',title:'IPM Club',description:'Verified free community',visibility:'visible'}]}:{data:[{id:'plan_test',visibility:'visible',product:{id:'prod_test'},purchase_url:'https://whop.com/checkout/plan_test',currency:'usd',initial_price:0,renewal_price:0}]};
    return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
  };
  const whop=createWhopResources({WHOP_API_KEY:'unit-test-only',WHOP_ACCOUNT_ID:'biz_test'},mock);
  const result=await whop.get();
  assert.equal(result.offerings[0].access,'free');
  assert.ok(calls.filter(u=>u.includes('/products')||u.includes('/plans')).every(u=>u.includes('account_id=biz_test')&&!u.includes('company_id')));
  await assert.rejects(whop.get('https://whop.com/foreign-store/'),{status:400});
});
