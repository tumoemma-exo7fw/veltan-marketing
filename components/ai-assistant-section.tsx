import type { IndustryContent } from "@/lib/content";

import { AiDemo } from "@/components/ai-demo";

/**
 * Secondary by design (spec §14): Deep Teal styling, clearly labeled as a
 * "coming soon" add-on so it never competes with the core missed-call demo.
 */
export function AiAssistantSection({ content }: { content: IndustryContent }) {
  return (
    <section className="border-y border-line bg-surface-teal">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-9 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] text-secondary">
            Coming next · Optional
          </p>
          <h2 className="mt-2 text-[24px] font-extrabold leading-snug tracking-[-0.01em] sm:text-[29px]">
            An assistant for the questions that come next
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-muted">
            The upcoming AI Assistant can answer simple questions and take
            details after the text-back. It&apos;s a separate add-on—not part
            of what you pay for at launch.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:justify-self-end">
          <AiDemo content={content} />
        </div>
      </div>
    </section>
  );
}
