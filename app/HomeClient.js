'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import {
  User, Briefcase, PenLine, Link as LinkIcon,
  Sun, Moon, ArrowRight, FolderOpen
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { name: 'About',    path: '/about',    icon: User,       description: 'My story & philosophy' },
  { name: 'Work',     path: '/work',     icon: Briefcase,  description: 'Career highlights' },
  { name: 'Projects', path: '/projects', icon: FolderOpen, description: 'Things I built' },
  { name: 'Thoughts', path: '/thoughts', icon: PenLine,    description: 'Writing & ideas' },
  { name: 'Links',    path: '/links',    icon: LinkIcon,   description: 'Connect with me' },
]

// Real experiments from real work
const EXPERIMENTS = [
  { id: 247, name: 'bharat_taxi_cac_v3',        metric: 'CAC',          delta: '−31%',   sig: true  },
  { id: 248, name: 'namma_yatri_push_timing',   metric: 'D7 retention', delta: '+8%',    sig: true  },
  { id: 249, name: 'brick_bolt_meta_capi',      metric: 'lead volume',  delta: '+50%',   sig: true  },
  { id: 250, name: 'airtribe_cpl_creative_mix', metric: 'CPL',          delta: '−45%',   sig: true  },
  { id: 251, name: 'referral_flow_v2',          metric: 'k-factor',     delta: 'running…', sig: false },
]

const TRAITS = [
  'Growth Specialist',
  'Motorcyclist',
  'Mountain Chaser',
  'Beach Seeker',
  'Chess Player',
  'Trivia Collector',
  'Offbeat Explorer',
  'Experiment-first Thinker',
]

// ─── Growth Terminal (WOW element) ───────────────────────────────────────────

