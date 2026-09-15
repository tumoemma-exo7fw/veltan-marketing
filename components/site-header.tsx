"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import { analytics } from "@/lib/analytics";

import { Wordmark } from "@/components/wordmark";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

const loginHeaderClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-hero-cyan/35 px-3.5 text-[13px] font-semibold text-white/90 transition-colors hover:border-hero-cyan/55 hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan";

function NavLinks({
  className,
  label,
  onNavigate,
  stacked = false,
}: {
  className?: string;
  label: string;
  onNavigate?: () => void;
  stacked?: boolean;
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
            onClick={onNavigate}
            className={
              stacked
                ? "flex min-h-12 items-center px-4 text-[16px] font-medium text-white/90 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
                : "inline-flex min-h-11 shrink-0 items-center px-2.5 text-[13px] font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan lg:text-[13.5px]"
            }
          >
            <span
              className={
                current
                  ? stacked
                    ? "border-l-2 border-hero-cyan pl-3"
                    : "border-b-2 border-hero-cyan pb-0.5"
                  : stacked
                    ? "border-l-2 border-transparent pl-3"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      if (media.matches) setMenuOpen(false);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071c1e]/72 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex min-h-16 items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/#home"
            aria-label="Veltan home"
            onClick={closeMenu}
            className="min-w-0 rounded-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <Wordmark variant="dark" preload compact />
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-4 lg:gap-5">
            <NavLinks
              label="Primary"
              className="hidden items-center gap-1 lg:flex"
            />

            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
              <Link href="/login" onClick={closeMenu} className={loginHeaderClass}>
                Log in
              </Link>
              <a
                href="#pricing"
                onClick={() => {
                  closeMenu();
                  analytics.ctaClicked("header", industry);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-hero-cyan px-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:gap-1.5 sm:px-4 sm:text-[13.5px]"
              >
                Get Started
                <ArrowRight aria-hidden="true" className="hidden size-4 sm:block" />
              </a>
              <button
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan lg:hidden"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? (
                  <X aria-hidden="true" className="size-6" />
                ) : (
                  <Menu aria-hidden="true" className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={menuOpen ? "lg:hidden" : "hidden"} id={menuId}>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          className="fixed inset-0 top-16 z-40 bg-[#071c1e]/15 backdrop-blur-[6px]"
          onClick={closeMenu}
        />
        <div className="absolute inset-x-0 top-full z-50 max-h-[min(32rem,calc(100dvh-4rem))] overflow-y-auto border-b border-white/10 bg-[#071c1e] shadow-lg">
          <NavLinks
            label="Page sections"
            stacked
            onNavigate={closeMenu}
            className="flex flex-col py-2"
          />
          <div className="space-y-2 border-t border-white/10 px-4 py-3 sm:px-8">
            <Link
              href="/login"
              onClick={closeMenu}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/25 text-[15px] font-semibold text-white hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
            >
              Log in
            </Link>
            <a
              href="#pricing"
              onClick={() => {
                closeMenu();
                analytics.ctaClicked("header", industry);
              }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full border border-hero-cyan text-[15px] font-semibold text-white hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
            >
              Get Started
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
