import { getAllPosts, getSiteConfig } from '@/lib/content'
import ThoughtsClient from './ThoughtsClient'

export const metadata = {
  title: 'Thoughts | Alexander Sterling',
  description: 'Writing on design, product development, and creative process.',
}

export default function ThoughtsPage() {
  const posts = getAllPosts()
  const siteConfig = getSiteConfig()

  return <ThoughtsClient posts={posts} siteConfig={siteConfig} />
}
