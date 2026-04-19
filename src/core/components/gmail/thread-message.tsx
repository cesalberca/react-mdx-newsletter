"use client";

import { type ReactNode, useState } from "react";
import { Avatar } from "./avatar";

export function ThreadMessage({
  sender,
  senderEmail,
  timestamp,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
}: {
  sender: string;
  senderEmail: string;
  timestamp: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? internalExpanded;
  const toggle = onToggle ?? (() => setInternalExpanded((v) => !v));

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border-light)",
        padding: "16px 24px",
      }}
    >
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          textAlign: "left",
          fontFamily: "inherit",
          color: "inherit",
        }}
        onClick={toggle}
      >
        <Avatar name={sender} size={40} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{sender}</span>
            <span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>
              &lt;{senderEmail}&gt;
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
              {/* collapsed preview - just show a snippet */}
              Click to expand...
            </div>
          )}
        </div>
        <div
          style={{ color: "var(--text-tertiary)", fontSize: 12, flexShrink: 0 }}
        >
          {timestamp}
        </div>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="var(--text-tertiary)"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      {expanded && (
        <div
          className="prose prose-sm max-w-none"
          style={{
            marginTop: 16,
            marginLeft: 52,
            color: "var(--text-primary)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
