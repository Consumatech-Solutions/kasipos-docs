'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu } from 'lucide-react'
import { LanguageButton } from '@/components/docs/language-button'
import { ThemeToggleButton } from '@/components/docs/theme-toggle-button'

export function DocsNavbar() {
  const pathname = usePathname()

  const toggleMobileSidebar = () => {
    document.documentElement.classList.add('sidebar-open')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.85] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-1.5 -ml-1.5 text-[hsl(var(--foreground))/0.7] hover:text-[hsl(var(--foreground))] lg:hidden"
            aria-label="Toggle mobile sidebar"
            onClick={toggleMobileSidebar}
          >
            <Menu size={20} />
          </button>
          <Link href="/docs/home" className="text-sm font-bold tracking-tight">
            KasiPOS Docs
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/docs/developer/github-workflow"
              className={`rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                pathname === '/docs/developer/github-workflow'
                  ? 'bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]'
                  : 'text-[hsl(var(--foreground))/0.68] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              GitHub Workflow
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2 py-1 sm:flex">
            <Search size={16} className="mr-2 text-[hsl(var(--foreground))/0.5]" />
            <input
              className="w-32 border-none bg-transparent p-0 text-[13px] outline-none"
              placeholder="Search..."
            />
            <span className="ml-2 text-[10px] font-medium text-[hsl(var(--foreground))/0.45]">
              Ctrl K
            </span>
          </div>
          <ThemeToggleButton />
          <LanguageButton />
        </div>
      </div>
    </header>
  )
}
