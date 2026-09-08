import { cn } from "@/lib/utils";
import { kicker, mutedBody } from "@/lib/ui";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  className?: string;
  kickerClassName?: string;
}

export function SectionHeading({
  kicker: kickerLabel,
  title,
  subtitle,
  align = "start",
  className,
  kickerClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        align === "center" && subtitle && "max-w-xl",
        className,
      )}
    >
      {kickerLabel ? (
        <p className={cn(kicker, kickerClassName)}>{kickerLabel}</p>
      ) : null}
      <h2
        className={cn(
          "text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[34px]",
          kickerLabel && "mt-3",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            mutedBody,
            "mt-3",
            align === "start" && "max-w-[52ch]",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
