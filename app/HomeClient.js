'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import {
  User, Briefcase, PenLine, Link as LinkIcon,
  Sun, Moon, ArrowRight, FolderOpen,
} from 'lucide-react'

// âââ Data ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

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

// Simple Icons slugs â icons render in brass via CDN color param
const TOOLS = [
  { name: 'Claude',     slug: 'anthropic'       },
  { name: 'ChatGPT',    slug: 'openai'          },
  { name: 'Meta Ads',   slug: 'meta'            },
  { name: 'Google Ads', slug: 'googleads'       },
  { name: 'Firebase',   slug: 'firebase'        },
  { name: 'Analytics',  slug: 'googleanalytics' },
  { name: 'Metabase',   slug: 'metabase'        },
  { name: 'Notion',     slug: 'notion'          },
  { name: 'Figma',      slug: 'figma'           },
  { name: 'Supabase',   slug: 'supabase'        },
  { name: 'GitHub',     slug: 'github'          },
  { name: 'Vercel',     slug: 'vercel'          },
  { name: 'Airtable',   slug: 'airtable'        },
  { name: 'Zapier',     slug: 'zapier'          },
]

// âââ Click Sound (Web Audio API â synthesised mechanical tick) ââââââââââââââââ

function playClick() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const sr  = ctx.sampleRate
    const len = Math.floor(sr * 0.055)
    const buf = ctx.createBuffer(1, len, sr)
    const d   = buf.getChannelData(0)
    // Sharp transient + exponential noise decay
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 14)
    }
    const src  = ctx.createBufferSource()
    src.buffer = buf
    const gain = ctx.createGain()
    gain.gain.value = 0.18
    src.connect(gain)
    gain.connect(ctx.destination)
    src.start()
    src.onended = () => ctx.close()
  } catch (_) {}
}

// âââ Tool Belt âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// Seamless CSS marquee â doubles the list so translateX(-50%) loops cleanly.

function ToolBelt() {
  const doubled = [...TOOLS, ...TOOLS]

  return (
    <div className="mb-8 lg:mb-10">
      <p
        className="text-[9px] tracking-[0.24em] uppercase mb-3 font-mono"
        style={{ color: 'hsl(var(--muted-foreground)/0.4)' }}
      >
        Tools I mess around with
      </p>

      {/* Conveyor */}
      <div className="relative overflow-hidden" style={{ height: 62 }}>

        {/* Spotlight fade â left */}
        <div
          className="absolute inset-y-0 left-0 w-14 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }}
        />
        {/* Spotlight fade â right */}
        <div
          className="absolute inset-y-0 right-0 w-14 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }}
        />

        {/* Scrolling strip */}
        <div
          className="flex items-center gap-8 absolute inset-y-0 left-0"
          style={{ animation: 'toolbelt 30s linear infinite', willChange: 'transform', width: 'max-content' }}
        >
          {doubled.map((tool, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center shrink-0"
              style={{ width: 44, gap: 5 }}
            >
              <div
                style={{ opacity: 0.65, transition: 'opacity 0.22s ease' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.65' }}
              >
                <img
                  src={'https://cdn.simpleicons.org/' + tool.slug}
                  alt={tool.name}
                  width={22}
                  height={22}
                  style={{ display: 'block', objectFit: 'contain' }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <span
                className="font-mono"
                style={{ fontSize: 7, letterSpacing: '0.06em', color: 'hsl(var(--muted-foreground)/0.28)', whiteSpace: 'nowrap' }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe lives here â scoped so it doesn't leak */}
      <style>{`@keyframes toolbelt { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
    </div>
  )
}

// âââ NavCard âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function NavCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

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
                ? '0 4px 0 hsl(var(--border)), 0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px hsl(var(--brass)/0.25)'
                : '0 3px 0 hsl(var(--border)), 0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border)/0.5)',
            transition: 'box-shadow 0.2s ease, background 0.2s ease',
          }}
        >
          {/* Shimmer */}
          {hovered && (
            <motion.div
              initial={{ x: '-111%', opacity: 0 }}
              animate={{ x: '160%', opacity: 1 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.07), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          )}

          <div className="relative p-4">
            {/* Indicator dot */}
            <motion.div
              className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
              style={{ background: 'hsl(var(--brass))' }}
              animate={{
                opacity: hovered ? 1 : 0.3,
                boxShadow: hovered ? '0 0 8px hsl(var(--brass)/0.8)' : 'none',
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Icon box */}
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

// âââ HomeClient âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function HomeClient({ siteConfig }) {
  const { theme, setTheme } = useTheme()
  const [mounted,  setMounted]  = useState(false)
  const [traitIdx, setTraitIdx] = useState(0)
  // clientX/Y for fixed-position glow â clientX/Y no container offset needed
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

  useEffect(() => { setMounted(true) }, [])

  // Personality ticker
  useEffect(() => {
    const t = setInterval(() => setTraitIdx(i => (i + 1) % TRAITS.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Cursor tracking â absolute viewport coords so fixed glow is correct
  useEffect(() => {
    const h = e => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  // Mechanical click sound on every mouse-down
  useEffect(() => {
    window.addEventListener('mousedown', playClick)
    return () => window.removeEventListener('mousedown', playClick)
  }, [])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* ââ Cursor glow â tracks actual cursor position âââââââââââââââââ */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(208px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brass)/0.28), transparent 70%)`,
        }}
      />

      {/* ââ Film grain âââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* ââ Theme toggle ââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center border border-border/60 bg-card/80 backdrop-blur-sm hover:border-brass/40 transition-all duration-200 hover:socale-105"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        {mounted && (
          theme === 'dark'
            ? <Sun  className="w-3.5 h-3.5 text-brass" />
            : <Moon className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* ââ Main layout âââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 sm:px-10 lg:px-20 pt-12 pb-8 max-w-5xl mx-auto w-full">

        {/* Portfolio label */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-brass/80 to-brass/20" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/60">Portfolio</span>
        </motion.div>

        {/* ââ Name ââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
        <div className="mb-5 overflow-hidden">
          <motion.h1
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif font-normal leading-[0.90] text-foreground"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Aswin
          </motion.h1>
          <motion.h1
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.07, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif font-normal leading-[0.90] text-brass"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Sampath Kumar
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45 }}
          className="text-sm text-foreground/70 max-w-sm leading-relaxed mb-2"
        >
          Figuring out what actually moves metrics, then engineering systems around it.
        </motion.p>

        {/* Personality ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.4 }}
          className="h-5 overflow-hidden mb-7"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={traitIdx}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              exit={{   y: -16, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="text-[11px] tracking-wide text-muted-foreground"
            >
              {TRAITS[traitIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Tool Belt conveyor */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ToolBelt />
        </motion.div>

        {/* Navigation cards */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {NAV_ITEMS.map((item, i) => (
              <NavCard key={item.path} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="mt-6 flex items-center justify-end"
        >
          <span className="text-[10px] text-muted-foreground/25">
            aswinwrites@gmail.com
          </span>
        </motion.div>

      </div>
    </div>
  )
}
