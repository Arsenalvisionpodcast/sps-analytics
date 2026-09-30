import { renderShareCard } from '@/lib/og/shareCard'
import { useCases, personas } from '@/components/use-cases/data'
import { DECISION_FRAMES } from '@/components/experience/data'

// Social share card for /use-cases, generated at build time.
export const alt = 'Three problems. Nine use cases. One foundation. — SPS Decision Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Nine use cases (their impact figures) sitting on the POS data foundation
function Constellation() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: 340 }}>
        {useCases.map(u => (
          <div
            key={u.id}
            style={{
              width: 105,
              height: 62,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(37,99,235,0.14)',
              border: '1.5px solid rgba(34,211,238,0.4)',
              boxShadow: '0 0 24px rgba(34,211,238,0.15)',
              fontSize: DECISION_FRAMES[u.id].impact.length > 8 ? 16 : 19,
              fontWeight: 800,
              color: '#A5F3FC',
              textAlign: 'center',
              lineHeight: 1.1,
              padding: '0 6px',
            }}
          >
            {DECISION_FRAMES[u.id].impact}
          </div>
        ))}
      </div>
      <div
        style={{
          width: 339,
          height: 46,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(245,158,11,0.14)',
          border: '1.5px solid rgba(251,191,36,0.5)',
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#FCD34D',
        }}
      >
        POS data foundation
      </div>
    </div>
  )
}

function PersonaRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
      {personas.map(p => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: p.color }} />
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#94A3B8' }}>
            {p.short}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Image() {
  return renderShareCard({
    eyebrow: 'Use cases · 4 teams',
    headline: [{ text: 'Three problems.' }, { text: 'Nine use cases.', accent: true }, { text: 'One foundation.' }],
    headlineSize: 72,
    subtitle: 'How clean, door-level POS data drives better decisions for every team.',
    visual: <Constellation />,
    footer: <PersonaRow />,
  })
}
