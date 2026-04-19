"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { ConfirmResponse } from "@/newsletter/api/confirm";

type ConfirmationState = "loading" | "success" | "already" | "error";

export default function NewsletterConfirmPage() {
  return (
    <Suspense fallback={<ConfirmLoading />}>
      <ConfirmContent />
    </Suspense>
  );
}

function ConfirmLoading() {
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
            padding: 32,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#9203;</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}>
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}

function ConfirmContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<ConfirmationState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function confirm() {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setState("error");
        setErrorMessage("Missing confirmation token or email");
        return;
      }

      try {
        const res = await fetch("/api/newsletter/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, email }),
        });

        const data: ConfirmResponse = await res.json();

        if (data.success) {
          if (data.alreadyConfirmed || data.alreadySubscribed) {
            setState("already");
          } else {
            setState("success");
          }
        } else {
          setState("error");
          setErrorMessage(data.error);
        }
      } catch {
        setState("error");
        setErrorMessage("An unexpected error occurred");
      }
    }

    confirm();
  }, [searchParams]);

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
            padding: 32,
            textAlign: "center",
          }}
        >
          {state === "loading" && (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>&#9203;</div>
              <h1
                style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}
              >
                Confirming your subscription...
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>Please wait.</p>
            </>
          )}

          {state === "success" && (
            <>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  color: "var(--green)",
                }}
              >
                &#10003;
              </div>
              <h1
                style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}
              >
                Subscription Confirmed!
              </h1>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Welcome aboard! You&apos;ll receive each issue of the Build Your
                Own Newsletter series as it goes out.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  padding: "10px 24px",
                  borderRadius: 4,
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Back to Inbox
              </Link>
            </>
          )}

          {state === "already" && (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>&#9993;</div>
              <h1
                style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}
              >
                Already Subscribed
              </h1>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                This email is already confirmed. You&apos;re all set!
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  padding: "10px 24px",
                  borderRadius: 4,
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Back to Inbox
              </Link>
            </>
          )}

          {state === "error" && (
            <>
              <div
                style={{ fontSize: 48, marginBottom: 16, color: "var(--red)" }}
              >
                &#10007;
              </div>
              <h1
                style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}
              >
                Confirmation Failed
              </h1>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {errorMessage || "The link may be expired or invalid."}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Link
                  href="/newsletter"
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    borderRadius: 4,
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Try Again
                </Link>
                <Link
                  href="/"
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    borderRadius: 4,
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Back to Inbox
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
