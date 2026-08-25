/**
 * Single source of truth for the values flagged as "confirm with founder"
 * in docs/build-spec.md §15. Change them here and nowhere else.
 */

/** §15.3 — confirm: an earlier planning number (0777978947) does not match. */
export const WHATSAPP_NUMBER = "256777968947";
export const WHATSAPP_DISPLAY = "+256 777 968 947";

/** §15.2 — assumed site root; confirm with founder. */
export const SITE_URL = "https://captbdger.website";

/**
 * §15.1 — launch + offer deadline: September 1, 2026, 00:00:00 East Africa
 * Time. Expressed as UTC minus the explicit +3h offset so the countdown is
 * correct in every visitor timezone.
 */
export const LAUNCH_AT_UTC_MS =
  Date.UTC(2026, 8, 1, 0, 0, 0) - 3 * 60 * 60 * 1000;
export const LAUNCH_DATE_LABEL = "September 1, 2026";

export const PRICE_ORIGINAL = "UGX 89,000";
export const PRICE_FOUNDING = "UGX 62,300";
export const DISCOUNT_LABEL = "30% off";

/** Mobile Money details for paying a founding spot upfront. */
export const MOMO_NUMBER_DISPLAY = "0777 968 947";
export const MOMO_ACCOUNT_NAME = "MARTIN EMMANUEL HEGENY";

/**
 * Stripe Payment Link (https://buy.stripe.com/...) for the Founding 12
 * first-month payment. Create it in the Stripe dashboard under
 * Payment Links, then paste the URL here. While empty, the card option is
 * hidden in the booking wizard and Mobile Money is offered instead.
 */
export const STRIPE_PAYMENT_LINK = "";

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
  header: "Hi Veltan, can you tell me more about the missed-call service?",
  hero: "Hi Veltan, I'd like to know more about the missed-call service.",
  pricing: "Hi Veltan, I'd like to claim a founding spot.",
  // The booking wizard composes its own structured message from form fields.
  booking: "",
  footer: "Hi Veltan, I have a few questions about the missed-call service.",
};
