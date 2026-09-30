import { renderShareCard, SignalOrb, StopRail } from '@/lib/og/shareCard'

// Social share card for /experience, generated at build time.
export const alt = 'Every sale is a signal. Follow the Signal — SPS Decision Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderShareCard({
    eyebrow: 'An interactive experience · 3 minutes',
    headline: [{ text: 'Every sale is a' }, { text: 'signal.', accent: true }],
    subtitle: 'Follow one sale from the register to a business decision, with and without Decision Intelligence.',
    visual: <SignalOrb />,
    footer: <StopRail stops={['Sale', 'Scatter', 'Cleanse', 'Translate', 'Match', 'Deliver', 'Decide']} />,
  })
}
