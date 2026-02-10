'use client'

import { type ReactNode, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function WebPre({ children }: { children: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const t = useTranslations('common')

  const handleCopy = async () => {
    const code = preRef.current?.textContent ?? ''
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <pre ref={preRef} className="p-0 text-sm font-mono not-prose mb-6 relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-muted/80 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-opacity cursor-pointer"
        aria-label={copied ? t('codeCopied') : t('copyCode')}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      {children}
    </pre>
  )
}
