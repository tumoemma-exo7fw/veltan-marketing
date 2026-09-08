"use client";

import { Sparkles } from "lucide-react";

import type { IndustryContent } from "@/lib/content";
import { useDemoClock } from "@/lib/use-demo-clock";

import { DemoFrame } from "@/components/demo-frame";

// Same 8s "recording" rhythm as the hero demo, smaller and secondary.
const DURATION = 8000;
const CUSTOMER_AT = 500;
const TYPING_FROM = 1400;
const REPLY_AT = 3000;
// Reduced-motion freeze frame: AI reply visible.
const FROZEN_AT = 7000;

export function AiDemo({ content }: { content: IndustryContent }) {
  const { elapsed } = useDemoClock(DURATION, FROZEN_AT);
  const showCustomer = elapsed >= CUSTOMER_AT;
  const showTyping = elapsed >= TYPING_FROM && elapsed < REPLY_AT;
  const showReply = elapsed >= REPLY_AT;

  return (
    <DemoFrame
      elapsed={elapsed}
      duration={DURATION}
      ariaLabel="Recorded demo of the upcoming AI Assistant: a customer asks a question and the assistant replies instantly with a helpful answer."
      className="w-full max-w-sm"
    >
      <div className="flex min-h-[240px] flex-col p-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2.5 text-[11px] font-semibold text-white/60">
          <span className="flex size-5 items-center justify-center rounded-full bg-hero-cyan/15 text-hero-cyan">
            <Sparkles className="size-3" />
          </span>
          Veltan AI Assistant · preview
        </div>
        <div className="mt-auto flex flex-col gap-2.5 pt-4">
          {showCustomer && (
            <div className="max-w-[85%] animate-rise-in self-start rounded-bubble rounded-bl-[4px] bg-surface-2 px-3.5 py-2.5 text-[13px] leading-snug text-text">
              {content.ai.customer}
            </div>
          )}
          {showTyping && (
            <div className="animate-fade-in self-end rounded-bubble rounded-br-[4px] bg-hero-cyan/10 px-3.5 py-3">
              <span className="flex gap-1">
                <span className="size-1.5 animate-typing-dot rounded-full bg-hero-cyan" />
                <span className="size-1.5 animate-typing-dot rounded-full bg-hero-cyan [animation-delay:0.15s]" />
                <span className="size-1.5 animate-typing-dot rounded-full bg-hero-cyan [animation-delay:0.3s]" />
              </span>
            </div>
          )}
          {showReply && (
            <div className="max-w-[85%] animate-rise-in self-end rounded-bubble rounded-br-[4px] bg-hero-cyan px-3.5 py-2.5 text-[13px] leading-snug text-[#071c1e]">
              {content.ai.reply}
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
