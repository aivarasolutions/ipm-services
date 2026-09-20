/* global Buffer */
import crypto from 'crypto';

const TOLERANCE_SECONDS = 300;

const headerValue = (headers, name) => headers[name] || headers[name.toLowerCase()];

export const signWhopPayload = ({ id, timestamp, rawBody, secret }) =>
  crypto.createHmac('sha256', secret).update(`${id}.${timestamp}.${rawBody}`).digest('base64');

export function verifyWhopWebhook({ rawBody, headers, secret, now = Date.now() }) {
  if (!secret) throw Object.assign(new Error('Webhook signing secret is not configured'), { status: 503 });
  const id = headerValue(headers, 'webhook-id');
  const timestamp = headerValue(headers, 'webhook-timestamp');
  const supplied = headerValue(headers, 'webhook-signature');
  if (!id || !timestamp || !supplied) throw Object.assign(new Error('Missing webhook signature headers'), { status: 401 });

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(now / 1000 - timestampNumber) > TOLERANCE_SECONDS) {
    throw Object.assign(new Error('Webhook timestamp is outside the replay window'), { status: 401 });
  }

  const expected = Buffer.from(signWhopPayload({ id, timestamp, rawBody, secret }), 'base64');
  const valid = String(supplied).split(/\s+/).some((part) => {
    const [version, value] = part.split(',', 2);
    if (version !== 'v1' || !value) return false;
    const actual = Buffer.from(value, 'base64');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  });
  if (!valid) throw Object.assign(new Error('Invalid webhook signature'), { status: 401 });

  let event;
  try { event = JSON.parse(rawBody); } catch { throw Object.assign(new Error('Invalid webhook JSON'), { status: 400 }); }
  if (!event || typeof event.type !== 'string') throw Object.assign(new Error('Invalid webhook event'), { status: 400 });
  if (event.id && event.id !== id) throw Object.assign(new Error('Webhook ID mismatch'), { status: 401 });
  return { id, event };
}
