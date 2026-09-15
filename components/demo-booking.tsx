"use client";

import { CalPrefetch } from "@/components/cal-prefetch";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { FOUNDING_SEATS_REMAINING, WA_MESSAGES } from "@/lib/site";
import { glassPanel, mutedBody } from "@/lib/ui";
import { cn } from "@/lib/utils";

/**
 * Walkthrough path under the founding-seat offer. Prefetch is internal —
 * visitors only see Book now, then the calendar.
 */
export function DemoBooking({ industry }: { industry: string }) {
  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="scroll-mt-20 mx-auto mt-10 min-w-0 max-w-3xl"
    >
      <div className={cn(glassPanel, "min-w-0 overflow-x-clip p-6 sm:p-8")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-hero-cyan">
          Free walkthrough
        </p>
        <h2
          id="demo-heading"
          className="mt-3 text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[34px]"
        >
          See it first
        </h2>
        <p className={cn(mutedBody, "mt-3 max-w-[52ch]")}>
          Not ready to lock a seat? Pick a time and we&apos;ll walk you through
          it. Free — and it doesn&apos;t hold a seat. {FOUNDING_SEATS_REMAINING}{" "}
          founding seats left if you decide to join.
        </p>

        <div className="mt-6 min-w-0">
          <CalPrefetch industry={industry} />
        </div>

        <p className="mt-4 text-[13.5px] leading-[1.55] text-white/70">
          You&apos;ll get a confirmation by email, with a calendar invite.
        </p>

        <div className="mt-5 flex flex-col items-start gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-snug text-white/60">
            Prefer to chat instead?
          </p>
          <WhatsAppCta
            location="demo"
            message={WA_MESSAGES.demo}
            industry={industry}
            variant="whatsapp"
            size="sm"
          >
            WhatsApp
          </WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
