"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  MessagesSquare,
  PhoneCall,
  RefreshCw,
  Users,
} from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import { amberCta } from "@/lib/ui";
import { cn } from "@/lib/utils";

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAJABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAIBAAAgECBwEAAAAAAAAAAAAAAQMABBECBRIyNEFxUv/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARMf/aAAwDAQACEQMRAD8AMJp2fBt5EGThlLiDdNgB3KRsE1t4w9i9pwxv/9k=";

const FEATURES = [
  { icon: PhoneCall, lines: ["Missed Call", "Follow-Ups"] },
  { icon: MessagesSquare, lines: ["Intelligent", "Conversations"] },
  { icon: CalendarCheck, lines: ["Automatic", "Bookings"] },
] as const;

function AlwaysOnIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center text-hero-cyan",
        className,
      )}
    >
      <RefreshCw aria-hidden="true" className="size-full" strokeWidth={1.75} />
      <span className="absolute text-[7px] font-bold leading-none tracking-tight xl:text-[8px]">
        24/7
      </span>
    </span>
  );
}

function GetStarted({
  industry,
  className,
}: {
  industry: IndustryId;
  className?: string;
}) {
  return (
    <a
      href="#pricing"
      onClick={() => analytics.ctaClicked("hero", industry)}
      className={cn(amberCta, className)}
    >
      Get Started
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}

function FeatureGrid({ overlay }: { overlay: boolean }) {
  const itemClass = overlay
    ? "flex min-w-0 flex-col items-start gap-1.5 text-[11px] font-medium leading-[1.25] text-white xl:text-[12px]"
    : "flex min-w-0 flex-col items-start gap-1.5 text-[12px] font-medium leading-[1.25] text-white";
  const iconClass = overlay
    ? "size-[1.35rem] text-hero-cyan xl:size-7"
    : "size-7 text-hero-cyan";

  return (
    <ul
      className={cn(
        "grid grid-cols-4",
        overlay ? "gap-x-2 xl:gap-x-3" : "gap-x-3",
      )}
    >
      {FEATURES.map(({ icon: Icon, lines }, i) => (
        <li
          key={lines.join(" ")}
          className={cn(itemClass, i > 0 && "border-l border-white/20 pl-2.5 xl:pl-3")}
        >
          <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
          <span>
            {lines[0]}
            <br />
            {lines[1]}
          </span>
        </li>
      ))}
      <li className={cn(itemClass, "border-l border-white/20 pl-2.5 xl:pl-3")}>
        <AlwaysOnIcon className={iconClass} />
        <span>
          Works While
          <br />
          You Rest
        </span>
      </li>
    </ul>
  );
}

function HeroCopy({
  industry,
  overlay,
}: {
  industry: IndustryId;
  overlay: boolean;
}) {
  return (
    <div className={cn("text-left", overlay ? "w-full" : "max-w-xl")}>
      <p
        className={cn(
          "font-normal uppercase text-white/70",
          overlay
            ? "text-[10px] tracking-[0.12em] xl:text-[10.5px] xl:tracking-[0.14em]"
            : "text-[10px] tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em]",
        )}
      >
        Smarter Follow-Ups / More Appointments / Less Missed Opportunities
      </p>
      <p
        className={cn(
          "font-extrabold tracking-[-0.02em] text-white",
            overlay
            ? "mt-2 text-[clamp(1.65rem,3.4vw,2.85rem)] leading-[1.08] xl:mt-2.5"
            : "mt-3 text-[32px] leading-[1.1] sm:text-[40px]",
        )}
      >
        <span className="block">Let Your Clinic</span>
        <span className="block text-hero-cyan [text-shadow:0_0_28px_rgb(46_230_224/0.35)]">
          Never Miss a Lead
        </span>
      </p>
      <p
        className={cn(
          "max-w-[46ch] text-white",
            overlay
            ? "mt-2.5 text-[13px] leading-[1.45] xl:mt-3 xl:text-[15px] xl:leading-[1.5]"
            : "mt-4 text-[15px] leading-[1.55] sm:text-[16.5px]",
        )}
      >
        An intelligent follow-up system that calls back, chats with potential
        clients, handles missed calls and books appointments — even when
        you&apos;re busy or off duty.
      </p>
      <div className={overlay ? "mt-3.5 xl:mt-4" : "mt-6"}>
        <FeatureGrid overlay={overlay} />
      </div>
      <div
        className={cn(
          "flex items-start gap-2.5",
          overlay ? "mt-3.5 xl:mt-4" : "mt-6",
        )}
      >
        <Users
          aria-hidden="true"
          className={cn(
            "shrink-0 text-hero-cyan",
            overlay ? "mt-0.5 size-5 xl:size-6" : "mt-0.5 size-6",
          )}
          strokeWidth={1.75}
        />
        <p
          className={cn(
            "text-white",
            overlay
              ? "text-[12.5px] leading-[1.45] xl:text-[14.5px]"
              : "text-[14.5px] leading-[1.5]",
          )}
        >
          We&apos;re looking for{" "}
          <span className="font-bold text-hero-cyan">12 clinics</span> to try it
          out and validate it.
          <span
            className={cn(
              "mt-0.5 block text-white/70",
              overlay ? "text-[11.5px] xl:text-[13px]" : "text-[13px]",
            )}
          >
            No charge. Just your feedback.
          </span>
        </p>
      </div>
      <GetStarted
        industry={industry}
        className={overlay ? "mt-3.5 xl:mt-4" : "mt-6 min-h-11"}
      />
    </div>
  );
}

export function HomeHero({ industry }: { industry: IndustryId }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-x-clip bg-[#071c1e] text-white"
    >
      <h1 className="sr-only">Let Your Clinic Never Miss a Lead</h1>
      {/*
        Mobile: 16:9 clinic plate under the single-row header, then the same
        HTML stack (kicker through Get Started). Desktop: full-bleed 16:9
        with live copy on the teal wall.
      */}
      <div className="pt-16 lg:pt-0">
        <div className="relative aspect-[16/9] w-full bg-[#071c1e]">
          <Image
            src="/brand/hero-dental-clinic.jpg"
            alt="Modern dental clinic treatment room with a teal chair, panoramic X-ray, and city skyline"
            fill
            preload
            quality={90}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="100vw"
            className="object-contain object-center"
          />
          <div className="absolute inset-0 z-10 hidden lg:flex">
            <div className="flex h-full w-[54%] flex-col justify-start pl-[5.8%] pr-6 pt-[7.25rem] pb-8">
              <HeroCopy industry={industry} overlay />
            </div>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 lg:hidden">
          <HeroCopy industry={industry} overlay={false} />
        </div>
      </div>
    </section>
  );
}
