"use client";

import { Check, Copy } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";

export function WebPre({ children }: { children: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre
      ref={preRef}
      style={{
        padding: 0,
        fontSize: 14,
        fontFamily: '"Roboto Mono", ui-monospace, monospace',
        marginBottom: 16,
        position: "relative",
      }}
      className="group not-prose"
    >
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied!" : "Copy code"}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          padding: "4px 6px",
          borderRadius: 6,
          border: "none",
          background: "var(--bg-hover)",
          color: "var(--text-secondary)",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity 0.15s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="group-hover:!opacity-100"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      {children}
    </pre>
  );
}
