'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kasipos-docs-theme'

type ThemeMode = 'light' | 'dark'

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}

export function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
      const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
      if (saved) {
        setTheme(saved)
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
      }
    }, 0)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  return (
    <button
      type="button"
      className="p-1.5 text-[hsl(var(--foreground))/0.7] hover:text-[hsl(var(--foreground))]"
      aria-label={!mounted ? 'Toggle theme' : theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      {!mounted ? (
        <div className="w-[18.5px] h-[18.5px]" />
      ) : theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  )
}

