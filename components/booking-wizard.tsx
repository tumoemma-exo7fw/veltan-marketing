"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import {
  MOMO_ACCOUNT_NAME,
  MOMO_NUMBER_DISPLAY,
  PRICE_FOUNDING,
  STRIPE_PAYMENT_LINK,
  whatsappLink,
} from "@/lib/site";
import { amberCta, glassPanel } from "@/lib/ui";
import { cn } from "@/lib/utils";

type PayMethod = "card" | "momo" | "later";

const PAYMENT_LINES: Record<PayMethod, string | null> = {
  card: "Payment: I'm paying by card via Stripe.",
  momo: `Payment: I'm sending ${PRICE_FOUNDING} upfront by Mobile Money to lock my seat.`,
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

const STEP_TITLES = ["About your business", "How we reach you", "Check & send"];

const inputClass =
  "w-full rounded-xl border border-white/12 bg-[#071c1e]/70 px-3.5 py-3 text-[16px] text-text outline-none transition-colors placeholder:text-white/40 focus:border-hero-cyan focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hero-cyan";

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
  const [error, setError] = useState<string | null>(null);

  const businessType = chosenType ?? INDUSTRY_TO_TYPE[industry];

  const clearError = () => setError(null);

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
      if (phone.trim().replace(/\D/g, "").length < 9) {
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

  const message = [
    "Hi Veltan, I'd like to book a Founding 12 spot.",
    `Name: ${name.trim()}`,
    `Business: ${business.trim()} (${businessType})`,
    `Phone: ${phone.trim()}`,
    email.trim() ? `Email: ${email.trim()}` : null,
    PAYMENT_LINES[payMethod],
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className={cn(glassPanel, "mx-auto mt-8 max-w-lg p-6 text-left sm:p-8")}>
      <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">
        Reserve your spot
      </h3>
      <p className="mt-1.5 text-[14px] leading-[1.55] text-muted">
        Three short steps. Your answers arrive in our WhatsApp and we take it
        from there.
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
              autoComplete="name"
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
              autoComplete="organization"
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
                      "rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan",
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
              id="bk-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 0772 123 456"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                clearError();
              }}
              className={cn(inputClass, "mt-1.5")}
            />
          </div>
          <div>
            <label htmlFor="bk-email" className="text-[13px] font-semibold">
              Email <span className="font-medium text-muted">(optional)</span>
            </label>
            <input
              id="bk-email"
              type="email"
              inputMode="email"
              autoComplete="email"
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
              <dd className="text-right font-semibold">{phone.trim()}</dd>
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

          <fieldset className="border-b border-white/10 pb-4">
            <legend className="float-left mb-2 text-[13.5px] font-semibold">
              How would you like to pay?
            </legend>
            <div className="clear-both space-y-2.5">
              {STRIPE_PAYMENT_LINK && (
                <label className="flex items-start gap-2.5 text-[13.5px] font-medium">
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
                  className="ml-6 inline-flex items-center justify-center rounded-full border border-hero-cyan px-4 py-2 text-[13.5px] font-bold text-white transition-colors hover:bg-hero-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
                >
                  Open secure card payment
                </a>
              )}
              <label className="flex items-start gap-2.5 text-[13.5px] font-medium">
                <input
                  type="radio"
                  name="bk-pay"
                  checked={payMethod === "momo"}
                  onChange={() => setPayMethod("momo")}
                  className="mt-0.5 size-4 accent-[#2ee6e0]"
                />
                <span>
                  Pay {PRICE_FOUNDING} now by Mobile Money
                  {payMethod === "momo" && (
                    <span className="block text-[12.5px] font-normal leading-[1.55] text-muted">
                      Send to{" "}
                      <strong className="whitespace-nowrap text-text">
                        {MOMO_NUMBER_DISPLAY}
                      </strong>{" "}
                      — check the registered name shows{" "}
                      <strong className="text-text">{MOMO_ACCOUNT_NAME}</strong>{" "}
                      before you confirm.
                    </span>
                  )}
                </span>
              </label>
              <label className="flex items-start gap-2.5 text-[13.5px] font-medium">
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
        </div>
      )}

      {error && (
        <p aria-live="polite" className="mt-3 text-[13px] font-semibold text-destructive">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className={cn(amberCta, "min-h-11 px-5 py-2.5 text-[14px]")}
          >
            Next
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        ) : (
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send your booking details to Veltan on WhatsApp"
            onClick={() => analytics.ctaClicked("booking", industry)}
            className={cn(amberCta, "min-h-11 px-5 py-2.5 text-[14px]")}
          >
            <Check aria-hidden="true" className="size-4" />
            Send booking on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
