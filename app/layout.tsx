import type { Metadata, Viewport } from "next";
import { Genos, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import {
  GOOGLE_SITE_VERIFICATION,
  PRICE_FOUNDING,
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

const TITLE = "Veltan — Never lose a client to a missed call";
// Industry-neutral on purpose: an OG preview can't know which pill the
// recipient will land on.
const DESCRIPTION =
  "When you can't answer the phone, Veltan texts the caller back within seconds — in your business's name — so the lead doesn't move on to the next number on the list.";

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
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Veltan builds operational software for local businesses. Its Client Follow-Up System automatically texts back missed callers within seconds, in the business's name.",
      areaServed: "Kampala, Uganda",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: WHATSAPP_DISPLAY.replace(/\s/g, ""),
      },
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
      offers: {
        "@type": "Offer",
        price: PRICE_FOUNDING.replace(/[^\d]/g, ""),
        priceCurrency: "UGX",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f5f7f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${genos.variable} h-full antialiased`}
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
