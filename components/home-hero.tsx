"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { analytics } from "@/lib/analytics";
import type { IndustryId } from "@/lib/content";
import { amberCta } from "@/lib/ui";
import { cn } from "@/lib/utils";

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDBhjJG0RMx9QK2dMWW1cSlNgCkYcEAmrkf+rX6Ckl/1X/A6sxtZn//2Q==";

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

export function HomeHero({ industry }: { industry: IndustryId }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-x-clip bg-[#071c1e] text-white"
    >
      <h1 className="sr-only">
        Let Your Clinic Never Miss a Lead — Veltan clinic follow-up
      </h1>

      {/*
        Mobile: sit the 16:9 still below the two-row header so baked copy
        stays visible. Desktop: full-bleed 16:9 with the site header overlaid
        on the empty teal at the top of the plate.
      */}
      <div className="pt-[7.75rem] lg:pt-0">
        <div className="relative aspect-[16/9] w-full bg-[#071c1e]">
          <Image
            src="/brand/hero-dental-clinic.png"
            alt="Modern dental clinic treatment room. Headline: Let Your Clinic Never Miss a Lead."
            fill
            preload
            quality={90}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="100vw"
            className="object-contain object-center"
          />
          <GetStarted
            industry={industry}
            className="absolute top-[74%] left-[10.8%] z-10 hidden lg:inline-flex"
          />
        </div>

        <div className="flex justify-start px-5 py-5 sm:px-8 lg:hidden">
          <GetStarted industry={industry} />
        </div>
      </div>
    </section>
  );
}
