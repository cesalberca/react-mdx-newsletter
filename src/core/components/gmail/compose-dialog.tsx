"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useState } from "react";
import { newsletters } from "@/app/newsletters/newsletters";
import { useCompose } from "@/core/context/compose-context";

type Status = "idle" | "sending" | "success" | "error";

function Signature() {
  return (
    <div
      style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-primary)" }}
    >
      <div style={{ color: "var(--text-secondary)", marginBottom: 8 }}>--</div>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Avatar */}
        <Image
          src="/me-squared.png"
          alt="César Alberca Agelán"
          width={64}
          height={64}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "var(--text-primary)",
            }}
          >
            César Alberca Agelán
          </div>
          <div
            style={{ color: "var(--accent)", fontSize: 12, fontWeight: 500 }}
          >
            Freelance Senior Frontend Architect
          </div>
          <div
            style={{
              borderTop: "1px solid var(--border-secondary)",
              margin: "4px 0",
              width: 200,
            }}
          />
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
            <span>Web </span>
            <a
              href="https://cesalberca.com"
              style={{ color: "var(--text-link)", textDecoration: "none" }}
            >
              cesalberca.com
            </a>
            <span> Email </span>
            <a
              href="mailto:cesar@cesalberca.com"
              style={{ color: "var(--text-link)", textDecoration: "none" }}
            >
              cesar@cesalberca.com
            </a>
          </div>
          <div
            style={{
              fontSize: 10,
              color: "var(--text-tertiary)",
              fontStyle: "italic",
            }}
          >
            Helping You Build Scalable, AI-Ready Frontend Architecture
          </div>
          {/* Social icons */}
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/cesalberca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#0a66c2"
                role="img"
                aria-label="LinkedIn"
              >
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://x.com/cesalberca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--text-primary)"
                role="img"
                aria-label="X"
              >
                <title>X</title>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/cesalberca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#e4405f"
                role="img"
                aria-label="Instagram"
              >
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormattingToolbar() {
  const iconStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 4,
    cursor: "default",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "4px 12px",
        borderTop: "1px solid var(--border-secondary)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <button type="button" style={iconStyle} aria-label="Undo">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
        </svg>
      </button>
      <button type="button" style={iconStyle} aria-label="Redo">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
        </svg>
      </button>
      <div
        style={{
          width: 1,
          height: 18,
          backgroundColor: "var(--border-secondary)",
          margin: "0 4px",
        }}
      />
      <span
        style={{
          fontSize: 12,
          color: "var(--text-secondary)",
          padding: "0 6px",
          cursor: "default",
        }}
      >
        Sans Serif
      </span>
      <div
        style={{
          width: 1,
          height: 18,
          backgroundColor: "var(--border-secondary)",
          margin: "0 4px",
        }}
      />
      <button type="button" style={iconStyle} aria-label="Bold">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
        </svg>
      </button>
      <button type="button" style={iconStyle} aria-label="Italic">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
        </svg>
      </button>
      <button type="button" style={iconStyle} aria-label="Underline">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
        </svg>
      </button>
    </div>
  );
}

