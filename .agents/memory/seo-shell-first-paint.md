---
name: SEO shell first paint
description: Why source-visible SEO markup must align with the initial app view
---

The homepage's source-visible shell should resemble its actual hero and branding. On other routes, do not let generic SEO prose appear as a false page before the client app loads; retain that source content for visitors without JavaScript or when the app fails to start.

**Why:** A mobile PageSpeed filmstrip exposed a text-only screen before the designed homepage. Later, a properties-page screenshot showed the generic shell's sections and links before the real page. Hiding the matched homepage hero would instead cause a blank first paint, while showing generic content on other pages misleads visitors.

**How to apply:** Keep the homepage hero aligned with its initial markup. For other routes, preserve their SEO source and metadata without presenting a mismatched layout to JavaScript-enabled visitors. Check direct loads with delayed JavaScript, with JavaScript disabled, and after the real page renders.