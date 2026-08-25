"use client";

import type { IndustryContent, IndustryId } from "@/lib/content";
import { WA_MESSAGES } from "@/lib/site";

import { Countdown } from "@/components/countdown";
import { IndustryPills } from "@/components/industry-pills";
import { MissedCallDemo } from "@/components/missed-call-demo";
import { WhatsAppCta } from "@/components/whatsapp-cta";

interface HeroProps {
  industry: IndustryId;
  content: IndustryContent;
  onIndustryChange: (id: IndustryId) => void;
}

export function Hero({ industry, content, onIndustryChange }: HeroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[11fr_9fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
        <div>
          <IndustryPills value={industry} onChange={onIndustryChange} />
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
            {content.kicker}
          </p>
          <h1 className="mt-3 text-[34px] font-extrabold leading-[1.1] tracking-[-0.015em] sm:text-[40px] lg:text-[46px]">
            {content.headline}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.55] text-muted lg:text-[17px]">
            {content.subline}
          </p>
          <div className="mt-7">
            <WhatsAppCta
              location="hero"
              message={WA_MESSAGES.hero}
              industry={industry}
            >
              Message Veltan on WhatsApp
            </WhatsAppCta>
            <p className="mt-3 text-[13px] text-muted">
              No forms, no demo bookings — it&apos;s just a WhatsApp chat with
              us.
            </p>
          </div>
          <Countdown className="mt-8" />
        </div>
        <MissedCallDemo content={content} />
      </div>
    </section>
  );
}
