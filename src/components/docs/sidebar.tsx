'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, X, BookOpen, Terminal, Rocket, HelpCircle } from 'lucide-react'
import { SIDEBAR_STRUCTURE } from './sidebar-config'

const STORAGE_KEY = 'kasipos-docs-expanded'

function categoryIcon(category: string) {
  switch (category) {
    case 'Getting Started':
      return <Rocket size={16} className="text-[hsl(var(--secondary))]" />
    case 'User Guide':
      return <BookOpen size={16} className="text-[hsl(var(--secondary))]" />
    case 'Application Modules':
      return <Terminal size={16} className="text-[hsl(var(--secondary))]" />
    case 'Developer Guide':
      return <HelpCircle size={16} className="text-[hsl(var(--secondary))]" />
    default:
      return <BookOpen size={16} className="text-[hsl(var(--secondary))]" />
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/docs/home'

  // Accordion state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Initialize expanded categories
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Default: expand categories that contain the active path, or expand all by default
    const defaultState: Record<string, boolean> = {}
    SIDEBAR_STRUCTURE.forEach((cat) => {
      const hasActive = cat.pages.some((p) => p.path === pathname)
      defaultState[cat.category] = hasActive
    })

    setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          setExpanded((prev) => ({ ...parsed, ...prev, ...defaultState }))
        } else {
          defaultState['Getting Started'] = true
          setExpanded(defaultState)
        }
      } catch {
        setExpanded(defaultState)
      }
    }, 0)
  }, [pathname])

  const toggleCategory = (categoryName: string) => {
    const nextState = {
      ...expanded,
      [categoryName]: !expanded[categoryName]
    }
    setExpanded(nextState)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
    }
  }

  const closeMobileSidebar = () => {
    document.documentElement.classList.remove('sidebar-open')
  }

  if (isHomePage) {
    return null
  }

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      <div
        className="sidebar-backdrop fixed inset-0 z-40 hidden bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={closeMobileSidebar}
      />

      <aside className="custom-sidebar fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 -translate-x-full border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-6 overflow-y-auto transition-transform duration-300 ease-in-out lg:left-[max(0px,calc(50%-700px))] lg:block lg:translate-x-0 lg:px-6 lg:py-8">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="text-[12px] font-extrabold uppercase tracking-widest text-[hsl(var(--foreground))/0.6]">
            Navigation
          </span>
          <button
            onClick={closeMobileSidebar}
            className="p-1 text-[hsl(var(--foreground))/0.7] hover:text-[hsl(var(--foreground))]"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {SIDEBAR_STRUCTURE.map((section) => {
            const isExpanded = expanded[section.category]
            const hasActivePage = section.pages.some((p) => p.path === pathname)

            return (
              <div key={section.category} className="flex flex-col">
                {/* Section Header Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleCategory(section.category)}
                  className={`flex items-center justify-between w-full py-1.5 text-left text-[11px] font-bold uppercase tracking-wider transition-colors duration-150 ${
                    hasActivePage
                      ? 'text-[hsl(var(--foreground))]'
                      : 'text-[hsl(var(--foreground))/0.5] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {categoryIcon(section.category)}
                    <span>{section.category}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {/* Section Pages Content */}
                <div
                  className={`flex flex-col gap-0.5 mt-1 pl-4 border-l border-[hsl(var(--border))] transition-all duration-200 overflow-hidden ${
                    isExpanded ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {section.pages.map((page) => {
                    const isActive = pathname === page.path
                    return (
                      <Link
                        key={page.path}
                        href={page.path}
                        onClick={closeMobileSidebar}
                        className={`py-1.5 px-3 text-[13px] rounded-md transition-all duration-150 ${
                          isActive
                            ? 'font-medium bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]'
                            : 'text-[hsl(var(--foreground))/0.7] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
                        }`}
                      >
                        {page.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
