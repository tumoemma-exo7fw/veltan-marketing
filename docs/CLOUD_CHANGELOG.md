# Cloud-chat reconstruction changelog

Internal notes for Emma / agents. **Not visitor marketing copy.**

This file is the stored memory of last-refined landing work from Cursor cloud chats. **Do not re-mine the ~59 transcripts** unless a later chat clearly contradicts this file.

**How to read it:** later chat wins. When a thread stopped iterating a feature and a new agent started the next topic, that last state is the target. This document records both the last-refined state **and** what overrode it.

**Current live last-refined snapshot (restore of 15 Sep 2026, plus later nav/login refinements):**

| Surface | Last-refined rule |
| --- | --- |
| Nav (desktop) | Logo left; section links + **Log in** (circular, word only) + **Get Started** on the right. No WhatsApp in the header. Hover / `:focus-visible`: ~180ms cyan underline (`scaleX` on a pseudo-element) plus a slightly brighter label. Current section keeps a persistent underline; hover is preview. Gate hover with `(hover: hover)` so tap does not stick on phones. `prefers-reduced-motion`: no tween. No bounce, no 3D. |
| Nav (mobile) | **Keep hamburger** (lg and down). **Log in** + **Get Started** stay in the **header bar only** — do **not** duplicate them in the sheet. Open menu is a **full-screen login-atmosphere page** (`auth-atmosphere`, `#071c1e`) so the landing is fully covered — not a short sheet over a still-bright hero. Header goes solid `#071c1e` while open. Centered section links (same max width as `/login`), then **Sign out last** when signed in (not in the mobile bar). Portal to `document.body`. Tap empty atmosphere / Escape / X closes. Body scroll lock. ~200ms fade (reduced motion = instant). `aria-modal`, focus into panel, restore to hamburger, page inert while open. Current section from hash / IntersectionObserver. No WhatsApp in header or menu. |
| Hero | 16:9 clinic plate, `object-contain`, **live HTML** copy (not baked pixels). “7 already in. 5 seats left.” Full 16:9 image on mobile, then the same stack. Orange **Get Started** → `#pricing`. |
| Seats | **12** founding. **7 taken / 5 remaining** (explicit user “7 taken 5 remaining”; 7+5=12). Do not go back to 6/12 or 7/3. |
| Countdown | Closes **30 Sep 2026, 23:59:59 EAT**. Units left-to-right: **SEC → MIN → HOURS → DAYS**. |
| Book now | Cal.com event `capt.badger-veltan/veltan-client-follow-up-system`. Prefetch on land (not `display:none`). Desktop: small **filled cyan** Book now reveals the already-loaded booker; if still warming, button says **Opening times…**. Mobile: calendar **already open** at `#demo`. No “Load calendar”, no Cal.com/PesaJet/wizard talk in visitor copy. |
| Founding pay | Wizard **closed until** Reserve / Pay UGX 70,000. Visitor pay: **MTN USSD / Airtel Money**, not PesaJet or Stripe in visitor UI. Keep MoMo wizard. |
| Auth | Dark `/login`. Stack: Email → Password → Remember me · Forgot password? → **Sign in** → **Continue with Google** → `or` divider → quiet **Continue as guest**. No “Don't have an account?”, no cyan Get started pill, no “Just looking?”, no fat Preview the app button. Header **Get Started** (scrolls to `#pricing`) stays. `/signup` redirects to `/login`. Google on `/login` is the new-account path. Do not auto-create email accounts on failed password sign-in. Google via **Supabase** (secrets in Supabase, not Vercel). After sign-in → product `?sso=`. Guest → `veltan-app.vercel.app/?guest=1`. |
| Signed-in | `proxy.ts` does **not** bounce `/login` to `/continue`. Authed `/login` still renders: **Continue as you@email** → `/continue`; **Use a different account** → POST `/auth/signout` then the form. Header keeps circular **Log in**. **Sign out** is **not** in the mobile bar — last item in the hamburger when signed in. Desktop (`lg+`) may keep Sign out in the bar. Landing stays a client page (browser Supabase session reader). |
| Remember me | Default **OFF**. Checked = persistent cookies. Unchecked = browser-session cookies (clear when the browser closes) via `@supabase/ssr` cookie `maxAge`/`expires` on browser + server clients. Not `updateUser({ rememberMe })`. Session-only by default for email and Google until Remember me is checked on that browser. |

