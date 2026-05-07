'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type ActiveItem =
  | 'getting-started'
  | 'user-guide'
  | 'modules'
  | 'overview'
  | 'project-architecture'
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
}

export function Sidebar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/docs/home'

  if (isHomePage) {
    return null
  }

  const activeItem: ActiveItem | undefined = (() => {
    if (pathname.startsWith('/docs/getting-started')) return 'getting-started'
    if (pathname.startsWith('/docs/user-guide')) return 'user-guide'
    if (pathname.startsWith('/docs/modules')) return 'modules'
    if (pathname.startsWith('/docs/developer/architecture')) return 'project-architecture'
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
          >
            Join Discord
          </a>
        </div>
      </div>
    </aside>
  )
}