export function ComposeDialog() {
  const { isComposeOpen, setComposeOpen } = useCompose();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const close = useCallback(() => {
    setComposeOpen(false);
    setStatus("idle");
    setErrorMsg("");
  }, [setComposeOpen]);

  useEffect(() => {
    if (!isComposeOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isComposeOpen, close]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(close, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, close]);

  if (!isComposeOpen) return null;

  const selected = newsletters[selectedIndex];

  async function handleSend() {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newsletterSlug: selected.filename,
          token: process.env.NEXT_PUBLIC_NEWSLETTER_BROADCAST_TOKEN ?? "",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const headerIconStyle: CSSProperties = {
    background: "none",
    border: "none",
    color: "#9aa0a6",
    cursor: "pointer",
    padding: 4,
    fontSize: 16,
    lineHeight: 1,
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
  };

  const bottomIconStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 6,
    cursor: "default",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 72,
        width: 540,
        maxHeight: "80vh",
        zIndex: 1000,
        borderRadius: "8px 8px 0 0",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          backgroundColor: "#404040",
          color: "#fff",
          fontSize: 14,
          fontWeight: 500,
          cursor: "default",
        }}
      >
        <span>New Message</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button type="button" style={headerIconStyle} aria-label="Minimize">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h12v2H6z" />
            </svg>
          </button>
          <button type="button" style={headerIconStyle} aria-label="Pop out">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={close}
            style={headerIconStyle}
            aria-label="Close"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* To field */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 14px",
          borderBottom: "1px solid var(--border-secondary)",
          backgroundColor: "var(--bg-card)",
          fontSize: 13,
          color: "var(--text-primary)",
        }}
      >
        <span style={{ color: "var(--text-secondary)", marginRight: 8 }}>
          To
        </span>
        <span style={{ flex: 1, fontWeight: 400 }}>All subscribers</span>
        <span
          style={{
            color: "var(--text-secondary)",
            fontSize: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          Cc Bcc
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </span>
      </div>

      {/* Subject field */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 14px",
          borderBottom: "1px solid var(--border-secondary)",
          backgroundColor: "var(--bg-card)",
          fontSize: 13,
          color: "var(--text-primary)",
        }}
      >
        <span style={{ color: "var(--text-secondary)", marginRight: 8 }}>
          Subject
        </span>
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "2px 4px",
            border: "none",
            outline: "none",
            fontSize: 13,
            fontFamily: "inherit",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            cursor: "pointer",
          }}
        >
          {newsletters.map((nl, i) => (
            <option key={nl.slug} value={i}>
              {nl.title}
            </option>
          ))}
        </select>
      </div>

      {/* Body area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          padding: "12px 14px",
          minHeight: 240,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {/* Newsletter preview */}
        <div>
          <strong>{selected.title}</strong>
          <p style={{ margin: "6px 0 0", color: "var(--text-secondary)" }}>
            {selected.description}
          </p>
        </div>

        {/* Status messages */}
        {status === "success" && (
          <div style={{ color: "var(--green)", fontSize: 13, fontWeight: 500 }}>
            Broadcast sent successfully!
          </div>
        )}
        {status === "error" && (
          <div style={{ color: "var(--red)", fontSize: 13 }}>
            Error: {errorMsg}
          </div>
        )}

        {/* Spacer pushes signature to bottom */}
        <div style={{ flex: 1 }} />

        {/* Signature */}
        <Signature />
      </div>

      {/* Formatting toolbar */}
      <FormattingToolbar />

      {/* Bottom action bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border-secondary)",
        }}
      >
        {/* Send button */}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <button
            type="button"
            onClick={handleSend}
            disabled={status === "sending" || status === "success"}
            style={{
              padding: "8px 20px",
              backgroundColor:
                status === "success" ? "var(--green)" : "#1a73e8",
              color: "#fff",
              border: "none",
              borderRadius: "18px 0 0 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor:
                status === "sending" || status === "success"
                  ? "default"
                  : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
              fontFamily: "inherit",
            }}
          >
            {status === "sending"
              ? "Sending..."
              : status === "success"
                ? "Sent"
                : "Send"}
          </button>
          <button
            type="button"
            style={{
              padding: "8px 8px",
              backgroundColor:
                status === "success" ? "var(--green)" : "#1565c0",
              color: "#fff",
              border: "none",
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "0 18px 18px 0",
              cursor: "default",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>

        {/* Action icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 8,
            gap: 0,
          }}
        >
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Formatting options"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z" />
            </svg>
          </button>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Attach files"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 005 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
            </svg>
          </button>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Insert link"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
          </button>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Insert emoji"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Insert photo"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </button>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="More options"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Delete (far right) */}
        <div style={{ marginLeft: "auto" }}>
          <button
            type="button"
            style={bottomIconStyle}
            aria-label="Discard draft"
            onClick={close}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
