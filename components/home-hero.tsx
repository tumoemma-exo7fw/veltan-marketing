"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Check,
  Shield,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import { amberCta } from "@/lib/ui";

const TIMELINE = [
  { title: "Appointment Completed", day: "Day 0" },
  { title: "Reminder Sent", day: "Day 1" },
  { title: "Follow Up Message", day: "Day 3" },
  { title: "Next Visit Scheduled", day: "Day 7" },
] as const;

const heroGlass =
  "rounded-2xl border border-white/15 bg-[rgb(12_42_45/0.9)] shadow-[0_16px_48px_rgb(0_0_0/0.4)] backdrop-blur-md";

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAHxAAAgECBwAAAAAAAAAAAAAAAQMAAkEEBRIyNIGR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAMAwEAAhEDEQA/ACq0NtRV5EeThmFIaadIAvLRsE1N43cWnDG//9k=";

const HIGHLIGHTS = [
  { icon: CalendarCheck, label: "Automated Follow-Ups" },
  { icon: Users, label: "Better Patient Retention" },
  { icon: TrendingUp, label: "More Appointments" },
  { icon: Shield, label: "Healthier Practices" },
] as const;

function DemoTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5">
      <span className="size-1.5 animate-pulse-dot rounded-full bg-hero-cyan" />
      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/80">
        Demo
      </span>
    </span>
  );
}

function FollowUpTimeline() {
  return (
    <div className={`${heroGlass} p-4 sm:p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hero-cyan/15 text-hero-cyan">
            <User className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-white">
              Patient Follow Up
            </p>
            <p className="text-[11px] text-white/70">
              Automated • On Time • Every Time
            </p>
          </div>
        </div>
        <DemoTag />
      </div>
      <ol className="relative mt-4 space-y-3 border-l border-hero-cyan/35 pl-4">
        {TIMELINE.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[1.4rem] top-0.5 flex size-4 items-center justify-center rounded-full bg-hero-cyan text-[#0b2426] shadow-[0_0_10px_rgb(46_230_224/0.55)]">
              <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <p className="text-[13px] font-medium text-white">{item.title}</p>
            <p className="text-[11px] text-white/55">{item.day}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RetentionWidget() {
  const value = 92;
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - value / 100);

  return (
    <div className={`${heroGlass} px-4 py-3`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-[12px] font-medium text-white/80">Patient Retention</p>
        <DemoTag />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative size-[72px] shrink-0">
          <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden="true">
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="rgb(255 255 255 / 0.14)"
              strokeWidth="6"
            />
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="currentColor"
              className="text-hero-cyan"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold text-white">
            {value}%
          </span>
        </div>
        <span className="text-sm text-emerald-300" aria-hidden="true">
          ↑
        </span>
      </div>
    </div>
  );
}

function FollowUpsWidget() {
  return (
    <div className={`${heroGlass} px-4 py-3`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-white/80">
          <CalendarDays className="size-3.5 text-hero-cyan" aria-hidden="true" />
          Follow Ups Today
        </p>
        <DemoTag />
      </div>
      <p className="flex items-baseline gap-2 text-[28px] font-extrabold leading-none text-white">
        48
        <span className="text-sm font-medium text-emerald-300" aria-hidden="true">
          ↑
        </span>
      </p>
    </div>
  );
}

export function HomeHero({ industry }: { industry: IndustryId }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-x-clip bg-[#071c1e] text-white"
    >
      <div className="grid pt-[7.75rem] lg:pt-16">
        <div className="relative aspect-[16/9] w-full self-start bg-[#071c1e] lg:col-start-1 lg:row-start-1">
          <Image
            src="/brand/hero-dental-clinic.jpg"
            alt="Modern dental clinic treatment room with a teal chair and city skyline"
            fill
            preload
            quality={90}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="100vw"
            className="object-contain object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(7_28_30)_100%)] lg:bg-[linear-gradient(90deg,rgb(8_28_30)_0%,rgb(8_28_30/0.96)_32%,rgb(8_28_30/0.88)_46%,rgb(8_28_30/0.58)_58%,rgb(8_28_30/0.22)_70%,rgb(8_28_30/0.08)_82%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(8_28_30/0.5)_0%,transparent_20%,transparent_72%,rgb(8_28_30/0.78)_100%)] lg:block"
          />
        </div>

        <div className="relative z-10 flex min-h-full w-full flex-col lg:col-start-1 lg:row-start-1">
          <div className="mx-auto flex min-h-full w-full max-w-6xl flex-1 flex-col px-5 pb-6 pt-6 sm:px-8 lg:pt-10">
            <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                  Automate&nbsp;&nbsp;/&nbsp;&nbsp;Engage&nbsp;&nbsp;/&nbsp;&nbsp;Grow
                </p>
                <h1 className="mt-4 text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[40px] lg:text-[46px]">
                  Now building{" "}
                  <span className="text-hero-cyan [text-shadow:0_0_28px_rgb(46_230_224/0.35)]">
                    Client Follow Up System
                  </span>{" "}
                  for Dental Clinics
                </h1>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-white/80 sm:text-[16.5px]">
                  Keep your patients engaged, improve retention, and grow your
                  practice — all in one intelligent system.
                </p>
                <a
                  href="#pricing"
                  onClick={() => analytics.ctaClicked("hero", industry)}
                  className={`${amberCta} mt-7`}
                >
                  Get Started
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>

              <aside
                className="relative min-w-0"
                aria-label="Product preview of automated patient follow-up. Figures are illustrative demo chrome, not published Veltan metrics."
              >
                <div className="lg:hidden">
                  <FollowUpTimeline />
                  <div className="mt-3 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                    <RetentionWidget />
                    <FollowUpsWidget />
                  </div>
                </div>

                <div className="relative hidden min-h-[420px] lg:block">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgb(8_28_30/0.5)_0%,rgb(8_28_30/0.18)_58%,transparent_76%)]"
                  />
                  <div className="absolute left-0 top-10 z-10 w-[min(100%,20rem)]">
                    <FollowUpTimeline />
                  </div>
                  <div className="absolute right-0 top-0 z-20 w-[11.5rem]">
                    <RetentionWidget />
                  </div>
                  <div className="absolute bottom-6 right-0 z-20 w-52">
                    <FollowUpsWidget />
                  </div>
                </div>
                <p className="mt-3 text-[11px] leading-snug text-white/55 lg:mt-0 lg:sr-only">
                  Demo preview — sample figures that illustrate the system, not
                  live Veltan metrics.
                </p>
              </aside>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 py-5 sm:grid-cols-4 lg:mt-4">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-[12px] font-medium text-white/80 sm:justify-center sm:text-[13px]"
                >
                  <Icon
                    className="size-4 shrink-0 text-white"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
