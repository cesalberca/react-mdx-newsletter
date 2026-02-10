"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useKeyboardNavigation({
  prevSlug,
  nextSlug,
  backHref = "/",
  basePath = "/emails",
}: {
  prevSlug: string | null
  nextSlug: string | null
  backHref?: string
  basePath?: string
}) {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case "ArrowLeft":
          if (prevSlug) router.push(`${basePath}/${prevSlug}`)
          break
        case "ArrowRight":
          if (nextSlug) router.push(`${basePath}/${nextSlug}`)
          break
        case "Escape":
          router.push(backHref)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlug, nextSlug, backHref, basePath, router])
}
