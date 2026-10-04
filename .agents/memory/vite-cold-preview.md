---
name: Cold Vite preview captures
description: Distinguish a transient dependency-optimization capture from a persistent React failure
---

A preview captured while Vite discovers a new lazy-loaded dependency and reloads its optimized modules may not represent the settled application. Do not infer a React version mismatch from that one capture.

**Why:** An initial accordion-page capture reported invalid hook calls while the development logs showed new dependency optimization and a reload. Fresh Spanish and English captures after optimization rendered cleanly without any dependency or application-code changes.

**How to apply:** Correlate a failed initial capture with optimizer/reload logs. Confirm a fresh settled load before changing React dependencies; errors that persist still require diagnosis.