import fs from 'node:fs'
import path from 'node:path'
import type { Locale } from '@/core/i18n/locale'

const CONTENT_TYPE_MAP: Record<string, string> = {
  blog: 'posts',
  newsletter: 'emails/newsletter',
  talks: 'talks',
  'case-studies': 'case-studies',
}

interface GetRawMdxContentParams {
  contentType: string
  slug: string
  locale: Locale
}

export function getRawMdxContent({ contentType, slug, locale }: GetRawMdxContentParams): string | null {
  const contentDir = CONTENT_TYPE_MAP[contentType]
  if (!contentDir) {
    return null
  }

  const filePath = path.join(process.cwd(), 'src', 'content', contentDir, slug, `${locale}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return fs.readFileSync(filePath, 'utf-8')
}
