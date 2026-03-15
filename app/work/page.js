import { getWorkExperiences, getSiteConfig } from '@/lib/content'
import WorkClient from './WorkClient'

export const metadata = {
  title: 'Work | Alexander Sterling',
  description: 'Career highlights and professional experience.',
}

export default function WorkPage() {
  const workData = getWorkExperiences()
  const siteConfig = getSiteConfig()

  return <WorkClient experiences={workData.experiences} siteConfig={siteConfig} />
}
