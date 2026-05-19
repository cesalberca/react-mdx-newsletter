"use client";

import Link from "next/link";
import type { Section } from "@/content/sections";

export function ThreadHeader({
  section,
  prevSlug,
  nextSlug,
  backHref = "/",
}: {
  section: Section;
  prevSlug: string | null;
  nextSlug: string | null;
  backHref?: string;
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 border-b border-border-faint">
      <Link
        href={backHref}
        className="flex items-center justify-center w-10 h-10 rounded-full no-underline text-foreground shrink-0"
        aria-label="Back to inbox"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </Link>

      <h1 className="text-base sm:text-xl font-normal m-0 flex-1 truncate">
        {section.subject}
      </h1>

      <div className="flex gap-1">
        {prevSlug ? (
          <Link
            href={`/emails/${prevSlug}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground no-underline"
            aria-label="Previous email"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </Link>
        ) : (
          <div className="w-9 h-9" />
        )}
        {nextSlug ? (
          <Link
            href={`/emails/${nextSlug}`}
            className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground no-underline"
            aria-label="Next email"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </Link>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>
    </div>
  );
}
