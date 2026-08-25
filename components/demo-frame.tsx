import { cn } from "@/lib/utils";

interface DemoFrameProps {
  /** Milliseconds into the current loop. */
  elapsed: number;
  /** Loop length in milliseconds. */
  duration: number;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}

function formatStamp(elapsedMs: number): string {
  const s = Math.floor(elapsedMs / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * The "screen recording" chrome shared by both demos: muted window dots, a
 * pulsing DEMO tag (an honest "this is a simulation" signal), a running
 * timestamp, and a scrubber-style progress bar synced to the loop.
 */
export function DemoFrame({
  elapsed,
  duration,
  ariaLabel,
  className,
  children,
}: DemoFrameProps) {
  const progress = Math.min(1, elapsed / duration);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-hidden rounded-card border border-line bg-surface shadow-[0_30px_60px_-35px_rgb(18_41_43/0.4)]",
        className,
      )}
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          {/* Muted, on-brand takes on recording-window dots. */}
          <span className="size-2.5 rounded-full bg-[#cfa46b]" />
          <span className="size-2.5 rounded-full bg-[#6e8f8b]" />
          <span className="size-2.5 rounded-full bg-[#9fb4a5]" />
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent/80" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Demo
            </span>
          </span>
          <span className="ml-auto font-mono text-xs tabular-nums text-muted">
            {formatStamp(elapsed)}
          </span>
        </div>
        {children}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
          <div
            className="h-full bg-secondary/70"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
