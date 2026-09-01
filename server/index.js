/* global process */
import express from 'express';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { sendFormEmails } from './emailService.js';
import { addToMailchimp } from './mailchimpService.js';
import {
  getIndexableRoutePaths,
  getPropertySlugFromPath,
  getRealEstateSlugFromPath,
  getSeoMetadata,
  NON_INDEXABLE_ROUTES,
  normalizePathname,
  injectSeoMetadataIntoHtml,
} from '../src/lib/seo.js';
import { createSitemapXml } from '../src/lib/sitemap.js';
import { REAL_ESTATE_SCHEMA_LISTINGS } from '../src/lib/structuredData.js';
import {
  calculateQuote,
  createReservation,
  getCalendar,
  getListing,
  getListings,
  getReviews,
  isHostawayConfigured,
} from './hostawayService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.set('trust proxy', 1);
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

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const parseIsoDate = (value) => {
  if (!ISO_DATE.test(value || '')) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
};
const validDateRange = (startDate, endDate) => {
  const start = parseIsoDate(startDate);
  const end = parseIsoDate(endDate);
  if (!start || !end) return false;
  const current = new Date();
  const today = Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate());
  if (start.getTime() < today) return false;
  const days = (end - start) / 86400000;
  return days > 0 && days <= 365;
};
const validGuests = (value) => Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 50;
const cleanText = (value, max = 250) => String(value || '').trim().slice(0, max);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
const reservationAttempts = new Map();
let bookingGuardTableReady;
const ensureBookingGuardTable = () => {
  bookingGuardTableReady ||= pool.query(`
    CREATE TABLE IF NOT EXISTS booking_request_rate_limits (
      key_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS booking_request_rate_limits_key_created_idx
      ON booking_request_rate_limits (key_hash, created_at);
    CREATE TABLE IF NOT EXISTS booking_request_idempotency (
      idempotency_key TEXT PRIMARY KEY,
      duplicate_hash TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      response JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  return bookingGuardTableReady;
};
const pruneReservationGuards = () => {
  const now = Date.now();
  for (const [key, value] of reservationAttempts) {
    const recent = value.filter((timestamp) => now - timestamp < 3600000);
    if (recent.length) reservationAttempts.set(key, recent);
    else reservationAttempts.delete(key);
  }
};
const guardReservationRequest = async (req, res, next) => {
  pruneReservationGuards();
  const origin = req.get('origin');
  if (!origin) return res.status(403).json({ error: 'Reservation requests must be submitted from the IPM website.' });
  try {
    const normalizedOrigin = new URL(origin).origin;
    const allowedOrigins = new Set([
      'https://ipm.services',
      'https://www.ipm.services',
      'http://localhost:5000',
      process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null,
    ].filter(Boolean));
    if (!allowedOrigins.has(normalizedOrigin)) return res.status(403).json({ error: 'Reservation requests must be submitted from the IPM website.' });
  } catch {
    return res.status(403).json({ error: 'Invalid request origin.' });
  }
  const key = req.ip || 'unknown';
  const attempts = reservationAttempts.get(key) || [];
  if (attempts.length >= 5) {
    return res.status(429).json({ error: 'Too many reservation attempts. Please contact our reservations team.' });
  }
  attempts.push(Date.now());
  reservationAttempts.set(key, attempts);
  try {
    await ensureBookingGuardTable();
    const keyHash = crypto
      .createHash('sha256')
      .update(`${process.env.SESSION_SECRET || 'ipm-booking'}:${key}`)
      .digest('hex');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [keyHash]);
      await client.query("DELETE FROM booking_request_rate_limits WHERE created_at < NOW() - INTERVAL '1 hour'");
      const count = await client.query(
        "SELECT COUNT(*)::int AS total FROM booking_request_rate_limits WHERE key_hash = $1 AND created_at >= NOW() - INTERVAL '1 hour'",
        [keyHash]
      );
      if ((count.rows[0]?.total || 0) >= 5) {
        await client.query('ROLLBACK');
        return res.status(429).json({ error: 'Too many reservation attempts. Please contact our reservations team.' });
      }
      await client.query('INSERT INTO booking_request_rate_limits (key_hash) VALUES ($1)', [keyHash]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {});
      throw error;
    } finally {
      client.release();
    }
    next();
  } catch (error) {
    console.error('[booking] rate-limit storage unavailable', { message: error.message });
    res.status(503).json({ error: 'Reservations are temporarily unavailable. Please contact our reservations team.' });
  }
};
const hashBookingValue = (value) =>
  crypto
    .createHash('sha256')
    .update(`${process.env.SESSION_SECRET || 'ipm-booking'}:${value}`)
    .digest('hex');
const claimReservationRequest = async (idempotencyKey, duplicateHash) => {
  await ensureBookingGuardTable();
  const inserted = await pool.query(
    `INSERT INTO booking_request_idempotency (idempotency_key, duplicate_hash, status)
     VALUES ($1, $2, 'pending')
     ON CONFLICT DO NOTHING
     RETURNING idempotency_key`,
    [idempotencyKey, duplicateHash]
  );
  if (inserted.rowCount) return { claimed: true };
  const existing = await pool.query(
    `SELECT idempotency_key, status, response
     FROM booking_request_idempotency
     WHERE idempotency_key = $1 OR duplicate_hash = $2
     LIMIT 1`,
    [idempotencyKey, duplicateHash]
  );
  return { claimed: false, existing: existing.rows[0] || null };
};
const completeReservationRequest = (idempotencyKey, reservation) =>
  pool.query(
    `UPDATE booking_request_idempotency
     SET status = 'completed', response = $2, updated_at = NOW()
     WHERE idempotency_key = $1`,
    [idempotencyKey, reservation]
  );
const markReservationUncertain = (idempotencyKey) =>
  pool.query(
    `UPDATE booking_request_idempotency
     SET status = 'uncertain', updated_at = NOW()
     WHERE idempotency_key = $1`,
    [idempotencyKey]
  );
const stayValidationError = async (identifier, startDate, endDate, guests) => {
  const property = await getListing(identifier);
  const nights = (parseIsoDate(endDate) - parseIsoDate(startDate)) / 86400000;
  if (Number(guests) > property.guests) return `This property allows up to ${property.guests} guests.`;
  const days = await getCalendar(identifier, startDate, endDate);
  const stayDays = days.filter((day) => day.date < endDate);
  if (stayDays.length !== nights || stayDays.some((day) => !day.isAvailable)) {
    return 'This property is not available for all selected nights.';
  }
  const minimumStay = stayDays[0]?.minimumStay || property.minimumStay || 1;
  const maximumStay = stayDays[0]?.maximumStay || 365;
  if (nights < minimumStay) return `This property requires at least ${minimumStay} nights for the selected arrival date.`;
  if (nights > maximumStay) return `This property allows a maximum stay of ${maximumStay} nights for the selected arrival date.`;
  return null;
};

app.get('/api/properties', async (req, res, next) => {
  try {
    if (!isHostawayConfigured()) return res.status(503).json({ error: 'Booking inventory is temporarily unavailable.' });
    res.json({ properties: await getListings() });
  } catch (error) {
    next(error);
  }
});

app.get('/api/properties/:identifier', async (req, res, next) => {
  try {
    res.json({ property: await getListing(req.params.identifier) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/properties/:identifier/reviews', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 25);
    res.json({ reviews: await getReviews(req.params.identifier, limit) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/properties/:identifier/calendar', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!validDateRange(startDate, endDate)) {
      return res.status(400).json({ error: 'Choose a valid date range of up to one year.' });
    }
    res.json({ days: await getCalendar(req.params.identifier, startDate, endDate) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/properties/:identifier/quote', async (req, res, next) => {
  try {
    const { startDate, endDate, guests } = req.body || {};
    if (!validDateRange(startDate, endDate) || !validGuests(guests)) {
      return res.status(400).json({ error: 'Valid dates and a guest count are required.' });
    }
    const stayError = await stayValidationError(req.params.identifier, startDate, endDate, guests);
    if (stayError) return res.status(409).json({ error: stayError });
    const quote = await calculateQuote(req.params.identifier, { startDate, endDate, guests: Number(guests) });
    const publicQuote = {
      listingId: quote.listingId,
      startDate: quote.startDate,
      endDate: quote.endDate,
      guests: quote.guests,
      currency: quote.currency,
      total: quote.total,
      components: quote.components,
    };
    res.json({ quote: publicQuote });
  } catch (error) {
    next(error);
  }
});

app.post('/api/properties/:identifier/reservations', guardReservationRequest, async (req, res, next) => {
  try {
    const { startDate, endDate, guests, firstName, lastName, email, phone, message, website } = req.body || {};
    if (website) return res.status(400).json({ error: 'Invalid reservation request.' });
    if (
      !validDateRange(startDate, endDate) ||
      !validGuests(guests) ||
      !cleanText(firstName, 80) ||
      !cleanText(lastName, 80) ||
      !validEmail(email) ||
      cleanText(phone, 40).length < 7
    ) {
      return res.status(400).json({ error: 'Complete all required reservation details.' });
    }
    const stayError = await stayValidationError(req.params.identifier, startDate, endDate, guests);
    if (stayError) return res.status(409).json({ error: stayError });
    const idempotencyKey = cleanText(req.get('idempotency-key'), 100);
    if (!/^[a-zA-Z0-9-]{16,100}$/.test(idempotencyKey)) {
      return res.status(400).json({ error: 'A valid reservation request key is required.' });
    }
    const duplicateHash = hashBookingValue(
      `${req.params.identifier}:${startDate}:${endDate}:${cleanText(email, 160).toLowerCase()}`
    );
    const claim = await claimReservationRequest(idempotencyKey, duplicateHash);
    if (!claim.claimed) {
      if (claim.existing?.idempotency_key === idempotencyKey && claim.existing.status === 'completed') {
        return res.status(200).json({ reservation: claim.existing.response });
      }
      return res.status(409).json({
        error:
          claim.existing?.status === 'uncertain'
            ? 'We could not confirm the prior request result. Please contact our reservations team before trying again.'
            : 'This reservation request is already being processed or was already submitted. Please check your email or contact us.',
      });
    }
    const reservation = await createReservation(req.params.identifier, {
      startDate,
      endDate,
      guests: Number(guests),
      firstName: cleanText(firstName, 80),
      lastName: cleanText(lastName, 80),
      email: cleanText(email, 160).toLowerCase(),
      phone: cleanText(phone, 40),
      message: cleanText(message, 1000),
    });
    await completeReservationRequest(idempotencyKey, reservation);
    res.status(201).json({
      reservation,
      payment: {
        state: reservation.paymentState,
        hosted: Boolean(reservation.checkoutUrl),
      },
    });
  } catch (error) {
    const idempotencyKey = cleanText(req.get('idempotency-key'), 100);
    if (idempotencyKey) await markReservationUncertain(idempotencyKey).catch(() => {});
    next(error);
  }
});

// ─── Contact form ─────────────────────────────────────────────────────────────
// Sends admin notification to Kevin@AivaraSolutions.com (reply_to set to visitor).
// Customer-facing thank-you is sent by Mailchimp Customer Journey (not here).
// DNS forwarding must be set up at the domain provider separately.
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, propertyType, source } = req.body;
    const fields = {
      'Name':          name          || '—',
      'Email':         email         || '—',
      'Phone':         phone         || '—',
      'Subject':       subject       || '—',
      'Property Type': propertyType  || '—',
      'Message':       message       || '—',
      'Source':        source        || 'Contact Form',
    };
    const [emailResult, mcResult] = await Promise.allSettled([
      sendFormEmails({
        fields,
        customerEmail: email,
        customerName:  name,
        source:        source || 'Contact Form',
      }),
      addToMailchimp({
        email,
        firstName:        name?.split(' ')[0],
        lastName:         name?.split(' ').slice(1).join(' ') || '',
        phone,
        propertyLocation: propertyType || '',
        formSource:       source || 'Contact Form',
      }),
    ]);
    if (emailResult.status === 'rejected') console.error('[/api/contact] Email error:', emailResult.reason);
    if (mcResult.status === 'rejected')    console.error('[/api/contact] Mailchimp error:', mcResult.reason);
    res.json({ ok: true, message: 'Message received. We will get back to you shortly.' });
  } catch (err) {
    console.error('[/api/contact] Unexpected error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// ─── Relocation guide form ────────────────────────────────────────────────────
app.post('/api/relocation-guide', async (req, res) => {
  try {
    const fields = Object.fromEntries(
      Object.entries(req.body).map(([k, v]) => [
        k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1'),
        v || '—',
      ])
    );
    const { email, name, phone } = req.body;
    const [emailResult, mcResult] = await Promise.allSettled([
      sendFormEmails({
        fields,
        customerEmail: email,
        customerName:  name,
        source:        'Relocation Guide Form',
      }),
      addToMailchimp({
        email,
        firstName:  name?.split(' ')[0],
        lastName:   name?.split(' ').slice(1).join(' ') || '',
        phone,
        formSource: 'Relocation Guide Form',
      }),
    ]);
    if (emailResult.status === 'rejected') console.error('[/api/relocation-guide] Email error:', emailResult.reason);
    if (mcResult.status === 'rejected')    console.error('[/api/relocation-guide] Mailchimp error:', mcResult.reason);
    res.json({ ok: true, message: 'Request received. We will be in touch shortly.' });
  } catch (err) {
    console.error('[/api/relocation-guide] Unexpected error:', err);
    res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
});

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

const indexableRoutes = new Set(getIndexableRoutePaths());
const nonIndexableRoutes = new Set(NON_INDEXABLE_ROUTES);
const realEstateListings = new Map(
  REAL_ESTATE_SCHEMA_LISTINGS.map((listing) => [listing.slug, listing]),
);

const routeDocumentPath = (distPath, pathname) =>
  pathname === '/'
    ? path.join(distPath, 'index.html')
    : path.join(distPath, pathname.slice(1), 'index.html');

const sendNotFoundDocument = (res, distPath) => {
  const notFoundPath = path.join(distPath, '404.html');
  if (fs.existsSync(notFoundPath)) return res.status(404).sendFile(notFoundPath);
  return res.status(404).send('Page not found');
};

const sendRouteDocument = async (req, res, next, distPath) => {
  const pathname = normalizePathname(req.path);
  const propertySlug = getPropertySlugFromPath(pathname);
  let property;

  // A property slug is valid only when it is present in the live Hostaway
  // inventory. This prevents stale or fabricated detail URLs from becoming
  // indexable 200 responses.
  if (propertySlug) {
    try {
      property = await getListing(propertySlug);
    } catch (error) {
      if (error.status === 404) return sendNotFoundDocument(res, distPath);
      return next(error);
    }
  }

  const realEstateSlug = getRealEstateSlugFromPath(pathname);
  const realEstateListing = realEstateSlug ? realEstateListings.get(realEstateSlug) : undefined;
  const isKnownRoute =
    indexableRoutes.has(pathname) ||
    nonIndexableRoutes.has(pathname) ||
    Boolean(property) ||
    Boolean(realEstateListing);

  if (!isKnownRoute) return sendNotFoundDocument(res, distPath);

  const staticDocument = routeDocumentPath(distPath, pathname);
  if (fs.existsSync(staticDocument)) return res.sendFile(staticDocument);

  const sourceDocument = path.join(distPath, 'index.html');
  const sourceHtml = await fs.promises.readFile(sourceDocument, 'utf8');
  const metadata = getSeoMetadata(pathname, {
    ...(property ? { property } : {}),
    ...(realEstateListing ? { realEstateListing } : {}),
  });
  const document = metadata ? injectSeoMetadataIntoHtml(sourceHtml, pathname, {
    ...(property ? { property } : {}),
    ...(realEstateListing ? { realEstateListing } : {}),
  }) : sourceHtml;
  return res.send(document);
};

// In production (Replit autoscale), serve the built static site if it exists
if (process.env.NODE_ENV === 'production' || process.env.REPLIT_DEPLOYMENT === '1') {
  const distPath = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    app.get('/sitemap.xml', async (_req, res) => {
      try {
        const properties = isHostawayConfigured() ? await getListings() : [];
        res.type('application/xml').send(createSitemapXml(properties));
      } catch (error) {
        // A sitemap should remain available during a booking API outage. The
        // static route and real-estate inventory still provide useful coverage.
        console.warn('[seo] live sitemap inventory unavailable:', error.message);
        res.type('application/xml').send(createSitemapXml());
      }
    });
    app.get('/properties/:slug', (req, res, next) =>
      sendRouteDocument(req, res, next, distPath),
    );
    app.use(express.static(distPath, { redirect: false }));
    app.get(/^(?!\/api(?:\/|$)).*/, (req, res, next) =>
      sendRouteDocument(req, res, next, distPath),
    );
  } else {
    console.warn('[api] dist/ not found — running as API-only');
  }
}

app.use((err, req, res, next) => {
  void next;
  console.error('API error:', err);
  res.status(err.status || 500).json({ error: err.message || 'server error' });
});

const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] listening on :${PORT}`);
});