**This thread (nav + visitor pay + login — last word, do not undo):** hamburger **kept**; no WhatsApp in header or menu; open hamburger is a **full-screen login-atmosphere page** (this **overrides** both “light blur” and the later “32% black scrim over a still-visible landing”); **Log in** + **Get Started** as real CTAs **in the bar only**. Cal.com **Book now** last-refined UX. Seats **7 taken / 5 remaining of 12**. Countdown **SEC → MIN → HOURS → DAYS**. Circular **Log in** in the bar. Pay-to-lock wizard **closed until** the pricing CTA. Visitor copy: **MTN USSD / Airtel Money**, not PesaJet or Stripe. Login stack and Remember me as in the table.

Parent landing thread (`bc-cc3f3433`) was **not** re-fetched in a loop; nav/pay rules above are from that thread’s last instructions. Restore run `bc-6242c463` implemented UI. This follow-up only stores that reconstruction here so nobody re-mines the transcripts.

---

## Entries (oldest first)

Each entry: what it established (desktop + mobile), then what later overrode it.

### `bc-76d596d0` — Visual QA of landing page

Established a **light-mode** spec page: two-column hero + phone demo, industry pills, 8s recorded demo, FAQ accordion, WhatsApp CTAs always visible (no hamburger), countdown days/hours/min/sec to **1 Sep 2026**. Mobile: single column; header WhatsApp still visible.

**Overridden by:** cinematic dark rebuild, later deadline, hamburger (this thread).

### `bc-a5c898a6` — Rebuild homepage from mockup

Established full-bleed clinic photo hero, right-grouped header (Get Started → `#pricing` + WhatsApp), glass widgets, industry pills **below** the hero. Mobile: compact header + scrollable section row, **no hamburger hiding CTAs**.

**Overridden by:** later hero plate swaps, live HTML overlay, hamburger.

### `bc-49ef4195` — QA dark landing page

Confirmed cinematic **dark** page (no white backgrounds), readable wordmark, industry pills, 3-step booking with Mobile Money, Get Started visible on mobile **without hamburger**.

**Overridden by:** hamburger (this thread); prices later became 70k/100k.

### `bc-ed38f4fd` — Review landing QA video

Video QA of the dark landing (index only; treat originals as source).

**Overridden by:** later hero/nav/pay chats.

### `bc-0a76f764` — Hero image swap

Swapped the clinic still; inpainted baked mockup type so HTML is the only hero UI. Desktop overlay + mobile stack.

**Overridden by:** later “exact attached image” / live-HTML plate work.

### `bc-62f27aa1` — Founding offer and MoMo

Reopened Founding 12: **UGX 70,000 / 100,000**, 30% for 6 months (not lifetime), MTN USSD + Airtel, privilege list, WhatsApp send. (This chat first used an **31 Aug 2027** countdown.)

**Overridden by:** `bc-6cad6c94` (30 Sep 2026); PesaJet experiments; then this thread restored **MoMo** as visitor pay.

### `bc-e7290170` — WhatsApp app-first booking

Established `whatsapp://` first, `wa.me` fallback, in-page next-steps (desktop + mobile). MoMo USSD kept. Explicitly **no hamburger**.

**Overridden by:** WhatsApp **removed from header/menu** (this thread). Footer/demo/wizard WhatsApp app-first **kept**.

### `bc-3ff4420c` — Hero image exact size

Advice only: then-current file 2048×1152 16:9; `object-cover` + `100svh` crops. Recommended 3840×2160 master; zero-crop on phone+desktop needs `object-contain` or two crops.

**Overridden by:** `bc-b50a3c90` (16:9 contain, no cover-crop).

### `bc-6cad6c94` — September founding deadline

Countdown = **30 September 2026, 23:59:59 EAT** (not Aug 2027, not a 6-month *countdown*). 6-month **price** lock stays.

**Still last-refined** for the date.

### `bc-f6f234e2` — Swap homepage hero photo

New clinic JPEG; do not put “No charge. Just your feedback.” in live copy.

**Overridden by:** later plate files + live HTML; seats copy became 7/5.

### `bc-8c63a0c8` — Nav wordmark and CTA

Header wordmark **VELTAN** (all-caps Genos); header Get Started **filled orange**. Mobile Get Started visible, no hamburger.

**Overridden by:** title-case wordmark chat, then revert to uppercase; Get Started later cyan outline beside Log in; hamburger.

### `bc-127ec796` — Wordmark title-case Veltan

Visible letters **Veltan** (no `uppercase`), still Genos. Keep orange Get Started.

**Overridden by:** `bc-297253c4` revert → uppercase **VELTAN** again (current).

### `bc-b50a3c90` — Hero full image no crop

Hero box **16:9**, `object-contain object-center`, no `100svh` cover-crop. Desktop overlay / mobile stack. Full clinic visible at 1280 and ~390.

