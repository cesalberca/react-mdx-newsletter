"use client"

import { useKeyboardNavigation } from "@/lib/use-keyboard-navigation"

export function KeyboardNav({
  prevSlug,
  nextSlug,
  backHref = "/",
}: {
  prevSlug: string | null
  nextSlug: string | null
  backHref?: string
}) {
  useKeyboardNavigation({ prevSlug, nextSlug, backHref })
  return null
}
