'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Menu, X, BookOpen, Terminal, Rocket, HelpCircle } from 'lucide-react'
import { SIDEBAR_STRUCTURE, FLAT_PAGES } from './sidebar-config'

type ActiveItem =
  | 'getting-started'
  | 'user-guide'
  | 'modules'
  | 'overview'
  | 'project-architecture'
  | 'github-workflow'
  | 'contributing'
  | 'social-network'

type ActiveModuleMap =
  | 'overview'
  | 'checkout-sales'
  | 'inventory-catalogue'
  | 'customers-vouchers'
  | 'procurement-marketplace'
  | 'reports'
  | 'settings'

function itemClass(isActive: boolean) {
  return isActive
    ? 'py-1.5 text-[13px] font-medium text-[hsl(var(--secondary))]'
    : 'py-1.5 text-[13px] text-[hsl(var(--foreground))/0.7] hover:text-[hsl(var(--foreground))]'
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

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge so active path is always expanded
        setExpanded({ ...parsed, ...defaultState })
      } else {
        // Expand active category or Getting Started by default
        defaultState['Getting Started'] = true
        setExpanded(defaultState)
      }
    } catch {
      setExpanded(defaultState)
    }
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

  const activeItem: ActiveItem | undefined = (() => {
    if (pathname.startsWith('/docs/getting-started')) return 'getting-started'
    if (pathname.startsWith('/docs/user-guide')) return 'user-guide'
    if (pathname.startsWith('/docs/modules')) return 'modules'
    if (pathname.startsWith('/docs/developer/architecture')) return 'project-architecture'
    if (pathname.startsWith('/docs/developer/github-workflow')) return 'github-workflow'
    if (pathname.startsWith('/docs/developer')) return 'overview'
    if (pathname.startsWith('/docs/contributing')) return 'contributing'
    if (pathname.startsWith('/docs/social-network')) return 'social-network'
    return undefined
  })()

  const activeModuleMap: ActiveModuleMap | undefined = (() => {
    if (!pathname.startsWith('/docs/modules')) return undefined
    if (pathname === '/docs/modules' || pathname === '/docs/modules/overview') return 'overview'
    if (pathname.startsWith('/docs/modules/checkout-sales')) return 'checkout-sales'
    if (pathname.startsWith('/docs/modules/inventory-catalogue')) return 'inventory-catalogue'
    if (pathname.startsWith('/docs/modules/customers-vouchers')) return 'customers-vouchers'
    if (pathname.startsWith('/docs/modules/procurement-marketplace')) return 'procurement-marketplace'
    if (pathname.startsWith('/docs/modules/reports')) return 'reports'
    if (pathname.startsWith('/docs/modules/settings')) return 'settings'
    return undefined
  })()

  return (
    <aside className="fixed left-[max(0px,calc(50%-700px))] top-14 hidden h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-[hsl(var(--border))] px-6 py-8 lg:block">
      <div className="mb-8">
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--primary))]">
          Documentation
        </h4>
        <nav className="flex flex-col gap-0.5">
          <Link className={itemClass(activeItem === 'getting-started')} href="/docs/getting-started/introduction">
            Getting Started
          </Link>
        </nav>
      </div>
      <div className="mb-8">
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--primary))]">
          Module Map
        </h4>
        <nav className="flex flex-col gap-0.5">
          <Link className={itemClass(activeModuleMap === 'overview')} href="/docs/modules/overview">Overview</Link>
          <Link className={itemClass(activeModuleMap === 'checkout-sales')} href="/docs/modules/checkout-sales">Checkout & Sales</Link>
          <Link className={itemClass(activeModuleMap === 'inventory-catalogue')} href="/docs/modules/inventory-catalogue">Inventory & Catalogue</Link>
          <Link className={itemClass(activeModuleMap === 'customers-vouchers')} href="/docs/modules/customers-vouchers">Customers & Vouchers</Link>
          <Link className={itemClass(activeModuleMap === 'procurement-marketplace')} href="/docs/modules/procurement-marketplace">Procurement & Marketplace</Link>
          <Link className={itemClass(activeModuleMap === 'reports')} href="/docs/modules/reports">Reports</Link>
          <Link className={itemClass(activeModuleMap === 'settings')} href="/docs/modules/settings">Settings</Link>
        </nav>
      </div>
      <div className="mb-8">
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--primary))]">
          Developer Guide
        </h4>
        <nav className="flex flex-col gap-0.5">
          <Link className={itemClass(activeItem === 'overview')} href="/docs/developer/contributing">
            Overview
          </Link>
          <Link className={itemClass(activeItem === 'project-architecture')} href="/docs/developer/architecture">
            Project Architecture
          </Link>
          <Link className={itemClass(activeItem === 'github-workflow')} href="/docs/developer/github-workflow">
            GitHub Workflow Guide
          </Link>
          <Link className={itemClass(activeItem === 'contributing')} href="/docs/contributing">
            Contributing
          </Link>
        </nav>
      </div>
      <div>
        <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--primary))]">
          Community
        </h4>
        <div className="flex flex-col gap-2">
          <Link className={itemClass(activeItem === 'social-network')} href="/docs/social-network">
            Social Network
          </Link>
          <a
            className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--secondary))] px-3 py-2 text-[12px] font-semibold text-white hover:opacity-90"
            href="https://discord.com/invite"
            rel="noreferrer"
            target="_blank"
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
