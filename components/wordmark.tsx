import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-wordmark text-[26px] font-bold uppercase leading-none tracking-[0.24em]",
        className,
      )}
    >
      Veltan
    </span>
  );
}
