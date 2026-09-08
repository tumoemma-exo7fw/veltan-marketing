# Veltan Landing Page — Full Build Spec
*For an AI builder with zero prior context on Veltan. Read this entire document before writing any code.*

---

## 0. What Veltan is (context you need before anything else)

Veltan is an intelligent-systems company selling operational software to local and small businesses. The first live product is the **Client Follow-Up System**: when a business misses an incoming phone call, Veltan automatically texts the caller back within seconds, in the business's name, so the lead isn't lost to a competitor who answered first. A human at the business then calls the lead back.

This landing page's **only job** is to convert a visitor into either (a) a WhatsApp conversation that leads to a paid signup, or (b) a "founding customer" commitment before the discount window closes. Every design and copy decision should be judged against that, not against generic landing-page conventions.

**Founding 12 window closes: September 30, 2026, 23:59:59 East Africa Time.** A countdown and the limited "Founding 12" offer both count down to this date (last day of September — not a 6-month signup window). The 30% founding rate still lasts 6 months after signup.

**Primary vertical (default, and the one to sell hardest): dental clinics in Kampala** — the founder already has active leads here. **Secondary verticals, shown but not primary: general trades (plumbing/electrical) and real estate agents.** The page must support switching between these three without feeling like three separate products bolted together — same mechanism, same trust logic, different pain-point language.

---

## 1. Tech stack — non-negotiable, matches the founder's existing setup

- **Next.js** (App Router), deployed to **Vercel**
- **Tailwind CSS** for styling — implement the token system below as Tailwind theme extensions, not ad hoc classes
- **TypeScript** preferred if the builder is comfortable with it; plain JS acceptable
- Domain: **captbdger.website**, assumed to be the site root for this page (confirm with founder if it should instead live at a subpath)
- **No dark mode.** Light mode only, this build.
- Deployment itself is manual, done by the founder — the build only needs to be Vercel-deploy-ready (i.e., builds cleanly with `next build`, no server dependencies beyond what Vercel provides out of the box)

---

## 2. Design tokens — Light mode only

Follow Veltan's documented four-level token system: **Primitive → Semantic → Mode → Component.** The values below are the *Mode*-layer resolution of Veltan's five brand primitives (Deep Slate Teal, Deep Teal, Slate Sage, Mist White, Amber Glow) specifically tuned for light-mode contrast — do not reuse dark-mode hex values, several were deliberately deepened for readability on a white background.

```css
--color-bg:          #F5F7F4;   /* page background, off-white (Mist White derived) */
--color-surface:     #FFFFFF;   /* cards, phone frame, primary containers */
--color-surface-2:   #E9EEE9;   /* secondary surface — message bubbles, subtle fills */
--color-surface-teal:#EAF0EF;   /* very light teal tint, used sparingly for the AI/"coming soon" section background */
--color-muted:       #4F6B63;   /* secondary text — deepened Slate Sage for AA contrast on white */
--color-text:        #12292B;   /* primary text — Deep Slate Teal */
--color-accent:      #C97C1E;   /* primary CTA / urgency color — deepened Amber Glow for contrast on white. RESERVE for conversion actions (CTA buttons, countdown, discount price) only — do not decorate with it */
--color-secondary:   #1A4645;   /* Deep Teal — use for the "AI Assistant / coming soon" badge and any element that must read as distinct from the urgent/CTA amber */
--color-line:         rgba(18,41,43,0.10); /* hairline borders/dividers */
--radius:            18px;
--radius-sm:         12px;
```

**Typography:**
- **Inter** — everything: headings, body, UI, buttons. Weights 400/500/600/700/800.
- **Genos** — reserved exclusively for the "VELTAN" wordmark. Never use it for headlines or body copy, even for emphasis.
- Both loaded via Google Fonts.

**Type scale (mobile base, scale up ~15–20% at desktop breakpoint):**
- H1 / hero headline: 32–40px, weight 800, line-height 1.1, letter-spacing -0.015em
- H2 / section headline: 20–26px, weight 800
- Body: 15–16px, weight 400, line-height 1.55
- Small/meta: 12–13px, weight 500–600

---

## 3. Page architecture

Single scrolling page, in this order:

