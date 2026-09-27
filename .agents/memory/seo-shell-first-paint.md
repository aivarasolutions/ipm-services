---
name: SEO shell first paint
description: Why source-visible SEO markup must align with the initial app view
---

The static SEO shell is visible to real visitors while the SPA bundle loads. For the homepage, it should resemble the actual hero and branding rather than presenting a generic text-only page or being hidden until JavaScript runs.

**Why:** A mobile PageSpeed filmstrip exposed a text-only SEO screen appearing before the designed homepage; simply hiding it would replace that flash with a blank first paint.

**How to apply:** When changing the homepage hero, align its initial source-visible shell with the new visual content and keep essential SEO content in the HTML. Verify both the raw HTML before JavaScript and the hydrated homepage.