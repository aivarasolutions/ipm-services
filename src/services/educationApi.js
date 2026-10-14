async function request(path, options = {}) {
  const response = await fetch(`/api/education${path}`, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const payload = await response.json().catch(() => ({ error: 'The education service returned an invalid response.' }));
  if (!response.ok) throw Object.assign(new Error(payload.error || 'Unable to load education content.'), { status: response.status });
  return payload;
}
export const getEducationCatalogue = (locale = 'en') => request(`/catalogue?locale=${locale}`);
export const getEducationArticle = (locale, slug) => request(`/articles/${locale}/${encodeURIComponent(slug)}`);
export const getWhopResources = () => request('/whop');
export const getStaffSession = () => request('/admin/me');
export const getAdminContent = () => request('/admin/content');
export const saveAdminArticle = (article) => request('/admin/articles', { method: 'PUT', body: JSON.stringify(article) });
export const deleteAdminArticle = (id, revision) => request(`/admin/articles/${encodeURIComponent(id)}?revision=${revision}`, { method: 'DELETE' });
export const saveAdminResource = (resource) => request('/admin/resources', { method: 'PUT', body: JSON.stringify(resource) });
export const deleteAdminResource = (id, revision) => request(`/admin/resources/${encodeURIComponent(id)}?revision=${revision}`, { method: 'DELETE' });
export const saveEducationSettings = (settings) => request('/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
export const inviteEducationStaff = (email) => request('/admin/staff', { method: 'POST', body: JSON.stringify({ email }) });
export const revokeEducationStaff = (email) => request('/admin/staff', { method: 'DELETE', body: JSON.stringify({ email }) });
export const uploadEducationImage = (file) => request('/admin/images', { method: 'POST', body: JSON.stringify(file) });
export const getEducationSeoStatus = () => request('/admin/seo');
