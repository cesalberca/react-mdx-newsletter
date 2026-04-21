"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/core/styles/cn";
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
    <div className="border-b border-border-faint py-4 px-4 sm:px-6">
      <button
        type="button"
        className="flex items-start gap-3 cursor-pointer w-full bg-transparent border-0 p-0 text-left font-[inherit] text-inherit"
        onClick={toggle}
      >
        <div className="shrink-0 mt-0.5">
          <Avatar name={sender} size={40} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">{sender}</span>
            {/* email address hidden on mobile — too cramped */}
            <span className="hidden sm:inline text-subtle-foreground text-xs truncate">
              &lt;{senderEmail}&gt;
            </span>
            {/* timestamp inline on mobile */}
            <span className="sm:hidden text-subtle-foreground text-xs ml-auto shrink-0">{timestamp}</span>
          </div>
          {!expanded && (
            <div className="text-muted-foreground text-sm truncate">
              Click to expand...
            </div>
          )}
        </div>

        {/* timestamp floating right on desktop */}
        <div className="hidden sm:block text-subtle-foreground text-xs shrink-0">{timestamp}</div>

        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={cn(
            "fill-subtle-foreground transition-transform duration-200 shrink-0 mt-1",
            expanded ? "rotate-180" : "rotate-0",
          )}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>

      {expanded && (
        <div className="prose prose-sm max-w-none mt-4 sm:ml-[52px] text-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
