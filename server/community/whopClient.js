const API = 'https://api.whop.com/api/v1';

export class WhopClient {
  constructor({ apiKey, accountId, version, fetchImpl = fetch }) {
    this.apiKey = apiKey;
    this.accountId = accountId;
    this.version = version;
    this.fetch = fetchImpl;
  }

  async request(path) {
    if (!this.apiKey || !this.accountId) throw new Error('Whop reconciliation is not configured');
    const headers = { Authorization: `Bearer ${this.apiKey}` };
    if (this.version) headers['Api-Version-Date'] = this.version;
    const response = await this.fetch(`${API}${path}`, { headers });
    if (!response.ok) throw new Error(`Whop API ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return response.json();
  }

  async listMembershipsForUser(whopUserId) {
    const result = [];
    let after;
    do {
      const query = new URLSearchParams({ account_id: this.accountId, first: '100' });
      query.append('user_ids[]', whopUserId);
      if (after) query.set('after', after);
      const page = await this.request(`/memberships?${query}`);
      result.push(...(page.data || []));
      after = page.page_info?.has_next_page ? page.page_info.end_cursor : undefined;
    } while (after);
    return result;
  }
}
