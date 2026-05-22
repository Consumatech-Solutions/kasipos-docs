import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import React from 'react'
import { TableOfContents, TOCItem } from '@/components/docs/table-of-contents'
import { DocBreadcrumbs, DocPageNavigation } from '@/components/docs/doc-navigation'
import { FileTree, Dir, File } from '@/components/docs/FileTree'
import { CodeBlock } from '@/components/docs/CodeBlock'

const Table: React.FC<any> = ({ children }) => (
  <div className="mdx-table-wrapper">
    <table>{children}</table>
  </div>
)

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
  }> = ({ children, metadata, toc }) => {
    const isHomePage =
      typeof metadata === 'object' &&
      metadata !== null &&
      'title' in metadata &&
      (metadata as { title?: unknown }).title === 'Home'

    if (isHomePage) {
      return (
        <div className="w-full">
          <main className="nextra-content">{children}</main>
        </div>
      )
    }

    return (
      <div className="w-full min-h-screen pl-0 lg:pl-64 xl:pr-60 pt-1 flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <div className="flex-1 w-full max-w-[760px] mx-auto px-6 py-10 md:px-10">
          <DocBreadcrumbs />
          <main className="nextra-content">{children}</main>
          <DocPageNavigation />
        </div>
        <TableOfContents toc={toc as TOCItem[]} />
      </div>
    )
  }

  return {
    ...base,
    wrapper: MinimalWrapper,
    FileTree,
    Dir,
    File,
    pre: CodeBlock,
    table: Table
  }
}
