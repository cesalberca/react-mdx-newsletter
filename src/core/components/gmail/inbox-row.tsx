"use client";

import Link from "next/link";
import type { Section } from "@/content/sections";
import { useReadStatus } from "@/core/context/read-status-context";
import { cn } from "@/core/styles/cn";
import { Avatar } from "./avatar";

export function InboxRow({ section }: { section: Section }) {
  const { isRead } = useReadStatus();
  const unread = !isRead(section.slug);

  return (
    <Link
      href={`/emails/${section.slug}`}
      className={cn(
        "flex items-center gap-3 py-2 px-4 no-underline text-inherit border-b border-[var(--border-light)] cursor-pointer min-h-[44px]",
        unread ? "bg-row-unread" : "bg-row-read",
      )}
    >
      <div className="shrink-0 flex items-center gap-2">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={cn(
            "stroke-2",
            section.starred
              ? "fill-warning stroke-warning"
              : "fill-none stroke-subtle-foreground",
          )}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <Avatar name={section.sender} size={28} />
      </div>

      <div
        className={cn(
          "w-[180px] shrink-0 text-[15px] overflow-hidden text-ellipsis whitespace-nowrap",
          unread ? "font-bold" : "font-normal",
        )}
      >
        {section.sender}
      </div>

      <div className="flex-1 overflow-hidden flex gap-1 min-w-0">
        <span
          className={cn(
            "text-[15px] shrink-0",
            unread ? "font-bold" : "font-normal",
          )}
        >
          {section.subject}
        </span>
        <span className="text-muted-foreground text-[15px] overflow-hidden text-ellipsis whitespace-nowrap">
          — {section.preview}
        </span>
      </div>

      <div
        className={cn(
          "shrink-0 text-sm",
          unread
            ? "text-foreground font-bold"
            : "text-muted-foreground font-normal",
        )}
      >
        {section.date}
      </div>
    </Link>
  );
}
