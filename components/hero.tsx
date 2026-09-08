"use client";

import { ArrowRight } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryContent, IndustryId } from "@/lib/content";

import { Countdown } from "@/components/countdown";
import { IndustryPills } from "@/components/industry-pills";
import { MissedCallDemo } from "@/components/missed-call-demo";

interface HeroProps {
  industry: IndustryId;
  content: IndustryContent;
  onIndustryChange: (id: IndustryId) => void;
}

export function Hero({ industry, content, onIndustryChange }: HeroProps) {
  return (
    <section
      id="features"
      className="scroll-mt-32 border-t border-line bg-bg lg:scroll-mt-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pt-14 lg:grid-cols-[11fr_9fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-16">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] text-secondary">
            Features
          </p>
          <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.01em] sm:text-[29px]">
            See it catch the missed call
          </h2>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.55] text-muted">
            Same product, your industry&apos;s words. Switch Dental, Trades, or
            Real Estate and watch the recorded missed-call demo.
          </p>
          <div className="mt-6">
            <IndustryPills value={industry} onChange={onIndustryChange} />
          </div>
          <p className="mt-7 text-[12px] font-semibold tracking-[0.08em] text-secondary">
            {content.kicker}
          </p>
          <p className="mt-3 text-[28px] font-extrabold leading-[1.1] tracking-[-0.015em] sm:text-[34px]">
            {content.headline}
          </p>
          <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.55] text-muted lg:text-[17px]">
            {content.subline}
          </p>
          <div className="mt-7 flex flex-col items-start gap-3">
            <a
              href="#pricing"
              onClick={() => analytics.ctaClicked("hero", industry)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bubble bg-accent px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#b56f18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Reserve a founding spot
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <p className="text-[13px] text-muted">
              30% founding rate · No setup fee · Cancel anytime
            </p>
          </div>
          <Countdown className="mt-7" />
        </div>
        <MissedCallDemo content={content} />
      </div>
    </section>
  );
}
