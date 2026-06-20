import { getWorkExperiences, getSiteConfig } from '@/lib/content'
import WorkClient from './WorkClient'

export const metadata = {
  title: 'Work | Aswin Sampath Kumar',
  description: 'Growth, performance marketing, and retention work across startups.',
}

export default function WorkPage() {
  const workData   = getWorkExperiences()
  const siteConfig = getSiteConfig()
  return <WorkClient experiences={workData.experiences} siteConfig={siteConfig} />
  }
