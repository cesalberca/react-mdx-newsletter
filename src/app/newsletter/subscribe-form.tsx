"use client";

import Image from "next/image";
import { type SubmitEvent, useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Check your inbox for a confirmation email!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden mb-6">
      <div className="py-4 px-6 border-b border-border-faint flex items-center gap-3">
        <Image
          src="/me-squared.png"
          alt="César Alberca"
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0"
        />
        <div>
          <div className="font-semibold text-sm">César Alberca</div>
          <div className="text-subtle-foreground text-xs">
            &lt;newsletter@cesalberca.com&gt;
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mt-0 mb-4">
          Build Your Own Newsletter with React &amp; MDX
        </h1>

        <p className="text-muted-foreground leading-[1.7] mt-0 mb-4">
          A step-by-step series on building a complete newsletter system from
          scratch. Learn how to write content with MDX, design email templates
          with React Email, deliver emails with Resend, and wrap it all in a
          polished UI.
        </p>

        <p className="text-muted-foreground leading-[1.7] mt-0 mb-6">
          Follow along and ship your own newsletter by the end of the series.
          Enter your email below to subscribe:
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 py-[10px] px-4 rounded border border-border bg-background text-foreground text-sm font-[inherit] outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="py-[10px] px-6 rounded border-0 bg-accent text-foreground-inverse text-sm font-medium font-[inherit] cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <div className="py-3 px-4 rounded bg-[#e6f4ea] text-[#137333] text-sm">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="py-3 px-4 rounded bg-[#fce8e6] text-[#c5221f] text-sm">
            {message}
          </div>
        )}

        <p className="text-subtle-foreground text-xs mt-4 mb-0">
          You&apos;ll receive a confirmation email. No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
