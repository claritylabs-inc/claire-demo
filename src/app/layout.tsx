import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Instrument_Serif } from "next/font/google";
import { CommandPalette } from "@/components/CommandPalette";
import { ConsoleMessage } from "@/components/ConsoleMessage";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Clarity — AI-powered insurance management for businesses",
  description:
    "Clarity makes commercial insurance simple and autonomous for businesses. Our AI agent Clair manages your policies, answers due diligence questions, sends COIs, flags coverage gaps, and helps you buy or renew insurance — all on autopilot.",
  keywords: [
    "commercial insurance",
    "AI insurance",
    "insurance management",
    "business insurance",
    "insurance automation",
    "COI management",
    "Clarity Labs",
    "Clair AI",
    "insurtech",
    "insurance for startups",
    "insurance for contractors",
  ],
  metadataBase: new URL("https://claritylabs.inc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clarity — AI-powered insurance management for businesses",
    description:
      "Clarity makes commercial insurance simple and autonomous for businesses. Our AI agent Clair manages your policies, answers questions, and helps you buy or renew insurance on autopilot.",
    type: "website",
    siteName: "Clarity Labs",
    url: "https://claritylabs.inc",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarity — AI-powered insurance management for businesses",
    description:
      "Clarity makes commercial insurance simple and autonomous for businesses. Our AI agent Clair manages your policies and helps you buy or renew insurance on autopilot.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clarity Labs",
              url: "https://claritylabs.inc",
              email: "hello@claritylabs.inc",
              description:
                "Clarity makes commercial insurance simple and autonomous for businesses using AI. Our agent Clair manages policies, sends COIs, flags coverage gaps, and helps buy or renew insurance on autopilot.",
              founder: [
                { "@type": "Person", name: "Adyan Tanver" },
                { "@type": "Person", name: "Terry" },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${instrumentSerif.variable} antialiased`}
      >
        <CommandPalette />
        <ConsoleMessage />
        {children}
      </body>
    </html>
  );
}
