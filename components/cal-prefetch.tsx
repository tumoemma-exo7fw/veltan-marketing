"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { analytics } from "@/lib/analytics";
import {
  prefetchCalScript,
  type CalBookerStatus,
} from "@/lib/cal-embed-runtime";
import { CAL_BOOKING_URL } from "@/lib/site";
import { cyanCta } from "@/lib/ui";
import { useMobileBooker } from "@/lib/use-mobile-booker";
import { cn } from "@/lib/utils";

/**
 * Kick the cal-embed chunk and inject embed.js. Called from the homepage
 * client island so the booker starts fetching on land — not on click.
 */
export function warmupCalPrefetch() {
  if (typeof window === "undefined") return;
  prefetchCalScript();
  void import("@/components/cal-embed");
}

/**
 * Homepage-only mount: start the embed chunk + snippet immediately.
 * Does not render a second iframe — `CalPrefetch` in #demo owns that.
 */
export function CalPrefetchRoot() {
  useEffect(() => {
    warmupCalPrefetch();
  }, []);
  return null;
}

const CalEmbed = dynamic(
  () => import("@/components/cal-embed").then((mod) => mod.CalEmbed),
  { ssr: false },
);

function BookNowButton({
  failed,
  onReveal,
  expanded,
  opening,
}: {
  failed: boolean;
  onReveal: () => void;
  expanded: boolean;
  opening: boolean;
}) {
  if (failed) {
    return (
      <a
        href={CAL_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cyanCta}
      >
        Book now
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onReveal}
      aria-expanded={expanded}
      aria-controls="demo-calendar"
      aria-busy={opening || undefined}
      className={cyanCta}
    >
      {opening ? "Opening times…" : "Book now"}
    </button>
  );
}

/**
 * Single booker. Mounts after first paint, cloaked until reveal — not
 * `display: none`. Desktop: Book now. Mobile: auto-open when ready.
 */
export function CalPrefetch({ industry }: { industry: string }) {
  const isMobile = useMobileBooker();
  const [status, setStatus] = useState<CalBookerStatus>("loading");
  const [revealed, setRevealed] = useState(false);
  const [pendingReveal, setPendingReveal] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);
  const [mountEmbed, setMountEmbed] = useState(false);

  const handleStatus = useCallback((next: CalBookerStatus) => {
    setStatus(next);
  }, []);

  useEffect(() => {
    let frame = 0;
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => setMountEmbed(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const bookerReady = status === "ready" || status === "fallback";

  const calendarVisible =
    revealed ||
    (pendingReveal && (bookerReady || status === "error")) ||
    (isMobile === true && bookerReady);

  const reveal = () => {
    analytics.ctaClicked("demo", industry);
    if (bookerReady || status === "error") {
      setRevealed(true);
      return;
    }
    setPendingReveal(true);
  };

  return (
    <div className="relative min-w-0">
      {!calendarVisible ? (
        <BookNowButton
          failed={status === "error"}
          onReveal={reveal}
          expanded={false}
          opening={pendingReveal && !calendarVisible}
        />
      ) : null}

      <div
        id="demo-calendar"
        className={cn(
          "min-w-0",
          !calendarVisible &&
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(720px,85dvh)] w-full overflow-hidden opacity-0",
          calendarVisible && "animate-fade-in",
        )}
        aria-hidden={!calendarVisible}
        {...(!calendarVisible ? { inert: true } : {})}
      >
        {mountEmbed ? (
          <CalEmbed
            key={embedKey}
            visible={calendarVisible}
            onStatusChange={handleStatus}
          />
        ) : null}
      </div>

      {status === "error" && calendarVisible ? (
        <button
          type="button"
          onClick={() => {
            setStatus("loading");
            setEmbedKey((n) => n + 1);
          }}
          className="mt-3 inline-flex min-h-11 items-center text-[13.5px] font-semibold text-hero-cyan underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