**Still last-refined** for image fit.

### `bc-76589992` — Nav position and tap feel

Nav clustered **right** with CTAs (not centered 3-column). Hover/tap cyan underline. **Do not add hamburger.** Title-case Veltan + orange Get Started if already landed.

**Overridden by:** revert kept **position only** (dropped fancy tap); then hamburger.

### `bc-297253c4` — Revert except nav position

Keep logo-left / nav+CTAs-right. Undo title-case, orange header Get Started, 16:9 contain, latest still, tap micro-interactions.

**Overridden by:** later agents put 16:9 contain + latest plate + live HTML back; this thread hamburger.

### `bc-11876b77` — Exact hero image plus CTA

Show attached still **exactly** (baked type kept), only extra = orange Get Started. Right-grouped nav + WhatsApp.

**Overridden by:** `bc-2661dd18` / `bc-4c054bda` (newer plate) and `bc-e4f7a9a0` (live HTML, baked glyphs removed).

### `bc-4c054bda` — Hero from latest image

Force the **later** attached plate; 16:9 contain; overlay **only** Get Started at that moment.

**Overridden by:** live HTML overlay (`bc-e4f7a9a0`).

### `bc-a4478b2f` — Six founding seats claimed

**6 of 12** claimed / 6 remaining, honest meter, no fake testimonials.

**Overridden by:** 7/3 then **7/5**.

### `bc-5427091c` — Security audit and harden

No leaked secrets. Headers, no production source maps, ignore extra credential files. Public WhatsApp/MoMo/prices stay public.

**Still last-refined** for hardening. Do not put Google client secret in Vercel.

### `bc-2661dd18` — Keep latest hero plate

If an older PNG overwrote the hero, restore the latest attached plate. Keep 16:9 contain.

**Still last-refined** for *which* photo (plus later HTML overlay).

### `bc-e4f7a9a0` — Hero text as live HTML

Transcribed kicker/headline/icons as DOM; inpainted baked glyphs. Desktop copy on left ~54% of 16:9; mobile photo then stack. Originally included “No charge. Just your feedback.”

**Overridden by:** later copy **“We’re starting with 12 clinics… 7 already in. 5 seats left.”** (no “No charge”). Layout (live HTML + contain) **kept**.

### `bc-fdcec28f` — Push landing into veltan

Publish/migration attempt: marketing vs product **app** branch. Do not overwrite the product app with the landing.

**Overridden by:** Hobby GitHub path (`veltan-marketing`), not Origin-on-Vercel Pro.

### `bc-b850efdf` — Find landing page chat

Index of where marketing vs product repos live. Two-surface split.

**Still useful as an index**; verify against this file + `docs/two-repos.md`.

### `bc-a5c1ef18` — Migrate blueprint to veltan

Same split: landing `main` vs product `app`. Do not force-push landing onto product.

**Still last-refined** as architecture, not UI.

### `bc-5c807910` — PesaJet gateway requirements

Research: PesaJet Pay for MTN/Airtel UGX.

**Overridden by:** this thread — **no PesaJet in visitor copy/UI**.

### `bc-d30e988c` — Swap MoMo for PesaJet

Wizard defaulted to PesaJet payment link; hid Martin USSD as primary.

**Overridden by:** this thread — restore **MoMo wizard** for founding pay.

### `bc-ade1beec` — Wire PesaJet API keys

Server collect API + PIN prompt path.

**Overridden by:** visitor UI no longer PesaJet. Do not resurrect PIN recovery as the public path.

### `bc-be05442a` — Embed Cal.com demo booking

Under pricing: dark month-view embed, `#demo`, Open in new tab, keep 3-step wizard. Event `capt.badger-veltan/veltan-client-follow-up-system`. Availability set in Cal.com (Mon–Sat 08:00–22:00 EAT), not in this repo.

**Still last-refined** that Cal.com **exists**. Load UX refined later.

### `bc-130d1d10` — Fix PesaJet MTN error

Human errors for sandbox/KYC; keep MoMo backup.

**Overridden by:** PesaJet not visitor-facing.

### `bc-660ce837` — Speed up booking load

Click-to-load calendar so the wizard stays snappy. Placeholder “Load calendar”.

**Overridden by:** prefetch + reveal (`bc-03ce85a7`, `bc-65fd24bd`).

### `bc-8a00ab81` — Auto Google calendar invites

Free Cal.com only: founder connects Google in Cal.com; guests get email + .ics. Copy: *You’ll get an email with a calendar invite for Google, Outlook, or Apple.* Timezone Africa/Nairobi. No fake Connect Google button.

