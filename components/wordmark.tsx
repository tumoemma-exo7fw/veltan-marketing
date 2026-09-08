import Image from "next/image";

import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Full-color mark for light surfaces, lifted-color mark for dark surfaces. */
  variant?: "light" | "dark";
  /** Preload the mark — use on the header lockup only. */
  preload?: boolean;
  /** Slightly tighter lockup for the overlay header. */
  compact?: boolean;
}

export function Wordmark({
  className,
  variant = "light",
  preload = false,
  compact = false,
}: WordmarkProps) {
  return (
    <span
      aria-label="Veltan"
      className={cn(
        "inline-flex items-center gap-0",
        className,
      )}
    >
      <Image
        src={
          variant === "dark"
            ? "/brand/veltan-mark-dark-color.png"
            : "/brand/veltan-mark-light.png"
        }
        alt=""
        width={735}
        height={500}
        preload={preload}
        className={cn(
          "h-auto shrink-0 object-contain",
          compact ? "w-9 sm:w-11 lg:w-14" : "w-11 sm:w-14",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "-ml-0.5 font-wordmark font-bold uppercase leading-none",
          compact
            ? "text-[16px] tracking-[0.12em] sm:text-[20px] sm:tracking-[0.16em] lg:text-[24px] lg:tracking-[0.2em]"
            : "text-[20px] tracking-[0.16em] sm:text-[24px] sm:tracking-[0.2em]",
          variant === "dark" ? "text-white" : "text-[#12292b]",
        )}
      >
        VELTAN
      </span>
    </span>
  );
}
