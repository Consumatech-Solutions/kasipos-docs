import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/content',
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: 'github-dark',
        light: 'github-light'
      }
    }
  }
})

export default withNextra({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})

