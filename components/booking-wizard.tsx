"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import {
  MOMO_ACCOUNT_NAME,
  MOMO_NUMBER_DISPLAY,
  PRICE_FOUNDING,
  whatsappLink,
} from "@/lib/site";
import { cn } from "@/lib/utils";

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
  "w-full rounded-bubble border border-line bg-surface px-3.5 py-2.5 text-[16px] text-text outline-none transition-colors placeholder:text-muted/60 focus:border-secondary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary";

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
  const [payUpfront, setPayUpfront] = useState(false);
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
    payUpfront
      ? `Payment: I'm sending ${PRICE_FOUNDING} upfront by Mobile Money to lock my seat.`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="mx-auto mt-4 max-w-md rounded-card border border-line bg-surface p-6 text-left sm:p-8">
      <h3 className="text-[16px] font-bold">Book your founding spot</h3>
      <p className="mt-1.5 text-[14px] leading-[1.55] text-muted">
        Three quick steps. Your details arrive as a WhatsApp message and we
        take it from there — most businesses are live the same day.
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
                      "rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                      active
                        ? "border-text bg-text text-bg"
                        : "border-line text-muted hover:bg-surface-2 hover:text-text",
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
          <dl className="space-y-2 rounded-bubble border border-line p-4 text-[14px]">
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

          <div className="rounded-bubble bg-surface-2/60 p-4">
            <p className="text-[13.5px] font-semibold">
              Optional — pay now to lock your seat instantly
            </p>
            <p className="mt-1 text-[13px] leading-[1.55] text-muted">
              Send {PRICE_FOUNDING} by Mobile Money to{" "}
              <strong className="whitespace-nowrap text-text">
                {MOMO_NUMBER_DISPLAY}
              </strong>
              . Check the registered name shows{" "}
              <strong className="text-text">{MOMO_ACCOUNT_NAME}</strong> before
              you confirm.
            </p>
            <label className="mt-3 flex items-start gap-2.5 text-[13.5px] font-medium">
              <input
                type="checkbox"
                checked={payUpfront}
                onChange={(e) => setPayUpfront(e.target.checked)}
                className="mt-0.5 size-4 accent-[#1a4645]"
              />
              I&apos;m paying upfront by Mobile Money
            </label>
          </div>
        </div>
      )}

      {error && (
        <p aria-live="polite" className="mt-3 text-[13px] font-semibold text-[#b3261e]">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#b56f18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#b56f18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Check aria-hidden="true" className="size-4" />
            Send booking on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
