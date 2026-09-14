import { NextResponse } from "next/server";

import { safeNextPath } from "@/lib/auth-validation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function redirectWithCookies(
  url: URL,
  supabase: Awaited<ReturnType<typeof createClient>>,
) {
  void supabase;
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = safeNextPath(requestUrl.searchParams.get("next"));
  const errorDescription = requestUrl.searchParams.get("error_description");

  const login = new URL("/login", requestUrl.origin);

  if (errorDescription) {
    login.searchParams.set("error", "google");
    return NextResponse.redirect(login);
  }

  if (!code || !isSupabaseConfigured()) {
    login.searchParams.set("error", "google");
    return NextResponse.redirect(login);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    login.searchParams.set("error", "google");
    return NextResponse.redirect(login);
  }

  return redirectWithCookies(new URL(next, requestUrl.origin), supabase);
}
