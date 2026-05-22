'use client'

import { Languages } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type LangOption = {
  code: string
  label: string
  enabled?: boolean
}

const OPTIONS: LangOption[] = [
  { code: 'en', label: 'English', enabled: true },
  { code: 'fr', label: 'Français', enabled: false },
  { code: 'es', label: 'Español', enabled: false }
]

const STORAGE_KEY = 'kasipos-docs-lang'

export function LanguageButton() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState('en')
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="p-1.5 text-[hsl(var(--foreground))/0.7] hover:text-[hsl(var(--foreground))]"
        aria-label="Languages"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Languages size={18} />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Select language"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-sm"
        >
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--foreground))/0.45]">
            Language
          </div>
          <div className="py-1">
            {OPTIONS.map((opt) => {
              const isActive = opt.code === lang
              const isEnabled = opt.enabled !== false
              return (
                <button
                  key={opt.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  disabled={!isEnabled}
                  onClick={() => {
                    if (!isEnabled) return
                    setLang(opt.code)
                    window.localStorage.setItem(STORAGE_KEY, opt.code)
                    setOpen(false)
                  }}
                  className={[
                    'flex w-full items-center justify-between px-3 py-2 text-left text-[13px]',
                    isEnabled
                      ? 'hover:bg-[hsl(var(--muted))]'
                      : 'cursor-not-allowed opacity-50',
                    isActive ? 'text-[hsl(var(--primary))] font-medium' : ''
                  ].join(' ')}
                >
                  <span>{opt.label}</span>
                  {isActive ? (
                    <span className="text-[11px] text-[hsl(var(--foreground))/0.45]">Current</span>
                  ) : null}
                </button>
              )
            })}
          </div>
          <div className="border-t border-[hsl(var(--border))] px-3 py-2 text-[12px] text-[hsl(var(--foreground))/0.6]">
            Translations coming soon.
          </div>
        </div>
      ) : null}
    </div>
  )
}

