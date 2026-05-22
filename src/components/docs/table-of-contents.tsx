'use client'

import { useEffect, useState } from 'react'

export interface TOCItem {
  id: string
  depth: number
  value: string
}

export function TableOfContents({ toc }: { toc?: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  // Filter to only display H2 and H3 elements
  const items = (toc || []).filter((item) => item.depth === 2 || item.depth === 3)

  useEffect(() => {
    if (items.length === 0) return

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        // Look for headings entering or leaving the screen
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by their position in the DOM to pick the topmost one
          const sorted = visibleEntries.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
          setActiveId(sorted[0].target.id)
        } else {
          // If a heading leaves scrolling down, activate the next one
          entries.forEach((entry) => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              const currentIndex = items.findIndex((item) => item.id === entry.target.id)
              if (currentIndex !== -1 && currentIndex + 1 < items.length) {
                setActiveId(items[currentIndex + 1].id)
              }
            }
          })
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0.1
      }
    )

    headingElements.forEach((el) => observer.observe(el))

    return () => {
      headingElements.forEach((el) => observer.unobserve(el))
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="fixed right-[max(0px,calc(50%-700px))] top-14 hidden h-[calc(100vh-3.5rem)] w-60 overflow-y-auto px-6 py-10 xl:block">
      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--foreground))/0.45]">
        On This Page
      </h4>
      <nav className="flex flex-col gap-2.5">
        {items.map((item) => {
          const isActive = activeId === item.id
          const depthClass = item.depth === 3 ? 'pl-6 text-[12px]' : 'pl-3 text-[13px] font-medium border-l border-transparent'
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${depthClass} transition-colors duration-150 ${
                isActive
                  ? 'text-[hsl(var(--secondary))] border-l-2 border-[hsl(var(--secondary))] -ml-[2px]'
                  : 'text-[hsl(var(--foreground))/0.65] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              {item.value}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
