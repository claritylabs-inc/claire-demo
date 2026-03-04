"use client";

import Link from "next/link";
import { DashboardView } from "@/components/views/DashboardView";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { MeetClaireHeader } from "@/components/layout/MeetClaireHeader";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function DashboardPage() {
  const { openChat } = useChatOverlay();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <BackButton href="/coverage" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <MeetClaireHeader
            subtitle="The dashboard demo is best experienced on a larger screen."
            logoSize={32}
          />
          <Link
            href="/coverage"
            className="inline-flex items-center gap-1.5 text-body-sm text-primary hover:text-primary-muted transition-colors font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to use cases</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <BackButton href="/coverage" />
      <BookDemoButton onClick={openChat} />
      <DashboardView onOpenChat={openChat} />
    </div>
  );
}
