import { renderShareCard, SignalOrb } from '@/lib/og/shareCard'

// Social share card for the homepage (and any route without its own card).
export const alt = 'Retail data, mastered. — SPS Decision Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const OFFERS = [
  { top: 58, title: 'Decision Intelligence', sub: 'Dashboards from day one' },
  { top: 198, title: 'Data Integration', sub: 'Live to your warehouse' },
]

// One clean signal, two ways to win
function TwoWays() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' }}>
      <svg width="340" height="340" viewBox="0 0 340 340" style={{ position: 'absolute', left: 0, top: 0 }}>
        {[120, 150, 190, 220].map(y => (
          <path key={y} d={`M -20 ${y} C 15 ${y}, 25 170, 60 170`} fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth="2" />
        ))}
        <path d="M 60 170 C 100 170, 100 100, 132 100" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
        <path d="M 60 170 C 100 170, 100 240, 132 240" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', left: -10, top: 100, width: 140, height: 140, display: 'flex' }}>
        <SignalOrb size={62} />
      </div>
      {OFFERS.map(o => (
        <div
          key={o.title}
          style={{
            position: 'absolute',
            left: 132,
            top: o.top,
            width: 228,
            height: 84,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 12px 0 14px',
            background: 'rgba(37,99,235,0.14)',
            border: '1.5px solid rgba(34,211,238,0.4)',
            boxShadow: '0 0 24px rgba(34,211,238,0.15)',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, whiteSpace: 'nowrap' }}>{o.title}</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#A5F3FC', marginTop: 6, lineHeight: 1.25 }}>{o.sub}</div>
        </div>
      ))}
    </div>
  )
}

function Proof() {
  const items = ['1,000+ trading partners', '1,300+ standardized metrics', 'Door- and UPC-level detail']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      {items.map((t, i) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: i === 0 ? '#E2E8F0' : '#94A3B8' }}>
            {t}
          </div>
          {i < items.length - 1 && <div style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(96,165,250,0.7)' }} />}
        </div>
      ))}
    </div>
  )
}

export default function Image() {
  return renderShareCard({
    eyebrow: 'Retail data intelligence',
    headline: [{ text: 'Retail data,' }, { text: 'mastered.', accent: true }],
    subtitle: 'Clean, correlated data from every retailer and channel, ready for every decision your teams make.',
    visual: <TwoWays />,
    footer: <Proof />,
  })
}
