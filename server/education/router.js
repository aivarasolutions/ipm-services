import express from 'express';
import process from 'node:process';
import crypto from 'node:crypto';
import { getAuth, clerkClient } from '@clerk/express';
import { EDUCATION_CATEGORIES, articleText } from '../../src/lib/educationShared.js';
import { existingResources } from './seeds.js';
import { validateArticle, validateResource, validateImage, fail, safeUrl } from './validation.js';
export const bootstrapEmails = (env = process.env) => (env.EDUCATION_ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
export async function authorizeStaff(req, store, { env = process.env, auth = getAuth, users = clerkClient.users } = {}) {
  const userId = auth(req)?.userId;
  if (!userId) fail('Sign in to your staff account.', 401);
  const user = await users.getUser(userId);
  // Identity alone is not permission; first registrant never becomes an administrator.
  const emails = user.emailAddresses.filter(e => e.verification?.status === 'verified').map(e => e.emailAddress.toLowerCase());
  const initial = bootstrapEmails(env);
  for (const email of emails) if (initial.includes(email) || await store.hasStaff(email)) return { userId, email, bootstrap: initial.includes(email) };
  fail(initial.length ? 'This verified account has not been invited to the IPM education team.' : 'Staff access is locked until the project owner configures EDUCATION_ADMIN_EMAILS in Replit Configuration.', 403);
}
export const checkMutationOrigin = (req, env = process.env) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return;
  const origin = req.get('origin');
  const allowed = new Set(['https://www.ipm.services', 'https://ipm.services', ...(env.EDUCATION_ALLOWED_ORIGINS || '').split(',').filter(Boolean), ...[env.REPLIT_DEV_DOMAIN, ...(env.REPLIT_DOMAINS || '').split(',')].filter(Boolean).map(h => `https://${h}`)]);
  // Do not accept an Origin based on a client-supplied Host/forwarded Host header.
  if (!origin || !allowed.has(origin) || req.get('sec-fetch-site') === 'cross-site') fail('The request must come from the IPM website.', 403);
};
const summary = a => { const { sections, sources, internalLinks, reviewNote, ...small } = a; void sections; void sources; void internalLinks; void reviewNote; return { ...small, readingMinutes: Math.max(1, Math.ceil(articleText(a).split(/\s+/).length / 200)) }; };
export function createEducationRouter({ store, whop, authorize = req => authorizeStaff(req, store), env = process.env }) {
  const router = express.Router();
  router.use((req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  const handler = fn => async (req, res, next) => {
    try { await fn(req, res); } catch (e) {
      if (e.status) return res.status(e.status).json({ error: e.message });
      console.error('[education] request failed', e.code || e.name);
      next(Object.assign(new Error('The education service is unavailable. Please retry.'), { status: 503 }));
    }
  };
  router.get('/catalogue', handler(async (req, res) => {
    const locale = req.query.locale === 'es' ? 'es' : 'en';
    const [articles, resources] = await Promise.all([store.all('article', { locale, published: true }), store.all('resource', { locale, published: true })]);
    res.json({ locale, articles: articles.map(summary), resources, categories: EDUCATION_CATEGORIES, existingResources: existingResources(locale) });
  }));
  router.get('/articles/:locale/:slug', handler(async (req, res) => {
    if (!['en', 'es'].includes(req.params.locale)) fail('Article not found.', 404);
    const article = await store.article(req.params.locale, req.params.slug);
    if (!article) fail('Article not found.', 404);
    const all = await store.all('article', { published: true });
    res.json({ article, related: all.filter(a => a.locale === article.locale && a.id !== article.id && a.category === article.category).slice(0, 3).map(summary), alternates: all.filter(a => a.translationKey && a.translationKey === article.translationKey).map(a => ({ locale: a.locale, slug: a.slug })) });
  }));
  router.get('/whop', handler(async (_req, res) => { res.json(await whop.get((await store.settings()).whopStoreUrl)); }));
  router.get('/images/:id', handler(async (req, res) => {
    if (!/^[a-f0-9-]{36}$/.test(req.params.id)) fail('Image not found.', 404);
    const image = await store.image(req.params.id);
    if (!image) fail('Image not found.', 404);
    res.set({ 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff', 'Content-Type': image.mime }).send(image.bytes);
  }));
  router.use('/admin', async (req, res, next) => {
    try { req.staff = await authorize(req); checkMutationOrigin(req, env); next(); }
    catch(e) { res.status(e.status || 503).json({ error: e.status ? e.message : 'Staff verification is unavailable.' }); }
  });
  router.get('/admin/me', (req, res) => res.json(req.staff));
  router.get('/admin/content', handler(async (_req, res) => {
    const content = await store.content();
    const initial = bootstrapEmails(env);
    content.staff = [...initial.map(email => ({ email, bootstrap: true })), ...content.staff.filter(s => !initial.includes(s.email))];
    res.json({ ...content, whopAccountConfigured: whop.configured() });
  }));
  router.put('/admin/articles', handler(async (req, res) => {
    res.json({ article: await store.save('article', validateArticle(req.body), req.staff.email) });
  }));
  router.delete('/admin/articles/:id', handler(async (req, res) => { await store.remove('article', req.params.id, req.query.revision, req.staff.email); res.json({ ok: true }); }));
  router.put('/admin/resources', handler(async (req, res) => { res.json({ resource: await store.save('resource', validateResource(req.body), req.staff.email) }); }));
  router.delete('/admin/resources/:id', handler(async (req, res) => { await store.remove('resource', req.params.id, req.query.revision, req.staff.email); res.json({ ok: true }); }));
  router.put('/admin/settings', handler(async (req, res) => {
    const whopStoreUrl = safeUrl(req.body?.whopStoreUrl, { local: false, whop: true });
    if (whopStoreUrl) await whop.get(whopStoreUrl, { refresh: true });
    await store.setSettings({ whopStoreUrl });
    res.json({ ok: true, settings: { whopStoreUrl } });
  }));
  router.post('/admin/staff', handler(async (req, res) => {
    if (!req.staff.bootstrap) fail('Only the project-configured lead administrator can invite staff.', 403);
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) fail('A valid staff email is required.');
    await store.invite(email, req.staff.email);
    res.json({ ok: true, email });
  }));
  router.delete('/admin/staff', handler(async (req, res) => {
    if (!req.staff.bootstrap) fail('Only the project-configured lead administrator can remove staff.', 403);
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (bootstrapEmails(env).includes(email)) fail('Project administrator access must be changed through Replit Configuration.');
    await store.revoke(email);
    res.json({ ok: true });
  }));
  router.post('/admin/images', handler(async (req, res) => { res.json(await store.addImage(crypto.randomUUID(), validateImage(req.body))); }));
  router.get('/admin/seo', handler(async (_req, res) => {
    const articles = await store.all('article');
    let companyVerified = false;
    try { companyVerified = (await whop.get((await store.settings()).whopStoreUrl)).verified; } catch { /* Explicit configuration status, never invented products. */ }
    res.json({
      published: articles.filter(a => a.status === 'published').length,
      drafts: articles.filter(a => a.status === 'draft').length, review: articles.filter(a => a.status === 'review').length,
      searchConsole: { configured: false, verificationInstructions: 'No Search Console ownership verification was found in this project. Add https://www.ipm.services as a domain or URL-prefix property in Google Search Console, complete the ownership check using your DNS provider or Google-issued verification file, then submit https://www.ipm.services/sitemap.xml. Do not treat these steps as proof that ownership is already verified.' },
      analytics: { configured: false, message: 'Existing gtag event hooks are preserved, but no loaded measurement ID or linked reporting provider was found. No traffic, rankings or impressions are available in this dashboard.' },
      sitemapUrl: 'https://www.ipm.services/sitemap.xml', canonicalOrigin: 'https://www.ipm.services',
      whop: { configured: whop.configured(), companyVerified }, schedulingSupported: false,
    });
  }));
  return router;
}
export { summary, articleText };
