'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { User, Briefcase, PenLine, Link as LinkIcon, Sun, Moon, ArrowRight } from 'lucide-react'

const navItems = [
  { name: 'About', path: '/about', icon: User, description: 'My story & philosophy' },
  { name: 'Work', path: '/work', icon: Briefcase, description: 'Career highlights' },
  { name: 'Thoughts', path: '/thoughts', icon: PenLine, description: 'Writing & ideas' },
  { name: 'Links', path: '/links', icon: LinkIcon, description: 'Connect with me' },
]

const MechanicalButton = ({ item, index }) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={item.path}>
        <motion.div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseOut={() => setIsPressed(false)}
        >
          {/* Button Base */}
          <motion.div
            className="relative w-full sm:w-64 overflow-hidden"
            animate={{
              y: isPressed ? 4 : 0,
            }}
            transition={{ duration: 0.1 }}
          >
            {/* Outer Frame */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-border/80 to-border/40 p-[1px]">
              <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-card to-secondary" />
            </div>
            
            {/* Main Button Surface */}
            <div className="relative rounded-xl p-[1px]">
              <motion.div
                className="relative rounded-xl bg-gradient-to-b from-card via-card to-secondary/80 p-5 sm:p-6"
                style={{
                  boxShadow: isPressed
                    ? 'inset 2px 2px 8px rgba(0,0,0,0.4), inset -1px -1px 4px rgba(255,255,255,0.02)'
                    : '0 4px 0 hsl(var(--border)), 0 6px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Brass Indicator Light */}
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)), hsl(var(--brass-dark)))',
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0.4,
                    boxShadow: isHovered
                      ? '0 0 8px hsl(var(--brass)), 0 0 16px hsl(var(--brass) / 0.5)'
                      : '0 0 2px hsl(var(--brass) / 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <div className="mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
                      boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.05)',
                    }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-5 h-5 text-brass" />
                  </motion.div>
                </div>

                {/* Text */}
                <h3 className="font-serif text-xl text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute bottom-5 right-5"
                  animate={{
                    x: isHovered ? 4 : 0,
                    opacity: isHovered ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 text-brass" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Button Shadow */}
          <motion.div
            className="absolute inset-x-0 -bottom-1 h-2 rounded-b-xl bg-border/50 blur-sm"
            animate={{
              opacity: isPressed ? 0.2 : 0.6,
              scaleY: isPressed ? 0.5 : 1,
            }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-brass" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-brass" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="relative w-16 h-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Dial Face */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            />
            {/* Brass Ring */}
            <motion.div
              className="absolute inset-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--brass-light)), hsl(var(--brass)), hsl(var(--brass-dark)))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner Dial */}
            <div
              className="absolute inset-2 rounded-full bg-background"
              style={{
                boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.4)',
              }}
            />
            {/* Center Dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <ThemeToggle />
      
      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            {/* Decorative Top Line */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-sans">
                Portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              Alexander
              <br />
              <span className="brass-text">Sterling</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="font-sans text-lg sm:text-xl text-muted-foreground max-w-xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              Crafting digital experiences with timeless elegance.
              <br />
              <span className="text-foreground/70">Product Designer & Developer</span>
            </motion.p>

            {/* Navigation Panel */}
            <motion.div
              className="relative p-6 sm:p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
                boxShadow: 'inset 2px 2px 12px rgba(0,0,0,0.3), inset -1px -1px 6px rgba(255,255,255,0.02)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              {/* Panel Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: i === 0 
                          ? 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))' 
                          : 'hsl(var(--border))',
                      }}
                      animate={i === 0 ? { opacity: [0.6, 1, 0.6] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className="text-xs tracking-widest text-muted-foreground uppercase">Navigation</span>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {navItems.map((item, index) => (
                  <MechanicalButton key={item.path} item={item} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Footer Text */}
            <motion.div
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-border/0 via-border to-border/0" />
              <span className="text-xs tracking-widest text-muted-foreground uppercase">
                Est. 2015
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-border/0 via-border to-border/0" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
