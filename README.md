# Veltan — Landing Page

Single-page conversion site for **Veltan's Client Follow-Up System**: when a
business misses an incoming call, Veltan automatically texts the caller back
within seconds, in the business's name, so the lead isn't lost to a
competitor. The page's only job is to convert visitors into a WhatsApp
conversation or a "Founding 12" commitment before the window closes on
**September 30, 2026**.

Built from the full spec in [`docs/build-spec.md`](docs/build-spec.md).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript — Vercel-deploy-ready
- Tailwind CSS v4 — cinematic dark tokens in `app/globals.css` (teal surfaces, cyan highlights, amber reserved for conversion)
- shadcn/ui (Base UI) for the FAQ accordion
- Vercel Analytics with custom conversion events
- **Supabase Auth** on `/login` (Google create-or-login, then SSO to the product app)
- Fonts: Inter (everything) and Genos (wordmark only), via `next/font`

## Run locally

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev
```

Open http://localhost:3000. `npm run build` produces the production
build Vercel deploys.

Login lives at `/login`. **Continue with Google** creates a Supabase
account if the person is new, or signs them in if they already have one,
then sends them to the product app (`https://veltan-app.vercel.app`).
Google itself is enabled in the Supabase dashboard (not as Next.js
`GOOGLE_CLIENT_*` vars). See [`docs/phase-1-auth.md`](docs/phase-1-auth.md)
and [`docs/two-repos.md`](docs/two-repos.md).

## Where things live

| What | Where |
| --- | --- |
| WhatsApp number, launch date, prices, per-CTA messages | `lib/site.ts` |
| Industry copy (Dental / Trades / Real Estate), FAQ, testimonials | `lib/content.ts` |
| Design tokens (colors, radii, animations) | `app/globals.css` |
| Logo exports and usage guide | `public/brand/`, `docs/brand-assets.md` |
| Recorded-demo chrome + the two demo animations | `components/demo-frame.tsx`, `components/missed-call-demo.tsx`, `components/ai-demo.tsx` |
| Page assembly + industry switching | `app/page.tsx` |
| Open Graph share image | `app/opengraph-image.tsx` |

### Adding the first testimonials

Social proof ships as an honest empty state ("Now onboarding our first 12
founding businesses"). Add real customers to `TESTIMONIALS` in
`lib/content.ts` and the three-card grid renders automatically. Never add
fabricated quotes (spec §12).

## Analytics events

Tracked via Vercel Analytics (enable Analytics for the project in the Vercel
dashboard after deploying):

- `industry_selected` — `{ industry }`
- `cta_click` — `{ location: header | hero | pricing | booking | footer, industry }`
- `booking_started` — `{ industry }` (visitor began the booking wizard)
- `faq_open` — `{ question }`

## Open assumptions to confirm before launch (spec §15)

All three live in `lib/site.ts`:

1. **Countdown target** — September 30, 2026, 23:59:59 East Africa Time
   (UTC+3, explicit offset, correct in any visitor timezone). Last day of
   September — not a 6-month window. The 30% founding rate still lasts
   6 months after signup.
2. **Domain** — assumed site root at `captbdger.website` (`SITE_URL`).
3. **WhatsApp number** — `+256 777 968 947`. An earlier planning note said
   `0777978947`; these do not match. **A wrong number silently breaks the
   whole funnel — verify before sending the link to any lead.**

Note: the spec's `[Clinic Name]` / `[Agent Name]` demo-SMS placeholders are
rendered with sample business names (Mirembe Dental, Akello Realty) so the
recorded demo reads as the product actually working. Change them in
`lib/content.ts` if preferred.

## Deploying

Push to the connected repo and deploy on Vercel. Add the Supabase URL and
anon key (see `.env.example`) so Google sign-in can create or resume
accounts. After deploying, send the link to yourself on WhatsApp to confirm
the Open Graph preview renders correctly (spec §11).
