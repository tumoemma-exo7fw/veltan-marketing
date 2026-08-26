"use client";

import Link from "next/link";

import { WA_MESSAGES } from "@/lib/site";

import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader({ industry }: { industry: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          href="/"
          aria-label="Veltan home"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <Wordmark />
        </Link>
        <WhatsAppCta
          location="header"
          message={WA_MESSAGES.header}
          industry={industry}
          size="sm"
          variant="whatsapp"
        >
          WhatsApp us
        </WhatsAppCta>
      </div>
    </header>
  );
}
