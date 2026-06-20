'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const UTM = '?utm_source=aswinsampathkumar.in&utm_medium=portfolio&utm_campaign=projects'

const PROJECTS = [
  {
    emoji: 'ð',
    name: 'GrowthTools',
    tagline: 'A toolkit for growth practitioners.',
    description: 'Experiment templates, funnel audit checklists, north star metric calculators â built for people who run growth loops, not just read about them. Less theory, more signal.',
    tags: ['Growth', 'Marketing', 'Tooling'],
    status: 'LIVE',
    url: 'https://growthtools.vercel.app/' + UTM,
  },
  {
    emoji: 'ðºï¸',
    name: 'BLR Weekend Explorer',
    tagline: 'Bengaluru, off the beaten path.',
    description: 'A curated weekend guide to the city\'s hidden spots â offbeat cafes, quiet parks, motorcycle-friendly routes, and neighbourhoods Google Maps won\'t surface. For locals who are still discovering the city.',
    tags: ['Local Discovery', 'Travel', 'Curation'],
    status: 'WIP',
    url: 'https://blr-weekend-explorer.vercel.app/' + UTM,
  },
  {
    emoji: 'ð',
    name: 'Pinpoint',
    tagline: 'Park finder for urban explorers.',
    description: 'Locate quiet parks near you, filter by type and distance, and plan outdoor breaks without the guesswork. Built because "open Google Maps and scroll" is a terrible UX for finding green spaces.',
    tags: ['Maps', 'Utility', 'Bengaluru'],
    status: 'LIVE',
    url: 'https://pinpointpark.vercel.app/' + UTM,
  },
  {
    emoji: 'â¡',
    name: 'CTA Flow',
    tagline: 'Prototype CTAs before you test them.',
    description: 'A visual sandbox for marketers to iterate on button copy, placement, and conversion flow â before burning A/B test cycles on a bad hypothesis. Think Figma, but just for CTAs.',
    tags: ['Conversion', 'Marketing', 'Tooling'],
    status: 'WIP',
    url: 'https://cta-flow.vercel.app/' + UTM,
  },
]

const STATUS_STYLES = {
  LIVE: { label: 'Live', bg: 'hsl(142 60% 20%)', color: 'hsl(142 70% 65%)' },
  WIP:  { label: 'WIP',  bg: 'hsl(38 60% 15%)',  color: 'hsl(38 80% 65%)'  },
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const status = STATUS_STYLES[project.status] || STATUS_STYLES.LIVE

  const card = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -3 : 0 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-xl overflow-hidden h-full"
      style={{
        background: hovered
          ? 'linear-gradient(145deg, hsl(var(--card)), hsl(var(--secondary)/0.8))'
          : 'linear-gradient(160deg, hsl(var(--card)), hsl(var(--secondary)/0.5))',
        boxShadow: hovered
          ? '0 8px 0 hsl(var(--border)), 0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px hsl(var(--brass)/0.3)'
          : '0 3px 0 hsl(var(--border)), 0 4px 14px rgba(0,0,0,0.2), 0 0 0 1px hsl(var(--border)/0.5)',
        transition: 'box-shadow 0.2s ease, background 0.2s ease',
        cursor: project.url ? 'pointer' : 'default',
      }}
    >
      {/* Shimmer on hover */}
      {hovered && (
        <motion.div
          initial={{ x: '-110%', opacity: 0 }}
          animate={{ x: '160%', opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.07), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      )}

      <div className="relative p-5 flex flex-col h-full">
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[8px] font-mono tracking-[0.15em] px-2 py-0.5 rounded-full"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        {/* Emoji */}
        <div className="text-2xl mb-3">{project.emoji}</div>

        {/* Name + tagline */}
        <h3 className="font-serif text-lg text-foreground leading-tight mb-1">
          {project.name}
        </h3>
        <p className="text-[11px] tracking-wide text-brass/80 mb-3 font-mono">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 rounded font-mono"
              style={{
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--muted-foreground)/0.6)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.url && (
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink className="w-3 h-3 text-brass/70" />
            <span className="text-[10px] text-brass/70 font-mono tracking-wide">
              View project
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {card}
        </a>
      ) : (
        card
      )}
    </motion.div>
  )
}

export default function ProjectsClient({ siteConfig }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="relative min-h-screen bg-background">

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center border border-border/60 bg-card/80 backdrop-blur-sm hover:border-brass/40 transition-all duration-200 hover:scale-105"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        {mounted && (
          theme === 'dark'
            ? <Sun  className="w-3.5 h-3.5 text-brass" />
            : <Moon className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 pt-12 pb-16">

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-brass/70 transition-colors font-mono"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gradient-to-r from-brass/80 to-brass/20" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/50 font-mono">Projects</span>
          </div>
          <h1 className="font-serif font-normal text-foreground mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
            Things I built.
          </h1>
          <p className="text-sm text-foreground/60 max-w-md leading-relaxed">
            Side projects I shipped between experiments. Some are tools I wished existed, others are explorations. All are works in some state of progress.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

      </div>
    </div>
  )
}
