export interface PageInfo {
  title: string
  path: string
}

export interface SidebarCategory {
  category: string
  pages: PageInfo[]
}

export const SIDEBAR_STRUCTURE: SidebarCategory[] = [
  {
    category: 'Getting Started',
    pages: [
      { title: 'Introduction', path: '/docs/getting-started/introduction' },
      { title: 'Installation', path: '/docs/getting-started/installation' }
    ]
  },
  {
    category: 'User Guide',
    pages: [
      { title: 'POS Operations', path: '/docs/user-guide/pos' },
      { title: 'Inventory Management', path: '/docs/user-guide/inventory' }
    ]
  },
  {
    category: 'Application Modules',
    pages: [
      { title: 'Overview', path: '/docs/modules/overview' },
      { title: 'Checkout & Sales', path: '/docs/modules/checkout-sales' },
      { title: 'Inventory & Catalogue', path: '/docs/modules/inventory-catalogue' },
      { title: 'Customers & Vouchers', path: '/docs/modules/customers-vouchers' },
      { title: 'Procurement & Marketplace', path: '/docs/modules/procurement-marketplace' },
      { title: 'Reports & Analytics', path: '/docs/modules/reports' },
      { title: 'Settings & Configuration', path: '/docs/modules/settings' }
    ]
  },
  {
    category: 'Developer Guide',
    pages: [
      { title: 'Developer Overview', path: '/docs/developer/overview' },
      { title: 'Project Architecture', path: '/docs/developer/architecture' },
      { title: 'Contributing Guidelines', path: '/docs/contributing' },
      { title: 'Email Administration', path: '/docs/developer/managing-emails' }
    ]
  },
  {
    category: 'Community',
    pages: [
      { title: 'Social Network', path: '/docs/social-network' }
    ]
  }
]

export const FLAT_PAGES = SIDEBAR_STRUCTURE.flatMap((cat) => cat.pages)

export function getPageHierarchy(pathname: string) {
  for (const cat of SIDEBAR_STRUCTURE) {
    const page = cat.pages.find((p) => p.path === pathname)
    if (page) {
      return { category: cat.category, page }
    }
  }
  return null
}
