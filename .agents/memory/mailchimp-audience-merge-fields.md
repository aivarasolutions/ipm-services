---
name: Mailchimp audience merge fields
description: Prevent subscriber enrollment failures when audience schema differs from website assumptions
---

Only send merge fields confirmed to exist on the target Mailchimp audience. Keep richer lead details in the team notification or configure custom fields explicitly before sending them. Continue to use source-derived tags for the welcome journey.

**Why:** The connected IPM audience had fewer custom merge fields than the website's original subscriber payload assumed. Mailchimp rejects the whole upsert for an unknown merge field, so a working credential alone does not prove contacts are being added.

**How to apply:** Before extending Mailchimp lead data, check the audience's current merge-field definitions with a read-only API query. Do not silently select an unrelated audience when the expected one is absent.