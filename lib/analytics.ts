import { track } from "@vercel/analytics";

import type { CtaLocation } from "@/lib/site";

export const analytics = {
  industrySelected(industry: string) {
    track("industry_selected", { industry });
  },
  ctaClicked(location: CtaLocation, industry: string) {
    track("cta_click", { location, industry });
  },
  faqOpened(question: string) {
    track("faq_open", { question });
  },
};
