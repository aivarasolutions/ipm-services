---
name: Vercel npm deploy crashes
description: Why this npm-based Vite app fails to install/build on Vercel and the config that fixes it
---

# Vercel npm install crash + "vite: command not found"

This repo is npm-based (package-lock.json + npm scripts) but deployed to Vercel,
and repeatedly failed during `npm install` with:
`npm error Exit handler never called! This is an error with npm itself.`
The crash left node_modules incomplete, so the build then failed with
`sh: vite: command not found` (exit 127). Local clean installs always worked.

**Rule:** keep these in place for Vercel to install/build reliably.
1. `.npmrc` at repo root: `legacy-peer-deps=true`, `audit=false`, `fund=false`.
2. Build-time tools must live in `dependencies`, NOT `devDependencies`
   (Vercel can install in production mode and skip devDeps): `vite`,
   `@vitejs/plugin-react`, `tw-animate-css`.
3. `engines.node: "20.x"` to stop Vercel flip-flopping Node 22<->20.

**Why:** the "Exit handler never called" npm crash is commonly triggered by
npm's audit/fund network step during install; disabling both via `.npmrc`
stops the crash. Build deps in devDependencies are skipped by production-mode
installs, which is the other half of "vite: command not found".

**How to apply:** never move vite/@vitejs/plugin-react/tw-animate-css back to
devDependencies; never delete the `.npmrc` audit/fund lines. If a `packageManager`
field is present, prefer `npm@<stable>` — a `pnpm@...` value makes Vercel/Corepack
try to provision pnpm for this npm project and breaks the install. `packageManager: npm@...`
is optional and carries minor Corepack risk; if the crash ever returns, try removing
it first while keeping `.npmrc` + `engines`.
