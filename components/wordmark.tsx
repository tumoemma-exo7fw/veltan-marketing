import Image from "next/image";

import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Full-color mark for light surfaces, reversed mark for dark surfaces. */
  variant?: "light" | "dark";
}

export function Wordmark({
  className,
  variant = "light",
}: WordmarkProps) {
  return (
    <Image
      src={
        variant === "dark"
          ? "/brand/veltan-mark-dark.png"
          : "/brand/veltan-mark-light.png"
      }
      alt="Veltan"
      width={735}
      height={500}
      priority
      className={cn(
        "h-auto w-[74px] object-contain sm:w-[82px]",
        className,
      )}
    />
  );
}
