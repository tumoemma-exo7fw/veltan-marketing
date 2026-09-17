import { redirect } from "next/navigation";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = new URLSearchParams();
  if (params.email) next.set("email", params.email);
  if (params.error) next.set("error", params.error);
  redirect(next.size ? `/login?${next.toString()}` : "/login");
}
