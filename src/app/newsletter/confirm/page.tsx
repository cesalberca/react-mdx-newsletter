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

function ConfirmCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-full p-6 flex justify-center">
      <div className="max-w-[600px] w-full">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          {children}
        </div>
      </div>
    </div>
  );
}

function ConfirmLoading() {
  return (
    <ConfirmCard>
      <div className="text-5xl mb-4">&#9203;</div>
      <h1 className="text-2xl font-bold mt-0 mb-2">Loading...</h1>
    </ConfirmCard>
  );
}

const linkClass =
  "inline-block mt-4 py-[10px] px-6 rounded bg-accent text-foreground-inverse no-underline text-sm font-medium";

const outlineLinkClass =
  "inline-block mt-4 py-[10px] px-6 rounded border border-border text-foreground no-underline text-sm font-medium";

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
    <ConfirmCard>
      {state === "loading" && (
        <>
          <div className="text-5xl mb-4">&#9203;</div>
          <h1 className="text-2xl font-bold mt-0 mb-2">
            Confirming your subscription...
          </h1>
          <p className="text-muted-foreground">Please wait.</p>
        </>
      )}

      {state === "success" && (
        <>
          <div className="text-5xl mb-4 text-success">&#10003;</div>
          <h1 className="text-2xl font-bold mt-0 mb-2">
            Subscription Confirmed!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Welcome aboard! You&apos;ll receive each issue of the Build Your Own
            Newsletter series as it goes out.
          </p>
          <Link href="/" className={linkClass}>
            Back to Inbox
          </Link>
        </>
      )}

      {state === "already" && (
        <>
          <div className="text-5xl mb-4">&#9993;</div>
          <h1 className="text-2xl font-bold mt-0 mb-2">Already Subscribed</h1>
          <p className="text-muted-foreground leading-relaxed">
            This email is already confirmed. You&apos;re all set!
          </p>
          <Link href="/" className={linkClass}>
            Back to Inbox
          </Link>
        </>
      )}

      {state === "error" && (
        <>
          <div className="text-5xl mb-4 text-destructive">&#10007;</div>
          <h1 className="text-2xl font-bold mt-0 mb-2">
            Confirmation Failed
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {errorMessage || "The link may be expired or invalid."}
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <Link href="/newsletter" className={linkClass}>
              Try Again
            </Link>
            <Link href="/" className={outlineLinkClass}>
              Back to Inbox
            </Link>
          </div>
        </>
      )}
    </ConfirmCard>
  );
}
