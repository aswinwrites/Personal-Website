import { getSiteConfig } from '@/lib/content'
import HomeClient from './HomeClient'

export default function Home() {
  const siteConfig = getSiteConfig()
  return <HomeClient siteConfig={siteConfig} />
}
