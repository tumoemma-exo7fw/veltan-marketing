"use client";

import { WA_MESSAGES, WHATSAPP_DISPLAY } from "@/lib/site";

import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter({ industry }: { industry: string }) {
  return (
    <footer className="bg-text text-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8">
        <Wordmark variant="dark" className="w-24" />
        <p className="max-w-md text-[14.5px] leading-[1.6] text-bg/70">
          Don&apos;t lose the client because you were busy doing the actual
          work. Veltan follows up the moment you can&apos;t.
        </p>
        <WhatsAppCta
          location="footer"
          message={WA_MESSAGES.footer}
          industry={industry}
        >
          Message Veltan on WhatsApp
        </WhatsAppCta>
        <p className="text-[12.5px] text-bg/60">
          Prefer to save the number first? {WHATSAPP_DISPLAY}
        </p>
        <p className="mt-4 w-full border-t border-white/10 pt-6 text-xs text-bg/50">
          © 2026 Veltan · Kampala, Uganda · Built to answer when you can&apos;t.
        </p>
      </div>
    </footer>
  );
}
