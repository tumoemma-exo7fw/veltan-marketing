import type { IndustryContent } from "@/lib/content";

import { AiDemo } from "@/components/ai-demo";
import { SectionHeading } from "@/components/section-heading";

/**
 * Secondary by design (spec §14): clearly labeled as a "coming soon" add-on
 * so it never competes with the core missed-call demo.
 */
export function AiAssistantSection({ content }: { content: IndustryContent }) {
  return (
    <section className="border-y border-white/10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <SectionHeading
          kicker="Coming next · Optional"
          title="An assistant for the questions that come next"
          subtitle="The upcoming AI Assistant can answer simple questions and take details after the text-back. It's a separate add-on—not part of what you pay for at launch."
        />
        <div className="mx-auto w-full max-w-sm lg:justify-self-end">
          <AiDemo content={content} />
        </div>
      </div>
    </section>
  );
}
