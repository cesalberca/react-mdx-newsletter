import type { ReactNode } from 'react'

export function WebPre({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        border: '1px solid var(--border-primary)',
        borderRadius: 8,
        padding: 16,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        background: 'var(--bg-secondary)',
        fontFamily: '"Roboto Mono", ui-monospace, monospace',
        marginBottom: 16,
      }}
    >
      {children}
    </pre>
  )
}
