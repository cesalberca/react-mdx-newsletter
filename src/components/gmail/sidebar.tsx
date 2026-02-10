"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ComposeButton } from "./compose-button"

const NAV_ITEMS = [
  { icon: "inbox", label: "Inbox", count: 7, href: "/" },
  { icon: "star", label: "Starred" },
  { icon: "schedule", label: "Snoozed" },
  { icon: "send", label: "Sent" },
  { icon: "draft", label: "Drafts" },
  { icon: "spam", label: "Spam", count: 2, href: "/spam" },
  { icon: "label", label: "More" },
]

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "inbox":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z" />
        </svg>
      )
    case "star":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )
    case "schedule":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      )
    case "send":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      )
    case "draft":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z" />
        </svg>
      )
    case "spam":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      )
  }
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        padding: "8px 12px",
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
      <ComposeButton />
      <nav>
        {NAV_ITEMS.map((item) => {
          const active =
            (item.label === "Inbox" && pathname === "/") ||
            (item.href !== undefined && item.href !== "/" && pathname === item.href)
          const style = {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 12px",
            height: 32,
            borderRadius: 16,
            fontSize: 14,
            fontWeight: active ? 700 : 400,
            color: active ? "var(--accent)" : "var(--text-primary)",
            backgroundColor: active ? "var(--bg-active)" : "transparent",
            cursor: item.href ? "pointer" : "default",
            marginBottom: 2,
            textDecoration: "none",
          }
          const content = (
            <>
              <NavIcon icon={item.icon} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count != null && (
                <span style={{ fontSize: 12, fontWeight: 700 }}>{item.count}</span>
              )}
            </>
          )
          if (item.href) {
            return (
              <Link key={item.label} href={item.href} style={style}>
                {content}
              </Link>
            )
          }
          return (
            <div key={item.label} style={style}>
              {content}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
