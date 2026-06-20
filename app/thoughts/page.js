import { getAllPosts, getSiteConfig } from '@/lib/content'
import ThoughtsClient from './ThoughtsClient'

export const metadata = {
  title: 'Thoughts | Aswin Sampath Kumar',
  description: 'Writing on growth experiments, marketing, and ideas worth sharing.',
}

export default function ThoughtsPage() {
  const posts      = getAllPosts()
  const siteConfig = getSiteConfig()
  return <ThoughtsClient posts={posts} siteConfig={siteConfig} />
}
