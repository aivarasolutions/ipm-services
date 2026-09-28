---
name: Mailchimp connector permissions
description: Why the connected Mailchimp OAuth cannot enroll website leads
---

The connected Mailchimp OAuth in this workspace currently exposes `openid` access and does not grant audience-write permissions. Do not use its proxy for subscriber upserts or tag application unless its permissions have changed.

**Why:** The connector's own setup details warn that audience/member writes and tagging fail without write scopes. An apparently connected account is not proof that the welcome flow can enroll new leads.

**How to apply:** For lead enrollment, use the website's Mailchimp API-key integration or a connection that explicitly grants audience writes. Check credential existence without reading its value, and treat a failed upsert or tag call as a delivery failure rather than a successful signup.