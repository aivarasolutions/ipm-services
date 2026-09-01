export const applySeoMetadataToDocument = (metadata) => {
  if (!metadata || typeof document === 'undefined') return;

  const setMeta = (selector, attribute, key, content) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  document.title = metadata.title;
  setMeta('meta[name="title"]', 'name', 'title', metadata.title);
  setMeta('meta[name="description"]', 'name', 'description', metadata.description);
  setMeta('meta[name="robots"]', 'name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, nofollow');
  setMeta('meta[property="og:url"]', 'property', 'og:url', metadata.canonical);
  setMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    vi: 'vi_VN',
  }[metadata.locale || 'en']);
  setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', metadata.canonical);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = metadata.canonical;

  document.head.querySelectorAll('[data-seo-alternate]').forEach((link) => link.remove());
  (metadata.alternates || []).forEach(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    link.dataset.seoAlternate = '';
    document.head.appendChild(link);
  });
  document.documentElement.lang = metadata.locale || 'en';
};