import {
  DISCOUNT_LABEL,
  DISCOUNT_MONTHS,
  FOUNDING_SEATS,
  LAUNCH_DATE_LABEL,
  PRICE_FOUNDING,
  PRICE_ORIGINAL,
} from "@/lib/site";

export type IndustryId = "dental" | "trades" | "realestate";

export interface AiExchange {
  customer: string;
  reply: string;
}

export interface IndustryContent {
  id: IndustryId;
  /** Short label for the selector pill. */
  label: string;
  kicker: string;
  headline: string;
  subline: string;
  objection: string;
  steps: { title: string; body: string }[];
  /** Rotated one per demo loop when there is more than one. */
  demoSms: string[];
  ai: AiExchange;
}

export const INDUSTRY_ORDER: IndustryId[] = ["dental", "trades", "realestate"];

/*
 * Copy comes verbatim from docs/build-spec.md §7. The spec's "[Clinic Name]"
 * and "[Agent Name]" placeholders are rendered with sample business names so
 * the recorded demo reads as the product actually working.
 */
export const INDUSTRIES: Record<IndustryId, IndustryContent> = {
  dental: {
    id: "dental",
    label: "Dental",
    kicker: "Dental clinics — Kampala",
    headline: "Miss the call. Not the patient.",
    subline:
      "A missed call in Kampala is a patient booking the clinic down the road. Veltan texts them back in your name — in seconds — so you call first.",
    objection:
      "Your missed-call log tells you who rang. It does not keep the patient. Every unanswered ring is someone deciding whether to wait — or walk into the next clinic.",
    steps: [
      {
        title: "Call missed",
        body: "You're mid-appointment. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within seconds, a message from your clinic — not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've booked the clinic down the road.",
      },
    ],
    demoSms: [
      "Hi, sorry we missed your call! This is Mirembe Dental — let us know what you need and we'll call you right back to book you in.",
    ],
    ai: {
      customer: "Do you take walk-ins for a toothache?",
      reply:
        "We can usually fit urgent cases in same-day — want me to check today's open slots for you?",
    },
  },
  trades: {
    id: "trades",
    label: "Trades",
    kicker: "Plumbing, electrical & other trades — Kampala",
    headline: "Miss the call. Not the job.",
    subline:
      "A missed call is a leaking tap going to the next plumber on the list. Veltan texts them back in your name — in seconds — so you get the job.",
    objection:
      "Your missed-call alert tells you who rang. It does not win the job. Every unanswered ring is someone scrolling to the next tradesperson.",
    steps: [
      {
        title: "Call missed",
        body: "You're on a job. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within seconds, a message from your business — not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've dialed the next number on the list.",
      },
    ],
    demoSms: [
      "Hi, sorry we missed your call! This is Namuli Plumbing — tell us what's wrong and we'll call you right back.",
      "Hi, sorry we missed your call! This is Okello Electrical — let us know what's happening, we'll call you back shortly.",
      "Hi, sorry we missed your call! This is Namutebi Repairs — we saw it, we're on it. We'll call you back soon.",
    ],
    ai: {
      customer: "My kitchen tap won't stop leaking, can someone come today?",
      reply:
        "That sounds urgent — let me check who's free nearby today and get them to call you back within the hour.",
    },
  },
  realestate: {
    id: "realestate",
    label: "Real Estate",
    kicker: "Real estate agents — Kampala",
    headline: "Miss the call. Not the listing.",
    subline:
      "A missed call is a buyer ringing another agent about the same listing. Veltan texts them back in your name — in seconds — so you keep the viewing.",
    objection:
      "Your missed-call alert tells you who rang. It does not hold the listing. Every unanswered ring is a buyer calling the next agent on the portal.",
    steps: [
      {
        title: "Call missed",
        body: "You're mid-viewing. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within seconds, a message from you — not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've booked a viewing with another agent.",
      },
    ],
    demoSms: [
      "Hi, sorry we missed your call! This is Akello Realty — tell us which listing you're calling about and we'll ring you right back.",
    ],
    ai: {
      customer: "Is the 3-bedroom in Naalya still available?",
      reply:
        "Let me check — I can also share similar listings nearby if that one's taken. Want me to send a few options while you wait for a callback?",
    },
  },
};

