"use client";

import { useState } from "react";

import { analytics } from "@/lib/analytics";
import { INDUSTRIES, type IndustryId } from "@/lib/content";

import { AiAssistantSection } from "@/components/ai-assistant-section";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { HomeHero } from "@/components/home-hero";
import { HowItWorks } from "@/components/how-it-works";
import { Objection } from "@/components/objection";
import { Pricing } from "@/components/pricing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppHelpProvider } from "@/components/whatsapp-help";

export default function Home() {
  const [industry, setIndustry] = useState<IndustryId>("dental");
  const content = INDUSTRIES[industry];

  const handleIndustryChange = (id: IndustryId) => {
    setIndustry(id);
    analytics.industrySelected(id);
  };

  return (
    <WhatsAppHelpProvider>
      <SiteHeader industry={industry} />
      <main className="flex-1 overflow-x-clip">
        <HomeHero industry={industry} />
        <Hero
          industry={industry}
          content={content}
          onIndustryChange={handleIndustryChange}
        />
        <Objection content={content} />
        <HowItWorks content={content} />
        <AiAssistantSection content={content} />
        <Pricing industry={industry} />
        <FaqSection />
      </main>
      <SiteFooter industry={industry} />
    </WhatsAppHelpProvider>
  );
}
