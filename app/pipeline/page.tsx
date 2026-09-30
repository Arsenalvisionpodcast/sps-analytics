import type { Metadata } from 'next'
import PipelineDemo from '@/components/pipeline/PipelineDemo'

const description =
  'How SPS Commerce transforms fragmented retail data into clean, normalized, correlated intelligence.'

export const metadata: Metadata = {
  title: 'SPS Commerce | How It Works',
  description,
  openGraph: {
    title: 'From chaos to clarity: how SPS Decision Intelligence works',
    description,
    url: '/pipeline',
    siteName: 'SPS Decision Intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From chaos to clarity: how SPS Decision Intelligence works',
    description,
  },
}

export default function PipelinePage() {
  return <PipelineDemo />
}
