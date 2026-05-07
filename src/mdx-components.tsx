import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import React from 'react'

// Note: Nextra expects this named export.
// It is a plain function returning MDX component mappings (not a React hook).
export function useMDXComponents(components: unknown = {}) {
  const base = getThemeComponents(components as never) as unknown as {
    wrapper?: React.ComponentType<unknown>
  }

  const MinimalWrapper: React.FC<{
    children: React.ReactNode
    toc?: unknown
    metadata?: unknown
  }> = ({ children, metadata }) => {
    const isHomePage =
      typeof metadata === 'object' &&
      metadata !== null &&
      'title' in metadata &&
      (metadata as { title?: unknown }).title === 'Home'
    const isFullWidthPage =
      typeof metadata === 'object' &&
      metadata !== null &&
      'fullWidth' in metadata &&
      Boolean((metadata as { fullWidth?: unknown }).fullWidth)

    const containerClass = isHomePage || isFullWidthPage ? 'w-full' : 'w-full px-4 py-10 lg:pl-72'
    const contentClass = isHomePage || isFullWidthPage ? 'nextra-content' : 'nextra-content mx-auto max-w-5xl'

    return (
      <div className={containerClass}>
        <main className={contentClass}>{children}</main>
      </div>
    )
  }

  return {
    ...base,
    wrapper: MinimalWrapper
  }
}
