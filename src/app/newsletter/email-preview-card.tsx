"use client";

import { useState } from "react";
import { Avatar } from "@/core/components/gmail/avatar";

interface EmailPreviewCardProps {
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  html: string;
  defaultExpanded?: boolean;
}

export function EmailPreviewCard({
  from,
  fromEmail,
  subject,
  preview,
  html,
  defaultExpanded = false,
}: EmailPreviewCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div style={{ borderBottom: "1px solid var(--border-light)" }}>
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 24px",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
          color: "inherit",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Avatar name={from} size={40} imageUrl="/me-squared.png" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{from}</span>
            <span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>
              &lt;{fromEmail}&gt;
            </span>
          </div>
          {!expanded && (
            <div
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>{subject}</strong>
              {" — "}
              {preview}
            </div>
          )}
          {expanded && (
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>
              {subject}
            </div>
          )}
        </div>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="var(--text-tertiary)"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>

      {expanded && (
        <div style={{ borderTop: "1px solid var(--border-light)" }}>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML rendered from React Email template */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}
