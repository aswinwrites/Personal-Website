'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Mail,
  Globe,
  Link as LinkIcon
} from 'lucide-react'

const iconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  dribbble: Dribbble,
  mail: Mail,
  globe: Globe,
  link: LinkIcon,
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

const LinkCard = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
  const IconComponent = iconMap[link.icon] || LinkIcon

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <motion.div
        className="relative overflow-hidden"
        animate={{
          y: isPressed ? 4 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Card */}
        <div
          className="p-6 rounded-xl cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary) / 0.5))',
            boxShadow: isPressed
              ? 'inset 2px 2px 8px rgba(0,0,0,0.3)'
              : isHovered
                ? '0 8px 24px rgba(0,0,0,0.3), 0 4px 0 hsl(var(--border)), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 4px 0 hsl(var(--border)), 0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--card)))',
                boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.05)',
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent className="w-6 h-6 text-brass" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif text-xl text-foreground">{link.name}</h3>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="w-4 h-4 text-brass" />
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </div>

            {/* Indicator */}
            <motion.div
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--brass-light)), hsl(var(--brass)))',
              }}
              animate={{
                opacity: isHovered ? 1 : 0.4,
                boxShadow: isHovered ? '0 0 8px hsl(var(--brass))' : '0 0 0px transparent',
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        {/* Shadow */}
        <motion.div
          className="absolute inset-x-0 -bottom-1 h-2 rounded-b-xl bg-border/30 blur-sm"
          animate={{
            opacity: isPressed ? 0.2 : 0.5,
            scaleY: isPressed ? 0.5 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </motion.a>
  )
}

export default function LinksClient({ siteConfig }) {
  return (
    <>
      <BackButton />

      <main className="min-h-screen py-24 px-6">
        <div className="max-w-xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Connect</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
            </div>
            <h1 className="font-serif text-5xl text-foreground mb-4">{siteConfig.name}</h1>
            <p className="text-lg text-muted-foreground">{siteConfig.title}</p>
          </motion.div>

          {/* Links */}
          <div className="space-y-4">
            {siteConfig.links.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index} />
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-border/0 via-border to-border/0" />
              <span className="text-xs tracking-widest text-muted-foreground uppercase">Based in</span>
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-border/0 via-border to-border/0" />
            </div>
            <p className="text-muted-foreground">{siteConfig.location}</p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
