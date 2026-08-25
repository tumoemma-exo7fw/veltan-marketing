import type { Metadata, Viewport } from "next";
import { Genos, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SITE_URL } from "@/lib/site";

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
