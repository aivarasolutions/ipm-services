# Property Furnishing & Setup

English: `/services/property-furnishing-setup`  
Spanish: `/es/services/property-furnishing-setup`

## Authorized content edits

Maintain saved pricing and choices through Replit in
`src/data/furnishingService.json`. Bilingual package descriptions, terms and FAQs
are in `src/pages/furnishing/copy.js`. Change portfolio/reference images in
`src/pages/FurnishingSetup.jsx`, retaining accurate attribution and labels.
There is no public Save endpoint or additional administrator dashboard.

Fees are USD: consultation $150; sourcing 15% with a $300 minimum;
complete setup 20% with a $500 minimum. The percentage packages are alternatives,
not additive. Their percentage base excludes shipping, delivery, duties, taxes
and third-party labor. All furniture remains the owner's property. Quotes and
written approvals control actual engagements. No checkout is enabled.

The calculator uses these saved values directly and is an estimate, not a
binding quote. Inquiry budgets can be unknown or submitted in a stated local
currency; the application does not silently convert them or quote a USD fee
using an unverified exchange rate.

## Inquiry delivery and privacy

`POST /api/furnishing` validates contact/property/package fields and private
JPEG/PNG/WebP/PDF attachments. Limit: five files, 2 MiB combined; the endpoint
has its own 3 MiB JSON limit without increasing unrelated endpoint limits.

Inquiries and attachments are stored in the existing private
`owner_lead_approvals` table as furnishing-specific records using the existing
database connection. No new database or public asset bucket is introduced.
Attachments go directly to the existing IPM team notification recipients.
They are not placed in `public/`, given public URLs, or sent to Mailchimp.
Authorized database access and the existing team inboxes are the review
surfaces. Do not expose records or attachments through anonymous GET routes.

The existing Mailchimp audience upsert and Website Lead journey remain the
owner confirmation/nurture mechanism. A furnishing-specific tag replaces the
management-interest baseline tag for this service; other forms retain their
existing tagging. This service never automatically sends management onboarding
approval links or enrolls the owner in a management package.

The browser retains a UUID for an unchanged retry. The saved payload fingerprint
rejects different contents under the same UUID, and the browser starts a new UUID
after edits. Database claims serialize concurrent delivery, with a five-minute
lease for interrupted work. Delivery channel flags survive retries and Resend
uses a submission-specific idempotency key. Do not bypass this lifecycle when
adding notification channels.

## Release and verification

Run `npm test`, relevant ESLint checks and `npm run build`. Browser tests should
cover both languages, mobile width, package selection, fee estimates, invalid
inputs, and a private upload submission. Notification tests use injected
delivery providers to avoid sending test owner records to live mailing lists.

Production is the existing Git Sync → Vercel release for `www.ipm.services`.
The existing `/api/*` and sitemap proxy destination also needs the updated
backend release. Publishing only a frontend build cannot enable the new inquiry
endpoint on the proxied backend. Replit publishing alone does not update the
Vercel site; verify both routes, the live endpoint and sitemap after both parts
of the established release.
