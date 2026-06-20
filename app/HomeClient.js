'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import {
  User, Briefcase, PenLine, Link as LinkIcon,
  Sun, Moon, ArrowRight, FolderOpen,
  Settings2, Filter, TrendingUp, Zap, GitBranch, Gauge, Wrench
} from 'lucide-react'

const NAV_ITEMS = [
  { name: 'About',    path: '/about',    icon: User,       description: 'My story & philosophy' },
  { name: 'Work',     path: '/work',     icon: Briefcase,  description: 'Career highlights' },
  { name: 'Projects', path: '/projects', icon: FolderOpen, description: 'Things I built' },
  { name: 'Thoughts', path: '/thoughts', icon: PenLine,    description: 'Writing & ideas' },
  { name: 'Links',    path: '/links',    icon: LinkIcon,   description: 'Connect with me' },
]

const TRAITS = [
  'Growth Specialist',
  'Motorcyclist',
  'Mountain Chaser',
  'Beach Seeker',
  'Chess Player',
  'Offbeat Explorer',
  'Experiment-first Thinker',
]

const FUNNEL_ROWS = [
  { label: 'Attract',  pct: 100, val: '10,000', cr: null },
  { label: 'Engage',   pct: 62,  val: '6,200',  cr: '62%' },
  { label: 'Intent',   pct: 28,  val: '2,800',  cr: '45%' },
  { label: 'Convert',  pct: 9,   val: '900',    cr: '32%' },
]

