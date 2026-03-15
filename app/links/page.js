import { getSiteConfig } from '@/lib/content'
import LinksClient from './LinksClient'

export const metadata = {
  title: 'Links | Alexander Sterling',
  description: 'Connect with me across the web.',
}

export default function LinksPage() {
  const siteConfig = getSiteConfig()

  return <LinksClient siteConfig={siteConfig} />
}
