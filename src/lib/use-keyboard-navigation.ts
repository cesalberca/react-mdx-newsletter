"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useKeyboardNavigation({
  prevSlug,
  nextSlug,
}: {
  prevSlug: string | null
  nextSlug: string | null
}) {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case "ArrowLeft":
          if (prevSlug) router.push(`/emails/${prevSlug}`)
          break
        case "ArrowRight":
          if (nextSlug) router.push(`/emails/${nextSlug}`)
          break
        case "Escape":
          router.push("/")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlug, nextSlug, router])
}
