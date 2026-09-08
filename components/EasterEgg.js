'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const MESSAGES = [
  { title: 'Growth hack detected.', body: "You just A/B tested the keyboard and won. That's the instinct." },
  { title: 'Achievement unlocked.', body: "Fewer than 1% of visitors find this. You'd have made a good early adopter." },
  { title: 'Dashboard refreshed at 2am.', body: "Some of us do this for fun. Welcome to the club." },
  { title: 'Checkmate, curious one.', body: "Patterns, strategy, calculated risks — you clearly play chess too." },
]

function randomMessage() {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
}

export default function EasterEgg() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(MESSAGES[0])
  const progress = useRef(0)

  useEffect(() => {
    const reveal = () => {
      setMessage(randomMessage())
      setVisible(true)
    }

    const onKeyDown = (e) => {
      const expected = KONAMI[progress.current]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === expected) {
        progress.current += 1
        if (progress.current === KONAMI.length) {
          progress.current = 0
          reveal()
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0
      }
    }

    const onSecret = () => reveal()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('unlock-secret', onSecret)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('unlock-secret', onSecret)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 4200)
    return () => clearTimeout(t)
  }, [visible])

  const particles = Array.from({ length: 14 })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="status"
            initial={{ y: 40, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={() => setVisible(false)}
            className="relative flex items-center gap-3 px-4 py-3 rounded-xl max-w-sm pointer-events-auto cursor-pointer"
            style={{
              background: 'linear-gradient(150deg, hsl(var(--card)), hsl(var(--secondary)/0.85))',
              boxShadow: '0 6px 0 hsl(var(--border)), 0 14px 32px rgba(0,0,0,0.5), 0 0 0 1px hsl(var(--brass)/0.4)',
            }}
          >
            {particles.map((_, i) => {
              const angle = (i / particles.length) * Math.PI * 2
              const dist = 46 + (i % 3) * 14
              return (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: '18%',
                    top: '50%',
                    width: 4,
                    height: 4,
                    background: 'hsl(var(--brass))',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 10,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.012 }}
                />
              )
            })}

            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass-dark)))',
                boxShadow: '0 0 14px hsl(var(--brass)/0.6)',
              }}
            >
              <Trophy className="w-4 h-4" style={{ color: 'hsl(var(--background))' }} />
            </div>

            <div className="relative">
              <p className="font-serif text-sm text-brass leading-tight mb-0.5">{message.title}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{message.body}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