function GrowthTerminal() {
  const [expIdx, setExpIdx]     = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [phase, setPhase]       = useState('typing') // typing | result | pause
  const [visible, setVisible]   = useState(false)
  const ref = useRef(null)

  // Fade in when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const current = EXPERIMENTS[expIdx]
  const promptText = `> exp_${current.id}: ${current.name}`

  useEffect(() => {
    if (!visible) return
    if (phase === 'typing') {
      if (charIdx < promptText.length) {
        const t = setTimeout(() => setCharIdx(c => c + 1), 28)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('result'), 350)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'result') {
      const t = setTimeout(() => setPhase('pause'), 2400)
      return () => clearTimeout(t)
    }
    if (phase === 'pause') {
      const t = setTimeout(() => {
        setExpIdx(i => (i + 1) % EXPERIMENTS.length)
        setCharIdx(0)
        setPhase('typing')
      }, 700)
      return () => clearTimeout(t)
    }
  }, [phase, charIdx, promptText, visible])

  const isPositive = current.delta.startsWith('+') || current.delta.startsWith('−') || current.delta.startsWith('-')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.5 }}
      className="font-mono text-xs rounded-xl border border-border/40 bg-card/70 backdrop-blur-sm w-full max-w-[300px]"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)' }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
        <span className="text-muted-foreground/50 ml-1.5 text-[10px] tracking-wider">growth.log</span>
      </div>

      {/* Terminal body */}
      <div className="px-3 py-3 space-y-1.5 min-h-[56px]">
        {/* Typing line */}
        <div className="text-brass/80 leading-relaxed">
          {promptText.substring(0, charIdx)}
          {phase === 'typing' && (
            <span className="inline-block w-[7px] h-[13px] bg-brass/70 ml-[1px] animate-pulse align-middle" />
          )}
        </div>

        {/* Result line */}
        <AnimatePresence>
          {phase !== 'typing' && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              {current.sig ? (
                <>
                  <span className="text-green-400/80">✓</span>
                  <span className="text-muted-foreground/70">{current.metric}</span>
                  <span className={isPositive ? 'text-green-400/90' : 'text-yellow-400/80'}>
                    {current.delta}
                  </span>
                  <span className="text-muted-foreground/40 text-[10px]">p &lt; 0.05</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-400/70 animate-spin inline-block">⟳</span>
                  <span className="text-muted-foreground/60">{current.metric}: {current.delta}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Nav Card ────────────────────────────────────────────────────────────────

function NavCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 + index * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={item.path}>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onTapStart={() => setPressed(true)}
          onTap={() => setPressed(false)}
          onTapCancel={() => setPressed(false)}
          animate={{ y: pressed ? 3 : 0, scale: pressed ? 0.98 : 1 }}
          transition={{ duration: 0.1 }}
          className="relative rounded-xl cursor-pointer overflow-hidden"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)/0.7))'
              : 'linear-gradient(160deg, hsl(var(--card)), hsl(var(--secondary)/0.5))',
            boxShadow: pressed
              ? 'inset 2px 2px 8px rgba(0,0,0,0.35), inset -1px -1px 4px rgba(255,255,255,0.02)'
              : hovered
                ? '0 4px 0 hsl(var(--border)), 0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px hsl(var(--brass)/0.2)'
                : '0 3px 0 hsl(var(--border)), 0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border)/0.5)',
            transition: 'box-shadow 0.2s ease, background 0.2s ease',
          }}
        >
          {/* Shimmer on hover */}
          {hovered && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '150%', opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          )}

          <div className="relative p-4">
            {/* Status dot */}
            <motion.div
              className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass-dark)))',
              }}
              animate={{
                opacity: hovered ? 1 : 0.35,
                boxShadow: hovered
                  ? '0 0 6px hsl(var(--brass)), 0 0 12px hsl(var(--brass)/0.4)'
                  : 'none',
              }}
              transition={{ duration: 0.25 }}
            />

            {/* Icon */}
            <motion.div
              className="mb-3 w-9 h-9 rounded-lg flex items-center justify-center"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
                boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              <item.icon className="w-4 h-4 text-brass" />
            </motion.div>

            <h3 className="font-serif text-lg text-foreground mb-0.5 leading-tight">{item.name}</h3>
            <p className="text-xs text-muted-foreground leading-snug mb-3">{item.description}</p>

            <motion.div
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-3.5 h-3.5 text-brass/70" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomeClient({ siteConfig }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted]       = useState(false)
  const [traitIdx, setTraitIdx]     = useState(0)
  const [mousePos, setMousePos]     = useState({ x: -9999, y: -9999 })
  const containerRef                = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  // Rotate personality traits
  useEffect(() => {
    const t = setInterval(() => setTraitIdx(i => (i + 1) % TRAITS.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Cursor glow — follows mouse with a warm gold radial gradient
  useEffect(() => {
    const handleMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">

      {/* ── Cursor glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(520px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brass)/0.05), transparent 65%)`,
          transition: 'background 0.08s ease',
        }}
      />

      {/* ── Background grain texture (subtle depth) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* ── Theme toggle ── */}
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

      {/* ── Main layout ── */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 sm:px-10 pt-14 pb-8 max-w-xl mx-auto">

        {/* HERO */}
        <div className="flex-1">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-brass/80 to-brass/20" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Portfolio</span>
          </motion.div>

          {/* Name — split reveal */}
          <div className="mb-5 overflow-hidden">
            <motion.h1
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              className="font-serif font-normal leading-[0.92] text-foreground"
              style={{ fontSize: 'clamp(3.2rem, 12vw, 5.5rem)' }}
            >
              Aswin
            </motion.h1>
            <motion.h1
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="font-serif font-normal leading-[0.92] text-brass"
              style={{ fontSize: 'clamp(3.2rem, 12vw, 5.5rem)' }}
            >
              Sampath Kumar
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            className="text-sm text-foreground/75 max-w-xs leading-relaxed mb-2"
          >
            Figuring out what actually moves metrics in meaningful ways.
          </motion.p>

          {/* Personality ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="h-5 overflow-hidden mb-9"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={traitIdx}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-[11px] tracking-wide text-muted-foreground"
              >
                {TRAITS[traitIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* ── WOW ELEMENT: Growth Terminal ── */}
          <GrowthTerminal />
        </div>

        {/* NAV CARDS */}
        <div className="mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? 'hsl(var(--brass))' : 'hsl(var(--border))' }}
                />
              ))}
            </div>
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Navigation</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {NAV_ITEMS.map((item, i) => (
              <NavCard key={item.path} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="mt-7 flex items-center justify-between"
        >
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/40">
            Based in India
          </span>
          <span className="text-[10px] text-muted-foreground/30">aswinwrites@gmail.com</span>
        </motion.div>
      </div>
    </div>
  )
}