export interface FaqEntry {
  question: string;
  answer: string;
}

export const FOUNDING_PERKS: { title: string; detail?: string }[] = [
  {
    title: `${DISCOUNT_LABEL} for ${DISCOUNT_MONTHS} months`,
    detail: `${PRICE_FOUNDING} / month, then the regular ${PRICE_ORIGINAL}`,
  },
  { title: `${DISCOUNT_MONTHS} months maintenance included` },
  { title: "First access to new updates & features" },
  { title: "Priority maintenance & support" },
  { title: "Free setup call — we set it up with you" },
  { title: "Skip-the-queue onboarding (Founding 12)" },
  { title: "Direct WhatsApp to the founder for 6 months" },
  { title: "First in line for the AI Assistant add-on" },
  { title: "SMS copy written in your business's name" },
  { title: "Cancel anytime · no setup fee" },
  { title: "One pause month in the first year" },
  { title: "Original Twelve status — yours, no extra cost" },
];

export const FAQS: FaqEntry[] = [
  {
    question: "How much does it cost?",
    answer: `Regular price is ${PRICE_ORIGINAL} per month. Founding 12 pay ${PRICE_FOUNDING} per month for the first ${DISCOUNT_MONTHS} months (${DISCOUNT_LABEL}), then ${PRICE_ORIGINAL}. That is not a lifetime lock — six months, then the regular rate.`,
  },
  {
    question: "What do the Founding 12 get?",
    answer: `${DISCOUNT_LABEL} for ${DISCOUNT_MONTHS} months, maintenance included for those six months, first access to new updates, priority support, a free setup call, skip-the-queue onboarding, WhatsApp to the founder for six months, first in line for the AI Assistant add-on, SMS copy in your business's name, cancel anytime with no setup fee, one pause month in year one, and Original Twelve status. We do not promise paid ads, unlimited SMS, or lifetime pricing.`,
  },
  {
    question: `Why only 12 seats if the date is ${LAUNCH_DATE_LABEL}?`,
    answer: `There are ${FOUNDING_SEATS} founding seats. That is the limit that matters. The window cannot run past ${LAUNCH_DATE_LABEL}, 23:59 East Africa Time — but the seats can fill first. When 12 are taken, the founding rate and privileges close.`,
  },
  {
    question: "What happens to my existing phone number?",
    answer:
      "Nothing changes about your number — Veltan works alongside it. You keep using your phone exactly as before.",
  },
  {
    question: "What if I want to cancel or pause?",
    answer:
      "Cancel anytime. No setup fee, no lock-in contract. Founding 12 also get one pause month in the first year if you need to stop billing without losing the seat.",
  },
  {
    question: "How do I pay?",
    answer: `Pay ${PRICE_FOUNDING} by MTN Mobile Money to lock the first month — on a phone, one tap opens the dialer with the USSD filled in; you confirm and enter your PIN. Airtel Money: copy the number and amount, then send in the Airtel Money app. We still ask you to send the booking on WhatsApp so we can match the payment and set you up.`,
  },
  {
    question: "How long does setup take?",
    answer:
      "Most Kampala businesses are live the same day. We set it up with you on a call — including SMS copy in your business's name. No setup fee.",
  },
  {
    question: "Is my customer data private?",
    answer:
      "Yes — call and message data is only used to run your follow-up service, never sold or shared.",
  },
  {
    question: "Does this work if I already use WhatsApp Business?",
    answer:
      "Yes — Veltan handles the missed phone call specifically; it works alongside however you already use WhatsApp.",
  },
  {
    question: "What happens after the 12 seats are gone?",
    answer: `New signups pay the regular ${PRICE_ORIGINAL} per month and do not get Founding 12 privileges. Founding customers keep the ${DISCOUNT_MONTHS}-month ${PRICE_FOUNDING} window they already started, then move to ${PRICE_ORIGINAL} like everyone else.`,
  },
];

export interface Testimonial {
  name: string;
  business: string;
  quote: string;
  industry: string;
}

/**
 * Intentionally empty until there are real customers (spec §12 — never
 * fabricate social proof). Add entries here and the cards render themselves.
 */
export const TESTIMONIALS: Testimonial[] = [];