1. **Header** — wordmark (Genos) + WhatsApp CTA visible immediately, no scrolling required to contact
2. **Hero** — industry selector pills, headline, subline, primary "recorded demo" animation, CTA, countdown strip
3. **Objection line** — "doesn't my missed-call alert already do this?" — one short paragraph, industry-aware
4. **How it works** — 3-step sequence, industry-aware copy
5. **AI Assistant preview** — secondary, visually distinct "coming soon" demo (2-turn chat)
6. **Social proof** — placeholder section, structured and ready, empty state until first real customer
7. **FAQ** — accordion, 5–6 questions
8. **Pricing** — Founding 12 discount, tied to the same countdown
9. **Footer** — WhatsApp CTA repeated, trust line, wordmark

---

## 4. Responsive layout rules

- **Mobile (<768px):** single column, stacked exactly in the order above. Hero demo is a phone mockup, centered, full attention.
- **Tablet (768–1023px):** same stacking as mobile but content max-width increases to ~640px, centered — do not attempt a two-column layout here, it looks cramped.
- **Desktop (≥1024px):** hero becomes two columns — headline/subline/CTA/countdown on the left (~55% width), demo phone mockup on the right (~45% width), vertically centered against each other. "How it works" steps switch from stacked to a 3-column row. AI Assistant preview section becomes two columns (explanation text left, chat mockup right). FAQ, pricing, and footer stay single-column-centered even on desktop — no reason to spread them, and it keeps focus on the CTA.
- Both the header WhatsApp button and the hero CTA must work identically and be independently clickable at every breakpoint — do not hide one behind a hamburger menu on mobile. This is a conversion-critical page, not a content site; the CTA must never be more than one tap away.

---

## 5. The "recorded demo" — detailed animation spec

This is the signature element of the page. It should read as if it's a **screen recording of the product actually working**, not a generic looping animation. Apply this treatment to both the hero (missed-call) demo and the AI-chat demo, styled consistently but sized differently (hero demo larger/primary, AI demo smaller/secondary).

**Visual chrome to add (this is what sells "recorded," not just "animated"):**
- A thin top bar above the phone-screen content area with three small dots (red/amber/green, muted/desaturated versions — do not use bright macOS-style colors, keep them subtle and on-brand, e.g. muted amber/teal/sage) suggesting a recording window frame
- A small pill tag, top-left of the demo card: a filled dot that pulses gently + the word "Demo" in small caps — signals "this is a simulation" honestly, avoids any impression of a fake live feed
- A running timestamp counter in a monospace or tabular-nums font (00:00 → 00:08, looping) in the corner of the demo card, ticking in sync with the animation cycle — reinforces the "recording" read
- A thin progress bar along the bottom edge of the demo card that fills over the 8-second loop and resets — like a video scrubber

**Hero demo sequence (8-second loop, matches the countdown-style timing already validated in earlier builds):**
1. 0–3.4s: incoming call state — pulsing ring icon, masked phone number, "Incoming call…" label
2. 3.4–4.2s: "MISSED CALL" tag appears briefly in accent color
3. 4.2–8s: SMS bubble slides in from the bottom, industry-appropriate message text, timestamp meta line ("Sent automatically · 8 seconds after the missed call")
4. Loop resets. On each loop, rotate the underlying scenario text if multiple examples are relevant for the selected industry (see §7 content).

