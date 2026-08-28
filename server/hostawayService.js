/* global process */
const HOSTAWAY_BASE_URL = 'https://api.hostaway.com/v1';
const LISTINGS_TTL_MS = 5 * 60 * 1000;
const DETAILS_TTL_MS = 5 * 60 * 1000;

let tokenCache = { token: null, expiresAt: 0 };
const responseCache = new Map();

const configured = () =>
  Boolean(process.env.HOSTAWAY_ACCOUNT_ID && process.env.HOSTAWAY_CLIENT_SECRET);

const cacheGet = (key) => {
  const item = responseCache.get(key);
  if (!item || item.expiresAt <= Date.now()) {
    responseCache.delete(key);
    return null;
  }
  return item.value;
};

const cacheSet = (key, value, ttl) => {
  responseCache.set(key, { value, expiresAt: Date.now() + ttl });
  return value;
};

const getAccessToken = async () => {
  if (!configured()) {
    const error = new Error('Hostaway is not configured');
    error.status = 503;
    throw error;
  }

  if (tokenCache.token && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.HOSTAWAY_ACCOUNT_ID,
    client_secret: process.env.HOSTAWAY_CLIENT_SECRET,
    scope: 'general',
  });

  const response = await fetch(`${HOSTAWAY_BASE_URL}/accessTokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    console.error('[hostaway] authentication failed', { status: response.status });
    const error = new Error('Unable to connect to the booking system');
    error.status = 502;
    throw error;
  }

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(300, Number(data.expires_in) || 86400) * 1000,
  };
  return tokenCache.token;
};

const request = async (path, options = {}, retry = true) => {
  const token = await getAccessToken();
  const response = await fetch(`${HOSTAWAY_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401 && retry) {
    tokenCache = { token: null, expiresAt: 0 };
    return request(path, options, false);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status === 'fail') {
    const error = new Error(
      response.status === 429
        ? 'The booking system is busy. Please try again shortly.'
        : data.message || data.error || 'The booking system could not complete this request.'
    );
    error.status = response.status === 404 ? 404 : response.status === 429 ? 429 : 502;
    error.hostawayStatus = response.status;
    throw error;
  }
  return data.result;
};

const slugify = (value, id) =>
  `${String(value || 'property')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')}-${id}`;

const normalizeRating = (rating) => {
  const value = Number(rating);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value > 5 ? Math.round((value / 2) * 10) / 10 : Math.round(value * 10) / 10;
};

const normalizeListing = (listing, detailed = false) => {
  const images = (listing.listingImages || [])
    .filter((image) => image?.url)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
    .map((image) => ({
      id: image.id,
      url: image.url,
      caption: image.bookingEngineCaption || image.caption || listing.name,
    }));
  const amenities = (listing.listingAmenities || [])
    .map((amenity) => amenity.amenityName)
    .filter(Boolean);

  const result = {
    id: String(listing.id),
    slug: slugify(listing.name, listing.id),
    name: listing.name || listing.externalListingName || 'Vacation rental',
    city: listing.city || '',
    state: listing.state || '',
    country: listing.country || '',
    location: [listing.city, listing.state, listing.country].filter(Boolean).join(', '),
    latitude: listing.lat == null ? null : Number(listing.lat),
    longitude: listing.lng == null ? null : Number(listing.lng),
    guests: Number(listing.personCapacity || listing.guestsIncluded || 1),
    bedrooms: Number(listing.bedroomsNumber || 0),
    bathrooms: Number(listing.bathroomsNumber || listing.guestBathroomsNumber || 0),
    beds: Number(listing.bedsNumber || 0),
    rating: normalizeRating(listing.averageReviewRating),
    currency: listing.currencyCode || 'USD',
    thumbnailUrl: listing.thumbnailUrl || images[0]?.url || null,
    images: detailed ? images : images.slice(0, 1),
    bookingEngineUrl:
      listing.bookingEngineUrls?.[0]?.url ||
      listing.bookingEngineUrls?.[0] ||
      listing.googleVrListingUrl ||
      null,
  };

  if (detailed) {
    Object.assign(result, {
      description:
        listing.description ||
        listing.airbnbSummary ||
        listing.bookingcomPropertyDescription ||
        listing.homeawayPropertyDescription ||
        '',
      amenities,
      houseRules: listing.houseRules || '',
      checkInTime: listing.checkInTimeStart || null,
      checkOutTime: listing.checkOutTime || null,
      instantBookable: Boolean(listing.instantBookable),
      minimumStay: Number(listing.minNights || 0) || null,
    });
  }
  return result;
};

const getRawListings = async () => {
  const cached = cacheGet('listings:raw');
  if (cached) return cached;
  const listings = await request('/listings?limit=100&offset=0&includeResources=1');
  return cacheSet('listings:raw', Array.isArray(listings) ? listings : [], LISTINGS_TTL_MS);
};

