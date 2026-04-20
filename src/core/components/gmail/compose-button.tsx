"use client";

import { useCompose } from "@/core/context/compose-context";

export function ComposeButton() {
  const { setComposeOpen } = useCompose();

  return (
    <button
      type="button"
      onClick={() => setComposeOpen(true)}
      className="flex items-center gap-3 px-6 h-14 border-0 rounded-2xl bg-compose text-compose-foreground text-base font-medium cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200 mb-4"
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
          fill="currentColor"
        />
        <path
          d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="currentColor"
        />
      </svg>
      Compose
    </button>
  );
}
