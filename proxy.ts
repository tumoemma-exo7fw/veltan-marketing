import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const PROTECTED_PAGES = new Set(["/continue", "/onboarding"]);

export async function proxy(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request);
  const path = request.nextUrl.pathname;

  if (PROTECTED_PAGES.has(path) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
