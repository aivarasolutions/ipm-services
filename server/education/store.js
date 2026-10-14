import { articles, resources, categories } from './seeds.js';
import { fail } from './validation.js';
export class EducationStore {
  constructor(pool) { this.pool = pool; this.ready = null; }
  async ensureSchema() {
    if (!this.ready) this.ready = this.initialize().catch(e => { this.ready = null; throw e; });
    return this.ready;
  }
  async initialize() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS education_content (
        id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('article','resource')),
        locale TEXT NOT NULL CHECK(locale IN ('en','es')), slug TEXT, status TEXT NOT NULL,
        data JSONB NOT NULL, revision INTEGER NOT NULL DEFAULT 1, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE UNIQUE INDEX IF NOT EXISTS education_article_slug ON education_content(locale,slug) WHERE kind='article';
      CREATE TABLE IF NOT EXISTS education_settings (id TEXT PRIMARY KEY, data JSONB NOT NULL);
      CREATE TABLE IF NOT EXISTS education_staff (email TEXT PRIMARY KEY, invited_by TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
      CREATE TABLE IF NOT EXISTS education_images (id UUID PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, bytes BYTEA NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
      CREATE TABLE IF NOT EXISTS education_audit (id BIGSERIAL PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL, content_id TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    `);
    // The marker prevents deleted/unpublished seed content from reappearing on restart.
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query("SELECT pg_advisory_xact_lock(hashtext('ipm-education-seed'))");
      const seeded = await client.query("SELECT id FROM education_settings WHERE id='seeded'");
      if (!seeded.rows.length) {
        for (const [kind, values] of [['article', articles], ['resource', resources]]) {
          for (const item of values) await client.query('INSERT INTO education_content(id,kind,locale,slug,status,data) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(id) DO NOTHING', [item.id, kind, item.locale, kind === 'article' ? item.slug : null, item.status, item]);
        }
        await client.query("INSERT INTO education_settings(id,data) VALUES('seeded','{}') ON CONFLICT DO NOTHING");
      }
      await client.query('COMMIT');
    } catch (e) { await client.query('ROLLBACK'); throw e; }
    finally { client.release(); }
  }
  async all(kind, { locale, published = false } = {}) {
    await this.ensureSchema();
    const result = await this.pool.query("SELECT id,data,revision,updated_at FROM education_content WHERE kind=$1 AND ($2::text IS NULL OR locale=$2) AND (NOT $3::boolean OR status='published') ORDER BY updated_at DESC,id", [kind, locale || null, published]);
    return result.rows.map(r => ({ ...r.data, id: r.id, revision: r.revision, updatedAt: r.updated_at }));
  }
  async article(locale, slug, published = true) {
    return (await this.all('article', { locale, published })).find(a => a.slug === slug);
  }
  async save(kind, value, actor) {
    await this.ensureSchema();
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      // URLs of saved articles stay fixed so existing links and indexed paths do not break.
      const prior = await client.query('SELECT locale,slug FROM education_content WHERE id=$1 AND kind=$2 FOR UPDATE', [value.id, kind]);
      if (prior.rows.length && kind === 'article' && (prior.rows[0].slug !== value.slug || prior.rows[0].locale !== value.locale)) fail('The saved article URL and language cannot change. Create a linked translation or new article instead.');
      let result;
      if (value.revision === 0) {
        result = await client.query('INSERT INTO education_content(id,kind,locale,slug,status,data) VALUES($1,$2,$3,$4,$5,$6) RETURNING revision', [value.id, kind, value.locale, kind === 'article' ? value.slug : null, value.status, value]);
      } else {
        result = await client.query('UPDATE education_content SET status=$3,data=$4,revision=revision+1,updated_at=NOW() WHERE id=$1 AND kind=$2 AND revision=$5 RETURNING revision', [value.id, kind, value.status, value, value.revision]);
        if (!result.rows.length) fail('Another staff member changed this content. Reload before saving.', 409);
      }
      await client.query('INSERT INTO education_audit(actor,action,content_id) VALUES($1,$2,$3)', [actor, `save_${kind}_${value.status}`, value.id]);
      await client.query('COMMIT');
      return { ...value, revision: result.rows[0].revision };
    } catch (e) { await client.query('ROLLBACK'); if (e.code === '23505') fail('This article URL already exists.', 409); throw e; }
    finally { client.release(); }
  }
  async remove(kind, id, revision, actor) {
    await this.ensureSchema();
    if (!Number.isInteger(Number(revision)) || Number(revision) < 1) fail('Reload before deleting.', 409);
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query('DELETE FROM education_content WHERE id=$1 AND kind=$2 AND revision=$3 RETURNING id', [id, kind, revision]);
      if (!result.rows.length) fail('Content changed or was removed. Reload before deleting.', 409);
      await client.query('INSERT INTO education_audit(actor,action,content_id) VALUES($1,$2,$3)', [actor, `delete_${kind}`, id]);
      await client.query('COMMIT');
    } catch (e) { await client.query('ROLLBACK'); throw e; }
    finally { client.release(); }
  }
  async settings() {
    await this.ensureSchema();
    return (await this.pool.query("SELECT data FROM education_settings WHERE id='public'")).rows[0]?.data || { whopStoreUrl: '' };
  }
  async setSettings(data) {
    await this.ensureSchema();
    await this.pool.query("INSERT INTO education_settings(id,data) VALUES('public',$1) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data", [data]);
  }
  async staff() {
    await this.ensureSchema();
    return (await this.pool.query('SELECT email FROM education_staff ORDER BY email')).rows;
  }
  async hasStaff(email) { return (await this.staff()).some(s => s.email === email); }
  async invite(email, actor) {
    await this.ensureSchema();
    await this.pool.query('INSERT INTO education_staff(email,invited_by) VALUES($1,$2) ON CONFLICT DO NOTHING', [email, actor]);
  }
  async revoke(email) { await this.pool.query('DELETE FROM education_staff WHERE email=$1', [email]); }
  async images() {
    await this.ensureSchema();
    return (await this.pool.query('SELECT id,name FROM education_images ORDER BY created_at DESC LIMIT 100')).rows.map(r => ({ name: r.name, url: `/api/education/images/${r.id}` }));
  }
  async image(id) { await this.ensureSchema(); return (await this.pool.query('SELECT name,mime,bytes FROM education_images WHERE id=$1', [id])).rows[0]; }
  async addImage(id, file) {
    await this.ensureSchema();
    await this.pool.query('INSERT INTO education_images(id,name,mime,bytes) VALUES($1,$2,$3,$4)', [id, file.name, file.mime, file.bytes]);
    return { name: file.name, url: `/api/education/images/${id}` };
  }
  async content() {
    const [articles, resources, settings, staff, images] = await Promise.all([this.all('article'), this.all('resource'), this.settings(), this.staff(), this.images()]);
    return { articles, resources, settings, staff, images, categories };
  }
}
