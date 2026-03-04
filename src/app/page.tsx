"use client";

import { useRouter } from "next/navigation";
import { PolicyUploadStep } from "@/components/views/PolicyUploadStep";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";

export default function Home() {
  const router = useRouter();
  const { openChat } = useChatOverlay();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <PolicyUploadStep
        onComplete={() => router.push("/coverage")}
        onBookDemo={openChat}
      />
    </div>
  );
}
