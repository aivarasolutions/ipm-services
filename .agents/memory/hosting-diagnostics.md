---
name: Hosting diagnostics
description: Distinguish connector authentication from Vercel team access, and working development inventory from production-specific failures.
---

A connected Vercel API key does not prove access to the project's owning team. A valid connection can return an empty project list, deny team listing, and return 404 for known deployments.

**Why:** An accepted connection could authenticate but could not access IPM's known project or failed deployment, including when queried with the known team slug.

**How to apply:** Try the known team scope before concluding a project is missing. If access is still denied, request a key with the correct team/project permissions or a non-secret build-log upload. Do not initiate OAuth reauthorization for an API-key connection.

If Hostaway inventory works in development but the published backend rejects authentication, treat it as a production-specific connection problem rather than missing homepage content.

**Why:** Development inventory requests succeeded while the published API returned authentication failures. Replit production secrets are managed separately from development secrets.

**How to apply:** Check both endpoints and production configuration. Have the user verify production credentials through the secure publishing interface; never read or copy secret values into chat. Do not replace a working development key or assume a confirmed credential mismatch without evidence.