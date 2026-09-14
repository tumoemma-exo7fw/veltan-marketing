/**
 * Single source of truth for offer, price, and Mobile Money values.
 * Change them here and nowhere else.
 */

/** §15.3 — confirm: an earlier planning number (0777978947) does not match. */
export const WHATSAPP_NUMBER = "256777968947";
export const WHATSAPP_DISPLAY = "+256 777 968 947";

/** Canonical origin (www is the primary domain on Vercel; apex redirects). */
export const SITE_URL = "https://www.captbdger.website";

/**
 * Product app (Veltan `app` branch). Marketing signs people in, then hands
 * them here with `?sso=`. Override with NEXT_PUBLIC_FOLLOWUP_APP_URL.
 */
export const FOLLOWUP_APP_URL = (
  process.env.NEXT_PUBLIC_FOLLOWUP_APP_URL?.trim() ||
  "https://veltan-app.vercel.app/"
).replace(/\/?$/, "/");

/**
 * Google Search Console verification code — the content value of the
 * <meta name="google-site-verification"> tag. Empty = tag not rendered.
 */
export const GOOGLE_SITE_VERIFICATION =
  "KuULV7rI7HRtB_4X4nqKyT-KNKbDLva666mHVy6mhNA";

/**
 * Founding 12 window closes 30 September 2026, 23:59:59 East Africa Time
 * (UTC+3). Date.UTC(...) is treated as UTC, then we subtract the +3h EAT
 * offset so the countdown is correct in every visitor timezone.
 * 30 Sep 2026 23:59:59 EAT = 30 Sep 2026 20:59:59 UTC.
 */
export const LAUNCH_AT_UTC_MS =
  Date.UTC(2026, 8, 30, 23, 59, 59) - 3 * 60 * 60 * 1000;
export const LAUNCH_DATE_LABEL = "September 30, 2026";
export const LAUNCH_DATE_SHORT = "30 Sep 2026";
export const LAUNCH_DATE_ISO = "2026-09-30";

/** Total Founding 12 seats. Claimed/remaining is the honest live count — do not invent a tighter number. */
export const FOUNDING_SEATS_TOTAL = 12;
export const FOUNDING_SEATS_CLAIMED = 6;
export const FOUNDING_SEATS_REMAINING =
  FOUNDING_SEATS_TOTAL - FOUNDING_SEATS_CLAIMED;
export const FOUNDING_SEATS_CLAIMED_PERCENT = Math.round(
  (FOUNDING_SEATS_CLAIMED / FOUNDING_SEATS_TOTAL) * 100,
);
/** Alias for the Founding 12 total. Prefer TOTAL / CLAIMED / REMAINING in new copy. */
export const FOUNDING_SEATS = FOUNDING_SEATS_TOTAL;

export const PRICE_ORIGINAL_AMOUNT = 100_000;
export const PRICE_FOUNDING_AMOUNT = 70_000;
export const PRICE_ORIGINAL = "UGX 100,000";
export const PRICE_FOUNDING = "UGX 70,000";
export const DISCOUNT_LABEL = "30% off";
export const DISCOUNT_MONTHS = 6;

/** Mobile Money details for paying a founding seat upfront. */
export const MOMO_NUMBER_DISPLAY = "0777 968 947";
export const MOMO_NUMBER_DIGITS = "0777968947";
export const MOMO_ACCOUNT_NAME = "MARTIN EMMANUEL HEGENY";

/**
 * MTN Uganda send-money USSD (confirm + PIN in the dialer).
 * `tel:` encodes `*` and `#` so the handset opens with the code filled in.
 */
export const MTN_MOMO_USSD = `*165*1*1*${MOMO_NUMBER_DIGITS}*${PRICE_FOUNDING_AMOUNT}#`;
export const MTN_MOMO_TEL_HREF = `tel:${MTN_MOMO_USSD.replace(/\*/g, "%2A").replace(/#/g, "%23")}`;

/**
 * Stripe Payment Link (https://buy.stripe.com/...) for the Founding 12
 * first-month payment. Create it in the Stripe dashboard under
 * Payment Links, then paste the URL here. While empty, the card option is
 * hidden in the booking wizard and Mobile Money is offered instead.
 */
export const STRIPE_PAYMENT_LINK = "";

/** HTTPS fallback (`wa.me`). Interactive CTAs prefer `whatsapp://` via `lib/whatsapp.ts`. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type CtaLocation =
  | "header"
  | "hero"
  | "pricing"
  | "booking"
  | "footer";

/**
 * Each CTA pre-fills a slightly different message so the founder can tell
 * which section of the page converted, straight from the WhatsApp thread.
 */
export const WA_MESSAGES: Record<CtaLocation, string> = {
  header: `Hi Veltan, I want to know more about the missed-call service — ${FOUNDING_SEATS_REMAINING} of ${FOUNDING_SEATS_TOTAL} founding seats remaining.`,
  hero: `Hi Veltan, I want to reserve a founding seat. I'll pay ${PRICE_FOUNDING} to lock it.`,
  pricing: `Hi Veltan, I want to reserve a founding seat. I'll pay ${PRICE_FOUNDING} to lock the first month.`,
  // The booking wizard composes its own structured message from form fields.
  booking: "",
  footer: "Hi Veltan, I have a few questions before I reserve a founding seat.",
};
