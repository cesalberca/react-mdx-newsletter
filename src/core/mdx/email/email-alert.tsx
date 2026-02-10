import type { PropsWithChildren } from 'react'

export function EmailAlert({ children }: HTMLQuoteElement & PropsWithChildren) {
  return (
    <blockquote
      style={{
        borderLeft: '4px solid #1a73e8',
        margin: '12px 0',
        padding: '8px 16px',
        color: '#5f6368',
        backgroundColor: '#f6f8fc',
        borderRadius: '0 8px 8px 0',
      }}
    >
      {children}
    </blockquote>
  )
}
