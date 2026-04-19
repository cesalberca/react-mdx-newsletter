"use client";

import { QRCodeSVG } from "qrcode.react";
import { useCompose } from "@/core/context/compose-context";
import { env } from "@/lib/env";

export function QrCodeWidget() {
  const { isComposeOpen } = useCompose();

  if (isComposeOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        backgroundColor: "var(--bg-surface, #fff)",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        zIndex: 900,
      }}
    >
      <a href="/newsletter" style={{ display: "contents" }}>
        <QRCodeSVG value={`${env.NEXT_PUBLIC_URL}/newsletter`} size={100} />
      </a>
      <a
        href="/newsletter"
        style={{
          fontSize: 11,
          color: "var(--text-secondary, #666)",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Scan or click to subscribe
      </a>
    </div>
  );
}
