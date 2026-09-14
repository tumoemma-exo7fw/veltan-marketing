import { SignJWT } from "jose";

const ISSUER = "veltan-marketing";
const AUDIENCE = "veltan-app";
const TTL_SECONDS = 60 * 5;

function ssoSecret(): Uint8Array {
  const secret =
    process.env.VELTAN_SSO_SECRET?.trim() ||
    process.env.BETTER_AUTH_SECRET?.trim() ||
    (process.env.NODE_ENV === "production"
      ? ""
      : "veltan-dev-sso-secret-do-not-use-in-prod");
  if (!secret) {
    throw new Error("VELTAN_SSO_SECRET is required in production.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSsoToken(input: {
  sub: string;
  email: string;
}): Promise<string> {
  return new SignJWT({ email: input.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(input.sub)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${TTL_SECONDS}s`)
    .sign(ssoSecret());
}
