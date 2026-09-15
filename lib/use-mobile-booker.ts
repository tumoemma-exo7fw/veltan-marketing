"use client";

import { useEffect, useState } from "react";

/**
 * Phones and compact coarse-pointer devices. SSR-safe: `null` until
 * the client can read matchMedia so we do not flash Book now / auto-open.
 */
export function isMobileBookerViewport() {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const compact = window.matchMedia("(max-width: 1023px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  return narrow || (compact && (coarse || noHover));
}

export function useMobileBooker() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => setIsMobile(isMobileBookerViewport());
    sync();

    const queries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(max-width: 1023px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(hover: none)"),
    ];
    queries.forEach((query) => query.addEventListener("change", sync));
    return () => {
      queries.forEach((query) => query.removeEventListener("change", sync));
    };
  }, []);

  return isMobile;
}
