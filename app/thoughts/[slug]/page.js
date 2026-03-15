import { getPostBySlug, getAllPosts, getSiteConfig } from '@/lib/content'
import PostClient from './PostClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  
  return {
    title: `${post.title} | Alexander Sterling`,
    description: post.excerpt,
  }
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug)
  const siteConfig = getSiteConfig()

  if (!post) {
    notFound()
  }

  return <PostClient post={post} siteConfig={siteConfig} />
}
