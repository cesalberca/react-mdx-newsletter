import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

export function WebLink(props: AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren) {
  return (
    <a
      style={{ color: 'var(--text-link)', textDecoration: 'none' }}
      {...props}
    />
  )
}
