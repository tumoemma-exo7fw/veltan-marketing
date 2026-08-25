"use client";

import { Check } from "lucide-react";

import {
  DISCOUNT_LABEL,
  LAUNCH_DATE_LABEL,
  MOMO_ACCOUNT_NAME,
  MOMO_NUMBER_DISPLAY,
  PRICE_FOUNDING,
  PRICE_ORIGINAL,
  WA_MESSAGES,
} from "@/lib/site";

import { Countdown } from "@/components/countdown";
import { WhatsAppCta } from "@/components/whatsapp-cta";

const PERKS = [
  "No setup fee",
  "Cancel anytime — no lock-in",
  "We set it up with you over a call",
];

export function Pricing({ industry }: { industry: string }) {
  return (
    <section
      id="pricing"
      className="border-t border-line bg-surface-2/40 px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-[22px] font-extrabold sm:text-[26px]">
          Founding 12 pricing
        </h2>
        <p className="mt-2 text-[15px] leading-[1.55] text-muted">
          Twelve founding spots at 30% off, locked in for as long as you stay.
          The offer closes at launch on {LAUNCH_DATE_LABEL}.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-md rounded-card border border-line bg-surface p-6 shadow-[0_30px_60px_-40px_rgb(18_41_43/0.35)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-accent">
            Founding 12 · ends Sept 1
          </span>
          <span className="text-xs font-semibold text-muted">
            Client Follow-Up System
          </span>
        </div>
        <p className="mt-6 text-[38px] font-extrabold leading-none text-accent">
          {PRICE_FOUNDING}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="text-muted line-through">{PRICE_ORIGINAL}</span>
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-bold text-secondary">
            {DISCOUNT_LABEL}
          </span>
          <span className="text-muted">per month</span>
        </p>
        <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-left">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5 text-[14.5px]">
              <Check aria-hidden="true" className="size-4 shrink-0 text-secondary" />
              {perk}
            </li>
          ))}
        </ul>
        <WhatsAppCta
          location="pricing"
          message={WA_MESSAGES.pricing}
          industry={industry}
          className="mt-6 w-full"
        >
          Claim your founding spot
        </WhatsAppCta>
        <Countdown
          label="Offer ends in"
          align="center"
          className="mt-6 border-t border-line pt-5"
        />
      </div>

      {/* Pay-upfront option: lock a founding seat by Mobile Money. */}
      <div className="mx-auto mt-4 max-w-md rounded-card border border-line bg-surface p-6 text-left sm:p-8">
        <h3 className="text-[16px] font-bold">
          Want to lock your spot right now?
        </h3>
        <p className="mt-1.5 text-[14px] leading-[1.55] text-muted">
          You can book one of the 12 seats upfront by Mobile Money — or chat
          with us first and pay after setup. Both hold a founding spot.
        </p>
        <ol className="mt-5 space-y-3 text-[14.5px]">
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[12px] font-extrabold text-secondary"
            >
              1
            </span>
            <span>
              Send <strong>{PRICE_FOUNDING}</strong> (your first month at the
              founding rate) by Mobile Money to{" "}
              <strong className="whitespace-nowrap">
                {MOMO_NUMBER_DISPLAY}
              </strong>
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[12px] font-extrabold text-secondary"
            >
              2
            </span>
            <span>
              Before you confirm, check the registered name shows{" "}
              <strong>{MOMO_ACCOUNT_NAME}</strong>
            </span>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[12px] font-extrabold text-secondary"
            >
              3
            </span>
            <span>
              Forward your confirmation message on WhatsApp — your seat is
              locked and we set you up the same day
            </span>
          </li>
        </ol>
        <WhatsAppCta
          location="momo"
          message={WA_MESSAGES.momo}
          industry={industry}
          size="sm"
          className="mt-5 w-full"
        >
          I&apos;ve paid — lock my spot
        </WhatsAppCta>
      </div>
    </section>
  );
}
