import { getSiteConfig } from '@/lib/content'
import LinksClient from './LinksClient'

export const metadata = {
  title: 'Links | Aswin Sampath Kumar',
  description: 'Find me on Twitter, LinkedIn, Instagram, or just send an email.',
}

export default function LinksPage() {
  const siteConfig = getSiteConfig()
  return <LinksClient siteConfig={siteConfig} />
}
