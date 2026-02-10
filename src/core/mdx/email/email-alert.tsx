import type { PropsWithChildren } from 'react'
import { parseAdmonition } from '@/core/components/alert/parse-admonition'
import { cleanPrefix } from '@/core/components/alert/clean-prefix'
import { transformChildrenToString } from '@/core/mdx/utils/transform-children-to-string'
import { ImageAlert } from '@/core/components/alert/image-alert'

export function EmailAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  const allText = transformChildrenToString(children).trim()
  const parsed = parseAdmonition(allText)
  if (!parsed) {
    return (
      <blockquote className="my-12 px-8 text-center not-prose gap-4">
        <span className="text-8xl text-slate-900/20 font-serif leading-0 align-bottom">&ldquo;</span>
        <div className="text-3xl italic font-mono leading-relaxed text-slate-900">{children}</div>
        <span className="text-8xl leading-none text-slate-900/20 font-serif">&rdquo;</span>
      </blockquote>
    )
  }

  return <ImageAlert type={parsed.type}>{cleanPrefix(children)}</ImageAlert>
}
