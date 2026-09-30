import { renderShareCard, SignalOrb, StopRail } from '@/lib/og/shareCard'

// Social share card for /pipeline ("How it works"), generated at build time.
export const alt = 'From chaos to clarity — how SPS Decision Intelligence works'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LANES = ['#60A5FA', '#818CF8', '#FBBF24', '#34D399', '#F472B6', '#22D3EE']

// Six partner feeds converging into one clean signal
function Converge() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' }}>
      <svg width="340" height="340" viewBox="0 0 340 340" style={{ position: 'absolute', left: 0, top: 0 }}>
        {LANES.map((color, i) => {
          const y = 40 + i * 52
          return (
            <path
              key={color}
              d={`M 10 ${y} C 125 ${y}, 150 170, 250 170`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
          )
        })}
        {LANES.map((color, i) => (
          <circle key={`dot-${color}`} cx="10" cy={40 + i * 52} r="7" fill={color} />
        ))}
      </svg>
      <div style={{ position: 'absolute', left: 170, top: 90, width: 160, height: 160, display: 'flex' }}>
        <SignalOrb size={70} />
      </div>
    </div>
  )
}

export default function Image() {
  return renderShareCard({
    eyebrow: 'How it works · 6 steps',
    headline: [{ text: 'From chaos' }, { text: 'to clarity.', accent: true }],
    subtitle: 'How SPS collects, cleans, and correlates every partner’s data, then delivers it live to your warehouse.',
    visual: <Converge />,
    footer: <StopRail stops={['Collect', 'Cleanse', 'Normalize', 'Correlate', 'Deliver', 'Resilience']} />,
  })
}
