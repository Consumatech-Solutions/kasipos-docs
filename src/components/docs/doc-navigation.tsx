'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { getPageHierarchy, FLAT_PAGES } from './sidebar-config'

export function DocBreadcrumbs() {
  const pathname = usePathname()
  const hierarchy = getPageHierarchy(pathname)

  if (!hierarchy) return null

  const { category, page } = hierarchy

  return (
    <nav className="mb-6 flex items-center gap-2 text-[12px] text-[hsl(var(--foreground))/0.45]">
      <span>{category}</span>
      <ChevronRight size={14} />
      <span className="font-medium text-[hsl(var(--foreground))]">{page.title}</span>
    </nav>
  )
}

export function DocPageNavigation() {
  const pathname = usePathname()
  const currentIndex = FLAT_PAGES.findIndex((page) => page.path === pathname)

  if (currentIndex === -1) return null

  const prevPage = currentIndex > 0 ? FLAT_PAGES[currentIndex - 1] : null
  const nextPage = currentIndex < FLAT_PAGES.length - 1 ? FLAT_PAGES[currentIndex + 1] : null

  return (
    <div className="mt-16 flex items-center justify-between border-t border-[hsl(var(--border))] pt-8">
      {prevPage ? (
        <Link href={prevPage.path} className="group flex flex-col gap-1.5 text-left text-decoration-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--foreground))/0.45] transition-colors group-hover:text-[hsl(var(--foreground))]">
            Previous
          </span>
          <span className="flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--secondary))] transition-colors duration-150">
            <ArrowLeft size={16} /> {prevPage.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link href={nextPage.path} className="group flex flex-col items-end gap-1.5 text-right text-decoration-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--foreground))/0.45] transition-colors group-hover:text-[hsl(var(--foreground))]">
            Next
          </span>
          <span className="flex items-center gap-2 text-[14px] font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--secondary))] transition-colors duration-150">
            {nextPage.title} <ArrowRight size={16} />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
