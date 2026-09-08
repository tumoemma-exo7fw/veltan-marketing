"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const SECTION_NAV = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

export function useSectionHash() {
  const [hash, setHash] = useState("#home");

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash;
      setHash(next && next !== "#" ? next : "#home");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return hash;
}

export function SectionNav({
  className,
  label,
  hash,
}: {
  className?: string;
  label: string;
  hash: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      {SECTION_NAV.map((item) => {
        const current = item.href === hash;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={cn(
              "group inline-flex min-h-11 shrink-0 items-center px-2.5 text-[13px] font-medium text-white/90 lg:text-[13.5px]",
              "transition-colors duration-200 ease-out hover:text-white hover:delay-[50ms]",
              "active:opacity-80 active:delay-0",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
            )}
          >
            <span className="relative pb-0.5">
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-center bg-hero-cyan transition-transform duration-200 ease-out",
                  current
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100 group-hover:delay-[50ms] group-focus-visible:scale-x-100",
                )}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
