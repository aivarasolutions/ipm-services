export const ACTIVE_STATUSES = new Set(['active', 'trialing']);

export function desiredRoles(memberships, mappings) {
  const roles = new Set();
  for (const membership of memberships.filter((item) => ACTIVE_STATUSES.has(item.status))) {
    for (const mapping of mappings) {
      const productMatch = !mapping.product_id || mapping.product_id === membership.product_id;
      const planMatch = !mapping.plan_id || mapping.plan_id === membership.plan_id;
      if (mapping.enabled && productMatch && planMatch) roles.add(mapping.discord_role_id);
    }
  }
  return roles;
}

export function roleChanges({ currentRoles, desired, managed, protectedRoles = [] }) {
  const current = new Set(currentRoles);
  const protectedSet = new Set(protectedRoles);
  for (const role of protectedSet) {
    if (managed.has(role)) throw new Error(`Protected role ${role} cannot be managed`);
  }
  return {
    add: [...desired].filter((role) => managed.has(role) && !current.has(role) && !protectedSet.has(role)),
    remove: [...current].filter((role) => managed.has(role) && !desired.has(role) && !protectedSet.has(role)),
  };
}
