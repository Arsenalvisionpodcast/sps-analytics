import type { Metadata } from 'next'
import ExperienceShell from '@/components/experience/ExperienceShell'

const title = 'SPS Decision Intelligence | Follow the Signal'
const description =
  'Follow one sale from the register to a business decision — and see what changes with SPS Decision Intelligence.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'Every sale is a signal. Follow the Signal.',
    description,
    url: '/experience',
    siteName: 'SPS Decision Intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every sale is a signal. Follow the Signal.',
    description,
  },
}

export default function ExperiencePage() {
  return <ExperienceShell />
}