export const getListings = async () =>
  (await getRawListings()).map((listing) => normalizeListing(listing));

const findListing = async (identifier) => {
  const listings = await getRawListings();
  const clean = String(identifier);
  return listings.find(
    (listing) =>
      String(listing.id) === clean || slugify(listing.name, listing.id) === clean
  );
};

export const getListing = async (identifier) => {
  const cached = cacheGet(`listing:${identifier}`);
  if (cached) return cached;
  const summary = await findListing(identifier);
  if (!summary) {
    const error = new Error('Property not found');
    error.status = 404;
    throw error;
  }
  const listing = await request(`/listings/${summary.id}?includeResources=1`);
  return cacheSet(
    `listing:${identifier}`,
    normalizeListing(listing || summary, true),
    DETAILS_TTL_MS
  );
};

export const getReviews = async (identifier, limit = 12) => {
  const listing = await findListing(identifier);
  if (!listing) {
    const error = new Error('Property not found');
    error.status = 404;
    throw error;
  }
  const reviews = await request(
    `/reviews?listingId=${listing.id}&limit=${Math.min(limit, 25)}&offset=0`
  );
  return (Array.isArray(reviews) ? reviews : [])
    .filter((review) => review.publicReview && !review.isHidden && !review.isCancelled)
    .map((review) => ({
      id: String(review.id),
      reviewerName: review.reviewerName || review.guestName || 'Verified guest',
      rating: normalizeRating(review.rating),
      text: review.publicReview,
      date: review.submittedAt || review.arrivalDate || null,
      response: review.revieweeResponse || null,
    }));
};

export const getCalendar = async (identifier, startDate, endDate) => {
  const listing = await findListing(identifier);
  if (!listing) {
    const error = new Error('Property not found');
    error.status = 404;
    throw error;
  }
  const days = await request(
    `/listings/${listing.id}/calendar?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
  );
  return (Array.isArray(days) ? days : []).map((day) => ({
    date: day.date,
    isAvailable: Boolean(day.isAvailable),
    status: day.status,
    price: day.price == null ? null : Number(day.price),
    minimumStay: day.minimumStay == null ? null : Number(day.minimumStay),
    maximumStay: day.maximumStay == null ? null : Number(day.maximumStay),
  }));
};

export const calculateQuote = async (identifier, { startDate, endDate, guests }) => {
  const listing = await findListing(identifier);
  if (!listing) {
    const error = new Error('Property not found');
    error.status = 404;
    throw error;
  }
  const result = await request(`/listings/${listing.id}/calendar/priceDetails`, {
    method: 'POST',
    body: JSON.stringify({
      startingDate: startDate,
      endingDate: endDate,
      numberOfGuests: guests,
      version: 2,
    }),
  });

  const components = Array.isArray(result?.components)
    ? result.components
    : Array.isArray(result?.priceDetails)
      ? result.priceDetails
      : [];
  const total =
    Number(result?.totalPrice ?? result?.total ?? result?.price ?? result?.totalAmount);
  return {
    listingId: String(listing.id),
    startDate,
    endDate,
    guests,
    currency: result?.currency || result?.currencyCode || listing.currencyCode || 'USD',
    total: Number.isFinite(total) ? total : null,
    components: components.map((component) => ({
      name: component.name || component.title || component.type || 'Charge',
      total: Number(component.total ?? component.amount ?? component.value) || 0,
    })),
    rawFinanceField: result?.financeField || null,
  };
};

export const createReservation = async (identifier, input) => {
  const listing = await findListing(identifier);
  if (!listing) {
    const error = new Error('Property not found');
    error.status = 404;
    throw error;
  }

  const quote = await calculateQuote(identifier, input);
  if (!Number.isFinite(quote.total)) {
    const error = new Error('Unable to confirm a total price for these dates');
    error.status = 409;
    throw error;
  }

  const result = await request('/reservations', {
    method: 'POST',
    body: JSON.stringify({
      channelId: 2000,
      listingMapId: listing.id,
      isManuallyChecked: 0,
      isInitial: 1,
      guestName: `${input.firstName} ${input.lastName}`.trim(),
      guestFirstName: input.firstName,
      guestLastName: input.lastName,
      guestEmail: input.email,
      phone: input.phone,
      numberOfGuests: input.guests,
      adults: input.guests,
      arrivalDate: input.startDate,
      departureDate: input.endDate,
      totalPrice: quote.total,
      currency: quote.currency,
      guestNote: input.message || null,
      ...(quote.rawFinanceField ? { financeField: quote.rawFinanceField } : {}),
    }),
  });

  return {
    id: String(result?.id || ''),
    status: result?.status || 'new',
    arrivalDate: result?.arrivalDate || input.startDate,
    departureDate: result?.departureDate || input.endDate,
    total: Number(result?.totalPrice ?? quote.total),
    currency: result?.currency || quote.currency,
  };
};

export const isHostawayConfigured = configured;