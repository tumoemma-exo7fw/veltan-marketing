"use client";

import { useEffect, useState } from "react";

import { LAUNCH_AT_UTC_MS, LAUNCH_DATE_LABEL } from "@/lib/site";
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
  label = "Founding 12 offer ends in",
  align = "start",
  className,
}: CountdownProps) {
  const left = useTimeLeft();
  const cells: { value: number | undefined; unit: string }[] = [
    { value: left?.days, unit: "days" },
    { value: left?.hours, unit: "hours" },
    { value: left?.mins, unit: "min" },
    { value: left?.secs, unit: "sec" },
  ];

  return (
    <div
      role="timer"
      aria-label={`${label} — offer closes ${LAUNCH_DATE_LABEL}, midnight East Africa Time`}
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <div className="flex gap-2">
        {cells.map(({ value, unit }) => (
          <div
            key={unit}
            className="min-w-14 rounded-bubble border border-line bg-surface px-2 py-1.5 text-center"
          >
            <div className="text-lg font-extrabold tabular-nums leading-tight text-accent">
              {value === undefined ? "––" : String(value).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
