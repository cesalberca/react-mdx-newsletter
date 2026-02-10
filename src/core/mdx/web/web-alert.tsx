import type { PropsWithChildren } from 'react'

export function WebAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid var(--accent)',
        margin: '12px 0',
        padding: '8px 16px',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '0 8px 8px 0',
      }}
    >
      {children}
    </blockquote>
  )
}
