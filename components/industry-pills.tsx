"use client";

import { INDUSTRIES, INDUSTRY_ORDER, type IndustryId } from "@/lib/content";
import { cn } from "@/lib/utils";

interface IndustryPillsProps {
  value: IndustryId;
  onChange: (id: IndustryId) => void;
}

export function IndustryPills({ value, onChange }: IndustryPillsProps) {
  return (
    <div
      role="group"
      aria-label="Choose your type of business"
      className="inline-flex flex-wrap gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1"
    >
      {INDUSTRY_ORDER.map((id) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={cn(
              "min-h-11 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
              active
                ? "bg-hero-cyan/15 text-hero-cyan"
                : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            {INDUSTRIES[id].label}
          </button>
        );
      })}
    </div>
  );
}
