import type { IndustryContent } from "@/lib/content";
import { kicker, mutedBody } from "@/lib/ui";

export function Objection({ content }: { content: IndustryContent }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="max-w-3xl border-l-2 border-hero-cyan/50 py-2 pl-6 sm:pl-8">
        <p className={kicker}>The difference</p>
        <h2 className="mt-3 text-[24px] font-extrabold leading-snug tracking-[-0.02em] sm:text-[30px]">
          Knowing who called isn&apos;t the same as keeping the lead.
        </h2>
        <p className={`${mutedBody} mt-4 max-w-[62ch]`}>{content.objection}</p>
      </div>
    </section>
  );
}
