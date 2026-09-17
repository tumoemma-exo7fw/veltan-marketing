"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

import { analytics } from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

import { Wordmark } from "@/components/wordmark";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

const emptySubscribe = () => () => {};

const loginHeaderClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-hero-cyan/35 px-3.5 text-[13px] font-semibold text-white/90 transition-colors hover:border-hero-cyan/55 hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan";

function useCurrentSection() {
  const [current, setCurrent] = useState<(typeof NAV)[number]["href"]>("#home");

  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash;
      const match = NAV.find((item) => item.href === hash);
      if (match) setCurrent(match.href);
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            `#${entry.target.id}`,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        let best: (typeof NAV)[number]["href"] = "#home";
        let bestRatio = 0;
        for (const item of NAV) {
          const ratio = ratios.get(item.href) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = item.href;
          }
        }
        if (bestRatio > 0) setCurrent(best);
      },
      {
        rootMargin: "-80px 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const item of NAV) {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  return [current, setCurrent] as const;
}

function NavLinks({
  className,
  label,
  onSelect,
  stacked = false,
  current,
}: {
  className?: string;
  label: string;
  onSelect: (href: (typeof NAV)[number]["href"]) => void;
  stacked?: boolean;
  current: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      {NAV.map((item) => {
        const isCurrent = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? "location" : undefined}
            onClick={() => onSelect(item.href)}
            className={
              stacked
                ? cn(
                    "flex min-h-12 items-center px-4 text-[16px] font-medium transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
                    isCurrent ? "text-white" : "text-white/90 hover:text-white",
                  )
                : cn(
                    "relative inline-flex min-h-11 shrink-0 items-center px-2.5 text-[13px] font-medium lg:text-[13.5px]",
                    "text-white/80 transition-colors duration-[180ms] motion-reduce:transition-none",
                    "after:pointer-events-none after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-hero-cyan after:transition-transform after:duration-[180ms] after:ease-out motion-reduce:after:transition-none",
                    "[@media(hover:hover)]:hover:text-white [@media(hover:hover)]:hover:after:scale-x-100",
                    "focus-visible:text-white focus-visible:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
                    isCurrent && "text-white after:scale-x-100",
                  )
            }
          >
            <span
              className={
                stacked
                  ? cn(
                      "border-l-2 pl-3",
                      isCurrent ? "border-hero-cyan" : "border-transparent",
                    )
                  : undefined
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

function HeaderSessionActions() {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let cancelled = false;
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSignedIn(Boolean(data.session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  if (!signedIn) return null;

  return (
    <form action="/auth/signout" method="POST">
      <input type="hidden" name="next" value={pathname === "/login" ? "/login" : "/"} />
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center px-2 text-[12.5px] font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      >
        Sign out
      </button>
    </form>
  );
}

export function SiteHeader({ industry }: { industry: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const portalReady = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [current, setCurrent] = useCurrentSection();
  const menuId = useId();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
    const targets = document.querySelectorAll("main, footer");
    targets.forEach((node) => node.setAttribute("inert", ""));
    return () => {
      targets.forEach((node) => node.removeAttribute("inert"));
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const hamburger = hamburgerRef.current;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      hamburger?.focus();
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

  function onPanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = [
      ...panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function selectSection(href: (typeof NAV)[number]["href"]) {
    setCurrent(href);
    closeMenu();
  }

  const menu = menuOpen ? (
    <div className="lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        className="fixed inset-0 z-40 bg-black/32 backdrop-blur-[2px] animate-in fade-in duration-[200ms] motion-reduce:animate-none"
        onClick={closeMenu}
      />
      <div
        ref={panelRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Page sections"
        onKeyDown={onPanelKeyDown}
        className="fixed inset-x-0 top-16 z-50 max-h-[min(32rem,calc(100dvh-4rem))] overflow-y-auto border-b border-white/10 bg-[#071c1e] shadow-lg animate-in fade-in slide-in-from-top-2 duration-[200ms] motion-reduce:animate-none"
      >
        <NavLinks
          label="Page sections"
          stacked
          current={current}
          onSelect={selectSection}
          className="flex flex-col py-2"
        />
      </div>
    </div>
  ) : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071c1e]/72 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex min-h-16 items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/#home"
            aria-label="Veltan home"
            onClick={() => {
              setCurrent("#home");
              closeMenu();
            }}
            className="min-w-0 rounded-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <Wordmark variant="dark" preload compact />
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-4 lg:gap-5">
            <NavLinks
              label="Primary"
              current={current}
              onSelect={selectSection}
              className="hidden items-center gap-1 lg:flex"
            />

            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
              <HeaderSessionActions />
              <Link href="/login" onClick={closeMenu} className={loginHeaderClass}>
                Log in
              </Link>
              <a
                href="#pricing"
                onClick={() => {
                  setCurrent("#pricing");
                  closeMenu();
                  analytics.ctaClicked("header", industry);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-hero-cyan px-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:gap-1.5 sm:px-4 sm:text-[13.5px]"
              >
                Get Started
                <ArrowRight aria-hidden="true" className="hidden size-4 sm:block" />
              </a>
              <button
                ref={hamburgerRef}
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan lg:hidden"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-haspopup="dialog"
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

      {portalReady && menu
        ? createPortal(menu, document.body)
        : null}
    </header>
  );
}
