import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Instrument_Serif } from "next/font/google";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ConsoleMessage } from "@/components/layout/ConsoleMessage";
import { Providers } from "./providers";
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
  "Claire is an AI-native system of record for your business's insurance. She understands your coverage and takes action without letting anything slip.";

export const metadata: Metadata = {
  title: "Meet Claire — AI-Native Insurance Management",
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
  metadataBase: new URL("https://claire.claritylabs.inc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meet Claire — AI-Native Insurance Management",
    description: claireDescription,
    type: "website",
    siteName: "Clarity Labs",
    url: "https://claire.claritylabs.inc",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Claire — AI-Native Insurance Management",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clarity Labs",
              url: "https://claire.claritylabs.inc",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
