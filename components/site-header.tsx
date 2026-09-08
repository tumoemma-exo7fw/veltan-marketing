"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { analytics } from "@/lib/analytics";
import { WA_MESSAGES } from "@/lib/site";

import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Wordmark } from "@/components/wordmark";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

function NavLinks({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      {NAV.map((item) => {
        const current = item.href === "#home";
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className="inline-flex min-h-11 shrink-0 items-center px-2.5 text-[13px] font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan lg:text-[13.5px]"
          >
            <span
              className={
                current
                  ? "border-b-2 border-hero-cyan pb-0.5"
                  : "border-b-2 border-transparent pb-0.5"
              }
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export function SiteHeader({ industry }: { industry: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071c1e]/72 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex min-h-16 items-center justify-between gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3">
          <Link
            href="/#home"
            aria-label="Veltan home"
            className="min-w-0 justify-self-start rounded-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <Wordmark variant="dark" preload compact />
          </Link>

          <NavLinks
            label="Primary"
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
              className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-hero-cyan px-3 text-[13px] font-semibold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:gap-1.5 sm:px-4 sm:text-[13.5px]"
            >
              Get Started
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        <NavLinks
          label="Page sections"
          className="-mx-2 flex gap-1 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [-ms-overflow-style:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        />
      </div>
    </header>
  );
}
