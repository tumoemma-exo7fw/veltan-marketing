"use client";

import { useEffect, useId, useRef, useState } from "react";

import { CAL_BOOKING_URL, CAL_LINK } from "@/lib/site";
import {
  applyCalIframeTitle,
  CAL_DARK_CONFIG,
  CAL_DARK_UI,
  CAL_EMBED_NS,
  CAL_IFRAME_TITLE,
  CAL_ORIGIN,
  CAL_READY_TIMEOUT_MS,
  calEmbedPageUrl,
  ensureCalSnippet,
  watchCalScriptError,
  type CalBookerStatus,
} from "@/lib/cal-embed-runtime";
import { cn } from "@/lib/utils";

export type { CalBookerStatus };

function FallbackIframe({
  onError,
  onReady,
}: {
  onError: () => void;
  onReady: () => void;
}) {
  return (
    <iframe
      title={CAL_IFRAME_TITLE}
      src={calEmbedPageUrl()}
      loading="eager"
      referrerPolicy="no-referrer-when-downgrade"
      onLoad={onReady}
      onError={onError}
      className="h-[min(680px,80dvh)] min-h-[420px] w-full max-w-full border-0 bg-[#071c1e]"
    />
  );
}

function CalendarStatusOverlay({
  status,
  visible,
}: {
  status: CalBookerStatus;
  visible: boolean;
}) {
  if (!visible || status === "ready" || status === "fallback") return null;

  const copy =
    status === "error"
      ? "Couldn’t load the calendar here."
      : "Opening times…";

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#071c1e] px-4 text-center text-[13px] text-white/50"
      aria-live="polite"
    >
      {copy}
    </div>
  );
}

/**
 * Inline booker (dark, month view). Always mounts so prefetch can finish
 * before the visitor reaches #demo. Visibility is owned by CalPrefetch.
 */
export function CalEmbed({
  visible = true,
  onStatusChange,
}: {
  visible?: boolean;
  onStatusChange?: (status: CalBookerStatus) => void;
}) {
  const reactId = useId().replace(/:/g, "");
  const boxRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<CalBookerStatus>("loading");

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  useEffect(() => {
    let cancelled = false;
    let timer = 0;
    let frames: MutationObserver | null = null;

    const failToIframe = () => {
      if (cancelled) return;
      window.clearTimeout(timer);
      frames?.disconnect();
      setStatus("fallback");
    };

    const markReady = () => {
      if (cancelled) return;
      window.clearTimeout(timer);
      const box = boxRef.current;
      if (box) applyCalIframeTitle(box);
      setStatus((current) =>
        current === "fallback" || current === "error" ? current : "ready",
      );
    };

    try {
      ensureCalSnippet();
      const cal = window.Cal;
      const box = boxRef.current;
      if (!cal || !box) {
        failToIframe();
      } else if (box.dataset.calInited === "true") {
        if (box.querySelector("iframe")) markReady();
      } else {
        box.dataset.calInited = "true";
        cal("init", CAL_EMBED_NS, { origin: CAL_ORIGIN });
        watchCalScriptError(failToIframe);
        const api = cal.ns?.[CAL_EMBED_NS] ?? cal;
        api("inline", {
          elementOrSelector: box,
          calLink: CAL_LINK,
          config: CAL_DARK_CONFIG,
        });
        api("ui", CAL_DARK_UI);
        api("on", { action: "linkReady", callback: markReady });
        api("on", { action: "bookerReady", callback: markReady });
        frames = new MutationObserver(() => {
          applyCalIframeTitle(box);
          if (box.querySelector("iframe")) markReady();
        });
        frames.observe(box, { childList: true, subtree: true });
        if (box.querySelector("iframe")) markReady();
        timer = window.setTimeout(() => {
          if (cancelled) return;
          if (box.querySelector("iframe")) markReady();
          else failToIframe();
        }, CAL_READY_TIMEOUT_MS);
      }
    } catch {
      failToIframe();
    }

    return () => {
      cancelled = true;
      frames?.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-w-0">
      <div
        className={cn(
          "relative min-w-0 overflow-x-clip rounded-2xl border border-white/15 bg-[#071c1e]",
          status !== "ready" && "min-h-[420px] sm:min-h-[540px]",
        )}
      >
        {status !== "fallback" && status !== "error" ? (
          <div
            ref={boxRef}
            id={`cal-inline-${reactId}`}
            className={cn(
              "w-full max-w-full overflow-x-clip [&_iframe]:max-w-full",
              status !== "ready" && "min-h-[420px] sm:min-h-[540px]",
            )}
          />
        ) : status === "fallback" ? (
          <FallbackIframe
            onReady={() => setStatus("fallback")}
            onError={() => setStatus("error")}
          />
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-5 py-10 text-center">
            <p className="text-[15px] font-semibold text-white">
              Couldn’t load the calendar
            </p>
            <p className="max-w-[42ch] text-[13.5px] leading-[1.55] text-white/55">
              Open the same walkthrough in a new tab, or try again in a moment.
            </p>
          </div>
        )}
        <CalendarStatusOverlay status={status} visible={visible} />
      </div>
      <a
        href={CAL_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center text-[13.5px] font-semibold text-hero-cyan underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      >
        Open in new tab
      </a>
    </div>
  );
}
