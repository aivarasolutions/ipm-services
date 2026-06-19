---
name: shadcn theme tokens are navy (IPM site)
description: The shadcn CSS variables in src/App.css are a dark navy theme, so bare Card/muted components render navy with light text.
---

In `src/App.css` `:root`, the shadcn design tokens are dark:
`--card: #0f2440`, `--card-foreground: #f8f8f8`, `--popover: #0a1a30`,
`--muted: #0a1a30`, `--muted-foreground: #c9d2de`, `--foreground: #f8f8f8`.

**Why it matters:** A bare `<Card>` (no bg class) renders a NAVY panel with LIGHT text,
even when it sits inside a cream/white section. Light-gray text tokens like
`text-[#CFCFCF]/[#B8B8B8]/[#A8A8A8]/[#F8F8F8]` inside such a Card are READABLE (light-on-navy),
NOT a contrast bug. A naive "light-on-light" review (or grep) will misflag them; changing
them to dark text would actually break contrast.

**How to apply:** Before "fixing" gray/white text on these pages, resolve the container's
real background. If it's a bare `<Card>` or uses `bg-card`/`bg-muted`/`bg-popover`, the bg is
navy — keep light text. Only convert to dark text when the element truly sits on
`bg-white`/`bg-[#F8F5EF]`/`bg-[#FFFFFF]`.
