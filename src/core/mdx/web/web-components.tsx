import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { createWebHeading } from '@/core/mdx/web/web-headings'
import { CustomWebLink } from '@/core/mdx/web/web-link'
import { WebCode } from '@/core/mdx/web/web-code'
import { CustomAlert } from '@/core/mdx/web/web-alert'
import {
  WebTable,
  WebTableBody,
  WebTableCell,
  WebTableHead,
  WebTableHeader,
  WebTableRow,
} from '@/core/mdx/web/web-table'
import type { MdxComponentsMap } from '@/core/mdx/components'
import { WebPre } from '@/core/mdx/web/web-pre'

export function getWebMdxComponents(): MdxComponentsMap {
  return {
    h1: createWebHeading(1),
    h2: createWebHeading(2),
    h3: createWebHeading(3),
    h4: createWebHeading(4),
    h5: createWebHeading(5),
    h6: createWebHeading(6),
    a: CustomWebLink,
    code: WebCode,
    blockquote: CustomAlert,
    p: (props: HTMLAttributes<HTMLParagraphElement>) => <p {...props} className={cn(props.className, 'mb-4')} />,
    ul: (props: HTMLAttributes<HTMLUListElement>) => {
      return <ul {...props}></ul>
    },
    ol: (props: HTMLAttributes<HTMLOListElement>) => {
      return <ol {...props}></ol>
    },
    strong: (props: HTMLAttributes<HTMLElement> & PropsWithChildren) => {
      return <strong {...props} />
    },
    pre: WebPre,
    table: WebTable,
    thead: WebTableHead,
    tbody: WebTableBody,
    tr: WebTableRow,
    th: WebTableHeader,
    td: WebTableCell,
  }
}
