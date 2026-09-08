"use client";

import { useRef } from "react";

import { analytics } from "@/lib/analytics";
import { FAQS } from "@/lib/content";

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
      className="mx-auto w-full max-w-3xl scroll-mt-32 px-5 py-14 sm:px-8 lg:scroll-mt-20 lg:py-20"
    >
      <h2 className="text-[24px] font-extrabold tracking-[-0.01em] sm:text-[29px]">
        Common questions
      </h2>
      <p className="mt-2 text-[15px] leading-[1.6] text-muted">
        The practical details before you decide.
      </p>
      <Accordion
        multiple={false}
        onValueChange={handleValueChange}
        className="mt-7 border-t border-line"
      >
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.question}
            value={faq.question}
            className="border-b border-line"
          >
            <AccordionTrigger className="rounded-none py-4 text-[15px] font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[14.5px] leading-[1.6] text-muted">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
