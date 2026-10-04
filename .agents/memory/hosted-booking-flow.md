---
name: Hosted booking flow
description: User-confirmed public booking domains and embedding restriction relevant to API-independent booking fallbacks.
---

The user's public booking page is `book.richaf.global`; selecting a property leads to its listing page on `stay.richaf.global` for reservations.

**Why:** The user described this as the existing booking flow and asked whether it could work around IPM's private API connection failures. Public catalog links and a rendered property page confirmed that routing.

**How to apply:** Treat these public pages as a possible booking fallback without assuming that the user has approved replacing the existing API-driven flow. Verify property-specific links before using them, and distinguish a rendered reservation form from a tested reservation or payment.

The checked `stay.richaf.global` property page disallowed cross-origin iframe embedding.

**Why:** Its response included `X-Frame-Options: SAMEORIGIN` and `Content-Security-Policy: frame-ancestors 'self'`.

**How to apply:** Prefer direct navigation to its hosted property page. Recheck these headers before proposing an embedded booking form.