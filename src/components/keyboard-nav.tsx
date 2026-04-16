"use client";

import { useKeyboardNavigation } from "@/lib/use-keyboard-navigation";

export function KeyboardNav({
  prevSlug,
  nextSlug,
  backHref = "/",
  basePath = "/emails",
}: {
  prevSlug: string | null;
  nextSlug: string | null;
  backHref?: string;
  basePath?: string;
}) {
  useKeyboardNavigation({ prevSlug, nextSlug, backHref, basePath });
  return null;
}
