'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Trophy, TrendingUp, Lightbulb, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

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
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-brass" />
      ) : (
        <Moon className="w-5 h-5 text-brass" />
      )}
    </motion.button>
  )
}

const BackButton = () => (
  <Link href="/">
    <motion.div
      className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full z-50 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      whileHover={{ scale: 1.02, x: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ArrowLeft className="w-4 h-4 text-brass" />
      <span className="text-sm text-foreground">Back</span>
    </motion.div>
  </Link>
)

const TabButton = ({ experience, isActive, onClick, index }) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative px-5 py-4 rounded-xl text-left transition-colors w-full ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{
        background: isActive
          ? 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))'
          : 'transparent',
        boxShadow: isActive
          ? '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
          : 'none',
        transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-serif text-lg block">{experience.company}</span>
          <span className="text-xs text-muted-foreground">{experience.period}</span>
        </div>
        {isActive && (
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))',
              boxShadow: '0 0 8px hsl(var(--brass))',
            }}
            layoutId="activeIndicator"
          />
        )}
      </div>
    </motion.button>
  )
}

const ExperienceContent = ({ experience }) => (
  <motion.div
    key={experience.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    className="space-y-8"
  >
    {/* Header */}
    <div>
      <h2 className="font-serif text-4xl text-foreground mb-2">{experience.company}</h2>
      <p className="text-lg text-brass">{experience.role}</p>
      <p className="text-muted-foreground">{experience.period}</p>
    </div>

    {/* Description */}
    <p className="text-muted-foreground leading-relaxed">{experience.description}</p>

    {/* Metrics */}
    <div className="grid grid-cols-3 gap-4">
      {experience.metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="p-4 rounded-xl text-center"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
            boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="font-serif text-2xl text-brass mb-1">{metric.value}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Achievements */}
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary) / 0.5))',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-5 h-5 text-brass" />
        <h3 className="font-serif text-xl text-foreground">Key Achievements</h3>
      </div>
      <ul className="space-y-3">
        {experience.achievements.map((achievement, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <ChevronRight className="w-4 h-4 text-brass mt-1 flex-shrink-0" />
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Learnings */}
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
        boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-brass" />
        <h3 className="font-serif text-xl text-foreground">Key Learnings</h3>
      </div>
      <ul className="space-y-3">
        {experience.learnings.map((learning, i) => (
          <motion.li
            key={i}
            className="text-muted-foreground italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            "{learning}"
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
)

export default function WorkClient({ experiences, siteConfig }) {
  const [activeTab, setActiveTab] = useState(experiences[0]?.id || '')
  const activeExperience = experiences.find(e => e.id === activeTab) || experiences[0]

  return (
    <>
      <ThemeToggle />
      <BackButton />

      <main className="min-h-screen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Work</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground mb-4">Career Highlights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Driving growth across 0→1 products, new markets, and scaled businesses.
            </p>
          </motion.div>

          {/* Tabbed Interface */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Tab List */}
            <motion.div
              className="space-y-2 lg:sticky lg:top-24 lg:self-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="p-4 rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
                  boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-border"
                      />
                    ))}
                  </div>
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">Experience</span>
                </div>
                {experiences.map((exp, i) => (
                  <TabButton
                    key={exp.id}
                    experience={exp}
                    isActive={activeTab === exp.id}
                    onClick={() => setActiveTab(exp.id)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content Panel */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--panel)), hsl(var(--background)))',
                boxShadow: 'inset 2px 2px 12px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {activeExperience && (
                  <ExperienceContent key={activeExperience.id} experience={activeExperience} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
