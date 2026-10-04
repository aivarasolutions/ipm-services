import { BOOKING_BACKUP_PROPERTIES } from '../data/bookingBackup.js'

const request = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'The booking system is unavailable.')
  return data
}

// Only browsing can use saved metadata. Quotes and reservations must still
// fail explicitly rather than pretending to have current availability.
export const fetchProperties = async () => {
  try {
    const data = await request('/api/properties', {
      signal: AbortSignal.timeout(10_000),
    })
    if (!Array.isArray(data.properties) || data.properties.length === 0 ||
      data.properties.some((property) => !property?.id || !property.name || !property.bookingEngineUrl)) {
      throw new Error('Live property inventory is unavailable.')
    }
    return data.properties
  } catch {
    return BOOKING_BACKUP_PROPERTIES.map((property) => ({
      ...property,
      bookingFallback: true,
    }))
  }
}

export const fetchProperty = (identifier) =>
  request(`/api/properties/${encodeURIComponent(identifier)}`).then((data) => data.property)

export const fetchReviews = (identifier) =>
  request(`/api/properties/${encodeURIComponent(identifier)}/reviews`).then((data) => data.reviews)

export const fetchCalendar = (identifier, startDate, endDate) =>
  request(
    `/api/properties/${encodeURIComponent(identifier)}/calendar?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
  ).then((data) => data.days)

export const fetchQuote = (identifier, payload) =>
  request(`/api/properties/${encodeURIComponent(identifier)}/quote`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((data) => data.quote)

export const submitReservation = (identifier, payload, idempotencyKey) =>
  request(`/api/properties/${encodeURIComponent(identifier)}/reservations`, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(payload),
  }).then((data) => data.reservation)