import AboutClient from './AboutClient'
import { getAboutContent, getSiteConfig } from '@/lib/content'

export const metadata = {
  title: 'About | Aswin Sampath Kumar',
  description: 'My story, philosophy, and what drives my work.',
}

export default function AboutPage() {
  const aboutContent = getAboutContent()
  const siteConfig   = getSiteConfig()
  return <AboutClient aboutContent={aboutContent} siteConfig={siteConfig} />
}
