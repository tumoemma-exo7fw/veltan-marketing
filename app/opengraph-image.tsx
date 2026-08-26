import { ImageResponse } from "next/og";

import { BRAND_MARK_DATA_URI } from "@/lib/brand-og";

/*
 * Static preview image for link shares — critical for WhatsApp, where this
 * page will mostly be shared. A hand-built still of the phone-demo mockup
 * (spec §11), not a screenshot of the live animation.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Veltan — Never lose a client to a missed call";

const COLORS = {
  bg: "#f5f7f4",
  surface: "#ffffff",
  surface2: "#e9eee9",
  muted: "#4f6b63",
  text: "#12292b",
  accent: "#c97c1e",
  secondary: "#1a4645",
  line: "rgba(18,41,43,0.1)",
};

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: COLORS.bg,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={BRAND_MARK_DATA_URI}
              alt=""
              width={78}
              height={53}
              style={{
                objectFit: "contain",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 30,
                letterSpacing: 12,
                color: COLORS.text,
                fontWeight: 700,
              }}
            >
              VELTAN
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 58,
              lineHeight: 1.1,
              fontWeight: 700,
              color: COLORS.text,
              letterSpacing: -1,
            }}
          >
            Never lose a client to a missed call.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 25,
              lineHeight: 1.45,
              color: COLORS.muted,
            }}
          >
            Veltan texts your caller back within seconds — in your
            business&apos;s name.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 370,
            background: COLORS.surface,
            borderRadius: 36,
            border: `1px solid ${COLORS.line}`,
            padding: 30,
            gap: 20,
            boxShadow: "0 30px 60px rgba(18,41,43,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", fontSize: 18, color: COLORS.muted }}>
              Missed call · just now
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.accent,
                background: "rgba(201,124,30,0.14)",
                padding: "6px 14px",
                borderRadius: 999,
                letterSpacing: 1,
              }}
            >
              MISSED
            </div>
          </div>
          <div
            style={{
              display: "flex",
              background: COLORS.surface2,
              borderRadius: 18,
              padding: 20,
              fontSize: 19,
              lineHeight: 1.45,
              color: COLORS.text,
            }}
          >
            Hi, sorry we missed your call! This is Mirembe Dental — let us know
            what you need and we&apos;ll call you right back to book you in.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              color: COLORS.muted,
              justifyContent: "flex-end",
            }}
          >
            Sent automatically · 8 seconds later
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
