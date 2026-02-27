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
  title: "Clarity Labs",
  description:
    "Clarity Labs is an Applied AI Research Lab working to make insurance simple and autonomous for businesses. Our mission is to build tools that make it easy for businesses to manage their insurance, trust each other when completing transactions, and for insurance companies to better understand the businesses they serve.",
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
    title: "AI that makes insurance simple and autonomous for businesses",
    description:
      "Clarity Labs is an Applied AI Research Lab working to make insurance simple and autonomous for businesses. Our mission is to build tools that make it easy for businesses to manage their insurance, trust each other when completing transactions, and for insurance companies to better understand the businesses they serve.",
    type: "website",
    siteName: "Clarity Labs",
    url: "https://claritylabs.inc",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI that makes insurance simple and autonomous for businesses",
    description:
      "Clarity Labs is an Applied AI Research Lab working to make insurance simple and autonomous for businesses. Our mission is to build tools that make it easy for businesses to manage their insurance, trust each other when completing transactions, and for insurance companies to better understand the businesses they serve.",
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
                "Clarity Labs is an Applied AI Research Lab working to make insurance simple and autonomous for businesses. Our mission is to build tools that make it easy for businesses to manage their insurance, trust each other when completing transactions, and for insurance companies to better understand the businesses they serve.",
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
