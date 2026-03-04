"use client";

import { ChatOverlayProvider } from "@/components/views/ChatOverlayContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChatOverlayProvider>{children}</ChatOverlayProvider>;
}
