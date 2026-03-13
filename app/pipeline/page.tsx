import type { Metadata } from 'next'
import PipelineDemo from '@/components/pipeline/PipelineDemo'

export const metadata: Metadata = {
  title: 'SPS Commerce | How It Works',
  description: 'How SPS Commerce transforms fragmented retail data into clean, normalized, correlated intelligence.',
}

export default function PipelinePage() {
  return <PipelineDemo />
}
