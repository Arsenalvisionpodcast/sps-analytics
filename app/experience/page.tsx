import type { Metadata } from 'next'
import ExperienceShell from '@/components/experience/ExperienceShell'

export const metadata: Metadata = {
  title: 'SPS Decision Intelligence | Follow the Signal',
  description:
    'Follow one sale from the register to a business decision — and see what changes with SPS Decision Intelligence.',
}

export default function ExperiencePage() {
  return <ExperienceShell />
}
