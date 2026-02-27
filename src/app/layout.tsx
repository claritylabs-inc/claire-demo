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

const claireDescription =
  "Claire is a system of record for your business's insurance that understands not just where your policies are, but what they mean. What you're covered for, where you have gaps, when you need to act, and what it'll cost you if you don't.";

export const metadata: Metadata = {
  title: "Claire from Clarity Labs",
  description: claireDescription,
  keywords: [
    "commercial insurance",
    "AI insurance",
    "insurance management",
    "business insurance",
    "insurance automation",
    "COI management",
    "Clarity Labs",
    "Claire AI",
    "insurtech",
    "insurance for startups",
    "insurance for contractors",
  ],
  metadataBase: new URL("https://claritylabs.inc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Claire from Clarity Labs",
    description: claireDescription,
    type: "website",
    siteName: "Clarity Labs",
    url: "https://claritylabs.inc",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claire from Clarity Labs",
    description: claireDescription,
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
              description: claireDescription,
              founder: [
                { "@type": "Person", name: "Adyan Tanver" },
                { "@type": "Person", name: "Terry Wang" },
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
