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
      className="group not-prose p-0 mb-4 rounded-lg overflow-hidden relative border-0 bg-transparent"
    >
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied!" : "Copy code"}
        className="absolute right-2 top-2 py-1 px-1.5 rounded-md border-0 bg-surface-hover text-muted-foreground cursor-pointer opacity-0 transition-opacity duration-150 flex items-center justify-center z-[1] group-hover:!opacity-100"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      {children}
    </pre>
  );
}
