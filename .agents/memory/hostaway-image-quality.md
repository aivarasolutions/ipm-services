---
name: Hostaway image quality
description: Hostaway thumbnailUrl values can be extremely low resolution; use ordered listingImages URLs for public cards and galleries.
---

Hostaway's `thumbnailUrl` is not reliable for visual quality: some account thumbnails are only 114×74 pixels while the corresponding `listingImages` URL is 1280×960. Prefer the first ordered full listing image for cards and galleries, with the thumbnail only as a fallback.

**Why:** The thumbnail source rendered visibly blurry on mobile even though the card layout and CSS were correct.

**How to apply:** When normalizing Hostaway listings, keep an ordered full-image URL available to public UI components and reserve thumbnail URLs for fallback or low-bandwidth contexts.