---
name: Owner lead approval policy
description: User-required contact details and manual review before inviting owners to onboarding.
---

Owner leads must include first and last name, phone number with country code, email, and a property listing link. The team reviews the listing and agrees to proceed before sending an onboarding invitation.

**Why:** The user explicitly wants to assess each property from the lead notification email before approving it, rather than automatically inviting every lead.

**How to apply:** Keep the existing Mailchimp lead flow, but make the personalized onboarding invitation a separate, explicit approval. Provide both a PDF attachment and an online completion option. Keep private team approval links separate from owner-facing onboarding links.

The team email button must approve and send the invitation in one click, without a second checkbox or confirmation step.

**Why:** The user explicitly corrected the extra confirmation step: the email-button click is their confirmation after reviewing the listing. Basic email security scanners and previews must not approve with a plain GET.

**How to apply:** Keep GET read-only, and use an activated browser navigation to initiate the approval POST automatically. Preview/non-activated requests show a fallback approval button. Keep duplicate-send protection and opaque owner invitation links. Do not claim protection against every browser-based scanner.

Owner notification emails should show first and last name, not an additional combined Name row, and show the listing URL only once.

**Why:** The user explicitly requested removal of both duplicate displays.

**How to apply:** Retain the combined name internally for personalized onboarding emails. Preserve other message details when removing a duplicate listing URL.

Avoid `Referrer-Policy: no-referrer` on HTML approval forms guarded by an Origin check.

**Why:** Browsers may send `Origin: null` on form POSTs under that policy, rejecting genuine approvals.

**How to apply:** Use `same-origin` on private approval pages and `rel="noreferrer"` for external listing links; retain strict rejection of cross-origin POSTs.
