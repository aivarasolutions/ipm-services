---
name: Vite route-head transforms
description: Why route-aware initial HTML must use Vite's original request URL in this SPA.
---

For route-specific initial HTML, use the original request URL supplied to the Vite HTML transform rather than relying only on the transformed file path.

**Why:** Vite's SPA fallback can report `/index.html` as the transform path even when the browser requested a nested route. Using only that path silently omits route-specific metadata and structured data from direct requests.

**How to apply:** Any future route-aware head transform should normalize the original URL to a pathname first, while retaining a safe fallback for build-time transforms.