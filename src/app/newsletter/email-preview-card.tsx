"use client";

import { useState } from "react";
import { cn } from "@/core/styles/cn";
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
    <div className="border-b border-border-faint">
      <button
        type="button"
        className="flex items-center gap-3 py-4 px-6 w-full bg-transparent border-0 cursor-pointer text-left font-[inherit] text-inherit"
        onClick={() => setExpanded(!expanded)}
      >
        <Avatar name={from} size={40} imageUrl="/me-squared.png" />

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">{from}</span>
            <span className="text-subtle-foreground text-xs">
              &lt;{fromEmail}&gt;
            </span>
          </div>
          {!expanded && (
            <div className="text-muted-foreground text-sm truncate">
              <strong className="text-foreground">{subject}</strong>
              {" — "}
              {preview}
            </div>
          )}
          {expanded && <div className="text-sm text-foreground">{subject}</div>}
        </div>

        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={cn(
            "fill-subtle-foreground transition-transform duration-200 shrink-0",
            expanded ? "rotate-180" : "rotate-0",
          )}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-border-faint">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML rendered from React Email template */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
}
