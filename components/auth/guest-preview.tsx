"use client";

import { analytics } from "@/lib/analytics";
import { guestAppHref } from "@/lib/site";

export function GuestPreviewLink({ cta = false }: { cta?: boolean }) {
  if (cta) {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-[13px] text-white/40">Just looking?</p>
        <a
          href={guestAppHref()}
          onClick={() => analytics.guestPreviewed()}
          className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
        >
          Preview the app
        </a>
      </div>
    );
  }

  return (
    <p className="mt-4 text-[13px] text-white/40">
      Just looking?{" "}
      <a
        href={guestAppHref()}
        onClick={() => analytics.guestPreviewed()}
        className="font-medium text-white/55 underline-offset-4 transition-colors hover:text-white/80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      >
        Preview the app
      </a>
    </p>
  );
}