// âââ Blueprint Engine ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// ME Ã Growth Marketer themed element: gears feeding into a conversion funnel
function BlueprintEngine() {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase]   = useState(0) // cycles 0-3 through funnel rows
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setPhase(p => (p + 1) % FUNNEL_ROWS.length), 1600)
    return () => clearInterval(t)
  }, [visible])

  const gears = [
    { size: 32, speed: 7,  dir: 'normal',  label: 'Acquire' },
    { size: 22, speed: 4.7,dir: 'reverse', label: 'Activate' },
    { size: 32, speed: 7,  dir: 'normal',  label: 'Retain' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative rounded-xl border border-border/40 overflow-hidden"
      style={{
        background: 'hsl(var(--card)/0.65)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 6px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)/0.12) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--border)/0.12) 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Settings2
              className="w-3.5 h-3.5 text-brass/60"
              style={{ animation: 'spin 8s linear infinite' }}
            />
            <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground/45 font-mono">
              growth.engine
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brass/50 animate-pulse" />
            <span className="text-[9px] font-mono text-brass/40">running</span>
          </div>
        </div>

        {/* Gear cluster */}
        <div className="flex items-center justify-center gap-2 mb-1 h-14">
          {gears.map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Settings2
                style={{
                  width: g.size,
                  height: g.size,
                  color: 'hsl(var(--brass)/0.28)',
                  animation: `spin ${g.speed}s linear infinite`,
                  animationDirection: g.dir,
                }}
              />
              <span className="text-[8px] text-muted-foreground/25 tracking-wider font-mono">
                {g.label}
              </span>
            </div>
          ))}

          {/* Arrow â Funnel */}
          <div className="flex items-center gap-1 ml-1 mb-4">
            <div
              className="h-[1px] w-5"
              style={{ background: 'hsl(var(--brass)/0.2)' }}
            />
            <ArrowRight className="w-3 h-3 text-brass/25" />
          </div>

          {/* Funnel icon */}
          <div className="flex flex-col items-center gap-1.5 mb-0">
            <Filter
              className="w-6 h-6 text-brass/45"
              style={{ marginTop: '-8px' }}
            />
            <span className="text-[8px] text-muted-foreground/25 tracking-wider font-mono">
              Convert
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border/20 mb-4" />

        {/* Funnel bars */}
        <div className="space-y-2">
          {FUNNEL_ROWS.map((row, i) => {
            const isActive = phase >= i
            return (
              <div key={row.label} className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-muted-foreground/35 w-12 text-right shrink-0">
                  {row.label}
                </span>
                <div className="flex-1 h-3.5 rounded-sm overflow-hidden" style={{ background: 'hsl(var(--secondary)/0.5)' }}>
                  <motion.div
                    className="h-full rounded-sm"
                    initial={{ width: '0%' }}
                    animate={{ width: visible ? `${row.pct}%` : '0%' }}
                    transition={{ delay: 0.35 + i * 0.12, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      background: isActive
                        ? `hsl(var(--brass)/${0.22 + i * 0.06})`
                        : 'hsl(var(--border)/0.3)',
                      boxShadow: isActive && i === phase ? '0 0 8px hsl(var(--brass)/0.15)' : 'none',
                      transition: 'background 0.4s ease, box-shadow 0.4s ease',
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5 w-20 shrink-0">
                  <span className="text-[9px] font-mono text-brass/45">{row.val}</span>
                  {row.cr && (
                    <span className="text-[8px] font-mono text-muted-foreground/25">
                      â{row.cr}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer metrics */}
        <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3 h-3 text-brass/35" />
            <span className="text-[9px] font-mono text-muted-foreground/30">overall CR</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key="cr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] font-mono text-brass/55"
            >
              9.0%
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// âââ NavCard âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function NavCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [pressed,  setPressed]  = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          animate={{ y: pressed ? 2 : 0, scale: pressed ? 0.98 : 1 }}
          transition={{ duration: 0.1 }}
          className="relative rounded-xl cursor-pointer overflow-hidden"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)/0.7))'
              : 'linear-gradient(160deg, hsl(var(--card)), hsl(var(--secondary)/0.5))',
            boxShadow: pressed
              ? 'inset 2px 2px 8px rgba(0,0,0,0.35)'
              : hovered
                ? '0 4px 0 hsl(var(--border)), 0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px hsl(var(--brass)/0.2)'
                : '0 3px 0 hsl(var(--border)), 0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border)/0.5)',
            transition: 'box-shadow 0.2s ease, background 0.2s ease',
          }}
        >
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
            <motion.div
              className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
              style={{ background: 'hsl(var(--brass))' }}
              animate={{
                opacity: hovered ? 1 : 0.3,
                boxShadow: hovered ? '0 0 6px hsl(var(--brass))' : 'none',
              }}
              transition={{ duration: 0.25 }}
            />
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
            <h3 className="font-serif text-base text-foreground mb-0.5 leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-snug mb-3">
              {item.description}
            </p>
            <motion.div animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-3.5 h-3.5 text-brass/70" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// âââ Home âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function HomeClient({ siteConfig }) {
  const { theme, setTheme } = useTheme()
  const [mounted,   setMounted]   = useState(false)
  const [traitIdx,  setTraitIdx]  = useState(0)
  const [mousePos,  setMousePos]  = useState({ x: -9999, y: -9999 })
  const containerRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const t = setInterval(() => setTraitIdx(i => (i + 1) % TRAITS.length), 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const h = (e) => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(520px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brass)/0.05), transparent 65%)`,
          transition: 'background 0.08s ease',
        }}
      />

      {/* Film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center border border-border/60 bg-card/80 backdrop-blur-sm hover:border-brass/40 transition-all duration-200 hover:scale-105"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        {mounted && (
          theme === 'dark'
            ? <Sun className="w-3.5 h-3.5 text-brass" />
            : <Moon className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* ââ Main layout âââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 sm:px-10 lg:px-16 pt-12 pb-8 max-w-5xl mx-auto w-full">

        {/* Portfolio label */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8 lg:mb-10"
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-brass/80 to-brass/20" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/60">
            Portfolio
          </span>
        </motion.div>

        {/* ââ HERO â two-column on desktop âââââââââââââââââââââââââââââââ */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 lg:items-start">

          {/* LEFT: name + tagline + ticker + nav (desktop) */}
          <div className="flex flex-col">

            {/* Name */}
            <div className="mb-5 overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif font-normal leading-[0.90] text-foreground"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
              >
                Aswin
              </motion.h1>
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.07, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif font-normal leading-[0.90] text-brass"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
              >
                Sampath Kumar
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45 }}
              className="text-sm text-foreground/70 max-w-xs leading-relaxed mb-2"
            >
              Figuring out what actually moves metrics â then engineering systems around it.
            </motion.p>

            {/* Personality ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.4 }}
              className="h-5 overflow-hidden mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={traitIdx}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="text-[11px] tracking-wide text-muted-foreground"
                >
                  {TRAITS[traitIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Blueprint engine â shows below name on mobile, hidden here on desktop (shown right col) */}
            <div className="lg:hidden mb-8">
              <BlueprintEngine />
            </div>

          </div>

          {/* RIGHT: blueprint engine (desktop only) */}
          <div className="hidden lg:block lg:pt-1">
            <BlueprintEngine />
          </div>

        </div>

        {/* ââ NAV CARDS ââââââââââââââââââââââââââââââââââââââââââââââââââ */}
        <div className="mt-8 lg:mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? 'hsl(var(--brass))' : 'hsl(var(--border))' }}
                />
              ))}
            </div>
            <span className="text-[9px] tracking-[0.22em] uppercase text-muted-foreground/40">
              Navigation
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {NAV_ITEMS.map((item, i) => (
              <NavCard key={item.path} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ââ Footer âââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="mt-6 flex items-center justify-between"
        >
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground/35">
            Based in India
          </span>
          <span className="text-[10px] text-muted-foreground/25">
            aswinwrites@gmail.com
          </span>
        </motion.div>

      </div>
    </div>
  )
}
