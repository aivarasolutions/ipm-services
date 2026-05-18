const BASE = import.meta.env.VITE_API_BASE_URL || '';

const url = (p) => `${BASE}${p}`;

export async function fetchChecklist(checklistId) {
  const r = await fetch(url(`/api/checklist/${checklistId}`), { cache: 'no-store' });
  if (!r.ok) throw new Error(`fetch failed: ${r.status}`);
  return r.json();
}

export async function fetchVersion(checklistId) {
  const r = await fetch(url(`/api/checklist/${checklistId}/version`), { cache: 'no-store' });
  if (!r.ok) throw new Error(`version failed: ${r.status}`);
  return r.json();
}

export async function putOverride(checklistId, itemId, data) {
  const r = await fetch(url(`/api/checklist/${checklistId}/override/${itemId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(`putOverride failed: ${r.status}`);
  return r.json();
}

export async function addCustomItem(checklistId, item) {
  const r = await fetch(url(`/api/checklist/${checklistId}/items`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!r.ok) throw new Error(`addCustomItem failed: ${r.status}`);
  return r.json();
}

export async function deleteCustomItem(checklistId, itemId) {
  const r = await fetch(url(`/api/checklist/${checklistId}/items/${itemId}`), {
    method: 'DELETE',
  });
  if (!r.ok) throw new Error(`deleteCustomItem failed: ${r.status}`);
  return r.json();
}
