"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import {
  DISCOUNT_LABEL,
  LAUNCH_DATE_LABEL,
  PRICE_FOUNDING,
  PRICE_ORIGINAL,
} from "@/lib/site";
import { amberCta, glassPanel } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { BookingWizard } from "@/components/booking-wizard";
import { Countdown } from "@/components/countdown";
import { SectionHeading } from "@/components/section-heading";

const PERKS = [
  "No setup fee",
  "Cancel anytime — no lock-in",
  "We set it up with you over a call",
];

export function Pricing({ industry }: { industry: IndustryId }) {
  const [showBooking, setShowBooking] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  const startBooking = () => {
    setShowBooking(true);
    analytics.ctaClicked("pricing", industry);
    requestAnimationFrame(() => {
      requestAnimationFrame(() =>
        bookingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      );
    });
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-32 px-5 py-20 sm:px-8 lg:scroll-mt-20 lg:py-24"
    >
      <SectionHeading
        align="center"
        kicker="Now onboarding 12 founding businesses in Kampala"
        kickerClassName="tracking-[0.16em]"
        title="Founding 12 pricing"
        subtitle={`A 30% rate locked in for as long as you stay. The offer closes on ${LAUNCH_DATE_LABEL}.`}
      />
      <div className={cn(glassPanel, "mx-auto mt-10 max-w-lg p-6 sm:p-8")}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-hero-cyan">
            Founding 12
          </span>
          <span className="text-[12px] font-medium text-white/55">
            Client Follow-Up System
          </span>
        </div>
        <p className="mt-6 text-[40px] font-extrabold leading-none tracking-[-0.02em] text-accent">
          {PRICE_FOUNDING}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-white/45 line-through">{PRICE_ORIGINAL}</span>
          <span className="font-bold text-hero-cyan">{DISCOUNT_LABEL}</span>
          <span className="text-white/55">per month</span>
        </p>
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-left">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5 text-[14.5px]">
              <Check aria-hidden="true" className="size-4 shrink-0 text-hero-cyan" />
              {perk}
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={showBooking}
          aria-controls="booking-flow"
          onClick={startBooking}
          className={cn(amberCta, "mt-7 w-full")}
        >
          {showBooking ? "Continue booking" : "Start booking"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
        <Countdown
          label="Offer ends in"
          align="center"
          className="mt-7"
        />
      </div>

      {showBooking && (
        <div
          id="booking-flow"
          ref={bookingRef}
          className="scroll-mt-20 animate-fade-in"
        >
          <BookingWizard industry={industry} />
        </div>
      )}
    </section>
  );
}
