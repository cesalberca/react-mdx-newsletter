"use client"

import { useKeyboardNavigation } from "@/lib/use-keyboard-navigation"

export function KeyboardNav({
  prevSlug,
  nextSlug,
}: {
  prevSlug: string | null
  nextSlug: string | null
}) {
  useKeyboardNavigation({ prevSlug, nextSlug })
  return null
}
