"use client";

import { Phone, PhoneMissed, PhoneOff, Zap } from "lucide-react";

import type { IndustryContent } from "@/lib/content";
import { useDemoClock } from "@/lib/use-demo-clock";

import { DemoFrame } from "@/components/demo-frame";

// Timing from the spec (§5): ringing 0–3.4s, MISSED CALL tag 3.4–4.2s,
// SMS bubble 4.2–8s, then loop (rotating scenarios where available).
const DURATION = 8000;
const MISSED_AT = 3400;
const SMS_AT = 4200;
// Reduced-motion freeze frame: SMS bubble visible.
const FROZEN_AT = 7000;

export function MissedCallDemo({ content }: { content: IndustryContent }) {
  const { elapsed, loop } = useDemoClock(DURATION, FROZEN_AT);
  const phase =
    elapsed < MISSED_AT ? "ringing" : elapsed < SMS_AT ? "missed" : "sms";
  const sms = content.demoSms[loop % content.demoSms.length];

  return (
    <DemoFrame
      elapsed={elapsed}
      duration={DURATION}
      ariaLabel="Recorded demo: a phone call is missed, and within seconds Veltan automatically texts the caller back in the business's name."
      className="mx-auto w-full max-w-[350px]"
    >
      <div className="px-3 py-6 sm:px-8 sm:py-7">
        <div className="mx-auto w-full max-w-[240px] rounded-[2.4rem] border border-white/12 bg-[#102628] p-[6px] sm:max-w-[260px]">
          <div className="relative h-[min(430px,70svh)] min-h-[360px] overflow-hidden rounded-[2rem] bg-[#0a1f21]">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#071416]" />

            {phase !== "sms" ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 px-6 pb-12">
                <div className="relative">
                  {phase === "ringing" && (
                    <>
                      <span className="absolute inset-0 animate-ring-ping rounded-full bg-secondary/15" />
                      <span className="absolute inset-0 animate-ring-ping rounded-full bg-secondary/15 [animation-delay:0.55s]" />
                    </>
                  )}
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-hero-cyan/15 text-hero-cyan">
                    {phase === "ringing" ? (
                      <Phone className="size-7" />
                    ) : (
                      <PhoneMissed className="size-7" />
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold tabular-nums tracking-wide">
                    +256 7•• ••• •47
                  </p>
                  {phase === "ringing" ? (
                    <p className="mt-1 text-[13px] text-muted">
                      Incoming call…
                    </p>
                  ) : (
                    <span className="mt-2 inline-flex animate-fade-in rounded-full bg-accent/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-accent">
                      Missed call
                    </span>
                  )}
                </div>
                {phase === "ringing" && (
                  <div className="mt-4 flex items-center gap-14">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#e3948b] text-white">
                      <PhoneOff className="size-5" />
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#8ab795] text-white">
                      <Phone className="size-5" />
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col px-4 pb-6 pt-12">
                <div className="mx-auto flex animate-fade-in items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-[11px] font-medium text-muted">
                  <PhoneMissed className="size-3" />
                  Missed call · just now
                </div>
                <div className="mt-auto flex flex-col items-end gap-2">
                  <div className="max-w-[88%] animate-rise-in rounded-bubble rounded-br-[4px] bg-[#123438] px-3.5 py-2.5 text-left text-[13px] leading-snug text-text">
                    {sms}
                  </div>
                  <p className="flex animate-fade-in items-center gap-1 text-right text-[10.5px] font-medium text-muted [animation-delay:0.45s]">
                    <Zap className="size-3 text-accent" />
                    Sent automatically · 8 seconds after the missed call
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
