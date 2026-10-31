# Munir Nadeem — Chartered Professional Accountant

Lead-generation website for an accounting and tax practice. Five pages (Home, About, Services, Our Team, Contact), plus a contact form API.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react. No other runtime dependencies.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run build` | Production build (all pages are static except `/api/contact`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run check` | Self-check of the contact form validation and spam rules |

## Contact form email (required before launch)

Enquiries are sent through [Resend](https://resend.com) from the server route `app/api/contact/route.ts`. Keys are never exposed to the browser.

1. Create a Resend account and **verify the sending domain** (the client's website domain).
2. Create an API key.
3. Copy `.env.example` to `.env.local` (locally) and add the same variables in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The Resend API key |
| `CONTACT_TO_EMAIL` | Where enquiries go — `munirnadeem@live.com` |
| `CONTACT_FROM_EMAIL` | Sender on the verified domain, e.g. `Website Enquiries <enquiries@clientdomain.ca>` |
| `NEXT_PUBLIC_SITE_URL` | Live URL, e.g. `https://www.clientdomain.ca` (canonical URLs, sitemap, Open Graph) |

4. Redeploy, submit a real test enquiry, and confirm it arrives (check spam). Replying to the email replies to the visitor.

**Behaviour without credentials:** the form tells visitors honestly that it is unavailable and shows the office phone, cell and email. It never shows a success message unless the email provider accepted the message.

**Spam protection:** hidden honeypot field, a minimum fill time, field length limits and a request size limit. There is no rate limiting yet; add Vercel Firewall rules if abuse appears.

## Editing content

| What | Where |
| --- | --- |
| Business name, designation, phone numbers, email, mission statement | `lib/site.ts` |
| Services (titles, descriptions, "who it's for", icons, grouping) | `lib/services.ts` |
| Pricing categories (Services page → Pricing; amounts not yet supplied, shown as "Contact for Pricing") | `pricing` in `lib/services.ts` |
| Team members and the "What You Can Expect" commitments | `lib/team.ts` |
| Contact form service options and validation rules | `lib/validation.ts` |
| Brand colours and fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |

**Adding team members:** put portraits in `public/images/team/`, import them in `lib/team.ts`, and add `{ name, role, bio, photo }` entries. The Team page grid and the homepage team preview switch from the introduction layout to profiles automatically.

## Design system

- Colours (strict brand palette; default Tailwind colours are disabled): forest `#073D2E`, emerald `#126044`, sage `#E6EFE8`, paper `#F8F9F5`, white, ink `#1C2924`, muted `#68746D`, line `#E4EAE5`. A muted red is used only for form errors.
- Fonts: DM Serif Display (headings) and Manrope (body), self-hosted via `next/font`.
- Motion: CSS only. Page-load entrances, scroll reveals using native scroll-driven animations (progressive enhancement; browsers without support show content normally) and a header shadow on scroll. Everything is disabled for `prefers-reduced-motion`.

## Logo

The client supplied `public/images/logo/pgppmedrahmqhjdamawt.png` (white background, kept as the master). Web versions derived from it:

| File | Use |
| --- | --- |
| `logo.png` | Transparent, full colour — header |
| `logo-reversed.png` | Transparent, white lettering (gold and maple leaf kept) — footer and dark backgrounds |
| `splash/*.avif` | The logo split into parts (M, swoosh, maple leaf, MUNIR, ACCOUNTING AND TAX, band) plus a sheen mask, so the splash can assemble it piece by piece |
| `app/icon.png`, `app/apple-icon.png` | Favicon and home-screen icon from the "M" mark |

If the client provides a vector (SVG/AI/EPS) logo, regenerate these from it for sharper results.

## Intro splash

`components/layout/Splash.tsx` + `splash.css`. About 3.5 seconds:

1. A ledger grid opens from the centre behind a soft gold halo; the counter runs 0–100.
2. The logo assembles: the M rises out of a blur, the gold swoosh draws towards its arrow (with a glint at the tip), the maple leaf drops in, MUNIR rises, ACCOUNTING AND TAX tracks in, and the gold band unfurls. A sheen then sweeps across it.
3. The tagline rises word by word.
4. The logo flies into the header and lands exactly on the header logo while a paper and a forest-green curtain lift; the homepage hero animates in behind them.

- Shown **once per browser session** (a tiny script in `app/layout.tsx` decides before first paint, so there is no flash on later pages).
- Skippable by click, key press, scroll or touch.
- Never shown with `prefers-reduced-motion` or without JavaScript; content stays in the HTML for search engines.
- If the header logo cannot be measured in time (very slow devices), the logo fades out instead of flying.
- The full timeline is listed at the top of `splash.css`. Keep `SPLASH_FAILSAFE_MS` in `app/layout.tsx` just after the paper curtain ends. To remove the splash, delete `<Splash />` and the gate script from `app/layout.tsx`.

## Image credits

All photographs are from [Unsplash](https://unsplash.com) under the Unsplash License (free for commercial use, no attribution required). Stored locally in `public/images/`.

| File | Unsplash photo ID |
| --- | --- |
| `hero-consultation.jpg` (also used for `app/opengraph-image.jpg`) | `photo-1573497620053-ea5300f94f21` |
| `planning-desk.jpg` | `photo-1543286386-2e659306cd6c` |
| `bright-office.jpg` | `photo-1497215728101-856f4ea42174` |
| `notebook.jpg` | `photo-1517842645767-c639042777db` |
| `signing.jpg` | `photo-1450101499163-c8848c66ca85` |
| `document-review.jpg` | `photo-1565688534245-05d6b5be184a` |
| `calculator.jpg` (colour-graded to sage) | `photo-1587145820266-a5951ee6f620` |

Replace with the client's own photography when available.

## Open items to confirm with the client

- Brand colours: the logo is navy, gold and red; the site follows the requested green and white. Confirm which should lead.
- Registered business name: the logo reads "Munir Accounting and Tax Professional Corporation", while page titles, footer copyright and search data still use "Munir Nadeem" (`site.name` in `lib/site.ts`).
- A vector logo, and ideally a horizontal version — the stacked logo's small lines are hard to read at header size.
- "CBFSL" in the Financing service — shown exactly as the client wrote it (twice). Optionally confirm whether they mean CSBFL (Canada Small Business Financing Loan).
- Pricing amounts, if the client wants prices shown instead of "Contact for Pricing".
- Team member names, roles, biographies and portraits.
- Website domain and a Resend-verified sender address.
- Optional: office address and business hours (deliberately omitted until supplied).
