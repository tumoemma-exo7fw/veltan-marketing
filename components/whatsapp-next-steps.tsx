"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Smartphone } from "lucide-react";

import { WHATSAPP_DISPLAY } from "@/lib/site";
import {
  copyText,
  openWhatsAppApp,
  whatsappAppUrl,
  whatsappWebUrl,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const STEPS = [
  "If you see a QR code, open WhatsApp on your phone → Linked devices → Link a device → scan.",
  "Wait until chat with Veltan loads.",
  "Tap Send.",
  "If the chat is blank, paste the copied message.",
] as const;

function CopyAction({
  label,
  copiedLabel,
  value,
  copied,
  onCopy,
}: {
  label: string;
  copiedLabel: string;
  value: string;
  copied: boolean;
  onCopy: (value: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-[13.5px] font-semibold text-white/90 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:w-auto"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-hero-cyan" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}

interface WhatsAppNextStepsProps {
  message: string;
  className?: string;
  headingId?: string;
}

/**
 * In-page rescue when WhatsApp Desktop is missing or WhatsApp Web hangs on
 * a QR / blank chat. Copy is the guarantee that booking still goes through.
 */
export function WhatsAppNextSteps({
  message,
  className,
  headingId = "whatsapp-next-steps-title",
}: WhatsAppNextStepsProps) {
  const [copied, setCopied] = useState<"message" | "number" | null>(null);

  const onCopy = async (key: "message" | "number", value: string) => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(key);
    window.setTimeout(() => {
      setCopied((current) => (current === key ? null : current));
    }, 1800);
  };

  return (
    <div
      className={cn(
        "animate-rise-in rounded-2xl border border-hero-cyan/25 bg-[#071c1e]/92 p-4 shadow-[0_12px_40px_rgb(0_0_0/0.35)] sm:p-5",
        className,
      )}
    >
      <p
        id={headingId}
        className="text-[16px] font-extrabold tracking-[-0.01em] text-white"
      >
        WhatsApp didn&apos;t open? Here&apos;s what to do.
      </p>
      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/70">
        We try the WhatsApp app on this device first. If it is not installed,
        continue in the browser — or copy and paste.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={whatsappAppUrl(message)}
          onClick={(event) => {
            event.preventDefault();
            openWhatsAppApp(message);
          }}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#20bf5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:w-auto"
        >
          <Smartphone aria-hidden="true" className="size-4" />
          Open WhatsApp app
        </a>
        <a
          href={whatsappWebUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-hero-cyan px-4 text-[14px] font-bold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:w-auto"
        >
          <ExternalLink aria-hidden="true" className="size-4" />
          Continue in browser
        </a>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <CopyAction
          label="Copy message"
          copiedLabel="Message copied"
          value={message}
          copied={copied === "message"}
          onCopy={() => onCopy("message", message)}
        />
        <CopyAction
          label="Copy number"
          copiedLabel="Number copied"
          value={WHATSAPP_DISPLAY}
          copied={copied === "number"}
          onCopy={() => onCopy("number", WHATSAPP_DISPLAY)}
        />
      </div>
      <p className="mt-2 text-[12.5px] text-white/55">
        Number: <span className="font-semibold text-white/80">{WHATSAPP_DISPLAY}</span>
      </p>

      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[13.5px] leading-[1.55] text-white/80">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
