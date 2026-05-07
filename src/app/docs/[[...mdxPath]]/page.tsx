import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

type Params = Promise<{ mdxPath?: string[] }>

type WrapperProps = {
  toc?: unknown
  metadata?: unknown
  children: React.ReactNode
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata as Metadata
}

export default async function CatchAllDocsPage(props: {
  params: Params
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await props.params

  if (!params.mdxPath || params.mdxPath.length === 0) {
    redirect('/docs/home')
  }

  const Wrapper = (getMDXComponents() as unknown as { wrapper: React.ComponentType<WrapperProps> }).wrapper

  const searchParams = await props.searchParams
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} searchParams={searchParams} />
    </Wrapper>
  )
}
