import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const VALID_CHECKLISTS = new Set(['tegucigalpa']);
const assertChecklist = (id) => {
  if (!VALID_CHECKLISTS.has(id)) {
    const err = new Error('Unknown checklist');
    err.status = 404;
    throw err;
  }
};

const bumpVersion = async (client, checklistId) => {
  const r = await client.query(
    `INSERT INTO checklist_meta (checklist_id, version, updated_at)
     VALUES ($1, 1, NOW())
     ON CONFLICT (checklist_id) DO UPDATE SET version = checklist_meta.version + 1, updated_at = NOW()
     RETURNING version`,
    [checklistId]
  );
  return r.rows[0].version;
};

app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }));

app.get('/api/checklist/:id/version', async (req, res, next) => {
  try {
    assertChecklist(req.params.id);
    const r = await pool.query('SELECT version, updated_at FROM checklist_meta WHERE checklist_id = $1', [req.params.id]);
    res.json({ version: r.rows[0]?.version ?? 0, updatedAt: r.rows[0]?.updated_at ?? null });
  } catch (e) { next(e); }
});

app.get('/api/checklist/:id', async (req, res, next) => {
  try {
    assertChecklist(req.params.id);
    const [ovRes, ciRes, mRes] = await Promise.all([
      pool.query('SELECT item_id, data FROM checklist_overrides WHERE checklist_id = $1', [req.params.id]),
      pool.query('SELECT item_id, data FROM checklist_custom_items WHERE checklist_id = $1 ORDER BY item_id', [req.params.id]),
      pool.query('SELECT version, updated_at FROM checklist_meta WHERE checklist_id = $1', [req.params.id]),
    ]);
    const overrides = {};
    ovRes.rows.forEach(r => { overrides[r.item_id] = r.data; });
    res.json({
      overrides,
      customItems: ciRes.rows.map(r => r.data),
      version: mRes.rows[0]?.version ?? 0,
      updatedAt: mRes.rows[0]?.updated_at ?? null,
    });
  } catch (e) { next(e); }
});

app.put('/api/checklist/:id/override/:itemId', async (req, res, next) => {
  const client = await pool.connect();
  try {
    assertChecklist(req.params.id);
    const itemId = parseInt(req.params.itemId, 10);
    if (isNaN(itemId)) return res.status(400).json({ error: 'invalid itemId' });
    const data = req.body || {};
    await client.query('BEGIN');
    if (data && Object.keys(data).length > 0) {
      await client.query(
        `INSERT INTO checklist_overrides (checklist_id, item_id, data, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (checklist_id, item_id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [req.params.id, itemId, data]
      );
    } else {
      await client.query('DELETE FROM checklist_overrides WHERE checklist_id = $1 AND item_id = $2', [req.params.id, itemId]);
    }
    const version = await bumpVersion(client, req.params.id);
    await client.query('COMMIT');
    res.json({ ok: true, version });
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    next(e);
  } finally {
    client.release();
  }
});

app.post('/api/checklist/:id/items', async (req, res, next) => {
  const client = await pool.connect();
  try {
    assertChecklist(req.params.id);
    const item = req.body;
    if (!item || typeof item !== 'object' || !item.id) {
      return res.status(400).json({ error: 'item with id required' });
    }
    await client.query('BEGIN');
    await client.query(
      `INSERT INTO checklist_custom_items (checklist_id, item_id, data)
       VALUES ($1, $2, $3)
       ON CONFLICT (checklist_id, item_id) DO UPDATE SET data = EXCLUDED.data`,
      [req.params.id, item.id, item]
    );
    const version = await bumpVersion(client, req.params.id);
    await client.query('COMMIT');
    res.json({ ok: true, version });
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    next(e);
  } finally {
    client.release();
  }
});

app.delete('/api/checklist/:id/items/:itemId', async (req, res, next) => {
  const client = await pool.connect();
  try {
    assertChecklist(req.params.id);
    const itemId = parseInt(req.params.itemId, 10);
    if (isNaN(itemId)) return res.status(400).json({ error: 'invalid itemId' });
    await client.query('BEGIN');
    await client.query('DELETE FROM checklist_custom_items WHERE checklist_id = $1 AND item_id = $2', [req.params.id, itemId]);
    const version = await bumpVersion(client, req.params.id);
    await client.query('COMMIT');
    res.json({ ok: true, version });
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    next(e);
  } finally {
    client.release();
  }
});

// In production (Replit autoscale), serve the built static site if it exists
if (process.env.NODE_ENV === 'production' || process.env.REPLIT_DEPLOYMENT === '1') {
  const distPath = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    app.use(express.static(distPath));
    app.get(/^(?!\/api\/).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) res.status(500).send('static asset error');
      });
    });
  } else {
    console.warn('[api] dist/ not found — running as API-only');
  }
}

app.use((err, req, res, next) => {
  console.error('API error:', err);
  res.status(err.status || 500).json({ error: err.message || 'server error' });
});

const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] listening on :${PORT}`);
});
