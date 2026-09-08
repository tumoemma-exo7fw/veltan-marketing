"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import { applyUgPhoneInput, isValidBusinessPhone, phoneDigits } from "@/lib/phone";
import {
  MOMO_ACCOUNT_NAME,
  MOMO_NUMBER_DIGITS,
  MOMO_NUMBER_DISPLAY,
  MTN_MOMO_TEL_HREF,
  MTN_MOMO_USSD,
  PRICE_FOUNDING,
  PRICE_FOUNDING_AMOUNT,
  STRIPE_PAYMENT_LINK,
} from "@/lib/site";
import { amberCta, glassPanel } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { openWhatsApp, whatsappAppUrl } from "@/lib/whatsapp";

import { WhatsAppNextSteps } from "@/components/whatsapp-next-steps";

type PayMethod = "card" | "momo" | "later";
type MomoNetwork = "mtn" | "airtel";

const PAYMENT_LINES: Record<PayMethod, string | null> = {
  card: "Payment: I'm paying by card via Stripe.",
  momo: `Payment: I'm sending ${PRICE_FOUNDING} (${PRICE_FOUNDING_AMOUNT}) by Mobile Money to ${MOMO_NUMBER_DISPLAY} (${MOMO_ACCOUNT_NAME}) to lock my seat.`,
  later: "Payment: I'll pay after setup.",
};

const BUSINESS_TYPES = [
  "Dental clinic",
  "Plumbing / electrical / trades",
  "Real estate",
  "Other",
] as const;

const INDUSTRY_TO_TYPE: Record<IndustryId, (typeof BUSINESS_TYPES)[number]> = {
  dental: "Dental clinic",
  trades: "Plumbing / electrical / trades",
  realestate: "Real estate",
};

const STEP_TITLES = ["About your business", "How we reach you", "Pay & send"];

const inputClass =
  "w-full rounded-xl border border-white/12 bg-[#071c1e]/70 px-3.5 py-3 text-[16px] text-text outline-none transition-colors placeholder:text-white/40 focus:border-hero-cyan focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hero-cyan";

function CopyChip({
  label,
  value,
  copiedKey,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copiedKey: string;
  copied: string | null;
  onCopy: (key: string, value: string) => void;
}) {
  const isCopied = copied === copiedKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(copiedKey, value)}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
    >
      <Copy aria-hidden="true" className="size-3.5" />
      {isCopied ? "Copied" : label}
    </button>
  );
}

/**
 * Guided three-step booking for a Founding 12 seat. No backend: the answers
 * are composed into a structured WhatsApp message the visitor sends from
 * their own phone, so every booking lands in the founder's WhatsApp.
 */
