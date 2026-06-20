'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const PROJECTS = [
  {
    emoji: '🗺️',
    name: 'BLR Explorer',
    tagline: 'The city, off the beaten path.',
    description: 'A curated guide to Bengaluru\'s hidden gems — offbeat cafes, unexplored neighbourhoods, the city\'s best motorcycle routes. Built for people who think Google Maps is too mainstream.',
    tags: ['Local Discovery', 'Travel', 'Curation'],
    status: 'LIVE',
    url: null,
  },
  {
    emoji: '📈',
    name: 'GrowthTools',
    tagline: 'Frameworks for growth practitioners.',
    description: 'Experiment templates, funnel audit checklists, and A/B test calculators — built for growth practitioners who prefer doing over reading theory. Less fluff, more signal.',
    tags: ['Growth', 'Marketing', 'Tooling'],
    status: 'LIVE',
    url: null,
  },
  {
    emoji: '📍',
    name: 'Pinpoint',
    tagline: 'Geography shapes conversion.',
    description: 'A location-intelligence tool that maps how geography shapes conversion. Understand which cities, zones, and micro-markets drive your funnel — and which ones drain it.',
    tags: ['Analytics', 'Location', 'Conversion'],
    status: 'BUILDING',
    url: null,
  },
  {
    emoji: '✍️',
    name: 'Flow CTA',
    tagline: 'CTAs that actually convert.',
    description: 'An optimizer that generates, variant-tests, and ranks call-to-action copy using conversion psychology principles. Stop guessing what works — let the data decide.',
    tags: ['CRO', 'Copywriting', 'A/B Testing'],
    status: 'BUILDING',
    url: null,
  },
]

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-50 border border-border/60 bg-card/80 backdrop-blur-sm hover:border-brass/40 transition-colors"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark'
        ? <Sun  className="w-4 h-4 text-brass" />
        : <Moon className="w-4 h-4 text-muted-foreground" />}
    </motion.button>
  )
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl p-6 transition-all duration-300"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)/0.8))'
          : 'linear-gradient(160deg, hsl(var(--card)), hsl(var(--secondary)/0.5))',
        boxShadow: hovered
          ? '0 0 0 1px hsl(var(--brass)/0.25), 0 8px 32px rgba(0,0,0,0.3)'
          : '0 0 0 1px hsl(var(--border)/0.5), 0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{project.emoji}</span>
        <span
          className="text-[10px] tracking-widest font-mono px-2.5 py-1 rounded-full"
          style={{
            background: project.status === 'LIVE' ? 'hsl(var(--brass)/0.12)' : 'hsl(var(--secondary))',
            color: project.status === 'LIVE' ? 'hsl(var(--brass))' : 'hsl(var(--muted-foreground))',
            border: project.status === 'LIVE' ? '1px solid hsl(var(--brass)/0.3)' : '1px solid hsl(var(--border)/0.5)',
          }}
        >
          {project.status === 'LIVE' ? '● LIVE' : '⟳ BUILDING'}
        </span>
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-1">{project.name}</h3>
      <p className="text-sm text-brass/80 mb-3 font-medium">{project.tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] tracking-wide px-2 py-0.5 rounded-full text-muted-foreground"
            style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border)/0.4)' }}
          >
            {tag}
          </span>
        ))}
      </div>
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-brass hover:text-brass-light transition-colors">
          Visit <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  )
}

export default function ProjectsClient() {
  return (
    <>
      <ThemeToggle />
      <Link href="/">
        <motion.div
          className="fixed top-6 left-6 flex items-center gap-2 px-3 py-2 rounded-full z-50 cursor-pointer border border-border/60 bg-card/80 backdrop-blur-sm hover:border-brass/40 transition-colors"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-brass" />
          <span className="text-xs text-foreground">Back</span>
        </motion.div>
      </Link>
      <main className="min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-brass/80 to-brass/10" />
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Projects</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight mb-4">Things I Built</h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Side experiments in growth, local discovery, and creative tinkering. Some are live, some are cooking.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
          <motion.div className="mt-14 pt-8 border-t border-border/40 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/40">Based in India</span>
            <span className="text-[10px] text-muted-foreground/30">aswinwrites@gmail.com</span>
          </motion.div>
        </div>
      </main>
    </>
  )
                }
