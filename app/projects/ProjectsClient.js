'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const UTM = '?utm_source=aswinsampathkumar.in&utm_medium=portfolio&utm_campaign=projects'

const PROJECTS = [
  {
    emoji: '🛠️',
    name: 'Tools that Marketers need',
    tagline: 'One stop page for frequently used marketing tools.',
    description: 'QR code generator, dynamic links, URL tracker, spreadsheet manipulation, keyword match types & much more — built for marketers who\'d rather spend time on strategy than repetitive tasks.',
    tags: ['Performance Marketing', 'Tooling', 'Growth'],
    status: 'LIVE',
    url: 'https://www.marketertools.fyi/' + UTM,
  },
  {
    emoji: '📍',
    name: 'Track your parked vehicle',
    tagline: 'Never forget where you parked.',
    description: 'Built to solve a personal problem of marking the coordinates, along with a picture of where I park, when I explore trails and some uncharted territories.',
    tags: ['Maps', 'Utility', 'PWA'],
    status: 'LIVE',
    url: 'https://pinpointpark.vercel.app/' + UTM,
  },
  {
    emoji: '🏎️',
    name: 'Automotive Crosswords',
    tagline: 'Crosswords for the car-obsessed.',
    description: 'A fun crossword game for automobile aficionados — clues built around cars, bikes, and everything with an engine.',
    tags: ['Games', 'Automotive', 'Fan App'],
    status: 'LIVE',
    url: 'https://autocrosswords.vercel.app/' + UTM,
  },
  {
    emoji: '⛰️',
    name: 'BLR Weekend Getaway places',
    tagline: 'Bengaluru, off the beaten path.',
    description: 'Curation of all the go-to places around Bangalore. Started as a spreadsheet to personally track my trips, later went mildly popular in motorcycling groups. Still a work in progress.',
    tags: ['Local Discovery', 'Travel', 'Maps'],
    status: 'WIP',
    url: 'https://weekendexplorer.in/' + UTM,
  },
  {
    emoji: '🎶',
    name: "Mood-based curator of Weeknd's Songs",
    tagline: 'Discover The Weeknd by mood and era.',
    description: 'Big-time Abel fan. Just a fan/fun project to curate his songs based on mood — whether you\'re deep in After Hours or want something off Trilogy.',
    tags: ['Music', 'Discovery', 'Fan App'],
    status: 'LIVE',
    url: 'https://weeknd-vibes.vercel.app/' + UTM,
  },
  {
    emoji: '📱',
    name: 'Landing page builder for WhatsApp Messages',
    tagline: 'CTAs for WhatsApp, made simple.',
    description: 'Built to solve a personal problem of needing to add multiple links or CTAs to WhatsApp messages which are explanatory in nature. This easy landing page builder solves it.',
    tags: ['WhatsApp', 'Marketing', 'Tooling'],
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const status = STATUS_STYLES[project.status] || STATUS_STYLES.LIVE

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: -y * 10, y: x * 10 })
  }

  const onLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const card = (
    <motion.div
      ref={ref}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={onLeave}
      onMouseMove={onMove}
      animate={{ y: hovered ? -3 : 0, rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
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
      style={{ perspective: '600px' }}
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
  return (
    <div className="relative min-h-screen bg-background">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

      </div>
    </div>
  )
}
