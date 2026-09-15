import { cn } from "@/lib/utils";

export const authInputClass =
  "h-12 w-full min-w-0 rounded-full border border-[#1a4e58] bg-[#071416]/70 px-4 pl-12 text-[15px] text-white outline-none placeholder:text-white/40 focus-visible:border-[#2ee6e0]/70 focus-visible:ring-3 focus-visible:ring-[#2ee6e0]/15";

export const authPrimaryClass =
  "mt-1 h-12 min-h-12 w-full rounded-full border-transparent bg-[#007a8c] text-[15px] font-semibold text-white hover:bg-[#0896ab] disabled:opacity-70";

export function authAlertClass(kind: "error" | "info" = "error") {
  return cn(
    "rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug",
    kind === "error"
      ? "border border-destructive/40 bg-destructive/10 text-destructive"
      : "border border-hero-cyan/25 bg-hero-cyan/8 text-white/80",
  );
}

export function AuthIconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-white/45"
    >
      {children}
    </span>
  );
}

export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-white/12" />
      <span className="text-[13px] font-medium text-white/45">or</span>
      <span className="h-px flex-1 bg-white/12" />
    </div>
  );
}

export function AuthField({
  id,
  label,
  error,
  hideLabel,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hideLabel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : "text-sm font-medium text-white/80"}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function AuthSwitch({
  prompt,
  href,
  action,
  cta = false,
}: {
  prompt: string;
  href: string;
  action: string;
  cta?: boolean;
}) {
  if (cta) {
    return (
      <div className="space-y-3">
        <p className="text-[14px] text-white/55">{prompt}</p>
        <a
          href={href}
          className="inline-flex h-12 w-full items-center justify-center rounded-full border border-hero-cyan px-4 text-[15px] font-semibold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
        >
          {action}
        </a>
      </div>
    );
  }

  return (
    <p className="text-[14px] text-white/55">
      {prompt}{" "}
      <a
        href={href}
        className="font-medium text-hero-cyan underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
      >
        {action}
      </a>
    </p>
  );
}
