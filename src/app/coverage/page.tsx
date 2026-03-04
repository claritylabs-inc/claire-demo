"use client";

import { CoverageOverview } from "@/components/views/CoverageOverview";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";

export default function CoveragePage() {
  const { openChat } = useChatOverlay();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <BackButton href="/" />
      <BookDemoButton onClick={openChat} />
      <CoverageOverview onOpenChat={openChat} />
    </div>
  );
}
