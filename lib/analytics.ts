import { track } from "@vercel/analytics";

import type { CtaLocation } from "@/lib/site";

export const analytics = {
  industrySelected(industry: string) {
    track("industry_selected", { industry });
  },
  ctaClicked(location: CtaLocation, industry: string) {
    track("cta_click", { location, industry });
  },
  bookingStarted(industry: string) {
    track("booking_started", { industry });
  },
  stripeOpened(industry: string) {
    track("stripe_click", { industry });
  },
  faqOpened(question: string) {
    track("faq_open", { question });
  },
  authSignedIn() {
    track("auth_signed_in");
  },
  authSignedUp() {
    track("auth_signed_up");
  },
  onboardingCompleted() {
    track("onboarding_completed");
  },
  guestPreviewed() {
    track("guest_preview");
  },
};
