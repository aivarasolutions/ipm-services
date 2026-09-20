import assert from 'node:assert/strict';
import test from 'node:test';
import { desiredRoles, roleChanges } from './membershipPolicy.js';

test('active free and pro memberships map to managed roles', () => {
  const memberships = [
    { status: 'active', product_id: 'free', plan_id: null },
    { status: 'trialing', product_id: 'pro', plan_id: null },
    { status: 'inactive', product_id: 'old', plan_id: null },
  ];
  const mappings = [
    { enabled: true, product_id: 'free', plan_id: null, discord_role_id: 'community' },
    { enabled: true, product_id: 'pro', plan_id: null, discord_role_id: 'community' },
    { enabled: true, product_id: 'pro', plan_id: null, discord_role_id: 'pro' },
  ];
  assert.deepEqual([...desiredRoles(memberships, mappings)].sort(), ['community', 'pro']);
});

test('role changes only touch managed roles and preserve team', () => {
  const changes = roleChanges({
    currentRoles: ['community', 'team', 'unrelated'], desired: new Set(['pro']),
    managed: new Set(['community', 'pro']), protectedRoles: ['team'],
  });
  assert.deepEqual(changes, { add: ['pro'], remove: ['community'] });
});

test('a protected role can never be configured as managed', () => {
  assert.throws(() => roleChanges({ currentRoles: [], desired: new Set(), managed: new Set(['team']), protectedRoles: ['team'] }), /cannot be managed/);
});
