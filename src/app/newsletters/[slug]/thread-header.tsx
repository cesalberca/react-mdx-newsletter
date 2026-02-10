"use client"

import Link from "next/link"
import { KeyboardNav } from "@/components/keyboard-nav"

export function NewsletterThreadHeader({
  title,
  prevSlug,
  nextSlug,
}: {
  title: string
  prevSlug: string | null
  nextSlug: string | null
}) {
  return (
    <>
      <KeyboardNav
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        backHref="/newsletters"
        basePath="/newsletters"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <Link
          href="/newsletters"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
          aria-label="Back to newsletters"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 400,
            margin: 0,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h1>
        <div style={{ display: "flex", gap: 4 }}>
          {prevSlug ? (
            <Link
              href={`/newsletters/${prevSlug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              aria-label="Previous newsletter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </Link>
          ) : (
            <div style={{ width: 36, height: 36 }} />
          )}
          {nextSlug ? (
            <Link
              href={`/newsletters/${nextSlug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
              aria-label="Next newsletter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </Link>
          ) : (
            <div style={{ width: 36, height: 36 }} />
          )}
        </div>
      </div>
    </>
  )
}
