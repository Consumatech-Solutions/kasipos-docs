import { Sidebar } from '@/components/docs/sidebar'
import { DocsNavbar } from '@/components/docs/docs-navbar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsNavbar />
      <Sidebar />
      {children}
    </>
  )
}
