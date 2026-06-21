'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  User, Briefcase, PenLine, Link as LinkIcon,
  ArrowRight, FolderOpen,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

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

// Simple Icons slugs — icons render in brass via CDN color param
const TOOLS = [
  { name: 'Claude',     slug: 'claude'          },
  { name: 'ChatGPT',   slug: 'chatgpt'        },
  { name: 'Meta Ads',   slug: 'meta'            },
  { name: 'Google Ads', slug: 'googleads'       },
