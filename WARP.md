# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js 16 (App Router) with TypeScript and Tailwind CSS v4
- Key libs: zod (validation), Stripe (checkout), lucide-react (icons), @vercel/analytics
- Code layout:
  - src/app: All routes (pages and API), root layout and homepage
  - src/lib: Domain modules (products catalog, validation)
  - public: Static assets
- Config: next.config.ts (reactCompiler), eslint.config.mjs (flat config), tsconfig.json (path alias @/* → src/*), postcss.config.mjs (Tailwind v4)

Commands
- Install deps
  ```bash path=null start=null
  npm install
  ```
- Dev server
  ```bash path=null start=null
  npm run dev
  ```
- Build
  ```bash path=null start=null
  npm run build
  ```
- Start (prod)
  ```bash path=null start=null
  npm start
  ```
- Lint (ESLint flat config)
  ```bash path=null start=null
  npm run lint
  # to lint a specific file or dir
  npx eslint src
  ```
- Type check
  ```bash path=null start=null
  npx tsc --noEmit
  ```
- Tests
  ```text path=null start=null
  No test framework is configured in package.json.
  ```

Environment
- Copy .env.example to .env.local and set:
  - STRIPE_SECRET_KEY
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - NEXT_PUBLIC_APP_URL (e.g., http://localhost:3000)

High-level architecture
- App Router
  - Root shell in src/app/layout.tsx; homepage in src/app/page.tsx.
  - Feature routes live under src/app, including server components and pages:
    - products/page.tsx: renders list from src/lib/products
    - products/[id]/page.tsx: details; uses notFound() on missing
  - API routes in src/app/api/* with explicit dynamic where needed:
    - GET /api/products → list from src/lib/products
    - GET /api/products/[id] → single product by id (400/404 handling)
    - POST /api/checkout → creates Stripe Checkout Session from validated cart
- Domain modules
  - src/lib/products.ts: in-memory catalog and getProduct helper
  - src/lib/validators.ts: zod schemas for CartItem and CheckoutRequest
- Styling
  - Tailwind v4 via postcss plugin; global styles in src/app/globals.css; fonts via next/font (Geist)
- TypeScript
  - Strict, noEmit build; bundler moduleResolution; path alias @/* to src/*
- Linting
  - ESLint v9 flat config (eslint.config.mjs) extending eslint-config-next core-web-vitals + typescript

Notes
- Routes have been consolidated under src/app; no parallel app/ directory remains.
- Stripe: POST /api/checkout requires STRIPE_SECRET_KEY; endpoint returns 400/404/409 for invalid payloads or product issues.

Sources worth skimming first
- README.md: project setup and endpoint summary
- next.config.ts, eslint.config.mjs, tsconfig.json
- src/app/api/* and src/lib/* to understand data + API flow
