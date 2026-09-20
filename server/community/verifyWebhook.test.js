import assert from 'node:assert/strict';
import test from 'node:test';
import { signWhopPayload, verifyWhopWebhook } from './verifyWebhook.js';

test('accepts a correctly signed Whop webhook', () => {
  const rawBody = JSON.stringify({ id: 'evt_1', type: 'membership.activated', data: {} });
  const timestamp = '1700000000';
  const secret = 'ws_test';
  const signature = signWhopPayload({ id: 'evt_1', timestamp, rawBody, secret });
  const result = verifyWhopWebhook({
    rawBody,
    secret,
    now: 1700000000000,
    headers: { 'webhook-id': 'evt_1', 'webhook-timestamp': timestamp, 'webhook-signature': `v1,${signature}` },
  });
  assert.equal(result.event.type, 'membership.activated');
});

test('rejects invalid and stale signatures', () => {
  const input = { rawBody: '{}', secret: 'ws_test', now: 1700000000000,
    headers: { 'webhook-id': 'evt_1', 'webhook-timestamp': '1700000000', 'webhook-signature': 'v1,bad' } };
  assert.throws(() => verifyWhopWebhook(input), /Invalid webhook signature/);
  input.headers['webhook-timestamp'] = '1600000000';
  assert.throws(() => verifyWhopWebhook(input), /replay window/);
});
