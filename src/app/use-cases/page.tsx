"use client";

import { CoverageOverview } from "@/components/views/CoverageOverview";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";

export default function UseCasesPage() {
  const { openChat } = useChatOverlay();

  return (
    <>
      <BackButton href="/" />
      <BookDemoButton onClick={openChat} />
      <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
        <CoverageOverview onOpenChat={openChat} />
      </div>
    </>
  );
}
