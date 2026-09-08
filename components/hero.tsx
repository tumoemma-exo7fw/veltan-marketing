"use client";

import { ArrowRight } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryContent, IndustryId } from "@/lib/content";
import { FOUNDING_SEATS, PRICE_FOUNDING } from "@/lib/site";
import { amberCta, kicker, mutedBody } from "@/lib/ui";

import { Countdown } from "@/components/countdown";
import { IndustryPills } from "@/components/industry-pills";
import { MissedCallDemo } from "@/components/missed-call-demo";
import { SectionHeading } from "@/components/section-heading";

interface HeroProps {
  industry: IndustryId;
  content: IndustryContent;
  onIndustryChange: (id: IndustryId) => void;
}

export function Hero({ industry, content, onIndustryChange }: HeroProps) {
  return (
    <section
      id="features"
      className="scroll-mt-32 border-t border-white/10 bg-bg lg:scroll-mt-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[11fr_9fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <SectionHeading
            kicker="Features"
            title="See it catch the missed call"
            subtitle="Same product, your industry's words. Switch Dental, Trades, or Real Estate — a missed call is a lost patient, job, or listing."
          />
          <div className="mt-7">
            <IndustryPills value={industry} onChange={onIndustryChange} />
          </div>
          <p className={`${kicker} mt-10`}>{content.kicker}</p>
          <p className="mt-3 text-[26px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[32px]">
            {content.headline}
          </p>
          <p className={`${mutedBody} mt-4 max-w-[52ch]`}>{content.subline}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a
              href="#pricing"
              onClick={() => analytics.ctaClicked("hero", industry)}
              className={amberCta}
            >
              Reserve a founding seat
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <p className="text-[13px] text-white/55">
              Pay {PRICE_FOUNDING} to lock it · {FOUNDING_SEATS} seats · cancel
              anytime
            </p>
          </div>
          <Countdown className="mt-8" />
        </div>
        <MissedCallDemo content={content} />
      </div>
    </section>
  );
}
