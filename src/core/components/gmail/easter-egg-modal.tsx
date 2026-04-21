"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function EasterEggModal({ onClose }: { onClose: () => void }) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const end = Date.now() + 3000;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#4285f4", "#34a853", "#fbbc04", "#ea4335"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#4285f4", "#34a853", "#fbbc04", "#ea4335"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-lg max-w-[480px] w-full mx-4 p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-foreground mt-0 mb-2">
          You Found It!
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-1">
          You discovered the secret Easter egg hidden in this talk.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Take a screenshot and send it to{" "}
          <a
            href="mailto:cesar@cesalberca.com?subject=I found the Easter egg! 🥚&body=Hi César, I found the secret Easter egg in your talk!"
            className="text-link font-medium no-underline hover:underline"
          >
            cesar@cesalberca.com
          </a>{" "}
        </p>
        <a
          href="mailto:cesar@cesalberca.com?subject=I found the Easter egg! 🥚&body=Hi César, I found the secret Easter egg in your talk!"
          className="inline-block py-2.5 px-6 rounded-full bg-accent text-foreground-inverse no-underline text-sm font-medium"
        >
          Send Screenshot
        </a>
        <button
          type="button"
          onClick={onClose}
          className="block mx-auto mt-3 text-sm text-muted-foreground bg-transparent border-0 cursor-pointer hover:text-foreground"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
