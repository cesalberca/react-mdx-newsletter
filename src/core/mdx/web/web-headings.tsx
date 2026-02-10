import { createElement, type FC } from 'react'
import { slugify } from '@/core/mdx/web/slugify'

const SIZES: Record<number, { fontSize: number; margin: string }> = {
  1: { fontSize: 28, margin: '0 0 16px 0' },
  2: { fontSize: 22, margin: '24px 0 12px 0' },
  3: { fontSize: 18, margin: '20px 0 8px 0' },
  4: { fontSize: 16, margin: '16px 0 8px 0' },
  5: { fontSize: 14, margin: '16px 0 8px 0' },
  6: { fontSize: 13, margin: '16px 0 8px 0' },
}

export function createWebHeading(level: number): FC<{ children: string }> {
  const { fontSize, margin } = SIZES[level] ?? SIZES[6]

  const Heading: FC<{ children: string }> = ({ children }) => {
    const slug = slugify(children)
    return createElement(
      `h${level}`,
      {
        id: slug,
        style: {
          fontSize,
          fontWeight: level <= 3 ? 700 : 600,
          margin,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
        },
      },
      children,
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}
