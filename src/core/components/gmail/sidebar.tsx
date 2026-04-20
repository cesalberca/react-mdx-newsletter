"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { inboxSections, spamSections } from "@/content/sections";
import { cn } from "@/core/styles/cn";
import { useReadStatus } from "@/core/context/read-status-context";
import { ComposeButton } from "./compose-button";

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "inbox":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z" />
        </svg>
      );
    case "star":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case "schedule":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      );
    case "send":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      );
    case "draft":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z" />
        </svg>
      );
    case "spam":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      );
  }
}

const navItemClass = (active: boolean, clickable: boolean) =>
  cn(
    "flex items-center gap-3 px-3 h-9 rounded-2xl text-[15px] mb-0.5 no-underline",
    active ? "font-bold text-accent bg-surface-active" : "font-normal text-foreground",
    clickable ? "cursor-pointer" : "cursor-default",
  );

export function Sidebar() {
  const pathname = usePathname();
  const { unreadSlugs } = useReadStatus();

  const inboxUnread = unreadSlugs(inboxSections.map((s) => s.slug));
  const spamUnread = unreadSlugs(spamSections.map((s) => s.slug));

  const NAV_ITEMS = [
    { icon: "inbox", label: "Inbox", count: inboxUnread || undefined, href: "/" },
    { icon: "star", label: "Starred" },
    { icon: "schedule", label: "Snoozed" },
    { icon: "send", label: "Sent" },
    { icon: "draft", label: "Drafts" },
    { icon: "spam", label: "Spam", count: spamUnread || undefined, href: "/spam" },
    { icon: "label", label: "More" },
  ];

  return (
    <aside className="w-[var(--sidebar-width)] py-2 px-3 overflow-y-auto shrink-0">
      <ComposeButton />
      <nav>
        {NAV_ITEMS.map((item) => {
          const active =
            (item.label === "Inbox" && pathname === "/") ||
            (item.href !== undefined && item.href !== "/" && pathname === item.href);
          const content = (
            <>
              <NavIcon icon={item.icon} />
              <span className="flex-1">{item.label}</span>
              {item.count != null && (
                <span className="text-xs font-bold">{item.count}</span>
              )}
            </>
          );
          if (item.href) {
            return (
              <Link key={item.label} href={item.href} className={navItemClass(active, true)}>
                {content}
              </Link>
            );
          }
          return (
            <div key={item.label} className={navItemClass(active, false)}>
              {content}
            </div>
          );
        })}
      </nav>

      <div className="flex items-center justify-between py-4 px-3 pt-4 pb-1 text-[13px] font-medium text-muted-foreground">
        <span>Labels</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="cursor-default"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>

      <nav>
        {(() => {
          const active = pathname.startsWith("/newsletters");
          return (
            <Link href="/newsletters" className={navItemClass(active, true)}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6H12l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
              </svg>
              <span className="flex-1">Newsletter</span>
            </Link>
          );
        })()}
      </nav>
    </aside>
  );
}
