'use client'

import React from 'react'
import { ClipboardCopy, Check } from 'lucide-react'

export const CodeBlock: React.FC<React.ComponentPropsWithoutRef<'div'> & { 'data-language'?: string }> = ({ children, ...props }) => {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  const lang = props['data-language'] || 'code'

  const copy = () => {
    const code = preRef.current?.querySelector('code')?.innerText || ''
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-container" {...props}>
      <div className="code-block-header">
        <span className="code-block-lang">{lang}</span>
        <button onClick={copy} className="code-copy-btn" title="Copy code">
          {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  )
}
