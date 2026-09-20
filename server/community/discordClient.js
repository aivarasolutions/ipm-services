const API = 'https://discord.com/api/v10';

export class DiscordClient {
  constructor({ token, guildId, logChannelId, fetchImpl = fetch }) {
    this.token = token;
    this.guildId = guildId;
    this.logChannelId = logChannelId;
    this.fetch = fetchImpl;
  }

  async request(path, options = {}, retry = true) {
    if (!this.token || !this.guildId) throw new Error('Discord integration is not configured');
    const response = await this.fetch(`${API}${path}`, {
      ...options,
      headers: { Authorization: `Bot ${this.token}`, 'Content-Type': 'application/json', ...options.headers },
    });
    if (response.status === 429 && retry) {
      const body = await response.json();
      await new Promise((resolve) => setTimeout(resolve, Math.ceil((body.retry_after || 1) * 1000)));
      return this.request(path, options, false);
    }
    if (!response.ok) throw new Error(`Discord API ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return response.status === 204 ? null : response.json();
  }

  getMember(userId) { return this.request(`/guilds/${this.guildId}/members/${userId}`); }
  addRole(userId, roleId) { return this.request(`/guilds/${this.guildId}/members/${userId}/roles/${roleId}`, { method: 'PUT' }); }
  removeRole(userId, roleId) { return this.request(`/guilds/${this.guildId}/members/${userId}/roles/${roleId}`, { method: 'DELETE' }); }
  log(message) {
    if (!this.logChannelId) return Promise.resolve();
    return this.request(`/channels/${this.logChannelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: String(message).slice(0, 1900), allowed_mentions: { parse: [] } }),
    });
  }
}
