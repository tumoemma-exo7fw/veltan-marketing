import { TESTIMONIALS } from "@/lib/content";
import {
  FOUNDING_SEATS_CLAIMED,
  FOUNDING_SEATS_TOTAL,
} from "@/lib/site";
import { glassPanel } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { SectionHeading } from "@/components/section-heading";

/**
 * Honest empty state until there are real customers (spec §12). Add entries
 * to TESTIMONIALS in lib/content.ts and the three-card grid takes over.
 */
export function SocialProof() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 lg:py-24">
      <SectionHeading
        align="center"
        title="Trusted by Kampala businesses"
      />
      {TESTIMONIALS.length === 0 ? (
        <div className={cn(glassPanel, "mx-auto mt-8 max-w-xl px-6 py-8")}>
          <p className="text-[15px] font-semibold">
            {FOUNDING_SEATS_CLAIMED} of {FOUNDING_SEATS_TOTAL} founding seats
            taken.
          </p>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/70">
            The first {FOUNDING_SEATS_CLAIMED} are already in. Real customer
            stories will appear here as they go live.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 text-left lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={cn(glassPanel, "p-6")}>
              <blockquote className="text-[14.5px] leading-[1.6]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px]">
                <span className="font-bold">{t.name}</span>
                <span className="text-white/55"> · {t.business}</span>
                <span className="mt-2 block">
                  <span className="rounded-full bg-hero-cyan/15 px-2.5 py-0.5 text-[11px] font-semibold text-hero-cyan">
                    {t.industry}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
