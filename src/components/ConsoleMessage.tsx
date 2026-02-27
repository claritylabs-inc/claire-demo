"use client";

import { useEffect } from "react";

export function ConsoleMessage() {
  useEffect(() => {
    console.log(
      `%c
   _____ _            _ _         
  / ____| |          (_) |        
 | |    | | __ _ _ __ _| |_ _   _ 
 | |    | |/ _\` | '__| | __| | | |
 | |____| | (_| | |  | | |_| |_| |
  \\_____|_|\\__,_|_|  |_|\\__|\\__, |
                              __/ |
                             |___/ 
`,
      "color: #A0D2FA; font-family: monospace; font-size: 12px;"
    );
    console.log(
      "%cWe're hiring. → hello@claritylabs.inc",
      "color: #8a8578; font-size: 13px; font-family: -apple-system, sans-serif; padding: 4px 0;"
    );
    console.log(
      "%cIf you're reading this, you're our kind of person.",
      "color: #bbb; font-size: 11px; font-family: -apple-system, sans-serif;"
    );
  }, []);

  return null;
}