**Still last-refined** for invite copy (visitor-facing; does not say “Cal.com”).

### `bc-03ce85a7` — Preload calendar then reveal

Desktop: prefetch hidden (`opacity-0`, not `display:none`); reveal control (then “See times”). If not ready: **Opening times…**. Mobile `max-width: 639px`: calendar **open** at `#demo`. Preload `embed.js` in HTML.

**Overridden in copy:** later chats standardized the button to **Book now** (not See times). Prefetch mechanics **kept**.

### `bc-65fd24bd` — Cal.com prefetch UX

Desktop: land → background load → **Book now** (or Book a time) only reveals. Mobile: preload + auto-open. Do not stall the founding wizard. SSR-safe viewport check.

**Last-refined Book now UX** (label **Book now**; filled cyan restored 15 Sep 2026). Mobile auto-open **kept**.

### `bc-924da9a9` — Hide pay-to-lock until CTA

Wizard **closed** until lock-in CTA (Reserve / Pay 70k). Hero **Get Started** → `#pricing` stays collapsed. `#founding` opens wizard. Cal.com unchanged.

**Still last-refined.**

### `bc-168ffd7f` — Update founding seats 7/3

Forced **7 taken / 3 remaining** of 12 even though 7+3≠12.

**Overridden by:** explicit later **7 taken / 5 remaining** (7+5=12). This file + `lib/site.ts` use **7/5**.

### `bc-26050a59` — Nav login + tester leads

Header Get Started → **Login**; `/login` as tester lead form + WhatsApp to founder.

**Overridden by:** real **Supabase** login/signup; Login is a door to the product, not lead capture.

### `bc-4b4e47bb` — Minimal circular Login button

Header **Login** word only, compact circular cyan outline, no icon. Desktop + mobile (then one header, no extra menu).

**Still last-refined for chrome**, compatible with hamburger: circular in the bar; full-width **Log in** in the sheet (this thread). Label **Log in**.

### `bc-7f351b5a` — Verify auth screens

Dark full-page auth (no marketing chrome). Email validation, forgot password, signup → onboarding. Mobile stacked login.

**Overridden in part:** `/continue` always hands off to the app (onboarding not a hard gate while the product is a placeholder). Screens **kept**.

### `bc-1fbc923b` — Re-test onboarding redirect

After Continue, redirect `https://veltan-app.vercel.app/?sso=<JWT>`. App placeholder is OK.

**Still last-refined** for SSO handoff.

### `bc-c31e2c22` — Review signup walkthrough video

Video did **not** prove automatic redirect (manual window switch). Treat as unusable for that claim.

No UI change.

### `bc-93c463f5` — Verify homepage copy and Book now

Confirmed: hero **7 already in. 5 seats left** (not “No charge” / not 3 remain); pricing 7 of 12 taken / 5 left; wizard hidden until CTA; pay **MTN or Airtel Money** not PesaJet; small **Book now**; no Cal.com/wizard/PesaJet in FAQ/homepage.

**Still last-refined** for visitor copy (except countdown order / filled Book now, which later 38473 tests required).

### `bc-acbab423` — Retest Book now clicks

Interactively confirmed pay form + Book now calendar when JS loads.

Supports last-refined Cal.com path.

### `bc-e2ad80de` — Explore auth and payments

Read-only report: Better Auth Google vs env; PesaJet internals; visitor copy must not name PesaJet/Stripe/wizard.

**Overridden:** Google is **Supabase**, not Better Auth. Copy rule **kept**.

### `bc-3a69d415` — Browser-test countdown pay cal

Expected: countdown **sec, min, hours, days**; filled cyan Book now; PesaJet PIN recovery card; login Google unavailable message.

Countdown + Book now fill were **gaps vs last-refined 38473/video**. PesaJet recovery **not** restored (this thread dropped PesaJet from visitor UI).

### `bc-0f2b6fe4` — Retest preview on 38473

Passing last-refined **visuals** on that preview: SEC MIN HOURS DAYS (uppercase labels), filled Book now, Cal.com times, PesaJet recovery card (then still live).

**Override:** keep countdown order + filled Book now; **do not** restore PesaJet recovery.

### `bc-b74c2da8` — Review walkthrough recording

Video confirmed sec→days countdown, filled cyan Book now, Cal.com, PesaJet recovery, Google-unavailable login.

Same override as above for PesaJet.

### `bc-b1367b33` / `bc-bbd9708c` / `bc-b547b940` / `bc-2c454e8d` / `bc-d306041f` — Meta summaries

