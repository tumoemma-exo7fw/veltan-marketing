import Image from "next/image";
import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip bg-[#071c1e] text-text">
      <div aria-hidden="true" className="auth-atmosphere pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex w-full max-w-[22.5rem] flex-1 flex-col justify-center px-5 py-12 sm:max-w-[24rem] sm:px-6">
        <header className="text-center">
          <Link
            href="/#home"
            className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-cyan"
            aria-label="Veltan home"
          >
            <Image
              src="/brand/veltan-mark-icon-on-dark.png"
              alt=""
              width={1024}
              height={1024}
              preload
              className="mx-auto h-auto w-[4.5rem] object-contain sm:w-20"
            />
          </Link>
          <p className="mt-5 text-[28px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[32px]">
            Veltan
          </p>
          <p className="mt-3 text-[14px] leading-snug text-white/50">
            Smarter systems.
            <br />
            Stronger connections.
          </p>
        </header>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
