import type { IndustryContent } from "@/lib/content";

import { AiDemo } from "@/components/ai-demo";

/**
 * Secondary by design (spec §14): Deep Teal styling, clearly labeled as a
 * "coming soon" add-on so it never competes with the core missed-call demo.
 */
export function AiAssistantSection({ content }: { content: IndustryContent }) {
  return (
    <section className="border-y border-line bg-surface-teal">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <span className="inline-flex items-center rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Coming soon · Optional add-on
          </span>
          <h2 className="mt-5 text-[22px] font-extrabold leading-snug sm:text-[26px]">
            Next up: an assistant that holds the conversation until you&apos;re
            free
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.6] text-muted">
            After the text-back goes out, the upcoming Veltan AI Assistant can
            answer simple questions and take details while you finish the job
            in front of you. It&apos;s a separate, optional add-on — the
            missed-call text-back above is what you&apos;re getting at launch.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:justify-self-end">
          <p className="mb-2.5 text-center text-xs font-semibold text-secondary">
            Coming soon — AI Assistant (optional add-on)
          </p>
          <AiDemo content={content} />
        </div>
      </div>
    </section>
  );
}
