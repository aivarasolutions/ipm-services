import { WhopClient } from '../community/whopClient.js';
import process from 'node:process';
import { fail, safeUrl } from './validation.js';
// Reuse the existing IPM account, never provision a second store or mutate membership.
export function createWhopResources(env = process.env, fetchImpl = fetch) {
  const client = new WhopClient({ apiKey: env.WHOP_API_KEY, accountId: env.WHOP_ACCOUNT_ID, version: env.WHOP_API_VERSION_DATE, fetchImpl });
  let cache;
  let pending;
  const configured = () => Boolean(env.WHOP_API_KEY && env.WHOP_ACCOUNT_ID);
  async function retrieve(storeUrl = '') {
    if (!configured()) fail('The existing IPM Whop account is not configured. Staff can review setup in the education editor.', 503);
    try {
      const company = await client.request(`/companies/${client.accountId}`);
      if (company.id !== client.accountId || company.title !== 'IPM' || !/^[a-z0-9-]+$/.test(company.route || '')) fail('Whop company identity could not be verified as IPM.', 503);
      const canonical = `https://whop.com/${company.route}/`;
      if (storeUrl && safeUrl(storeUrl, { local: false, whop: true }).replace(/\/$/, '') !== canonical.replace(/\/$/, '')) fail('The Whop storefront URL must match the verified IPM company.', 400);
      const all = async type => {
        const result = [];
        let after;
        for (let i = 0; i < 20; i++) {
          // account_id, NOT company_id: omitting the recognized filter returns marketplace products.
          const params = new URLSearchParams({ account_id: client.accountId, first: '100' });
          if (after) params.set('after', after);
          const page = await client.request(`/${type}?${params}`);
          result.push(...(page.data || []));
          if (!page.page_info?.has_next_page) return result;
          after = page.page_info.end_cursor;
        }
        fail('Whop catalogue is too large to verify completely.', 503);
      };
      const [products, plans] = await Promise.all([all('products'), all('plans')]);
      const offerings = products.filter(p => p.visibility === 'visible').flatMap(p => {
        const productPlans = plans.filter(plan => plan.visibility === 'visible' && plan.product?.id === p.id && plan.purchase_url);
        if (!productPlans.length) return [];
        return productPlans.map(plan => {
          const initial = Number(plan.initial_price);
          const renewal = Number(plan.renewal_price);
          if (!Number.isFinite(initial) || !Number.isFinite(renewal) || !plan.currency) return [];
          const free = initial === 0 && renewal === 0;
          const format = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: plan.currency.toUpperCase() }).format(n);
          return {
            id: plan.id, title: p.title, description: p.description || '', imageUrl: '',
            url: safeUrl(plan.purchase_url, { local: false, whop: true }), access: free ? 'free' : 'paid',
            priceLabel: free ? 'Free' : `${format(initial)} initially${renewal > 0 ? `; ${format(renewal)} renewal${plan.billing_period ? ` every ${plan.billing_period} days` : ' (see Whop terms)'}` : '; see Whop for access terms'}`,
          };
        });
      });
      return { verified: true, store: { name: company.title, url: canonical, verifiedAt: new Date().toISOString() }, offerings };
    } catch (e) {
      if (e.status) throw e;
      fail('Whop verification is temporarily unavailable. No unverified products or prices are displayed.', 503);
    }
  }
  return {
    configured,
    async get(storeUrl = '', { refresh = false } = {}) {
      if (!refresh && cache?.url === storeUrl && cache.expires > Date.now()) return cache.data;
      if (pending) {
        const data = await pending;
        if (storeUrl && safeUrl(storeUrl, { local: false, whop: true }).replace(/\/$/, '') !== data.store.url.replace(/\/$/, '')) fail('The Whop storefront URL must match the verified IPM company.', 400);
        return data;
      }
      pending = retrieve(storeUrl).then(data => { cache = { data, url: storeUrl, expires: Date.now() + 60000 }; return data; }).finally(() => { pending = null; });
      return pending;
    },
  };
}
