---
name: Lead form → Mailchimp tag convention
description: How new lead-capture forms must signal plan interest so Mailchimp tags apply
---

# Lead form `source` drives Mailchimp tagging

All public contact entry points, including the official 10% Listing Promotion and 20% Full Management pages, must keep the same Mailchimp lead flow in English and Spanish.

**Why:** The user explicitly asked to retain the same lead flow across the website when making these two plans official services.

**How to apply:** Preserve plan interest when a visitor switches language or continues to the contact page. Do not create a separate audience or unrelated submission pipeline for either plan.

Any new lead form that POSTs to `/api/contact` must put plan/intent keywords in the
`source` field. The server (`server/mailchimpService.js`) keys conditional tags off
case-insensitive substring matches in `source`:
- `listing` / `promotion` / `10%` → tag `Listing Promotion Inquiry`
- `full` / `management` / `20%` → tag `Full Management Inquiry`
- `contact` → tag `Contact Form`

**Why:** the nurture Customer Journey in Mailchimp is triggered by tags, so the only
way a new form enters the right journey is by emitting a `source` string containing the
right keywords. There is no separate plan/tag parameter — `source` is the single signal.

**How to apply:** when building a new form/popup, set `source` like
`"Lead Popup — Full Management (20%)"`. No backend change needed if keywords match.

## Triggering the Customer Journey (gotcha)

Tags set via the `tags` array in `setListMember` (the add/update member PUT) do NOT
reliably fire Mailchimp Customer Journey "tag added" triggers. To trigger the journey,
apply tags through the dedicated tags endpoint: `client.lists.updateListMemberTags(
listId, hash, { tags: [{ name, status: 'active' }] })`. `addToMailchimp` does this as a
second step after the member PUT.

**Why:** the "Website Lead" nurture journey is tag-triggered; without the dedicated
tags call, new leads were synced but never entered the journey.

**How to apply:** keep the two-step flow (PUT member → updateListMemberTags). Mailchimp
won't re-trigger for tags a contact already has, so repeat submissions are safe.
