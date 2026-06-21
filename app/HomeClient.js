'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
User, Briefcase, PenLine, Link as LinkIcon,
ArrowRight, FolderOpen,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
{ name: 'About', path: '/about', icon: User, description: 'My story & philosophy' },
{ name: 'Work', path: '/work', icon: Briefcase, description: 'Career highlights' },
{ name: 'Projects', path: '/projects', icon: FolderOpen, description: 'Things I built' },
{ name: 'Thoughts', path: '/thoughts', icon: PenLine, description: 'Writing & ideas' },
{ name: 'Links', path: '/links', icon: LinkIcon, description: 'Connect with me' },
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

// OpenAI bloom mark inline SVG — cdn.simpleicons.org has no chatgpt/openai slug
const OPENAI_ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c9a84c'><path d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z'/></svg>"

// All icons rendered in brass (#c9a84c) via CDN color param; icon field overrides for missing slugs
const TOOLS = [
{ name: 'Claude', slug: 'claude' },
{ name: 'ChatGPT', slug: 'chatgpt', icon: OPENAI_ICON },
{ name: 'Meta Ads', slug: 'meta' },
{ name: 'Google Ads', slug: 'googleads' },
{ name: 'Firebase', slug: 'firebase' },
{ name: 'Analytics', slug: 'googleanalytics' },
{ name: 'Metabase', slug: 'metabase' },
{ name: 'Notion', slug: 'notion' },
{ name: 'Figma', slug: 'figma' },
{ name: 'Supabase', slug: 'supabase' },
{ name: 'GitHub', slug: 'github' },
{ name: 'Vercel', slug: 'vercel' },
{ name: 'Airtable', slug_: 'airtable' },
{ name: 'Zapier', slug: 'zapier' },
]

// ── Click Sound ──────────────────────────────────────────────────────────────

function playClick() {
try {
const Ctx = window.AudioContext || window.webkitAudioContext
if (!Ctx) return
const ctx = new Ctx()
const sr = ctx.sampleRate
const len = Math.floor(sr * 0.055)
const buf = ctx.createBuffer(1, len, sr)
const d = buf.getChannelData(0)
for (let i = 0; i < len; i++) {
d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 14)
}
const src = ctx.createBufferSource()
src.buffer = buf
const gain = ctx.createGain()
gain.gain.value = 0.18
src.connect(gain)
gain.connect(ctx.destination)
src.start()
src.onended = () => ctx.close()
} catch (_) {}
}

// ─── Tool Belt ───────────────────────────────────────────────────────────────

function ToolBelt() {
const doubled = [...TOOLS, ...TOOLS]

return (
<div className="mb-8 lg:mb-10">
{/* Label with blinking cursor */}
<div className="flex items-center gap-1 mb-3">
<p
className="text-[9px] tracking-[0.24em] uppercase font-mono"
style={{ color: 'hsl(var(--muted-foreground)/0.4)' }}
>
Tools I mess around with
</p>
<motion.span
animate={{ opacity: [1, 0] }}
transition={{ repeat: Infinity, duration: 0.85, ease: 'steps(1)' }}
className="font-mono text-[9px]"
style={{ color: 'hsl(var(--brass)/0.65)', lineHeight: 1 }}
>
_
</motion.span>
</div>

{/* Conveyor */}
<div className="relative overflow-hidden" style={{ height: 62 }}>

{/* Edge fade left — wider + hard stop at 30% */}
<div
className="absolute inset-y-0 left-0 z-10 pointer-events-none"
style={{
width: 96,
background: 'linear-gradient(to right, hsl(var(--background)) 30%, transparent)',
}}
/>
{/* Edge fade right — wider + hard stop at 30% */}
<div
className="absolute inset-y-0 right-0 z-10 pointer-events-none"
style={{
width: 96,
background: 'linear-gradient(to left, hsl(var(--background)) 30%, transparent)',
}}
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
style={{ opacity: 0.65, transition: 'opacity 0.2s ease, transform 0.2s ease', transform: 'scale(1)' }}
onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)' }}
onMouseLeave={e => { e.currentTarget.style.opacity = '0.65'; e.currentTarget.style.transform = 'scale(1)' }}
>
<img
src={tool.icon || `https://cdn.simpleicons.org/${tool.slug}/c9a84c`}
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
<span>
</div>
))}
</div>
</div>
<style>{`@keyframes toolbelt { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
</div>
)
}

// ─── NavCard — 3D magnetic tilt ──────────────────────────────────────────────

function NavCard({ item, index }) {
const [hovered, setHovered] = useState(false)
const [pressed, setPressed] = useState(false)
const [tilt, setTilt] = useState({ x: 0, y: 0 })
const ref = useRef(null)

const onMove = (e) => {
if (!ref.current) return
const r = ref.current.getBoundingClientRect()
const x = (e.clientX - r.left) / r.width - 0.5 // -0.5 → 0.5
const y = (e.clientY - r.top) / r.height - 0.5
setTilt({ x: -y * 16, y: x * 16 }) // ±8 deg
}

const onLeave = () => {
setHovered(false)
setTilt({ x: 0, y: 0 })
}

return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.55 + index * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
style={{ perspective: '600px' }}
>
<Link href={item.path}>
<motion.div
ref={ref}
onHoverStart={() => setHovered(true)}
onHoverEnd={onLeave}
onMouseMove={onMove}
onTapStart={() => setPressed(true)}
onTap={() => { setPressed(false); setTilt({ x: 0, y: 0 }) }}
onTapCancel={() => { setPressed(false); setTilt({ x: 0, y: 0 }) }}
animate={{
rotateX: tilt.x,
rotateY: tilt.y,
y: pressed ? 2 : 0,
scale: pressed ? 0.98 : 1,
}}
transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.5 }}
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

// ─── HomeClient ───────────────────────────────────────────────────────────────

export default function HomeClient({ siteConfig }) {
const [traitIdx, setTraitIdx] = useState(0)
const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

useEffect(() => {
const t = setInterval(() => setTraitIdx(i => (i + 1) % TRAITS.length), 2800)
return () => clearInterval(t)
}, [])

useEffect(() => {
const h = e => setMousePos({ x: e.clientX, y: e.clientY })
window.addEventListener('mousemove', h, { passive: true })
return () => window.removeEventListener('mousemove', h)
}, [])

useEffect(() => {
window.addEventListener('mousedown', playClick)
return () => window.removeEventListener('mousedown', playClick)
}, [])

return (
<div className="relative min-h-screen bg-background overflow-hidden">

{/* Cursor glow */}
<div
className="pointer-events-none fixed inset-0 z-0"
style={{
background: `radial-gradient(208px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brass)/0.28), transparent 70%)`,
}}
/>

{/* Film grain */}
<div
className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
style={{
backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
backgroundRepeat: 'repeat',
backgroundSize: '200px',
}}
/>

{/* Main layout */}
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

{/* Name */}
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
animate={{ y: 0, opacity: 1 }}
exit={{ y: -16, opacity: 0 }}
transition={{ duration: 0.28, ease: 'easeInOut' }}
className="text-[11px] tracking-wide text-muted-foreground"
>
{TRAITS[traitIdx]}
</motion.p>
</AnimatePresence>
</motion.div>

{/* Tool Belt */}
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
