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
      className="mx-auto w-full max-w-3xl px-5 pb-14 sm:px-8 lg:pb-20"
    >
      <h2 className="text-center text-[22px] font-extrabold sm:text-[26px]">
        Questions, answered
      </h2>
      <Accordion
        multiple={false}
        onValueChange={handleValueChange}
        className="mt-8 rounded-card border border-line bg-surface px-5 sm:px-6"
      >
        {FAQS.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="py-4 text-[15px] font-semibold">
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
