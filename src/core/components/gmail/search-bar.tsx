"use client";

import Link from "next/link";
import { ThemeToggle } from "@/core/components/theme-toggle";
import { useNav } from "@/core/context/nav-context";
import { Avatar } from "./avatar";

export function SearchBar() {
  const { toggleSidebar } = useNav();

  return (
    <header className="h-[var(--header-height)] flex items-center px-2 gap-2 border-b border-border-faint bg-surface shrink-0">
      {/* Hamburger — mobile only */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Open navigation menu"
        className="md:hidden p-2 rounded-full hover:bg-surface-raised text-muted-foreground flex items-center justify-center shrink-0"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <Link
        href="/"
        className="flex items-center gap-1 no-underline px-3 shrink-0"
      >
        <svg
          aria-hidden="true"
          width="40"
          height="30"
          viewBox="0 0 75 56"
          fill="none"
        >
          <path
            d="M6.25 49H18.75V28L0 14V43.75C0 46.65 2.35 49 5.25 49H6.25Z"
            fill="#4285F4"
          />
          <path
            d="M56.25 49H68.75C71.65 49 74 46.65 74 43.75V14L56.25 28V49Z"
            fill="#34A853"
          />
          <path
            d="M56.25 7.25V28L74 14V9.5C74 3.01 66.59-0.74 61.38 3.25L56.25 7.25Z"
            fill="#FBBC04"
          />
          <path
            d="M18.75 28V7.25L37 21.25L55.25 7.25V28L37 42L18.75 28Z"
            fill="#EA4335"
          />
          <path
            d="M0 9.5V14L18.75 28V7.25L13.63 3.25C8.41-0.74 0 3.01 0 9.5Z"
            fill="#C5221F"
          />
        </svg>
        <span className="text-[22px] font-normal text-muted-foreground">
          Mail
        </span>
      </Link>

      <div className="flex-1 max-w-[720px] h-12 rounded-3xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] flex items-center px-4 gap-3 shadow-sm transition-colors overflow-hidden">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-muted-foreground"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <span className="text-foreground/60 text-base whitespace-nowrap">Search in mail</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Avatar name="César Alberca" size={32} imageUrl="/me-squared.png" />
      </div>
    </header>
  );
}
