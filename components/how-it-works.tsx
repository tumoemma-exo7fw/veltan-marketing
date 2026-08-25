import type { IndustryContent } from "@/lib/content";

export function HowItWorks({ content }: { content: IndustryContent }) {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="max-w-xl">
        <h2 className="text-[22px] font-extrabold sm:text-[26px]">
          How it works
        </h2>
        <p className="mt-2 text-[15px] leading-[1.55] text-muted">
          Same phone, same number. Veltan just catches what you can&apos;t.
        </p>
      </div>
      <ol className="mt-8 grid gap-4 lg:grid-cols-3">
        {content.steps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-card border border-line bg-surface p-6"
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-[13px] font-extrabold text-secondary"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-[16px] font-bold">{step.title}</h3>
            <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
