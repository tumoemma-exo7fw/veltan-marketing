"use client";

import { useRef } from "react";

import { analytics } from "@/lib/analytics";
import { FAQS } from "@/lib/content";

import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  // Remember which questions were already opened so each one tracks once.
  const opened = useRef<Set<string>>(new Set());

  const handleValueChange = (values: unknown[]) => {
    for (const value of values) {
      const question = String(value);
      if (!opened.current.has(question)) {
        opened.current.add(question);
        analytics.faqOpened(question);
      }
    }
  };

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-3xl scroll-mt-32 px-5 py-20 sm:px-8 lg:scroll-mt-20 lg:py-24"
    >
      <SectionHeading
        title="Common questions"
        subtitle="Price, seats, cancel, and how Mobile Money works — no fine print surprises."
      />
      <Accordion
        multiple={false}
        onValueChange={handleValueChange}
        className="mt-10 border-t border-white/10"
      >
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.question}
            value={faq.question}
            className="border-b border-white/10"
          >
            <AccordionTrigger className="rounded-none py-5 text-[15px] font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[14.5px] leading-[1.65] text-white/70">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
