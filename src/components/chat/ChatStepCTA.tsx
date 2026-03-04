"use client";

import { QRCodeSVG } from "qrcode.react";
import { BrandName } from "@/components/ui/BrandName";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { CTAButton } from "@/components/ui/CTAButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { CTA_PHONE, CTA_PHONE_HREF } from "@/data/demoData";
import { useIsMobile } from "@/hooks/useIsMobile";

function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={CTA_PHONE_HREF}
      className={`inline-block text-sm font-normal hover:font-medium text-foreground hover:text-white px-2 py-1 -m-1 rounded-[18px] rounded-br-[4px] border border-foreground/8 hover:border-transparent hover:bg-primary-light cursor-pointer transition-[color,background-color,border-color,font-weight] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {CTA_PHONE}
    </a>
  );
}

const BOOK_DEMO_URL = "https://cal.com/team/claritylabs/demo";
const QR_VALUE = "sms:+16476930328?body=My landlord needs proof of insurance for our lease renewal.";

export function TryClaireHeading() {
  const isMobile = useIsMobile();
  return (
    <>
      <p className="text-foreground-highlight mb-6">
        <BrandName className="inline-flex items-center gap-2 text-4xl md:text-5xl">
          Try{"  "}
          <LogoIcon size={isMobile ? 32 : 40} className="shrink-0 ml-2" />
          Claire
        </BrandName>
      </p>
      <p className="text-md text-muted max-w-sm mx-auto block md:hidden">
        Claire works over text, email, and chat. Send a message to <PhoneLink className="m-1" /> to try for yourself.
      </p>
    </>
  );
}


export function ChatStepCTA() {
  return (
    <FadeIn
      when={true}
      delay={0.3}
      duration={0.6}
      className="flex flex-col items-center gap-4 sm:gap-5 text-center"
    >
      {/* Desktop: heading here; mobile: shown above phone in ChatStep */}
      <div className="hidden md:flex flex-col items-center">
        <TryClaireHeading />
      </div>

      <p className="text-md text-muted max-w-sm mx-auto hidden md:block mb-6">
        Claire works over text, email, and chat. Scan the QR code to text <PhoneLink className="m-1" /> and try for yourself.
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
    </FadeIn>
  );
}
