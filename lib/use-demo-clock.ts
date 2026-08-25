"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    // Server snapshot: assume motion; the client corrects on hydration.
    () => false,
  );
}

export interface DemoClock {
  /** Milliseconds into the current loop, 0..durationMs. */
  elapsed: number;
  /** How many full loops have played (drives scenario rotation). */
  loop: number;
  reduced: boolean;
}

/**
 * Drives the "recorded demo" loops. Returns a clock that wraps every
 * `durationMs`; when the visitor prefers reduced motion the clock is frozen
 * at `frozenAtMs` — the demo's most informative frame — instead of animating.
 */
export function useDemoClock(durationMs: number, frozenAtMs: number): DemoClock {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState({ elapsed: 0, loop: 0 });

  useEffect(() => {
    if (reduced) return;
    let raf: number;
    const start = performance.now();
    const frame = (now: number) => {
      const t = now - start;
      setTick({ elapsed: t % durationMs, loop: Math.floor(t / durationMs) });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, reduced]);

  if (reduced) return { elapsed: frozenAtMs, loop: 0, reduced: true };
  return { ...tick, reduced: false };
}
