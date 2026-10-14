# Education editor and release guide

## Development status

This implementation has **not** been published. Existing booking, onboarding, notification forms, owner portal, prices and membership automation are unchanged.

Public routes:

- `/insights`, `/es/insights` — searchable education hub.
- `/insights/topics/:category`, `/es/insights/topics/:category` — eight educational pillars.
- `/insights/learn/:slug`, `/es/insights/learn/:slug` — reviewed published articles.
- `/resources`, `/es/resources` — free templates plus existing resources.
- `/resources/whop`, `/es/resources/whop` — verified current Whop offers and owner-approved Discord invite.

Existing Insights article/proposal URLs are preserved. New content does not replace the owner portal or create a second blog hierarchy.

## First staff administrator

Configure the non-secret `EDUCATION_ADMIN_EMAILS` value through Replit Configuration with the owner's chosen email(s), comma-separated. No email was assumed from website contacts. With no bootstrap email or invitation, the editor is locked.

Use `/sign-in`, create/sign into the account using that email, complete email verification, and visit `/admin/education`. Account registration alone grants **no** editing access; the server checks verified Clerk emails against explicit administrator configuration or the staff allowlist.

The configured lead administrator can add/revoke other verified staff emails in the editor. Adding a staff email grants permission; it does not send an invitation email. Share the `/sign-in` URL separately. Invited staff can manage content but cannot grant/revoke staff access. Change lead-admin access through Replit Configuration.

Only approved public editorial media should be uploaded. Images are persistent, MIME-checked PNG/JPEG/WebP uploads capped at 1.5 MiB and served publicly. Never upload owner credentials, private documents or guest data as editorial media.

## Editing workflow

1. Choose an article or create a draft. Add its English/Spanish locale and a shared translation key.
2. Enter original content, author, sources/review dates and relevant internal links. Section/source/link editors use JSON with examples; the private preview shows the parsed body.
3. Add optional cover image and alt text or an HTTPS video URL. Native videos are click-to-load rather than autoplay.
4. Keep uncertain content in **draft** or **review**. Publish only after factual approval, valid dates, substantive body and sources. Spanish additionally requires translation approval; marked legal/specialist material requires specialist approval.
5. Publishing/unpublishing updates public API, source HTML and runtime sitemap immediately. Drafts cannot be read through the public article endpoint or production article URL.
6. Existing article slugs/locales stay fixed. Create another record with the same translation key for a translation. This avoids silently breaking saved/indexed URLs.
7. Concurrent edits/deletes return a conflict instead of overwriting someone else's work. Reload the record before trying again.

The CMS also manages resource drafts/publication, links, template text and the verified Whop storefront setting. The Whop URL must match the existing account, not an unrelated store. Discord's owner-approved invite is saved as public configuration in `src/data/educationCommunity.json`.

No publishing scheduler was invented. A future date cannot be used to claim scheduled publication. Use manual review/publish.

## SEO and monitoring

Articles have unique metadata, canonical links, reviewed language alternates, Article/Breadcrumb data and complete source-visible text. Only published translations are linked as article alternates. Private staff routes are noindex and excluded from the sitemap.

The server generates sitemap entries from current published CMS records. The static build also prerenders published seed content for reproducibility; dynamic rewrites take precedence after release so later CMS edits cannot leave stale published articles on Vercel.

The editor's SEO status displays available configuration and publication counts. Search Console ownership and analytics measurements remain owner setup items. No synthetic performance dashboard is substituted for missing data. See `education-research.md`.

## Safe future release — not performed

The website currently uses Vercel for the public frontend and the existing Replit backend for APIs. The new dynamic document rewrites must release with the backend and matching frontend build:

1. Configure the intended administrator email and any additional trusted CMS origins in `EDUCATION_ALLOWED_ORIGINS`. Canonical IPM origins and the current Replit preview are already accepted. Never accept arbitrary forwarded Host values as mutation authorization.
2. Review content, specialist drafts, Spanish translations and public invite/Whop links.
3. Confirm production database schema permissions and the existing production database choice. Education adds only its own tables to that database; it does not replace storage or alter owner/community/lead tables.
4. Configure the Replit-managed **production** Clerk tenant and domain proxy for every staff-login host. Development users/keys are not production accounts. The Vercel build needs the corresponding managed frontend configuration; do not copy or expose the server secret. This must be handled through managed authentication/deployment settings, not guessed domains or pasted credentials.
5. Release the backend and the matching Vercel frontend/rewrites together after owner authorization. Publishing one alone may leave mismatched assets or authentication hosts.
6. Check public routes, noindex draft 404s, staff denial/authorized access, sitemap and preserved booking flow on the actual release.
7. Complete Search Console ownership and analytics/consent configuration with the owner.

No live deployments, production migrations, external membership changes or production content edits were performed during this build.

## Verification performed

- Production build/prerender and targeted lint passed.
- All 138 automated tests passed, including publication validation, unauthorized/uninvited access, trusted-origin mutations, private draft exclusion, source HTML/schema, sitemap and Whop account scoping.
- Development database checks confirmed persistent create/edit, revision-conflict protection, publication lookup, unpublishing and deletion. Temporary verification content was removed.
- A browser test signed in a verified, temporarily invited Clerk editor and completed draft creation/reload, edited-body preview, save, publish, unpublish and UI deletion. Anonymous access returned 401; a separate verified but uninvited user returned 403.
- The browser verified a 390px protected editor without horizontal overflow. Desktop English and mobile Spanish Whop/resource pages were visually inspected.
- The tester removed its temporary article and staff invitation; no existing content/resources/images were changed. Intermittent development Vite WebSocket warnings did not block the tested flow.
- Whop and the replacement Discord invite were verified against their public/account API responses. The new Discord invite appears in source HTML as well as the rendered English and Spanish resource pages.

Remaining owner setup: choose the initial staff administrator email, review any specialist/experience drafts, supply reviewed translations for the other English articles, configure Search Console/Analytics with the account owner, and approve a coordinated production release separately.
