# WeduPay

Seamless tuition payments for BYU-Pathway students in Zimbabwe — bridging local currency and
global education.

This is a [Next.js](https://nextjs.org) (App Router) application.

> **Status:** Phase 1 — UI only. Screens use mock, in-memory data via a Zustand store
> ([src/shared/store/useSessionStore.ts](src/shared/store/useSessionStore.ts)); there is no backend,
> database, or real authentication yet. That lands in Phase 2.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                Routes (App Router)
    (site)/           Shared chrome (Navbar + Footer): landing, auth, dashboard, merchant
    success/          Standalone dark receipt screen (own chrome)
  features/           Feature-scoped components, grouped by domain
  shared/             Cross-feature components, hooks, store, types
  lib/                Mock data and utilities
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit
