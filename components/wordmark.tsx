import Image from "next/image";

import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Full-color mark for light surfaces, lifted-color mark for dark surfaces. */
  variant?: "light" | "dark";
}

export function Wordmark({
  className,
  variant = "light",
}: WordmarkProps) {
  return (
    <span
      aria-label="Veltan"
      className={cn(
        "inline-flex items-center gap-2.5",
        className,
      )}
    >
      <Image
        src={
          variant === "dark"
            ? "/brand/veltan-mark-dark.png"
            : "/brand/veltan-mark-light.png"
        }
        alt=""
        width={735}
        height={500}
        priority
        className="h-auto w-11 shrink-0 object-contain sm:w-14"
      />
      <span
        aria-hidden="true"
        className={cn(
          "font-wordmark text-[20px] font-bold uppercase leading-none tracking-[0.16em] sm:text-[24px] sm:tracking-[0.2em]",
          variant === "dark" ? "text-bg" : "text-text",
        )}
      >
        Veltan
      </span>
    </span>
  );
}
