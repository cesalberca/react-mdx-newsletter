import { createElement, type FC } from 'react'
import { slugify } from '@/core/mdx/web/slugify'

export function createWebHeading(level: number): FC<{ children: string }> {
  const Heading: FC<{ children: string }> = ({ children }) => {
    const slug = slugify(children)
    return createElement(
      `h${level}`,
      { id: slug, className: 'scroll-mt-[100px] group relative' },
      [
        createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className:
              'anchor opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 text-muted-foreground font-normal no-underline',
          },
          '#',
        ),
      ],
      children,
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}
