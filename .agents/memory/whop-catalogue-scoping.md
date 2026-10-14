---
name: Whop catalogue scoping
description: Successful Whop catalogue responses can silently ignore an unrecognized account filter.
---

A successful Whop products/plans response is not proof that the results belong to IPM. An unrecognized company filter was silently ignored and returned unrelated marketplace offerings.

**Why:** IPM's company identity could be verified correctly while a separate catalogue request still returned other companies' products. HTTP success alone did not catch this.

**How to apply:** Consult the current API's recognized account filter and verify account ownership when changing catalogue requests or API versions. Never infer that IPM offers an item solely because a request using the IPM credential returned it.