export function BookingWizard({ industry }: { industry: IndustryId }) {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [chosenType, setChosenType] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>(
    STRIPE_PAYMENT_LINK ? "card" : "momo",
  );
  const [momoNetwork, setMomoNetwork] = useState<MomoNetwork>("mtn");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showWhatsAppHelp, setShowWhatsAppHelp] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const cancelWhatsAppRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelWhatsAppRef.current?.(), []);

  const businessType = chosenType ?? INDUSTRY_TO_TYPE[industry];
  const phoneForMessage = phone.trim();

  const clearError = () => setError(null);

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const next = applyUgPhoneInput(
      phone,
      el.value,
      el.selectionStart ?? el.value.length,
    );
    setPhone(next.value);
    clearError();
    requestAnimationFrame(() => {
      const field = phoneRef.current;
      if (!field) return;
      field.setSelectionRange(next.caret, next.caret);
    });
  };

  const next = () => {
    if (step === 0) {
      if (!name.trim() || !business.trim()) {
        setError("Please add your name and your business name.");
        return;
      }
      if (!started) {
        setStarted(true);
        analytics.bookingStarted(industry);
      }
    }
    if (step === 1) {
      if (!isValidBusinessPhone(phone)) {
        setError("Please enter the phone number you use for your business.");
        return;
      }
      if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
        setError("That email doesn't look right — fix it or leave it empty.");
        return;
      }
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const copyValue = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => {
        setCopied((current) => (current === key ? null : current));
      }, 1800);
    } catch {
      setError("Copy failed — select the number and copy it manually.");
    }
  };

  const message = [
    "Hi Veltan, I'd like to reserve a Founding 12 seat.",
    `Name: ${name.trim()}`,
    `Business: ${business.trim()} (${businessType})`,
    `Phone: ${phoneForMessage}`,
    email.trim() ? `Email: ${email.trim()}` : null,
    PAYMENT_LINES[payMethod],
    payMethod === "momo"
      ? `Network: ${momoNetwork === "mtn" ? "MTN Mobile Money" : "Airtel Money"}. Sending from the business number above (${phoneDigits(phone) || phoneForMessage}).`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className={cn(glassPanel, "mx-auto mt-8 max-w-lg min-w-0 overflow-x-clip p-6 text-left sm:p-8")}>
      <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">
        Pay {PRICE_FOUNDING} to lock it
      </h3>
      <p className="mt-1.5 text-[14px] leading-[1.55] text-muted">
        Three short steps. Amount is already {PRICE_FOUNDING} — you do not type
        it. We still need the WhatsApp booking so we can match your payment.
      </p>

      <div className="mt-5 flex gap-1.5" aria-hidden="true">
        {STEP_TITLES.map((title, i) => (
          <span
            key={title}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-secondary" : "bg-surface-2",
            )}
          />
        ))}
      </div>
      <p
        aria-live="polite"
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
      >
        Step {step + 1} of 3 — {STEP_TITLES[step]}
      </p>

      {step === 0 && (
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="bk-name" className="text-[13px] font-semibold">
              Your name
            </label>
            <input
              id="bk-name"
              type="text"
              name="name"
              autoComplete="name"
              autoCapitalize="words"
              placeholder="e.g. Sarah Namuli"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError();
              }}
              className={cn(inputClass, "mt-1.5")}
            />
          </div>
          <div>
            <label htmlFor="bk-business" className="text-[13px] font-semibold">
              Business name
            </label>
            <input
              id="bk-business"
              type="text"
              name="organization"
              autoComplete="organization"
              autoCapitalize="words"
              placeholder="e.g. Namuli Dental Clinic"
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
                clearError();
              }}
              className={cn(inputClass, "mt-1.5")}
            />
          </div>
          <div>
            <p className="text-[13px] font-semibold">Type of business</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {BUSINESS_TYPES.map((type) => {
                const active = type === businessType;
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setChosenType(type)}
                    className={cn(
                      "min-h-11 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
                      active
                        ? "border-hero-cyan/40 bg-hero-cyan/15 text-hero-cyan"
                        : "border-white/12 text-white/70 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="bk-phone" className="text-[13px] font-semibold">
              Phone number (the one that receives your business calls)
            </label>
            <input
              ref={phoneRef}
              id="bk-phone"
              type="tel"
              name="tel"
              inputMode="tel"
              autoComplete="tel"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="0750 123 456 or +256 750 123 456"
              value={phone}
              onChange={onPhoneChange}
              className={cn(inputClass, "mt-1.5")}
            />
            <p className="mt-1.5 text-[12.5px] text-white/50">
              Spaces as you type. We use the digits for WhatsApp.
            </p>
          </div>
          <div>
            <label htmlFor="bk-email" className="text-[13px] font-semibold">
              Email <span className="font-medium text-muted">(optional)</span>
            </label>
            <input
              id="bk-email"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="e.g. sarah@clinic.co.ug"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              className={cn(inputClass, "mt-1.5")}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-4">
          <dl className="space-y-2 border-y border-white/10 py-4 text-[14px]">
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted">Name</dt>
              <dd className="text-right font-semibold">{name.trim()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted">Business</dt>
              <dd className="text-right font-semibold">
                {business.trim()}
                <span className="block text-[12px] font-medium text-muted">
                  {businessType}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted">Phone</dt>
              <dd className="text-right font-semibold">{phoneForMessage}</dd>
            </div>
            {email.trim() && (
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-muted">Email</dt>
                <dd className="break-all text-right font-semibold">
                  {email.trim()}
                </dd>
              </div>
            )}
          </dl>

          <div className="rounded-xl border border-hero-cyan/25 bg-hero-cyan/8 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hero-cyan">
              Amount to send
            </p>
            <p className="mt-1 text-[28px] font-extrabold leading-none tracking-[-0.02em] text-accent">
              {PRICE_FOUNDING}
            </p>
            <p className="mt-1.5 text-[12.5px] text-white/60">
              First month at the founding rate. Already filled — do not type it.
            </p>
          </div>

          <fieldset className="border-b border-white/10 pb-4">
            <legend className="float-left mb-2 text-[13.5px] font-semibold">
              How would you like to pay?
            </legend>
            <div className="clear-both space-y-2.5">
              {STRIPE_PAYMENT_LINK && (
                <label className="flex min-h-11 items-start gap-2.5 text-[13.5px] font-medium">
                  <input
                    type="radio"
                    name="bk-pay"
                    checked={payMethod === "card"}
                    onChange={() => setPayMethod("card")}
                    className="mt-0.5 size-4 accent-[#2ee6e0]"
                  />
                  <span>
                    Pay {PRICE_FOUNDING} now by card
                    <span className="block text-[12.5px] font-normal text-muted">
                      Secure checkout powered by Stripe.
                    </span>
                  </span>
                </label>
              )}
              {STRIPE_PAYMENT_LINK && payMethod === "card" && (
                <a
                  href={STRIPE_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.stripeOpened(industry)}
                  className="ml-6 inline-flex min-h-11 items-center justify-center rounded-full border border-hero-cyan px-4 py-2 text-[13.5px] font-bold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
                >
                  Open secure card payment
                </a>
              )}
              <label className="flex min-h-11 items-start gap-2.5 text-[13.5px] font-medium">
                <input
                  type="radio"
                  name="bk-pay"
                  checked={payMethod === "momo"}
                  onChange={() => setPayMethod("momo")}
                  className="mt-0.5 size-4 accent-[#2ee6e0]"
                />
                <span>Pay {PRICE_FOUNDING} now by Mobile Money</span>
              </label>
              <label className="flex min-h-11 items-start gap-2.5 text-[13.5px] font-medium">
                <input
                  type="radio"
                  name="bk-pay"
                  checked={payMethod === "later"}
                  onChange={() => setPayMethod("later")}
                  className="mt-0.5 size-4 accent-[#2ee6e0]"
                />
                <span>
                  I&apos;ll pay after setup
                  {payMethod === "later" && (
                    <span className="block text-[12.5px] font-normal text-muted">
                      No problem — we&apos;ll sort payment together during your
                      setup call.
                    </span>
                  )}
                </span>
              </label>
            </div>
          </fieldset>

          {payMethod === "momo" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/12 px-4 py-3 text-[13.5px] leading-[1.55]">
                <p>
                  Send to{" "}
                  <strong className="whitespace-nowrap">{MOMO_NUMBER_DISPLAY}</strong>
                </p>
                <p className="mt-1">
                  Registered name must read{" "}
                  <strong>{MOMO_ACCOUNT_NAME}</strong> before you confirm.
                </p>
                <p className="mt-1 text-white/60">
                  Amount {PRICE_FOUNDING} ({PRICE_FOUNDING_AMOUNT}).
                </p>
              </div>

              {phoneForMessage ? (
                <p className="text-[13px] leading-[1.55] text-white/70">
                  Paying from {phoneForMessage} — the number you already
                  entered. No need to type it again.
                </p>
              ) : null}

              <div
                role="group"
                aria-label="Mobile Money network"
                className="flex flex-wrap gap-2"
              >
                <button
                  type="button"
                  aria-pressed={momoNetwork === "mtn"}
                  onClick={() => setMomoNetwork("mtn")}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
                    momoNetwork === "mtn"
                      ? "border-hero-cyan/40 bg-hero-cyan/15 text-hero-cyan"
                      : "border-white/12 text-white/70",
                  )}
                >
                  MTN Mobile Money
                </button>
                <button
                  type="button"
                  aria-pressed={momoNetwork === "airtel"}
                  onClick={() => setMomoNetwork("airtel")}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
                    momoNetwork === "airtel"
                      ? "border-hero-cyan/40 bg-hero-cyan/15 text-hero-cyan"
                      : "border-white/12 text-white/70",
                  )}
                >
                  Airtel Money
                </button>
              </div>

              {momoNetwork === "mtn" ? (
                <div className="space-y-3">
                  <a
                    href={MTN_MOMO_TEL_HREF}
                    className={cn(amberCta, "w-full text-center")}
                  >
                    Open MTN MoMo — confirm &amp; enter PIN
                  </a>
                  <p className="text-[12.5px] leading-[1.55] text-white/55">
                    On a phone, this opens the dialer with the USSD already
                    filled in. You confirm and enter your PIN. We cannot enter
                    the PIN for you.
                  </p>
                  <p className="break-all font-mono text-[12px] text-white/50">
                    {MTN_MOMO_USSD}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[13.5px] leading-[1.55] text-white/75">
                    Open the Airtel Money app and send {PRICE_FOUNDING} to{" "}
                    {MOMO_NUMBER_DISPLAY}. Check the name shows{" "}
                    {MOMO_ACCOUNT_NAME}. We do not invent an Airtel USSD code.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <CopyChip
                  label="Copy number"
                  value={MOMO_NUMBER_DIGITS}
                  copiedKey="number"
                  copied={copied}
                  onCopy={copyValue}
                />
                <CopyChip
                  label="Copy amount"
                  value={String(PRICE_FOUNDING_AMOUNT)}
                  copiedKey="amount"
                  copied={copied}
                  onCopy={copyValue}
                />
                {momoNetwork === "mtn" ? (
                  <CopyChip
                    label="Copy USSD"
                    value={MTN_MOMO_USSD}
                    copiedKey="ussd"
                    copied={copied}
                    onCopy={copyValue}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p aria-live="polite" className="mt-3 text-[13px] font-semibold text-destructive">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan sm:justify-start"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className={cn(amberCta, "min-h-11 w-full px-5 py-2.5 text-[14px] sm:w-auto")}
          >
            Next
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        ) : (
          <a
            href={whatsappAppUrl(message)}
            aria-label="Send your booking details to Veltan on WhatsApp"
            onClick={(event) => {
              event.preventDefault();
              analytics.ctaClicked("booking", industry);
              setShowWhatsAppHelp(true);
              const reduced = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              requestAnimationFrame(() => {
                helpRef.current?.scrollIntoView({
                  behavior: reduced ? "auto" : "smooth",
                  block: "center",
                });
              });
              cancelWhatsAppRef.current?.();
              cancelWhatsAppRef.current = openWhatsApp({
                message,
                onNeedHelp: () => setShowWhatsAppHelp(true),
              });
            }}
            className={cn(amberCta, "min-h-11 w-full px-5 py-2.5 text-[14px] sm:w-auto")}
          >
            <Check aria-hidden="true" className="size-4" />
            Send booking on WhatsApp
          </a>
        )}
      </div>

      {step === 2 && showWhatsAppHelp ? (
        <div ref={helpRef} className="mt-5 scroll-mt-32" aria-live="polite">
          <WhatsAppNextSteps message={message} />
        </div>
      ) : null}
    </div>
  );
}
