# Veltan + blueprint — how the two repos work together

Agents working on either repo must treat them as **one product, two surfaces**.

| Surface | Repo | Live URL | Job |
|---|---|---|---|
| **Marketing** | Origin `emma-tumo/blueprint` (this repo, `main`) | https://www.captbdger.website | Convert visitors. Host **Phase 1 sign-in** (Supabase). Hand a signed-in user to the app. |
| **Product app** | Origin / GitHub `emma-tumo/Veltan` (default branch **`app`**) | https://veltan-app.vercel.app | Client Follow-Up System. Phase 0 is a placeholder plus local identity tables/RLS. Phase 1+ product UI lives here. |

Do **not** overwrite Veltan’s `app` branch with the landing page. Do **not** turn the marketing homepage into the product dashboard.

## Identifiers

- Origin marketing: `https://origin.cursor.com/emma-tumo/blueprint.git`
- Origin product: `https://origin.cursor.com/emma-tumo/Veltan.git` (inbound GitHub mirror, default branch `app`)
- GitHub product (when credentials exist): `tumoemma-exo7fw/Veltan`
- Vercel marketing project historically: `veltan` → `www.captbdger.website`
- Vercel app: `veltan-app.vercel.app`

## Auth contract (Phase 1)

1. **Supabase is the account backend** for both surfaces. Google and email go through Supabase Auth. A first Google press **creates** the user; a returning Google press **signs in**. Same email is one account.
2. Marketing implements the public `/login` and `/signup` screens and the OAuth callback.
3. After onboarding, marketing redirects to:

   `https://veltan-app.vercel.app/?sso=<JWT>`

   JWT is HS256, issuer `veltan-marketing`, audience `veltan-app`, 5 minute TTL, claims `sub` + `email`. Shared secret: `VELTAN_SSO_SECRET`.
4. The app verifies that JWT (or, once wired, a Supabase session) and opens the product. Until the app is built, the live app page is the Phase 0 placeholder (“Foundational rails”). That is expected.
5. Google OAuth is configured **in the Supabase dashboard** (Google provider), not as Better Auth env vars. Redirect URI in Google Cloud is `https://<project-ref>.supabase.co/auth/v1/callback`. Site redirect allow-list in Supabase must include `https://www.captbdger.website/**` and local `http://127.0.0.1:<port>/**`.

Details: [`phase-1-auth.md`](./phase-1-auth.md).

## What Phase 0 already put on the app

Commit message on Veltan `app`: identity tables, RLS, local Auth, Next.js placeholder kept off the marketing site. Live app `/login` posts to `/api/identity/login` with a local `admin@localhost` form. That local identity is **not** Google and is **not** the Phase 1 path. Phase 1 replaces it with Supabase.

## Rules for agents

- Client-facing copy: no PesaJet, no Cal.com, no “wizard”, no Stripe, no process talk. Pay is MTN or Airtel Money. Calendar CTA is **Book now**.
- Marketing header uses the colored 3D mark (`veltan-mark-dark-color.png`), not the silver/metal mark. Login uses `veltan-mark-icon-on-dark.png`.
- Founding seats, prices, WhatsApp, and MoMo numbers live in `lib/site.ts` on marketing.
- If you cannot clone Veltan from this chat, still keep the contract above. Do not invent a second user database on marketing.
