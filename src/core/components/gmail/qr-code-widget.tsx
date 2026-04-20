"use client";

import { QRCodeSVG } from "qrcode.react";
import { useCompose } from "@/core/context/compose-context";
import { env } from "@/lib/env";

export function QrCodeWidget() {
  const { isComposeOpen } = useCompose();

  if (isComposeOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-card rounded-xl p-3 shadow-md flex flex-col items-center gap-2 z-[900]">
      <a href="/newsletter" className="contents">
        <QRCodeSVG value={`${env.NEXT_PUBLIC_URL}/newsletter`} size={100} />
      </a>
      <a
        href="/newsletter"
        className="text-[11px] text-muted-foreground font-medium no-underline"
      >
        Scan or click to subscribe
      </a>
    </div>
  );
}
