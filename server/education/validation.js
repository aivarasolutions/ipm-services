import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';
import { EDUCATION_CATEGORIES, articleText } from '../../src/lib/educationShared.js';
export const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const text = (value, max = 500) => {
  if (typeof value !== 'string') return '';
  if (value.length > max) fail(`Text exceeds ${max} characters.`);
  return value.trim();
};
export const safeUrl = (value, { local = true, whop = false } = {}) => {
  const url = text(value, 2000);
  if (!url) return '';
  if (local && /^\/(?!\/)[a-zA-Z0-9/_#?=&.%+-]*$/.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) fail('Use a public HTTPS link.');
    if (whop && parsed.hostname !== 'whop.com' && parsed.hostname !== 'www.whop.com') fail('Use a verified Whop URL.');
    if (/^(localhost|127\.|10\.|192\.168\.|169\.254\.)/.test(parsed.hostname)) fail('Private network links are not allowed.');
    return parsed.href;
  } catch { fail('Use a valid HTTPS or internal website link.'); }
};
const validDate = (value) => {
  if (!value) return null;
  const s = text(value, 30).slice(0, 10);
  const parsed = new Date(`${s}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== s) fail('Use a valid YYYY-MM-DD date.');
  return s;
};
const category = (value) => {
  if (!EDUCATION_CATEGORIES.some(c => c.id === value)) fail('Choose an education category.');
  return value;
};
const locale = (value) => {
  if (!['en', 'es'].includes(value)) fail('Choose English or Spanish.');
  return value;
};
const status = (value) => {
  if (!['draft', 'review', 'published'].includes(value)) fail('Choose draft, review or published.');
  return value;
};
const list = (value, max = 50) => {
  if (!Array.isArray(value) || value.length > max) fail('Invalid content list.');
  return value;
};
const identity = (value) => {
  const id = value.id || crypto.randomUUID();
  if (!/^[a-zA-Z0-9-]{1,160}$/.test(id)) fail('Invalid content ID.');
  if (value.id && (!Number.isInteger(value.revision) || value.revision < 1)) fail('Reload before saving: revision is missing.', 409);
  return { id, revision: value.id ? value.revision : 0 };
};
export function validateArticle(value = {}) {
  const a = {
    ...identity(value), locale: locale(value.locale), category: category(value.category), status: status(value.status),
    translationKey: text(value.translationKey, 160), slug: text(value.slug, 130), title: text(value.title, 240),
    excerpt: text(value.excerpt, 600), author: text(value.author, 150),
    introduction: text(value.introduction, 12000), conclusion: text(value.conclusion, 6000),
    imageUrl: safeUrl(value.imageUrl), imageAlt: text(value.imageAlt, 300), videoUrl: safeUrl(value.videoUrl),
    seoTitle: text(value.seoTitle, 240), seoDescription: text(value.seoDescription, 320),
    reviewedAt: validDate(value.reviewedAt), publishedAt: validDate(value.publishedAt),
    verified: value.verified === true, translationReviewed: value.translationReviewed === true,
    specialistReviewRequired: value.specialistReviewRequired === true, specialistApproved: value.specialistApproved === true,
    reviewNote: text(value.reviewNote, 3000),
    sections: list(value.sections || []).map(s => ({
      heading: text(s.heading, 240),
      paragraphs: list(s.paragraphs || [], 30).map(p => text(p, 12000)),
      bullets: list(s.bullets || [], 50).map(b => text(b, 3000)),
    })),
    sources: list(value.sources || [], 30).map(s => ({ title: text(s.title, 250), url: safeUrl(s.url, { local: false }), reviewedAt: validDate(s.reviewedAt) })),
    internalLinks: list(value.internalLinks || [], 20).map(s => ({ title: text(s.title, 200), url: safeUrl(s.url) })),
  };
  if (!a.title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) fail('A title and lowercase hyphenated URL slug are required.');
  // Existing indexed URLs are deliberately separate and cannot be overwritten by CMS records.
  if (a.status === 'published') {
    const today = new Date().toISOString().slice(0, 10);
    if (!a.verified || !a.author || !a.reviewedAt || !a.publishedAt || a.publishedAt > today || a.reviewedAt > today) fail('Publication requires factual approval, author and current publication/review dates. Scheduled publishing is not available.');
    if (!a.translationKey || !a.seoTitle || !a.seoDescription || !a.excerpt || !a.introduction || !a.conclusion || a.sections.length < 3 || articleText(a).split(/\s+/).length < 300) fail('Complete the article, SEO fields, translation key and substantive sections before publishing.');
    if (!a.sources.length || a.sources.some(s => !s.title || !s.url || !s.reviewedAt || s.reviewedAt > today)) fail('Publication requires reviewed source citations.');
    if (a.locale === 'es' && !a.translationReviewed) fail('Spanish content requires a separate language review.');
    if (a.specialistReviewRequired && !a.specialistApproved) fail('Legal, tax or specialist content must remain in review until approved.');
    if (a.imageUrl && !a.imageAlt) fail('Add descriptive image alt text.');
  }
  return a;
}
export function validateResource(value = {}) {
  const r = { ...identity(value), locale: locale(value.locale), category: category(value.category), status: status(value.status), title: text(value.title, 240), description: text(value.description, 2000), url: safeUrl(value.url), access: value.access, template: list(value.template || [], 100).map(t => text(t, 2500)) };
  if (!r.title || !['free', 'paid', 'external'].includes(r.access)) fail('A title and access requirement are required.');
  if (r.status === 'published' && (!r.description || (!r.url && !r.template.length))) fail('Published resources need a description and working link or checklist.');
  return r;
}
export function validateImage(value = {}) {
  const { mime, base64 } = value;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime) || typeof base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) fail('Upload a JPEG, PNG or WebP image.');
  const bytes = Buffer.from(base64, 'base64');
  if (!bytes.length || bytes.length > 1572864 || bytes.toString('base64') !== base64) fail('Image limit is 1.5 MiB.');
  const ok = mime === 'image/png' ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : mime === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!ok) fail('The image contents do not match its file type.');
  const name = text(value.name, 150).replace(/[^\w .-]/g, '_');
  return { name, mime, bytes };
}
