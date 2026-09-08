"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { analytics } from "@/lib/analytics";
import { WA_MESSAGES } from "@/lib/site";
import { amberCta } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { SectionNav, useSectionHash } from "@/components/section-nav";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader({ industry }: { industry: string }) {
  const hash = useSectionHash();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071c1e]/72 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3">
          <Link
            href="/#home"
            aria-label="Veltan home"
            className="min-w-0 rounded-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <Wordmark variant="dark" preload compact />
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-4 lg:gap-5">
            <SectionNav
              label="Primary"
              hash={hash}
              className="hidden items-center gap-1 lg:flex"
            />

            <div className="flex items-center justify-end gap-2">
              <WhatsAppCta
                location="header"
                message={WA_MESSAGES.header}
                industry={industry}
                size="icon"
                variant="whatsapp"
              >
                WhatsApp
              </WhatsAppCta>
              <a
                href="#pricing"
                onClick={() => analytics.ctaClicked("header", industry)}
                className={cn(
                  amberCta,
                  "min-h-11 gap-1 whitespace-nowrap px-3 py-2 text-[13px] sm:min-h-12 sm:gap-1.5 sm:px-4 sm:text-[13.5px]",
                )}
              >
                Get Started
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <SectionNav
          label="Page sections"
          hash={hash}
          className="-mx-2 flex gap-1 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [-ms-overflow-style:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        />
      </div>
    </header>
  );
}
