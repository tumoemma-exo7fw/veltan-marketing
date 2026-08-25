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
      "You're busy doing the actual work. Veltan texts your patient back the moment you can't answer — so they don't book with the clinic down the road.",
    objection:
      "Your missed-call log tells you who called. Veltan tells your patient you saw it and you'll fit them in — while they're still deciding which clinic to call next.",
    steps: [
      {
        title: "Call missed",
        body: "You're mid-appointment. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within 10 seconds, a message from your clinic, not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've called another clinic.",
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
      "You're busy doing the actual work. Veltan texts your customer back the moment you can't answer — so they don't call the next guy on the list.",
    objection:
      "Your missed-call alert tells you who called. Veltan tells your customer you saw it and you're coming — while they're still deciding who to call next.",
    steps: [
      {
        title: "Call missed",
        body: "You're on a job. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within 10 seconds, a message from your business, not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've dialed anyone else.",
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
    headline: "Miss the call. Not the client.",
    subline:
      "You're busy showing another property. Veltan texts your caller back the moment you can't answer — so they don't call another agent.",
    objection:
      "Your missed-call alert tells you who called. Veltan tells your caller you saw it and you'll follow up — while they're still deciding which agent to call next.",
    steps: [
      {
        title: "Call missed",
        body: "You're mid-viewing. It rings out, same as always.",
      },
      {
        title: "They get a text, in your name",
        body: "Within 10 seconds, a message from you directly, not a generic bot line.",
      },
      {
        title: "You call back first",
        body: "Before they've called another agent.",
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

export const FAQS: FaqEntry[] = [
  {
    question: "What happens to my existing phone number?",
    answer:
      "Nothing changes about your number — Veltan works alongside it. You keep using your phone exactly as before.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime, no lock-in contract.",
  },
  {
    question: "Is my customer data private?",
    answer:
      "Yes — call and message data is only used to run your follow-up service, never sold or shared.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are live the same day, set up together over a WhatsApp or phone call.",
  },
  {
    question: "Does this work if I already use WhatsApp Business?",
    answer:
      "Yes — Veltan handles the missed phone call specifically; it works alongside however you already use WhatsApp.",
  },
  {
    question: "What happens after the Founding 12 spots are gone?",
    answer:
      "Standard pricing applies for new signups after the offer window closes; founding customers keep their locked-in rate.",
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
