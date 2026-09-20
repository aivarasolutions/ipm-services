let schemaReady;

const relationId = (value) => typeof value === 'string' ? value : value?.id || null;
const timestampValue = (value) => {
  if (!value) return null;
  if (typeof value === 'number') return new Date(value < 1e12 ? value * 1000 : value);
  if (/^\d+$/.test(String(value))) {
    const numeric = Number(value);
    return new Date(numeric < 1e12 ? numeric * 1000 : numeric);
  }
  return value;
};

export class CommunityStore {
  constructor(pool) { this.pool = pool; }

  ensureSchema() {
    schemaReady ||= this.pool.query(`
      CREATE TABLE IF NOT EXISTS community_accounts (
        whop_user_id TEXT PRIMARY KEY,
        discord_user_id TEXT NOT NULL UNIQUE,
        display_name TEXT,
        verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS community_membership_snapshots (
        membership_id TEXT PRIMARY KEY,
        whop_user_id TEXT NOT NULL,
        product_id TEXT,
        plan_id TEXT,
        status TEXT NOT NULL,
        cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
        period_end TIMESTAMPTZ,
        event_timestamp TIMESTAMPTZ,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS community_membership_user_status_idx
        ON community_membership_snapshots (whop_user_id, status);
      CREATE TABLE IF NOT EXISTS community_role_mappings (
        id BIGSERIAL PRIMARY KEY,
        product_id TEXT,
        plan_id TEXT,
        discord_role_id TEXT NOT NULL,
        tier TEXT NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT TRUE
      );
      CREATE UNIQUE INDEX IF NOT EXISTS community_role_mapping_unique_idx
        ON community_role_mappings (COALESCE(product_id, ''), COALESCE(plan_id, ''), discord_role_id);
      CREATE TABLE IF NOT EXISTS community_webhook_events (
        webhook_id TEXT PRIMARY KEY,
        event_type TEXT NOT NULL,
        payload JSONB,
        status TEXT NOT NULL DEFAULT 'pending',
        attempts INTEGER NOT NULL DEFAULT 0,
        error TEXT,
        received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        processed_at TIMESTAMPTZ
      );
      CREATE TABLE IF NOT EXISTS community_role_audit (
        id BIGSERIAL PRIMARY KEY,
        membership_id TEXT,
        whop_user_id TEXT NOT NULL,
        discord_user_id TEXT,
        discord_role_id TEXT,
        action TEXT NOT NULL,
        result TEXT NOT NULL,
        source_webhook_id TEXT,
        detail TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS property_review_leads (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        property_location TEXT NOT NULL,
        listing_url TEXT,
        property_count INTEGER NOT NULL,
        booking_platforms JSONB NOT NULL,
        biggest_problem TEXT NOT NULL,
        wants_property_review BOOLEAN NOT NULL,
        consent_at TIMESTAMPTZ NOT NULL,
        source TEXT NOT NULL DEFAULT 'ipm-community',
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    return schemaReady;
  }

  async seedMappings(config) {
    await this.ensureSchema();
    const mappings = [
      [config.freeProductId, config.freePlanId, config.communityRoleId, 'community'],
      [config.proProductId, config.proPlanId, config.communityRoleId, 'community'],
      [config.proProductId, config.proPlanId, config.proRoleId, 'pro'],
    ].filter(([productId, , roleId]) => productId && roleId);
    for (const [productId, planId, roleId, tier] of mappings) {
      await this.pool.query(`
        INSERT INTO community_role_mappings(product_id, plan_id, discord_role_id, tier)
        VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING
      `, [productId, planId || null, roleId, tier]);
    }
  }

  async claimWebhook(id, type, payload) {
    await this.ensureSchema();
    const result = await this.pool.query(`
      INSERT INTO community_webhook_events(webhook_id, event_type, payload)
      VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING webhook_id
    `, [id, type, payload]);
    return result.rowCount === 1;
  }

  async markProcessing(id) {
    const result = await this.pool.query(`
      UPDATE community_webhook_events SET status='processing', attempts=attempts+1, error=NULL
      WHERE webhook_id=$1 AND status IN ('pending','failed') AND attempts < 5 RETURNING payload
    `, [id]);
    return result.rows[0]?.payload;
  }

  complete(id, status = 'processed', detail = null) {
    return this.pool.query(`
      UPDATE community_webhook_events SET status=$2, payload=NULL, error=$3, processed_at=NOW()
      WHERE webhook_id=$1
    `, [id, status, detail]);
  }

  fail(id, error) {
    return this.pool.query(`UPDATE community_webhook_events SET status='failed', error=$2 WHERE webhook_id=$1`, [id, String(error).slice(0, 1000)]);
  }

  async linkAccount({ whopUserId, discordUserId, displayName }) {
    await this.ensureSchema();
    await this.pool.query(`
      INSERT INTO community_accounts(whop_user_id, discord_user_id, display_name)
      VALUES ($1,$2,$3) ON CONFLICT(whop_user_id) DO UPDATE SET
        discord_user_id=EXCLUDED.discord_user_id, display_name=EXCLUDED.display_name,
        verified_at=NOW(), updated_at=NOW()
    `, [whopUserId, discordUserId, displayName || null]);
  }

  async account(whopUserId) {
    await this.ensureSchema();
    return (await this.pool.query('SELECT * FROM community_accounts WHERE whop_user_id=$1', [whopUserId])).rows[0];
  }

  async mappings() {
    await this.ensureSchema();
    return (await this.pool.query('SELECT * FROM community_role_mappings WHERE enabled=TRUE')).rows;
  }

  async activeMemberships(whopUserId) {
    return (await this.pool.query(`SELECT * FROM community_membership_snapshots WHERE whop_user_id=$1 AND status IN ('active','trialing')`, [whopUserId])).rows;
  }

  async replaceMemberships(whopUserId, memberships) {
    await this.ensureSchema();
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const ids = [];
      for (const item of memberships) {
        const userId = item.user_id || item.user?.id;
        if (!item.id || userId !== whopUserId) continue;
        ids.push(item.id);
        await this.upsertMembership(item, item.updated_at || new Date().toISOString(), undefined, client);
      }
      if (ids.length) {
        await client.query(`UPDATE community_membership_snapshots SET status='inactive', updated_at=NOW() WHERE whop_user_id=$1 AND NOT (membership_id = ANY($2::text[]))`, [whopUserId, ids]);
      } else {
        await client.query(`UPDATE community_membership_snapshots SET status='inactive', updated_at=NOW() WHERE whop_user_id=$1`, [whopUserId]);
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally { client.release(); }
  }

  async upsertMembership(data, timestamp, statusOverride, db = this.pool) {
    const membershipId = data.id;
    const whopUserId = data.user_id || data.user?.id;
    if (!membershipId || !whopUserId) throw new Error('Membership is missing its membership or user ID');
    await db.query(`
      INSERT INTO community_membership_snapshots
        (membership_id, whop_user_id, product_id, plan_id, status, cancel_at_period_end, period_end, event_timestamp)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT(membership_id) DO UPDATE SET
        whop_user_id=EXCLUDED.whop_user_id, product_id=EXCLUDED.product_id,
        plan_id=EXCLUDED.plan_id, status=EXCLUDED.status,
        cancel_at_period_end=EXCLUDED.cancel_at_period_end, period_end=EXCLUDED.period_end,
        event_timestamp=EXCLUDED.event_timestamp, updated_at=NOW()
      WHERE community_membership_snapshots.event_timestamp IS NULL OR EXCLUDED.event_timestamp IS NULL
         OR EXCLUDED.event_timestamp >= community_membership_snapshots.event_timestamp
    `, [
      membershipId, whopUserId, relationId(data.product_id || data.product),
      relationId(data.plan_id || data.plan), statusOverride || data.status || 'unknown',
      Boolean(data.cancel_at_period_end), timestampValue(data.current_period_end || data.renewal_period_end),
      timestampValue(timestamp),
    ]);
    return { membershipId, whopUserId };
  }

  audit(entry) {
    return this.pool.query(`
      INSERT INTO community_role_audit
        (membership_id, whop_user_id, discord_user_id, discord_role_id, action, result, source_webhook_id, detail)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `, [entry.membershipId || null, entry.whopUserId, entry.discordUserId || null, entry.roleId || null,
      entry.action, entry.result, entry.webhookId || null, entry.detail ? String(entry.detail).slice(0, 1000) : null]);
  }

  async createLead(id, lead) {
    await this.ensureSchema();
    await this.pool.query(`
      INSERT INTO property_review_leads
        (id, name, email, phone, property_location, listing_url, property_count,
         booking_platforms, biggest_problem, wants_property_review, consent_at, source)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    `, [id, lead.name, lead.email, lead.phone || null, lead.propertyLocation,
      lead.listingUrl || null, lead.propertyCount, JSON.stringify(lead.bookingPlatforms),
      lead.biggestProblem, lead.wantsPropertyReview, lead.consentAt, lead.source]);
  }

  async health() {
    await this.ensureSchema();
    const result = await this.pool.query(`SELECT
      (SELECT COUNT(*)::int FROM community_accounts) linked_accounts,
      (SELECT COUNT(*)::int FROM community_webhook_events WHERE status='failed') failed_events`);
    return result.rows[0];
  }
}
