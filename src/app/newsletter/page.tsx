"use client"

import { useState } from "react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setMessage("Check your inbox for a confirmation email!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100%",
        padding: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 600, width: "100%" }}>
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: 8,
            border: "1px solid var(--border-primary)",
            overflow: "hidden",
          }}
        >
          {/* Email header */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src="/me.jpg"
              alt="César Alberca"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover" as const,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>César Alberca</div>
              <div style={{ color: "var(--text-tertiary)", fontSize: 12 }}>
                &lt;newsletter@cesalberca.com&gt;
              </div>
            </div>
          </div>

          {/* Email body */}
          <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px 0" }}>
              Build Your Own Newsletter with React &amp; MDX
            </h1>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 16px 0" }}>
              A step-by-step series on building a complete newsletter system from scratch.
              Learn how to write content with MDX, design email templates with React Email,
              deliver emails with Resend, and wrap it all in a polished UI.
            </p>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 24px 0" }}>
              Follow along and ship your own newsletter by the end of the series.
              Enter your email below to subscribe:
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 4,
                  border: "1px solid var(--border-primary)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  padding: "10px 24px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: status === "loading" ? "wait" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {status === "success" && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 4,
                  backgroundColor: "#e6f4ea",
                  color: "#137333",
                  fontSize: 14,
                }}
              >
                {message}
              </div>
            )}

            {status === "error" && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 4,
                  backgroundColor: "#fce8e6",
                  color: "#c5221f",
                  fontSize: 14,
                }}
              >
                {message}
              </div>
            )}

            <p style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: 16, marginBottom: 0 }}>
              You&apos;ll receive a confirmation email. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
