"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { BrandName } from "@/components/BrandName";
import { LogoIcon } from "@/components/LogoIcon";
import { CTAButton } from "@/components/CTAButton";
import { CTA_PHONE, CTA_PHONE_HREF } from "@/data/demoData";

const BOOK_DEMO_URL = "https://cal.com/team/claritylabs/demo";
const QR_VALUE = "sms:+16476930328?body=My landlord needs proof of insurance for our lease renewal.";

export function TryClaireHeading() {
  return (
    <>
      <p className="text-2xl sm:text-3xl font-normal text-foreground-highlight mb-6">
        <BrandName className="inline-flex items-center gap-1.5 text-2xl sm:text-3xl">
          Text{"  "}
          <LogoIcon size={24} className="shrink-0 ml-1.5" />
          Claire
        </BrandName>
      </p>
      <p className="text-base text-muted max-w-sm mx-auto block md:hidden">
        Text{" "}
        <a
          href={CTA_PHONE_HREF}
          className="text-sm inline-block text-foreground hover:text-foreground-highlight hover:bg-foreground/8 active:bg-foreground/12 transition-colors px-2 py-1 m-1 rounded-md border border-foreground/8 hover:border-foreground/15 cursor-pointer"
        >
          {CTA_PHONE}
        </a>{" "}
        and try Claire for yourself.
      </p>
    </>
  );
}


export function ChatStepCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center gap-4 sm:gap-5 text-center"
    >
      {/* Desktop: heading here; mobile: shown above phone in ChatStep */}
      <div className="hidden md:flex flex-col items-center">
        <TryClaireHeading />
      </div>

      <p className="text-base text-muted max-w-xs mx-auto hidden md:block mb-6">
        Scan the QR code to text{" "}
        <a
          href={CTA_PHONE_HREF}
          className="text-sm inline-block text-foreground hover:text-foreground-highlight hover:bg-foreground/8 active:bg-foreground/12 transition-colors px-2 py-1 m-1 rounded-md border border-foreground/8 hover:border-foreground/15 cursor-pointer"
        >
          {CTA_PHONE}
        </a>{" "}
        and try Claire for yourself.
      </p>

      <div className="hidden md:block p-4 rounded-2xl border border-foreground/6 bg-white/50">
        <QRCodeSVG
          value={QR_VALUE}
          size={140}
          level="M"
          bgColor="transparent"
          fgColor="#111827"
        />
      </div>

      <CTAButton
        label="Book a Demo"
        href={BOOK_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2"
      />
    </motion.div>
  );
}
