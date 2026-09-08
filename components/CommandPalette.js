'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command as CommandPrimitive } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Briefcase, PenLine, Link as LinkIcon, FolderOpen, Home,
  Mail, Github, Linkedin, Sparkles, Search,
} from 'lucide-react'

const PAGES = [
  { icon: Home, label: 'Home', hint: 'Go to', action: (router) => router.push('/') },
  { icon: User, label: 'About', hint: 'Go to', action: (router) => router.push('/about') },
  { icon: Briefcase, label: 'Work', hint: 'Go to', action: (router) => router.push('/work') },
  { icon: FolderOpen, label: 'Projects', hint: 'Go to', action: (router) => router.push('/projects') },
  { icon: PenLine, label: 'Thoughts', hint: 'Go to', action: (router) => router.push('/thoughts') },
  { icon: LinkIcon, label: 'Links', hint: 'Go to', action: (router) => router.push('/links') },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const close = useCallback(() => {
    setOpen(false)
    setCopied(false)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  const copyEmail = () => {
    navigator.clipboard?.writeText('aswinwrites@gmail.com').catch(() => {})
    setCopied(true)
    setTimeout(close, 700)
  }

  const openExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    close()
  }

  const runSecret = () => {
    close()
    window.dispatchEvent(new Event('unlock-secret'))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[16vh] px-4"
          style={{ background: 'rgba(8,6,4,0.6)', backdropFilter: 'blur(3px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, hsl(var(--card)), hsl(var(--secondary)/0.6))',
              boxShadow: '0 12px 0 hsl(var(--border)), 0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px hsl(var(--brass)/0.25)',
            }}
          >
            <CommandPrimitive label="Command Menu" shouldFilter>
              <div className="flex items-center gap-2.5 px-4 border-b" style={{ borderColor: 'hsl(var(--border)/0.6)' }}>
                <Search className="w-3.5 h-3.5 text-brass/60 shrink-0" />
                <CommandPrimitive.Input
                  autoFocus
                  placeholder="Jump somewhere, or type a command…"
                  className="w-full bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-mono"
                />
                <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded text-muted-foreground/40 shrink-0" style={{ background: 'hsl(var(--secondary))' }}>
                  esc
                </kbd>
              </div>

              <CommandPrimitive.List className="max-h-[320px] overflow-y-auto p-1.5">
                <CommandPrimitive.Empty className="py-8 text-center text-xs text-muted-foreground/50 font-mono">
                  No matches. Try "about", "email", or "secret".
                </CommandPrimitive.Empty>

                <CommandPrimitive.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground/40 [&_[cmdk-group-heading]]:font-mono">
                  {PAGES.map((p) => (
                    <CommandPrimitive.Item
                      key={p.label}
                      onSelect={() => { p.action(router); close() }}
                      className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-foreground/85 cursor-pointer aria-selected:bg-[hsl(var(--secondary))] aria-selected:text-brass"
                    >
                      <p.icon className="w-3.5 h-3.5 opacity-70" />
                      {p.label}
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>

                <CommandPrimitive.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground/40 [&_[cmdk-group-heading]]:font-mono">
                  <CommandPrimitive.Item
                    onSelect={copyEmail}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-foreground/85 cursor-pointer aria-selected:bg-[hsl(var(--secondary))] aria-selected:text-brass"
                  >
                    <Mail className="w-3.5 h-3.5 opacity-70" />
                    {copied ? 'Copied — aswinwrites@gmail.com' : 'Copy email address'}
                  </CommandPrimitive.Item>
                  <CommandPrimitive.Item
                    onSelect={() => openExternal('https://www.linkedin.com/in/aswin5/')}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-foreground/85 cursor-pointer aria-selected:bg-[hsl(var(--secondary))] aria-selected:text-brass"
                  >
                    <Linkedin className="w-3.5 h-3.5 opacity-70" />
                    Open LinkedIn
                  </CommandPrimitive.Item>
                  <CommandPrimitive.Item
                    onSelect={() => openExternal('https://github.com/aswinwrites')}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-foreground/85 cursor-pointer aria-selected:bg-[hsl(var(--secondary))] aria-selected:text-brass"
                  >
                    <Github className="w-3.5 h-3.5 opacity-70" />
                    Open GitHub
                  </CommandPrimitive.Item>
                  <CommandPrimitive.Item
                    onSelect={runSecret}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-brass/80 cursor-pointer aria-selected:bg-[hsl(var(--secondary))] aria-selected:text-brass"
                  >
                    <Sparkles className="w-3.5 h-3.5 opacity-70" />
                    ??? (try the Konami code too)
                  </CommandPrimitive.Item>
                </CommandPrimitive.Group>
              </CommandPrimitive.List>
            </CommandPrimitive>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
