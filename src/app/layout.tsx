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
  title: "Clarity — AI-powered insurance management",
  description: "Insurance is broken for the people who need it most. Clarity makes insurance simple and autonomous for businesses.",
  metadataBase: new URL("https://claritylabs.inc"),
  openGraph: {
    title: "Clarity — AI-powered insurance management",
    description: "Insurance is broken for the people who need it most. Clarity makes insurance simple and autonomous for businesses.",
    type: "website",
    siteName: "Clarity Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarity — AI-powered insurance management",
    description: "Insurance is broken for the people who need it most. Clarity makes insurance simple and autonomous for businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
