import { TESTIMONIALS } from "@/lib/content";

/**
 * Honest empty state until there are real customers (spec §12). Add entries
 * to TESTIMONIALS in lib/content.ts and the three-card grid takes over.
 */
export function SocialProof() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 text-center sm:px-8 lg:py-20">
      <h2 className="text-[22px] font-extrabold sm:text-[26px]">
        Trusted by Kampala businesses
      </h2>
      {TESTIMONIALS.length === 0 ? (
        <div className="mx-auto mt-6 max-w-xl rounded-card border border-dashed border-text/20 bg-surface px-6 py-8">
          <p className="text-[15px] font-semibold">
            Now onboarding our first 12 founding businesses.
          </p>
          <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted">
            No borrowed logos, no invented quotes — real customer stories will
            appear here as the Founding 12 go live.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 text-left lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-card border border-line bg-surface p-6"
            >
              <blockquote className="text-[14.5px] leading-[1.6]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px]">
                <span className="font-bold">{t.name}</span>
                <span className="text-muted"> · {t.business}</span>
                <span className="mt-2 block">
                  <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                    {t.industry}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
