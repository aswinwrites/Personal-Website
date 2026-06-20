Fix about/page.js: correct name in metadataimport { getAboutContent, getSiteConfig } from '@/lib/content'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About | Alexander Sterling',
  description: 'My story, philosophy, and what drives my work.',
}

export default function AboutPage() {
  const aboutContent = getAboutContent()
  const siteConfig = getSiteConfig()

  return <AboutClient aboutContent={aboutContent} siteConfig={siteConfig} />
}
