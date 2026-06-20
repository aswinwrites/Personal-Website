'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Target, Heart, Compass } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const sectionIcons = {
  intro:      Sparkles,
  whatIDo:    Target,
  interests:  Heart,
  philosophy: Compass,
}

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

const BackButton = () => (
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
)

// FIX: was margin: '-100px' which prevented whileInView from ever firing.
// Changed to amount: 0.01 — fires as soon as 1% is visible.
const Section = ({ title, icon: Icon, children, index }) => (
  <motion.section
    className="mb-14"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.01 }}
    transition={{ delay: index * 0.08, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
  >
    <div className="flex items-center gap-4 mb-6">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
          boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.05)',
        }}
      >
        <Icon className="w-5 h-5 text-brass" />
      </div>
      <h2 className="font-serif text-3xl text-foreground">{title}</h2>
    </div>
    {children}
  </motion.section>
)

export default function AboutClient({ aboutContent, siteConfig }) {
  return (
    <>
      <ThemeToggle />
      <BackButton />
      <main className="min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Page Header */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-brass/80 to-brass/10" />
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">About</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
              {aboutContent.intro.title}
            </h1>
          </motion.div>

          {/* Introduction */}
          <Section title="Introduction" icon={sectionIcons.intro} index={0}>
            <p className="text-base text-muted-foreground leading-relaxed">
              {aboutContent.intro.content}
            </p>
          </Section>

          {/* What I Do */}
          <Section title={aboutContent.whatIDo.title} icon={sectionIcons.whatIDo} index={1}>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {aboutContent.whatIDo.content}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {aboutContent.whatIDo.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="px-4 py-3 rounded-lg text-sm text-foreground"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
                    boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.2)',
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Interests */}
          <Section title={aboutContent.interests.title} icon={sectionIcons.interests} index={2}>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {aboutContent.interests.content}
            </p>
            <div className="grid gap-3">
              {aboutContent.interests.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-5 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)/0.5))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <h3 className="font-serif text-xl text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Philosophy */}
          <Section title={aboutContent.philosophy.title} icon={sectionIcons.philosophy} index={3}>
            <motion.blockquote
              className="border-l-2 border-brass/50 pl-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-serif text-foreground italic leading-relaxed">
                {aboutContent.philosophy.content}
              </p>
            </motion.blockquote>

            <div className="grid sm:grid-cols-2 gap-3">
              {aboutContent.philosophy.principles.map((principle, i) => (
                <motion.div
                  key={principle.title}
                  className="p-5 rounded-xl"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
                    boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.2)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))',
                      }}
                    />
                    <h4 className="font-serif text-lg text-foreground">{principle.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <motion.div
            className="pt-8 border-t border-border/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Based in {siteConfig.location}
              </span>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-brass hover:text-brass-light transition-colors"
              >
                {siteConfig.email}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
