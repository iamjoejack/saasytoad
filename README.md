# SaaSyToad marketing site

The public marketing and legal site for SaaSyToad (saasytoad.com). It is static and presentational, fully separate from the CRM app, which is its own repo and its own deploy. No database, no auth, no API. Just pages.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The bare domain redirects to /company.

## Links into the app

The "Log in" links point at the CRM app, which lives on a separate domain. Set the app URL with an env var:

```
NEXT_PUBLIC_APP_URL=https://app.saasytoad.com
```

If it is unset, the links fall back to the current app deploy. The constant lives in src/lib/brand.ts.

## Deploy

Deploy to Vercel as its own project, separate from the CRM. Point saasytoad.com at it and set NEXT_PUBLIC_APP_URL to the CRM app's domain.

## What lives here

- src/app/(marketing) the marketing and legal pages (home, pricing, crm, services, company, crew, about, security, terms, privacy, easy-clipper)
- src/components/marketing the site components (nav, footer, pricing, hero, steampunk kit)
- src/components/brand, src/components/mock, src/components/ui shared brand and primitives
- src/lib brand constants, characters, pricing, utils

If you change the brand here, it does not change the CRM app. The two share no code at runtime.
