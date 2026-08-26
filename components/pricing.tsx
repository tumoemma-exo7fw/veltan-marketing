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

import { BookingWizard } from "@/components/booking-wizard";
import { Countdown } from "@/components/countdown";

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
      className="scroll-mt-16 border-y border-line bg-surface px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-secondary">
          Now onboarding 12 founding businesses in Kampala
        </p>
        <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.01em] sm:text-[29px]">
          Founding 12 pricing
        </h2>
        <p className="mt-2 text-[15px] leading-[1.6] text-muted">
          A 30% rate locked in for as long as you stay. The offer closes on{" "}
          {LAUNCH_DATE_LABEL}.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-lg rounded-card border border-line bg-bg p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
          <span className="text-[12px] font-bold tracking-[0.08em] text-secondary">
            Founding 12
          </span>
          <span className="text-[12px] font-medium text-muted">
            Client Follow-Up System
          </span>
        </div>
        <p className="mt-6 text-[40px] font-extrabold leading-none tracking-[-0.02em] text-accent">
          {PRICE_FOUNDING}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-muted line-through">{PRICE_ORIGINAL}</span>
          <span className="font-bold text-secondary">{DISCOUNT_LABEL}</span>
          <span className="text-muted">per month</span>
        </p>
        <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-left">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5 text-[14.5px]">
              <Check aria-hidden="true" className="size-4 shrink-0 text-secondary" />
              {perk}
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={showBooking}
          aria-controls="booking-flow"
          onClick={startBooking}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-bubble bg-accent px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#b56f18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {showBooking ? "Continue booking" : "Start booking"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
        <Countdown
          label="Offer ends in"
          align="center"
          className="mt-6"
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
