import type { IndustryContent } from "@/lib/content";

export function HowItWorks({ content }: { content: IndustryContent }) {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="max-w-xl">
        <h2 className="text-[24px] font-extrabold tracking-[-0.01em] sm:text-[29px]">
          How it works
        </h2>
        <p className="mt-2 text-[15px] leading-[1.6] text-muted">
          Same phone, same number. Veltan just catches what you can&apos;t.
        </p>
      </div>
      <ol className="mt-8 grid border-t border-line lg:grid-cols-3">
        {content.steps.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-line py-5 lg:block lg:border-b-0 lg:border-r lg:px-6 lg:py-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <span
              aria-hidden="true"
              className="font-mono text-[13px] font-semibold tabular-nums text-secondary"
            >
              0{i + 1}
            </span>
            <div>
              <h3 className="text-[16px] font-bold lg:mt-4">{step.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
