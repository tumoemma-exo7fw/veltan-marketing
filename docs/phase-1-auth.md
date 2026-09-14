# Phase 1 auth — Supabase + Google

Marketing (`blueprint`) signs people in. The product app (`Veltan` / veltan-app) receives them. **Supabase Auth is the backend.**

## What was broken

Production `/login` still called Better Auth `POST /api/auth/sign-in/social` with `provider: "google"`. The live response is:

```json
{"message":"Provider not found","code":"PROVIDER_NOT_FOUND"}
```

The RSC payload also had `googleConfigured: false`. Google was never registered because `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` were not on Vercel, and Better Auth only adds the provider when both are set. The button still rendered, so visitors saw “login cannot work right now.”

## What Phase 1 does instead

| Action | Result |
|---|---|
| New person presses **Continue with Google** | Supabase creates the user, then `/onboarding`, then the app |
| Returning person presses **Continue with Google** | Supabase signs them in, skips onboarding, then the app |
| Email + password | Same create-or-sign-in split (`/signup` vs `/login`) |

Implementation in this repo:

- `lib/supabase/*` — browser + server clients, session refresh in `proxy.ts`
- `app/auth/callback/route.ts` — PKCE code exchange
- `app/(auth)/login` `/signup` `/onboarding` `/continue`
- `/continue` mints `?sso=` for https://veltan-app.vercel.app/

## Env (marketing Vercel + `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
VELTAN_SSO_SECRET=
NEXT_PUBLIC_FOLLOWUP_APP_URL=https://veltan-app.vercel.app/
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is accepted as an alias of the anon key.

Google Client ID and Secret belong in **Supabase → Authentication → Providers → Google**, not in Next.js. In Google Cloud, authorized redirect is the Supabase callback:

`https://<project-ref>.supabase.co/auth/v1/callback`

Supabase redirect URLs must allow:

- `https://www.captbdger.website/**`
- `http://127.0.0.1:<dev-port>/**`

## App-side follow-up (Veltan `app` branch)

When that repo is open, replace `/api/identity/login` with the same Supabase project (same URL + anon key). Verify `?sso=` with `VELTAN_SSO_SECRET`, or read the Supabase cookie/JWT. Keep RLS on product tables; `auth.uid()` is the user id.

SQL for a shared profile row is in `supabase/migrations/0001_profiles.sql`.
