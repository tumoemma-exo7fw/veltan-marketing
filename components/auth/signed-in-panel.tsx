import { authPrimaryClass } from "@/components/auth/fields";
import { cn } from "@/lib/utils";

export function SignedInPanel({ email }: { email: string }) {
  return (
    <div className="space-y-4">
      <a
        href="/continue"
        className={cn(authPrimaryClass, "flex items-center justify-center")}
      >
        <span className="max-w-full truncate">Continue as {email}</span>
      </a>
      <form action="/auth/signout" method="POST" className="text-center">
        <input type="hidden" name="next" value="/login" />
        <button
          type="submit"
          className="text-[13px] font-medium text-white/55 underline-offset-4 transition-colors hover:text-white/80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
        >
          Use a different account
        </button>
      </form>
    </div>
  );
}
