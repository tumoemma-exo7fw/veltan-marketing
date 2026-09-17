import { NextResponse } from "next/server";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function safeReturnPath(value: string | null): string {
  if (value === "/login" || value === "/") return value;
  return "/";
}

export async function POST(request: Request) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  let next = "/";
  const contentType = request.headers.get("content-type") ?? "";
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    const raw = form.get("next");
    next = safeReturnPath(typeof raw === "string" ? raw : null);
  } else {
    next = safeReturnPath(new URL(request.url).searchParams.get("next"));
  }

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
