# Jardines de Santa Beatriz proposal administration

Saved edits are made by authorized collaborators through Replit, as requested.
There is no new login, database, public upload endpoint or visitor Save action.
Visitor calculator/inventory adjustments are temporary and do not alter the
published proposal. PDF downloads include the visitor's current assumptions.

## Configuration

Edit `src/data/santaBeatrizProposal.json`, keeping valid JSON:

- `enabled`: `true` shows the page in both languages and Insights navigation;
  `false` shows an unavailable message and removes indexing/sitemap/navigation.
  This is a publication switch, **not** password protection. Do not put private
  owner information or credentials in this public configuration.
- `status`: `preliminary`, `ready`, or `archived`. This changes the displayed
  proposal status without altering verified facts or enabling permissions.
- `property`: correct tower, floor, area, bedrooms, studies, bathrooms, layout,
  guest capacity, balcony (`unconfirmed`, `yes`, `no`) and confirmation flags.
  A study is not a legal bedroom unless its actual designation is confirmed.
- `images`: replace floor plan, exterior, before/after, gallery and mood board
  paths with optimized images uploaded through the Replit Files panel.
  `afterType: "actual"` labels a genuine completed-unit photograph; otherwise it
  is explicitly shown as a concept. Keep `exteriorType` accurate as well.
- `verifiedPerformance`: enter annual **room revenue in USD**, a source and a
  period. Only when both source and period are present are the supplied figures
  used as calculator overrides. Do not label modeled estimates as verified.
- `competitors`: update public listing details, ratings, counts, retrieval date,
  bilingual notes and amenities. Optional `nightlyQuoteUsd` is shown only when
  `quoteDates` and `quoteSource` are also present. No price/occupancy is inferred.
- `furnishings`: edit `minUsd`, `maxUsd`, `amountUsd` in **USD** and inventory
  statuses (`needed`, `owned`, `reusable`, `ordered`, `completed`). Owned/reusable
  amounts are excluded from the selected improvement budget; paid/completed or
  ordered items remain included for full-project investment tracking.
- `contingencyPercent`: selected budget contingency.
- `model`: ADR in USD, occupancy percentage, available nights and
  `improvementCostUsd` in USD. Currency is fixed to **USD**; there is no exchange
  rate or alternate-currency control. `budgetReferencesUsd` stores the converted
  supplied reference ranges, recommended target and unresolved source difference.
  Conservative/strong scenarios have separate inputs; base follows the upgraded
  condition, including any room-revenue override.
- `model.before.costs` / `model.after.costs`: fixed costs are **USD per year**.
  OTA and management percentages apply to room revenue. Select gross or
  after-OTA commission base as an explicit modeling assumption. 10% promotion
  applies only to the selected IPM-generated share; full management models 20%.
  Cleaning costs and fee recovery are separate. Taxes default to zero, not a
  presumed local tax rate. The monthly fee is **USD per charged month** with
  charged months independently editable; no contractual allocation is invented.

## Images and evidence

Upload replacement images into `public/images/santa-beatriz/` through Replit,
use WebP/JPEG at a sensible web resolution, and update the configuration paths.
The originals in `attached_assets/` remain unchanged. The actual owner interior
photos have been differentiated from the developer's renderings.

Developer evidence: brochure `0_nuevo_1791916660991.pdf`, pages 6–7 (location and
amenities), 31–32 (Tipo 5 / Tipo 5A), and 38 (reference-only disclaimer).
The uploaded new floor-plan picture is Tipo 5A. Final as-built conditions,
balcony, room classification and permitted capacity still require inspection.

Research snapshot: AirDNA publication 2026-10-13, trailing twelve months through
September 2026; public competitor pages checked 2026-10-14. The brief said
17,211 active listings, while the recheck showed 17,210. Neither is unit-specific.
AirDNA annual revenue includes cleaning/other guest fees; the calculator models
room revenue separately. Competitor presence is not legal/condominium permission.

Budget discrepancy: the brief's category maxima sum to S/14,250, not its stated
S/14,550. With 10% contingency the calculated maximum is S/15,675 rather than
S/16,005. The undocumented S/300 difference is not added as an invented expense.

The user subsequently required USD only on this proposal and its exports.
The supplied furnishing/investment amounts were converted using the existing
planning assumption of **3.5 PEN per USD**, not a live exchange-rate quote.
Converted item fields are rounded to USD cents; budget totals add those rounded
items and contingency. Default subtotal is **USD 3,178.56** and total with 10%
contingency is **USD 3,496.42**. The default improvement investment is
**USD 3,428.57**. Reference ranges and competitor gym-fee observations are
converted too. Both languages, input values, ROI and PDF use USD natively.
Do not relabel the original source amounts as dollars or restore currency
selection. Original attached sources remain unchanged for provenance.

## Verification and publication

Run `npm test` and `npm run build` before Git Sync. Preserve the existing
Git Sync → Vercel production workflow. Replit preview/publishing is not proof
of a successful Vercel deployment.

Then check these actual production routes and the live sitemap:

- `https://www.ipm.services/insights/jardines-santa-beatriz-lima`
- `https://www.ipm.services/es/insights/jardines-santa-beatriz-lima`

No pricing, owner portal, existing forms, onboarding or booking behavior is
changed by this proposal.