Indexes of landing / auth / migrate / Veltan-push / auth-screen chats. Use as pointers; **this file + originals win**.

### `bc-96542f8d` — Verify login Google UI

Header Log in → dark `/login`; Continue with Google; if Supabase unset, **on-page** error, no Better Auth POST. `/signup` also has Google.

**Still last-refined** for that UI (plus later guest preview).

### `bc-6b7f81af` — GitHub vs Origin publish

Hobby cannot Origin-git to Vercel; marketing should publish from GitHub.

See `docs/local-sync.md`. Not a UI rule.

### `bc-9cfc8f91` — Hobby Vercel publish path

Free path: GitHub `tumoemma-exo7fw/veltan-marketing` → Vercel Hobby. Do not publish the **product** repo as captbdger.

Not a UI rule.

### `bc-d54593c8` / `bc-d9f52560` — Origin clone / Windows Origin login

PC clone + Git Bash steps. Superseded/expanded by `docs/local-sync.md`.

### `bc-f0b7c086` — Diagnose live Google login

Live fail = missing `NEXT_PUBLIC_SUPABASE_URL` + anon key on Vercel **veltan-marketing**, plus Google provider in Supabase. Do **not** put Google client secret in Vercel. Confirm `/api/auth/ok` → `supabase: true`.

**Still last-refined** for env. UI already has Preview the app + hamburger.

### `bc-fed89f21` — Fix nav CTAs and blur

First restored Cal.com + 7/5, then (follow-up) **put hamburger back**, removed WhatsApp from header/menu, light blur, Log in as CTA. Do not undo Cal.com/7/5.

**This-thread nav last-refined** (plus opaque sheet so blur stays behind it: commit `556e306`).

### `bc-cc3f3433` — Parent landing thread (last instructions)

**This thread.** Last instructions: keep hamburger; no WhatsApp in header/menu; light blur; Log in + Get Started; visitor pay MTN/Airtel not PesaJet/Stripe; restore Cal.com Book now; 7/5 of 12. Transcript was **not** loop-fetched; treat this file + those instructions as the override over older nav/pay chats.

**Still last-refined** for nav + visitor pay copy.

### Restore pass 15 Sep 2026 (`bc-6242c463`)

Re-applied last-refined **Book now fill**, countdown **SEC→MIN→HOURS→DAYS**, `embed.js` preload, circular **Log in**, Opening times…, invite copy — without undoing hamburger / 7/5 / Cal.com / MoMo.

### Changelog follow-up (this file)

Wrote `docs/CLOUD_CHANGELOG.md` from notes already extracted. **No UI redo.** Do not batch-fetch the ~59 transcripts again.

### GitHub-started marketing agent (17 Sep 2026)

Proved GitHub push from a cloud agent whose `origin` is
`tumoemma-exo7fw/veltan-marketing` (`git push origin main` →
`Everything up-to-date` at `3d0ea57`). **No UI redo.** `docs/local-sync.md`
and README no longer claim every cloud machine cannot push GitHub; Origin-only
workspaces still use the PC fallback.

### Login stack, session, hamburger portal (17 Sep 2026)

Approved marketing plan. **Login:** Email → Password → Remember me · Forgot password? → Sign in → Continue with Google → `or` → Continue as guest. Dropped signup switch / Get started pill / Preview the app button. `/signup` redirects to `/login`. **Session:** no silent `/login` → `/continue` bounce; signed-in panel + Sign out; Remember me real (default off, session cookies). **Hamburger:** portal to `document.body`, ~32% black scrim, no duplicated sheet CTAs, current-section spy. **Desktop nav:** 180ms cyan `scaleX` underline. Overrides older “light blur, page not blacked out” and “full-width Log in + Get Started in the sheet”.

### Mobile Sign out in hamburger (later chat)

**Sign out** is not in the mobile nav bar. When signed in, it is the **last** hamburger option. Desktop may keep Sign out in the bar.

### Hamburger looks like login (later chat)

Open hamburger is a **full-screen** `auth-atmosphere` page (same dark wash as `/login`), landing fully covered, header solid while open, centered section links. Tap empty atmosphere / X / Escape closes.

---

## Explicitly not last-refined (do not bring back)

- Two-row horizontal-only mobile nav
- WhatsApp CTA in header or hamburger
- Visitor PesaJet / Stripe / “wizard” / “Cal.com” vendor copy
- Tester lead-capture as `/login`
- Founding **6/12** or **7/3**
- Hero “No charge. Just your feedback.”
- `object-cover` + `100svh` crop as the homepage hero
- Better Auth Google client secret in Vercel
- Click-to-load “Load calendar”
