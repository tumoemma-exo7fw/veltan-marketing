import type { Metadata, Viewport } from "next";
import { Genos, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import {
  DISCOUNT_LABEL,
  DISCOUNT_MONTHS,
  FOUNDING_SEATS,
  GOOGLE_SITE_VERIFICATION,
  LAUNCH_DATE_ISO,
  LAUNCH_DATE_LABEL,
  PRICE_FOUNDING,
  PRICE_FOUNDING_AMOUNT,
  PRICE_ORIGINAL,
  PRICE_ORIGINAL_AMOUNT,
  SITE_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Reserved exclusively for the VELTAN wordmark — never body copy.
const genos = Genos({
  subsets: ["latin"],
  variable: "--font-genos",
});

const TITLE = "Veltan — Never lose a client to a missed call | Kampala";
// Industry-neutral on purpose: an OG preview can't know which pill the
// recipient will land on.
const DESCRIPTION = `Veltan texts missed callers back in seconds, in your business's name — for Kampala dental clinics, trades, and real estate. ${FOUNDING_SEATS} founding seats: ${PRICE_FOUNDING}/month for ${DISCOUNT_MONTHS} months (${DISCOUNT_LABEL}), then ${PRICE_ORIGINAL}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Veltan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Veltan",
    locale: "en_UG",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

/**
 * Structured data so search engines associate the "Veltan" brand with this
 * domain: who Veltan is, where it operates, and what the product costs.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Veltan",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/veltan-app-icon-512.png`,
      description:
        "Veltan builds operational software for local businesses. Its Client Follow-Up System automatically texts back missed callers within seconds, in the business's name.",
      areaServed: "Kampala, Uganda",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: WHATSAPP_DISPLAY.replace(/\s/g, ""),
      },
      // Add real profiles here as they exist (LinkedIn, Facebook, etc.).
      sameAs: [`https://wa.me/${WHATSAPP_DISPLAY.replace(/[^\d]/g, "")}`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Veltan",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      name: "Veltan Client Follow-Up System",
      serviceType: "Missed-call text-back service",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Kampala, Uganda",
      description:
        "When a business misses an incoming phone call, Veltan automatically texts the caller back within seconds so the lead is not lost to a competitor.",
      offers: [
        {
          "@type": "Offer",
          name: `Founding ${FOUNDING_SEATS} — first ${DISCOUNT_MONTHS} months`,
          price: String(PRICE_FOUNDING_AMOUNT),
          priceCurrency: "UGX",
          availability: "https://schema.org/LimitedAvailability",
          priceValidUntil: LAUNCH_DATE_ISO,
          description: `${DISCOUNT_LABEL} for ${DISCOUNT_MONTHS} months only (${PRICE_FOUNDING}/month), then ${PRICE_ORIGINAL}/month. Window closes ${LAUNCH_DATE_LABEL} or when ${FOUNDING_SEATS} seats are taken.`,
        },
        {
          "@type": "Offer",
          name: "Regular monthly",
          price: String(PRICE_ORIGINAL_AMOUNT),
          priceCurrency: "UGX",
          description: `Standard rate after the ${DISCOUNT_MONTHS}-month founding discount.`,
        },
      ],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#071c1e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${genos.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
