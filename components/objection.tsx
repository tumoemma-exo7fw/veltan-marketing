import type { IndustryContent } from "@/lib/content";

export function Objection({ content }: { content: IndustryContent }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pt-14 sm:px-8 lg:pt-20">
      <div className="rounded-card border border-line border-l-4 border-l-secondary bg-surface p-6 sm:p-8">
        <h2 className="text-[19px] font-extrabold leading-snug sm:text-[22px]">
          &ldquo;Doesn&apos;t my missed-call alert already do this?&rdquo;
        </h2>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">
          {content.objection}
        </p>
      </div>
    </section>
  );
}
