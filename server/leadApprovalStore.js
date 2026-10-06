import { createHash, randomBytes, randomUUID } from 'node:crypto'

export const hashToken = token => createHash('sha256').update(token).digest('hex')

export class LeadApprovalStore {
  constructor(pool) {
    this.pool = pool
    this.ready = null
  }

  ensureSchema() {
    if (!this.ready) {
      this.ready = this.pool.query(`
        CREATE TABLE IF NOT EXISTS owner_lead_approvals (
          id UUID PRIMARY KEY,
          token_hash TEXT NOT NULL UNIQUE,
          invitation_hash TEXT UNIQUE,
          lead JSONB NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '14 days',
          invitation_expires_at TIMESTAMPTZ,
          sent_at TIMESTAMPTZ
        )
      `).catch(error => { this.ready = null; throw error })
    }
    return this.ready
  }

  async create(lead) {
    await this.ensureSchema()
    const token = randomBytes(32).toString('hex')
    await this.pool.query(
      'INSERT INTO owner_lead_approvals (id, token_hash, lead) VALUES ($1, $2, $3)',
      [randomUUID(), hashToken(token), JSON.stringify(lead)],
    )
    return token
  }

  async find(token) {
    await this.ensureSchema()
    const result = await this.pool.query(
      'SELECT id, lead, status, expires_at FROM owner_lead_approvals WHERE token_hash = $1',
      [hashToken(token)],
    )
    return result.rows[0]
  }

  async claim(token, invitationToken) {
    const result = await this.pool.query(
      `UPDATE owner_lead_approvals SET status = 'sending', invitation_hash = $2,
       invitation_expires_at = NOW() + INTERVAL '14 days'
       WHERE token_hash = $1 AND status = 'pending' AND expires_at > NOW()
       RETURNING id, lead`,
      [hashToken(token), hashToken(invitationToken)],
    )
    return result.rows[0]
  }

  async finish(id) {
    await this.pool.query("UPDATE owner_lead_approvals SET status = 'sent', sent_at = NOW() WHERE id = $1", [id])
  }

  async fail(id) {
    await this.pool.query("UPDATE owner_lead_approvals SET status = 'pending' WHERE id = $1 AND status = 'sending'", [id])
  }

  async invitation(token) {
    await this.ensureSchema()
    const result = await this.pool.query(
      `SELECT lead FROM owner_lead_approvals WHERE invitation_hash = $1
       AND status IN ('sending', 'sent') AND invitation_expires_at > NOW()`,
      [hashToken(token)],
    )
    return result.rows[0]?.lead
  }
}
