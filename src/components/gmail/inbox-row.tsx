import Link from "next/link"
import type { Section } from "@/content/sections"
import { Avatar } from "./avatar"

export function InboxRow({ section }: { section: Section }) {
  return (
    <Link
      href={`/emails/${section.slug}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 16px",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: section.unread
          ? "var(--bg-inbox-row-unread)"
          : "var(--bg-inbox-row-read)",
        borderBottom: "1px solid var(--border-light)",
        cursor: "pointer",
        minHeight: 44,
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={section.starred ? "var(--yellow)" : "none"}
          stroke={section.starred ? "var(--yellow)" : "var(--text-tertiary)"}
          strokeWidth={2}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <Avatar name={section.sender} size={28} />
      </div>
      <div
        style={{
          width: 180,
          flexShrink: 0,
          fontWeight: section.unread ? 700 : 400,
          fontSize: 14,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {section.sender}
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontWeight: section.unread ? 700 : 400,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {section.subject}
        </span>
        <span
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          — {section.preview}
        </span>
      </div>
      <div
        style={{
          flexShrink: 0,
          fontSize: 12,
          color: section.unread ? "var(--text-primary)" : "var(--text-secondary)",
          fontWeight: section.unread ? 700 : 400,
        }}
      >
        {section.date}
      </div>
    </Link>
  )
}
