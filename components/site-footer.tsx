"use client";

import {
  DISCOUNT_MONTHS,
  FOUNDING_SEATS_CLAIMED,
  FOUNDING_SEATS_TOTAL,
  PRICE_FOUNDING,
  PRICE_ORIGINAL,
  WA_MESSAGES,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter({ industry }: { industry: string }) {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-white/10 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="sr-only">Contact</h2>
            <Wordmark variant="dark" />
            <p className="mt-4 max-w-sm text-[14px] leading-[1.6] text-white/70">
              Missed-call text-back for Kampala businesses.{" "}
              {FOUNDING_SEATS_CLAIMED} of {FOUNDING_SEATS_TOTAL} founding seats
              claimed. {PRICE_FOUNDING} / month for {DISCOUNT_MONTHS} months,
              then {PRICE_ORIGINAL}. Cancel anytime.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <WhatsAppCta
              location="footer"
              message={WA_MESSAGES.footer}
              industry={industry}
              variant="whatsapp"
              size="sm"
            >
              Chat on WhatsApp
            </WhatsAppCta>
            <p className="text-[12px] text-white/55">{WHATSAPP_DISPLAY}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t border-white/10 pt-5 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Veltan · Kampala, Uganda</p>
          <p>Built to answer when you can&apos;t.</p>
        </div>
      </div>
    </footer>
  );
}
