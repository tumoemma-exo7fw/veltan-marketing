/**
 * Shared booking-embed bootstrap. Prefetch starts embed.js after first
 * paint so the founding pay form is not competing with it on click.
 */

import { CAL_BOOKING_URL, CAL_TIMEZONE } from "@/lib/site";

export const CAL_EMBED_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
export const CAL_ORIGIN = "https://app.cal.com";
export const CAL_EMBED_NS = "veltanDemo";
export const CAL_IFRAME_TITLE = "Book a Veltan demo";
export const CAL_READY_TIMEOUT_MS = 12_000;

export type CalBookerStatus = "loading" | "ready" | "fallback" | "error";

export type CalFn = (...args: unknown[]) => void;

export type CalGlobal = CalFn & {
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

export const CAL_DARK_CONFIG = {
  theme: "dark",
  layout: "month_view",
  timezone: CAL_TIMEZONE,
  "cal.tz": CAL_TIMEZONE,
  "ui.color-scheme": "dark",
  "ui.autoscroll": "false",
  useSlotsViewOnSmallScreen: "true",
  iframeAttrs: { title: CAL_IFRAME_TITLE },
} as const;

export const CAL_DARK_UI = {
  theme: "dark",
  layout: "month_view",
  hideEventTypeDetails: false,
  styles: { branding: { brandColor: "#2ee6e0" } },
  cssVarsPerTheme: {
    dark: {
      "cal-brand": "#2ee6e0",
      "cal-brand-emphasis": "#5af0ea",
      "cal-brand-text": "#071c1e",
      "cal-bg": "#071c1e",
      "cal-bg-muted": "#0c2a2d",
      "cal-bg-emphasis": "#123438",
      "cal-text": "#f3f6f4",
      "cal-text-muted": "#9db5af",
      "cal-border": "rgba(243,246,244,0.15)",
      "cal-border-booker": "rgba(243,246,244,0.15)",
      radius: "1rem",
    },
  },
};

export function calEmbedPageUrl() {
  const url = new URL(CAL_BOOKING_URL);
  url.searchParams.set("theme", "dark");
  url.searchParams.set("layout", "month_view");
  url.searchParams.set("embed", "true");
  url.searchParams.set("timezone", CAL_TIMEZONE);
  url.searchParams.set("cal.tz", CAL_TIMEZONE);
  return url.toString();
}

/** Run after the first paint so hero + pay-form hydration stay first. */
export function afterFirstPaint(fn: () => void) {
  if (typeof window === "undefined") return;
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => fn(), { timeout: 800 });
    } else {
      window.setTimeout(fn, 0);
    }
  };
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(run);
  });
}

/**
 * Documented vanilla snippet. Queues `Cal(...)` calls and injects
 * embed.js on first `init`. Safe to call many times.
 */
export function ensureCalSnippet() {
  if (typeof window === "undefined") return;
  if (window.Cal) return;
  const C = window;
  const A = CAL_EMBED_SCRIPT_SRC;
  const L = "init";
  const p = (a: { q?: unknown[] }, ar: unknown[]) => {
    a.q = a.q || [];
    a.q.push(ar);
  };
  const Cal = function (...ar: unknown[]) {
    const cal = window.Cal as CalGlobal;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${A}"]`,
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = A;
        script.async = true;
        script.dataset.calPrefetch = "veltan";
        document.head.appendChild(script);
      }
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function (...apiArgs: unknown[]) {
        p(api as { q?: unknown[] }, apiArgs);
      } as CalFn & { q?: unknown[] };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace] as { q?: unknown[] }, ar);
        p(cal, ["initNamespace", namespace]);
      } else {
        p(cal, ar);
      }
      return;
    }
    p(cal, ar);
  } as CalGlobal;
  Cal.q = [];
  Cal.ns = {};
  C.Cal = Cal;
}

export function applyCalIframeTitle(root: HTMLElement) {
  root.querySelectorAll("iframe").forEach((frame) => {
    frame.setAttribute("title", CAL_IFRAME_TITLE);
  });
}

export function watchCalScriptError(onError: () => void) {
  const script = document.querySelector<HTMLScriptElement>(
    `script[src="${CAL_EMBED_SCRIPT_SRC}"]`,
  );
  if (!script) return;
  script.addEventListener("error", onError, { once: true });
}

/** Start embed.js (and the queue) without mounting a booker. */
export function prefetchCalScript() {
  afterFirstPaint(() => {
    ensureCalSnippet();
    window.Cal?.("init", CAL_EMBED_NS, { origin: CAL_ORIGIN });
  });
}
