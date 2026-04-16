"use client";

import { useCompose } from "@/lib/compose-context";

export function ComposeButton() {
  const { setComposeOpen } = useCompose();

  return (
    <button
      onClick={() => setComposeOpen(true)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 24px",
        height: 56,
        border: "none",
        borderRadius: 16,
        backgroundColor: "var(--bg-compose)",
        color: "var(--text-on-compose)",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "inherit",
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.2s",
        marginBottom: 16,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
          fill="currentColor"
        />
        <path
          d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="currentColor"
        />
      </svg>
      Compose
    </button>
  );
}
