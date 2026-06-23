---
name: Lead form → Mailchimp tag convention
description: How new lead-capture forms must signal plan interest so Mailchimp tags apply
---

# Lead form `source` drives Mailchimp tagging

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
