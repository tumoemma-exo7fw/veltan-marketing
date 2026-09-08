import type { IndustryContent } from "@/lib/content";

import { SectionHeading } from "@/components/section-heading";

export function HowItWorks({ content }: { content: IndustryContent }) {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8 lg:scroll-mt-20 lg:py-24"
    >
      <SectionHeading
        title="How it works"
        subtitle="Same phone, same number. Veltan just catches what you can't."
      />
      <ol className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-3 lg:gap-12">
        {content.steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 lg:block">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hero-cyan/40 bg-hero-cyan/10 font-mono text-[12px] font-semibold tabular-nums text-hero-cyan lg:mb-5"
            >
              0{i + 1}
            </span>
            <div>
              <h3 className="text-[16px] font-bold">{step.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-white/70">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
