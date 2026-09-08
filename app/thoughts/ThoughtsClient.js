'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, ArrowRight, Calendar } from 'lucide-react'

const BackButton = () => (
  <Link href="/">
    <motion.div
      className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full z-50 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      whileHover={{ scale: 1.02, x: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ArrowLeft className="w-4 h-4 text-brass" />
      <span className="text-sm text-foreground">Back</span>
    </motion.div>
  </Link>
)

const PostCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/thoughts/${post.slug}`}>
        <motion.div
          className="p-6 rounded-xl cursor-pointer transition-all"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary) / 0.5))',
            boxShadow: isHovered
              ? '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))',
              }}
              animate={{
                opacity: isHovered ? 1 : 0.4,
                boxShadow: isHovered ? '0 0 8px hsl(var(--brass))' : '0 0 0px transparent',
              }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl text-foreground mb-3">{post.title}</h2>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-brass">
            <span className="text-sm">Read article</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

export default function ThoughtsClient({ posts, siteConfig }) {
  return (
    <>
      <BackButton />

      <main className="min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Thoughts</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground mb-4">Writing & Ideas</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Reflections on design, product development, and the craft of building things.
            </p>
          </motion.div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))
            ) : (
              <motion.div
                className="p-8 rounded-xl text-center"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
                  boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.2)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground">No posts yet. Check back soon!</p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <motion.div
            className="mt-16 pt-8 border-t border-border text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              {posts.length} article{posts.length !== 1 ? 's' : ''} published
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
