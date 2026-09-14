"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { analytics } from "@/lib/analytics";
import { FOUNDING_PERKS, type IndustryId } from "@/lib/content";
import {
  DISCOUNT_LABEL,
  DISCOUNT_MONTHS,
  FOUNDING_SEATS_CLAIMED,
  FOUNDING_SEATS_CLAIMED_PERCENT,
  FOUNDING_SEATS_REMAINING,
  FOUNDING_SEATS_TOTAL,
  LAUNCH_DATE_SHORT,
  PRICE_FOUNDING,
  PRICE_ORIGINAL,
} from "@/lib/site";
import { amberCta, glassPanel } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { BookingWizard } from "@/components/booking-wizard";
import { Countdown } from "@/components/countdown";
import { SectionHeading } from "@/components/section-heading";

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
      className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-24"
    >
      <SectionHeading
        align="center"
        kicker={`${FOUNDING_SEATS_CLAIMED} of ${FOUNDING_SEATS_TOTAL} claimed · Kampala`}
        kickerClassName="tracking-[0.16em]"
        title="Founding 12"
        subtitle={`The first ${FOUNDING_SEATS_CLAIMED} are already in. ${FOUNDING_SEATS_REMAINING} remain — founding pricing stops when ${FOUNDING_SEATS_TOTAL} are full, or on ${LAUNCH_DATE_SHORT}.`}
      />
      <div className={cn(glassPanel, "mx-auto mt-10 max-w-lg overflow-x-clip p-6 sm:p-8")}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-hero-cyan">
            {FOUNDING_SEATS_CLAIMED} of {FOUNDING_SEATS_TOTAL} claimed
          </span>
          <span className="text-[12px] font-medium text-white/55">
            Client Follow-Up System
          </span>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[12.5px]">
            <span className="font-medium text-white/80">
              {FOUNDING_SEATS_CLAIMED} claimed
            </span>
            <span className="font-medium text-hero-cyan">
              {FOUNDING_SEATS_REMAINING} left
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#071c1e]"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={FOUNDING_SEATS_TOTAL}
              aria-valuenow={FOUNDING_SEATS_CLAIMED}
              aria-label={`${FOUNDING_SEATS_CLAIMED} of ${FOUNDING_SEATS_TOTAL} founding seats claimed`}
            >
              <div
                className="h-full rounded-full bg-hero-cyan"
                style={{ width: `${FOUNDING_SEATS_CLAIMED_PERCENT}%` }}
              />
            </div>
            <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums text-hero-cyan">
              {FOUNDING_SEATS_CLAIMED}/{FOUNDING_SEATS_TOTAL}
            </span>
          </div>
        </div>
        <p className="mt-6 text-[40px] font-extrabold leading-none tracking-[-0.02em] text-accent">
          {PRICE_FOUNDING}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-white/45 line-through">{PRICE_ORIGINAL}</span>
          <span className="font-bold text-hero-cyan">
            {DISCOUNT_LABEL} · {DISCOUNT_MONTHS} months
          </span>
          <span className="text-white/55">per month</span>
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.55] text-white/70">
          Then {PRICE_ORIGINAL} / month. Six months only — not a lifetime lock.
          Pay {PRICE_FOUNDING} to lock the first month.
        </p>
        <button
          type="button"
          aria-expanded={showBooking}
          aria-controls="booking-flow"
          onClick={startBooking}
          className={cn(amberCta, "mt-6 w-full")}
        >
          {showBooking ? "Continue booking" : "Reserve a founding seat"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
        <p className="mt-3 text-center text-[13px] text-white/60">
          Pay {PRICE_FOUNDING} to lock it · cancel anytime · we set it up
        </p>
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-left">
          {FOUNDING_PERKS.map((perk) => (
            <li key={perk.title} className="flex items-start gap-2.5 text-[14.5px]">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-hero-cyan"
              />
              <span>
                {perk.title}
                {perk.detail ? (
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-white/55">
                    {perk.detail}
                  </span>
                ) : null}
              </span>
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
          {showBooking ? "Continue booking" : `Pay ${PRICE_FOUNDING} to lock it`}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
        <Countdown
          label={`${FOUNDING_SEATS_REMAINING} remaining`}
          align="center"
          className="mt-7"
        />
        <p className="mt-3 text-center text-[12px] leading-snug text-white/45">
          The window cannot run past the date on the clock. Once{" "}
          {FOUNDING_SEATS_TOTAL} are full, founding pricing stops.
        </p>
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
