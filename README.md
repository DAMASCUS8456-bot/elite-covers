This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Dropshipping Store specifics

A Next.js (App Router + TypeScript + Tailwind) storefront with products, offers, company info, and Stripe Checkout.

## Setup
1. Copy `.env.example` to `.env.local` and set:
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - NEXT_PUBLIC_APP_URL (default http://localhost:3000)
2. Install deps: `npm install`
3. Run dev: `npm run dev`

## API
- GET /api/products → { products }
- GET /api/products/[id] → { product } | 404
- POST /api/checkout → validates cart and returns a Payoneer redirect URL if configured (PAYONEER_CHECKOUT_URL), otherwise simulates success
  - Body: { items: [{ id, quantity }], successUrl, cancelUrl }
  - Errors: 400 invalid payload, 404/409 product issues

## Edge cases handled
- Invalid JSON and schema errors in checkout
- Missing Stripe configuration
- Out-of-stock items
- Non-existent product IDs
- Global error boundary and not-found page

## Scripts
- dev: next dev
- build: next build
- start: next start
- lint: next lint
