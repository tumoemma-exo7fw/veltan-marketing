"use client";

import { analytics } from "@/lib/analytics";
import { guestAppHref } from "@/lib/site";

export function GuestPreviewLink() {
  return (
    <p className="text-center text-[13px] text-white/45">
      <a
        href={guestAppHref()}
        onClick={() => analytics.guestPreviewed()}
        className="font-medium text-white/55 underline-offset-4 transition-colors hover:text-white/80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      >
        Continue as guest
      </a>
    </p>
  );
}
