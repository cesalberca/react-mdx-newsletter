import type { NewsletterMetadata } from "./newsletter-metadata"

export function compareNewsletters(a: NewsletterMetadata, b: NewsletterMetadata): number {
  const aTime = a.date?.getTime()
  const bTime = b.date?.getTime()

  const aHasDate = Number.isFinite(aTime)
  const bHasDate = Number.isFinite(bTime)

  if (!aHasDate && !bHasDate) return 0
  if (!aHasDate) return -1
  if (!bHasDate) return 1

  return (bTime as number) - (aTime as number)
}
