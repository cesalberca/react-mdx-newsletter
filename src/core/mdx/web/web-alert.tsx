import type { PropsWithChildren } from 'react'
import { parseAdmonition } from '@/core/components/alert/parse-admonition'
import { IconAlert } from '@/core/components/alert/icon-alert'
import { cleanPrefix } from '@/core/components/alert/clean-prefix'
import { transformChildrenToString } from '@/core/mdx/utils/transform-children-to-string'

export function CustomAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  const allText = transformChildrenToString(children).trim()
  const parsed = parseAdmonition(allText)
  if (!parsed) {
    return (
      <blockquote className="relative my-12 md:px-12 text-center not-prose group flex items-center justify-center gap-4">
        <span className="text-8xl leading-none text-foreground/20 transition-colors duration-300 group-hover:text-primary font-serif">
          &ldquo;
        </span>
        <div className="text-6xl italic font-[Azeret_Mono] leading-relaxed text-foreground md:text-4xl inline">
          {children}
        </div>
        <span className="text-8xl leading-none text-foreground/20 transition-colors duration-300 group-hover:text-primary font-serif">
          &rdquo;
        </span>
      </blockquote>
    )
  }

  return <IconAlert type={parsed.type}>{cleanPrefix(children)}</IconAlert>
}
