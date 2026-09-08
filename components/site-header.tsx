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

function GetStartedLink({
  industry,
  className,
}: {
  industry: string;
  className?: string;
}) {
  return (
    <a
      href="#pricing"
      onClick={() => analytics.ctaClicked("header", industry)}
      className={
        className ??
        "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-hero-cyan px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      }
    >
      Get Started
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}

export function SiteHeader({ industry }: { industry: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071c1e]/72 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/#home"
            aria-label="Veltan home"
            className="min-w-0 justify-self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <Wordmark variant="dark" preload />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV.map((item) => {
              const current = item.href === "#home";
              return (
              <a
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="inline-flex min-h-11 items-center px-2.5 text-[13.5px] font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
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
            <span className="hidden sm:inline-flex">
              <GetStartedLink industry={industry} />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-2 lg:hidden">
          <nav
            aria-label="Page sections"
            className="-ml-2 flex min-w-0 flex-1 gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV.map((item) => {
              const current = item.href === "#home";
              return (
              <a
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="inline-flex min-h-11 shrink-0 items-center px-2.5 text-[13px] font-medium text-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
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
          <span className="shrink-0 sm:hidden">
            <GetStartedLink
              industry={industry}
              className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-hero-cyan px-3 text-[13px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
            />
          </span>
        </div>
      </div>
    </header>
  );
}
