"use client";

import { useEffect, useState } from "react";

import {
  FOUNDING_SEATS,
  FOUNDING_SEATS_REMAINING,
  LAUNCH_AT_UTC_MS,
  LAUNCH_DATE_LABEL,
} from "@/lib/site";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function useTimeLeft(): TimeLeft | null {
  // null until mounted so the server and first client render agree.
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const compute = () => {
      const diff = Math.max(0, LAUNCH_AT_UTC_MS - Date.now());
      setLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor(diff / 3_600_000) % 24,
        mins: Math.floor(diff / 60_000) % 60,
        secs: Math.floor(diff / 1_000) % 60,
      });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

interface CountdownProps {
  label?: string;
  align?: "start" | "center";
  className?: string;
}

export function Countdown({
  label = `${FOUNDING_SEATS_REMAINING} remaining`,
  align = "start",
  className,
}: CountdownProps) {
  const left = useTimeLeft();
  const expired =
    left !== null &&
    left.days === 0 &&
    left.hours === 0 &&
    left.mins === 0 &&
    left.secs === 0;
  const cells: { value: number | undefined; unit: string }[] = [
    { value: left?.secs, unit: "sec" },
    { value: left?.mins, unit: "min" },
    { value: left?.hours, unit: "hours" },
    { value: left?.days, unit: "days" },
  ];

  if (expired) {
    return (
      <p
        role="status"
        className={cn("text-[13px] font-semibold text-white/70", className)}
      >
        The Founding {FOUNDING_SEATS} window has closed.
      </p>
    );
  }

  return (
    <div
      role="timer"
      aria-label={`${label} — window closes ${LAUNCH_DATE_LABEL}, 23:59 East Africa Time`}
      className={cn(
        "flex flex-col gap-2.5",
        align === "center" && "items-center",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
        {label}
      </p>
      <div className="flex border-y border-white/10 py-2.5">
        {cells.map(({ value, unit }, index) => (
          <div
            key={unit}
            className={cn(
              "min-w-14 px-3 text-left first:pl-0 last:pr-0",
              index > 0 && "border-l border-white/10",
            )}
          >
            <div className="text-[19px] font-bold tabular-nums leading-tight text-accent">
              {value === undefined ? "––" : String(value).padStart(2, "0")}
            </div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
