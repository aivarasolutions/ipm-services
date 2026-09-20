/* global process, Buffer, setImmediate */
import crypto from 'crypto';
import { DiscordClient } from './discordClient.js';
import { validatePropertyReviewLead } from './leadValidation.js';
import { desiredRoles, roleChanges } from './membershipPolicy.js';
import { CommunityStore } from './store.js';
import { verifyWhopWebhook } from './verifyWebhook.js';
import { WhopClient } from './whopClient.js';

const MEMBERSHIP_EVENTS = new Set([
  'membership.activated',
  'membership.cancel_at_period_end_changed',
  'membership.deactivated',
]);

const text = (value, max = 100) => String(value || '').trim().slice(0, max);
const safeName = (value) => text(value || 'Member', 80).replace(/[\r\n@]/g, ' ');
const configured = (...values) => values.every(Boolean);
const relationId = (value) => typeof value === 'string' ? value : value?.id;

function authorized(req, secret) {
  const supplied = req.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  const actual = Buffer.from(supplied);
  const expected = Buffer.from(secret || '');
  if (!secret || actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

export function createCommunityIntegration({ pool, env = process.env, fetchImpl = fetch }) {
  const config = {
    webhookSecret: env.WHOP_WEBHOOK_SECRET,
    adminSecret: env.INTEGRATION_CRON_SECRET,
    freeProductId: env.WHOP_FREE_PRODUCT_ID,
    freePlanId: env.WHOP_FREE_PLAN_ID,
    proProductId: env.WHOP_PRO_PRODUCT_ID,
    proPlanId: env.WHOP_PRO_PLAN_ID,
    communityRoleId: env.DISCORD_COMMUNITY_ROLE_ID,
    proRoleId: env.DISCORD_PRO_ROLE_ID,
    teamRoleId: env.DISCORD_TEAM_ROLE_ID,
  };
  const store = new CommunityStore(pool);
  const discord = new DiscordClient({ token: env.DISCORD_BOT_TOKEN, guildId: env.DISCORD_GUILD_ID, logChannelId: env.DISCORD_MEMBERSHIP_LOG_CHANNEL_ID, fetchImpl });
  const whop = new WhopClient({ apiKey: env.WHOP_API_KEY, accountId: env.WHOP_ACCOUNT_ID, version: env.WHOP_API_VERSION_DATE, fetchImpl });

  const ready = store.seedMappings(config).catch((error) => console.error('[community] database setup failed:', error.message));

  async function reconcile(whopUserId, displayName) {
    await ready;
    const account = await store.account(whopUserId);
    if (!account) return { status: 'awaiting_discord_link', add: [], remove: [] };
    const memberships = await whop.listMembershipsForUser(whopUserId);
    await store.replaceMemberships(whopUserId, memberships);
    const mappings = await store.mappings();
    const desired = desiredRoles(await store.activeMemberships(whopUserId), mappings);
    const managed = new Set(mappings.map((item) => item.discord_role_id));
    const member = await discord.getMember(account.discord_user_id);
    const changes = roleChanges({ currentRoles: member.roles || [], desired, managed, protectedRoles: [config.teamRoleId].filter(Boolean) });
    for (const roleId of changes.add) {
      await discord.addRole(account.discord_user_id, roleId);
      await store.audit({ whopUserId, discordUserId: account.discord_user_id, roleId, action: 'grant', result: 'success' });
    }
    for (const roleId of changes.remove) {
      await discord.removeRole(account.discord_user_id, roleId);
      await store.audit({ whopUserId, discordUserId: account.discord_user_id, roleId, action: 'remove', result: 'success' });
    }
    if (changes.add.length || changes.remove.length) {
      const actions = [...changes.add.map(() => 'membership role granted'), ...changes.remove.map(() => 'membership role removed')].join(', ');
      await discord.log(`${safeName(displayName || account.display_name)} membership synchronized → ${actions}`);
    }
    return { status: 'synchronized', ...changes };
  }

  async function processWebhook(id) {
    const event = await store.markProcessing(id);
    if (!event) return;
    try {
      if (!MEMBERSHIP_EVENTS.has(event.type)) return await store.complete(id, 'ignored', 'Event does not change membership access');
      const data = event.data || {};
      const forcedStatus = event.type === 'membership.deactivated' ? 'inactive' : undefined;
      const { whopUserId } = await store.upsertMembership(data, event.timestamp || event.created_at, forcedStatus);
      const mappings = await store.mappings();
      const productId = relationId(data.product_id || data.product);
      const planId = relationId(data.plan_id || data.plan);
      const recognized = mappings.some((item) => (!item.product_id || item.product_id === productId) && (!item.plan_id || item.plan_id === planId));
      if (!recognized) {
        await store.audit({ whopUserId, action: 'reconcile', result: 'ignored_unknown_entitlement', webhookId: id });
        return await store.complete(id, 'ignored', 'No role mapping for product/plan');
      }
      const result = await reconcile(whopUserId, data.user?.name);
      await store.complete(id, result.status === 'awaiting_discord_link' ? result.status : 'processed');
    } catch (error) {
      await store.fail(id, error.message);
      console.error('[community] webhook processing failed:', id, error.message);
    }
  }

  function register(app) {
    app.post('/api/webhooks/whop', async (req, res, next) => {
      try {
        const rawBody = req.rawBody?.toString('utf8');
        if (!rawBody) throw Object.assign(new Error('Raw webhook body unavailable'), { status: 400 });
        const { id, event } = verifyWhopWebhook({ rawBody, headers: req.headers, secret: config.webhookSecret });
        const claimed = await store.claimWebhook(id, event.type, event);
        res.status(202).json({ accepted: true, duplicate: !claimed });
        if (claimed) setImmediate(() => void processWebhook(id));
      } catch (error) { next(error); }
    });

    app.get('/api/integrations/community/health', async (_req, res, next) => {
      try {
        const counts = await store.health();
        res.json({ ok: true, configured: {
          whopApi: configured(env.WHOP_API_KEY, env.WHOP_ACCOUNT_ID),
          whopWebhook: Boolean(config.webhookSecret),
          discord: configured(env.DISCORD_BOT_TOKEN, env.DISCORD_GUILD_ID, config.communityRoleId),
        }, ...counts });
      } catch (error) { next(error); }
    });

    app.post('/api/community/property-review-leads', async (req, res, next) => {
      let lead;
      try {
        lead = validatePropertyReviewLead(req.body);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      try {
        const id = crypto.randomUUID();
        await store.createLead(id, lead);
        res.status(201).json({ ok: true, id });
      } catch (error) { next(error); }
    });

    app.post('/api/integrations/community/link', async (req, res, next) => {
      try {
        if (!authorized(req, config.adminSecret)) return res.status(401).json({ error: 'Unauthorized' });
        const whopUserId = text(req.body?.whopUserId, 80);
        const discordUserId = text(req.body?.discordUserId, 30);
        const displayName = text(req.body?.displayName, 100);
        if (!whopUserId || !/^\d{15,25}$/.test(discordUserId)) return res.status(400).json({ error: 'Valid Whop and Discord user IDs are required' });
        await discord.getMember(discordUserId);
        await store.linkAccount({ whopUserId, discordUserId, displayName });
        res.json({ ok: true, reconciliation: await reconcile(whopUserId, displayName) });
      } catch (error) { next(error); }
    });

    app.post('/api/integrations/community/reconcile', async (req, res, next) => {
      try {
        if (!authorized(req, config.adminSecret)) return res.status(401).json({ error: 'Unauthorized' });
        const whopUserId = text(req.body?.whopUserId, 80);
        if (!whopUserId) return res.status(400).json({ error: 'whopUserId is required' });
        res.json({ ok: true, reconciliation: await reconcile(whopUserId) });
      } catch (error) { next(error); }
    });
  }

  return { register, reconcile, processWebhook };
}
