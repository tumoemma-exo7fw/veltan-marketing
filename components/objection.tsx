import type { IndustryContent } from "@/lib/content";

export function Objection({ content }: { content: IndustryContent }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="max-w-3xl border-y border-line py-8 sm:py-10">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-secondary">
          The difference
        </p>
        <h2 className="mt-2 text-[21px] font-extrabold leading-snug sm:text-[25px]">
          Knowing who called isn&apos;t the same as keeping the lead.
        </h2>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-muted sm:text-[16px]">
          {content.objection}
        </p>
      </div>
    </section>
  );
}
