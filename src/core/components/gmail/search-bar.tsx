"use client";

import Link from "next/link";
import { ThemeToggle } from "@/core/components/theme-toggle";
import { Avatar } from "./avatar";

export function SearchBar() {
  return (
    <header
      style={{
        height: "var(--header-height)",
        display: "flex",
        alignItems: "center",
        padding: "0 8px 0 8px",
        gap: 8,
        borderBottom: "1px solid var(--border-light)",
        backgroundColor: "var(--bg-secondary)",
        flexShrink: 0,
      }}
    >
      <Link
        href="/public"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          padding: "0 12px",
          flexShrink: 0,
        }}
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
        <span
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
        >
          Mail
        </span>
      </Link>
      <div
        style={{
          flex: 1,
          maxWidth: 720,
          height: 48,
          borderRadius: 24,
          backgroundColor: "var(--bg-tertiary)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="var(--text-secondary)"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <span style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Search in mail
        </span>
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ThemeToggle />
        <Avatar name="César Alberca" size={32} imageUrl="/me-squared.png" />
      </div>
    </header>
  );
}