**AI Assistant demo sequence (secondary, smaller, "coming soon" labeled):**
- A simple two-bubble exchange: customer message appears first (left-aligned, muted styling), then after a short "typing" indicator (three animated dots), the AI reply appears (right-aligned, using the secondary Deep Teal accent, not the amber CTA color — this visually reinforces that it's a different, non-core feature)
- Clearly labeled above the demo: "Coming soon — AI Assistant (optional add-on)" so nobody mistakes this for what they're paying for at launch
- Rotate through 1–2 example exchanges per industry, similar to the hero demo rotation logic

**Accessibility:** respect `prefers-reduced-motion` — freeze both demos on their most informative static frame (SMS bubble visible / AI reply visible) rather than disabling them entirely blank. Add `aria-label` describing what the animation shows for screen readers.

---

## 6. Messaging system — the headline/subline formula

Do not rely on a single short catchy line alone, and do not use a single long line alone. Use **both**, each doing a different job:

- **Headline:** short, punchy, stops the scroll. Under 6 words.
- **Subline directly beneath it:** the plain-language explanation, written the way you'd say it out loud to a business owner. This is where the founder's original instinct ("Don't lose the client because you're busy doing other things — Veltan handles your missed calls while you sleep") belongs, lightly tightened, not cut.

Apply this pattern per industry in §7.

---

## 7. Industry selector — content map

Render as 3 pills at the top of the hero: **Dental (default/pre-selected) · Trades · Real Estate.** Switching a pill swaps: kicker line, headline, subline, objection-line copy, step copy, demo SMS text, and AI-demo exchange. Everything else on the page (pricing, FAQ, countdown, footer) stays constant.

### Dental (default)
- **Kicker:** Dental clinics — Kampala
- **Headline:** Miss the call. Not the patient.
- **Subline:** You're busy doing the actual work. Veltan texts your patient back the moment you can't answer — so they don't book with the clinic down the road.
- **Objection line:** Your missed-call log tells you who called. Veltan tells your patient you saw it and you'll fit them in — while they're still deciding which clinic to call next.
- **Step 1:** Call missed — You're mid-appointment. It rings out, same as always.
- **Step 2:** They get a text, in your name — Within 10 seconds, a message from your clinic, not a generic bot line.
- **Step 3:** You call back first — Before they've called another clinic.
- **Demo SMS:** "Hi, sorry we missed your call! This is [Clinic Name] Dental — let us know what you need and we'll call you right back to book you in."
- **AI demo exchange:** Patient: "Do you take walk-ins for a toothache?" → AI: "We can usually fit urgent cases in same-day — want me to check today's open slots for you?"

### Trades (plumbing, electrical, general repairs)
- **Kicker:** Plumbing, electrical & other trades — Kampala
- **Headline:** Miss the call. Not the job.
- **Subline:** You're busy doing the actual work. Veltan texts your customer back the moment you can't answer — so they don't call the next guy on the list.
- **Objection line:** Your missed-call alert tells you who called. Veltan tells your customer you saw it and you're coming — while they're still deciding who to call next.
- **Step 1:** Call missed — You're on a job. It rings out, same as always.
- **Step 2:** They get a text, in your name — Within 10 seconds, a message from your business, not a generic bot line.
- **Step 3:** You call back first — Before they've dialed anyone else.
- **Demo SMS (rotate all 3 per loop):**
  1. "Hi, sorry we missed your call! This is Namuli Plumbing — tell us what's wrong and we'll call you right back."
  2. "Hi, sorry we missed your call! This is Okello Electrical — let us know what's happening, we'll call you back shortly."
  3. "Hi, sorry we missed your call! This is Namutebi Repairs — we saw it, we're on it. We'll call you back soon."
- **AI demo exchange:** Customer: "My kitchen tap won't stop leaking, can someone come today?" → AI: "That sounds urgent — let me check who's free nearby today and get them to call you back within the hour."

### Real Estate
- **Kicker:** Real estate agents — Kampala
- **Headline:** Miss the call. Not the client.
- **Subline:** You're busy showing another property. Veltan texts your caller back the moment you can't answer — so they don't call another agent.
- **Objection line:** Your missed-call alert tells you who called. Veltan tells your caller you saw it and you'll follow up — while they're still deciding which agent to call next.
- **Step 1:** Call missed — You're mid-viewing. It rings out, same as always.
- **Step 2:** They get a text, in your name — Within 10 seconds, a message from you directly, not a generic bot line.
- **Step 3:** You call back first — Before they've called another agent.
- **Demo SMS:** "Hi, sorry we missed your call! This is [Agent Name] Realty — tell us which listing you're calling about and we'll ring you right back."
- **AI demo exchange:** Client: "Is the 3-bedroom in Naalya still available?" → AI: "Let me check — I can also share similar listings nearby if that one's taken. Want me to send a few options while you wait for a callback?"

---

## 8. Countdown + pricing

- **Countdown target:** September 30, 2026, 23:59:59 East Africa Time (UTC+3) — implement with an explicit UTC+3 offset so the countdown is correct regardless of visitor timezone. Last day of September 2026, not August 2027 and not a 6-month countdown.
- **Countdown display:** days / hours / minutes / seconds, shown as a compact strip directly under the hero CTA, and repeated near the pricing section.
- **Pricing card:**
  - Original price struck through: **UGX 89,000**
  - Discounted price, large, accent-colored: **UGX 62,300** (30% off)
  - Badge: "Founding 12 · offer ends [countdown]"
  - Perks list: no setup fee / cancel anytime / we set it up with you over a call
  - CTA: "Claim your founding spot" → WhatsApp deep link

---

## 9. WhatsApp integration

- Number: **+256 777 968 947** *(confirm — this differs from a number given earlier in the founder's planning conversation; verify before launch, a wrong number silently breaks the whole funnel)*
- All CTA buttons link to: `https://wa.me/256777968947?text=` + URL-encoded message
- Use a slightly different pre-filled message depending on which CTA was clicked, so the founder can tell which section converted, e.g.:
  - Hero CTA: "Hi Veltan, I'd like to know more about the missed-call service."
  - Pricing CTA: "Hi Veltan, I'd like to claim a founding spot."
- Track each CTA click as an analytics event (see §11) in addition to the WhatsApp link itself, since WhatsApp click-through doesn't guarantee Vercel Analytics sees it as a conversion otherwise.

---

## 10. FAQ content (accordion, collapsed by default)

1. **What happens to my existing phone number?** Nothing changes about your number — Veltan works alongside it. You keep using your phone exactly as before.
2. **What if I want to cancel?** Cancel anytime, no lock-in contract.
3. **Is my customer data private?** Yes — call and message data is only used to run your follow-up service, never sold or shared.
4. **How long does setup take?** Most businesses are live the same day, set up together over a WhatsApp or phone call.
5. **Does this work if I already use WhatsApp Business?** Yes — Veltan handles the missed phone call specifically; it works alongside however you already use WhatsApp.
6. **What happens after the Founding 12 spots are gone?** Standard pricing applies for new signups after the offer window closes; founding customers keep their locked-in rate.

---

## 11. Analytics & SEO — do not skip, this is a conversion page

- **Vercel Analytics**: install and enable (zero-config with existing Vercel account)
- Track custom events for: industry pill selection, each CTA click (by section), FAQ item opens
- **Open Graph meta tags** — critical, since this will be shared directly via WhatsApp to leads:
  - `og:title`: "Veltan — Never lose a client to a missed call"
  - `og:description`: short version of the subline, industry-neutral (since OG preview can't know which pill a recipient will land on)
  - `og:image`: a static preview image showing the phone-demo mockup — build this as an actual image asset, not a screenshot of the live animated version
  - Ensure these render correctly in WhatsApp's link preview specifically — test by sending the deployed link to yourself before sending to any leads

---

## 12. Social proof section — placeholder, but structured

Do not fabricate testimonials or numbers. Build the section with:
- A clear heading ("Trusted by Kampala businesses" or similar)
- An empty-state layout ready to hold 3 testimonial cards (name, business, quote, industry tag) the moment the founder has real customers
- Until then, this section can either be hidden entirely or replaced with a single honest line such as "Now onboarding our first 12 founding businesses" — do not launch with fake logos or invented quotes

---

## 13. Accessibility

- Visible focus states on every interactive element (industry pills, CTAs, FAQ accordion, countdown does not need focus)
- `prefers-reduced-motion` handling as specified in §5
- Sufficient contrast — all token values in §2 were chosen for AA contrast on their intended backgrounds; do not substitute lighter values for "looks nicer"
- All CTA buttons must have accessible labels beyond just an icon (e.g., "Message Veltan on WhatsApp," not just a WhatsApp icon)

---

## 14. Explicit non-goals for this build

- No dark mode
- No blog, no multi-page navigation — this is a single scrolling page
- No login/dashboard — that's a separate part of the Veltan product, not this page
- No fabricated social proof, ever
- Do not let the AI Assistant preview visually dominate or compete with the core missed-call demo — it is a secondary, clearly-labeled add-on

---

## 15. Open assumptions requiring founder confirmation before/at build time

1. Countdown target date/time: Sept 1, 2026, 00:00 EAT — confirm.
2. Domain path: assumed site root (`captbdger.website`) — confirm or specify subpath.
3. WhatsApp number: `+256 777 968 947` — confirm against the number given in earlier planning (`0777978947`) since these do not match.
