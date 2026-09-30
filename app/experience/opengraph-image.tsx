import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Social share card for /experience (LinkedIn, Slack, Teams, email previews).
// Generated at build time so it always matches the experience's visual language.

export const alt = 'Every sale is a signal. Follow the Signal — SPS Decision Intelligence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const STOPS = ['Sale', 'Scatter', 'Cleanse', 'Translate', 'Match', 'Deliver', 'Decide']

export default async function Image() {
  const [inter500, inter800, logo] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/inter-latin-500-normal.woff')),
    readFile(join(process.cwd(), 'assets/fonts/inter-latin-800-normal.woff')),
    readFile(join(process.cwd(), 'public/sps-logo-mark.png')),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#030B18',
          fontFamily: 'Inter',
          color: '#FFFFFF',
        }}
      >
        {/* Grid + glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(circle at 78% 42%, rgba(34,211,238,0.22) 0%, rgba(37,99,235,0.12) 28%, transparent 55%)',
          }}
        />

        {/* The signal */}
        <div
          style={{
            position: 'absolute',
            left: 830,
            top: 150,
            width: 240,
            height: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 240,
              height: 240,
              borderRadius: 999,
              border: '2px solid rgba(34,211,238,0.18)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: 999,
              border: '2px solid rgba(34,211,238,0.32)',
            }}
          />
          <div
            style={{
              width: 118,
              height: 118,
              borderRadius: 999,
              background: 'radial-gradient(circle at 40% 35%, #FFFFFF 0%, #A5F3FC 22%, #22D3EE 48%, #2563EB 100%)',
              boxShadow: '0 0 90px rgba(34,211,238,0.65), 0 0 180px rgba(37,99,235,0.45)',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 72px',
            width: '100%',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={logoSrc} width={42} height={42} alt="" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>SPS Commerce</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: '#67E8F9' }}>Decision Intelligence</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 4,
                color: '#67E8F9',
                marginBottom: 18,
                textTransform: 'uppercase',
              }}
            >
              An interactive experience · 3 minutes
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1.0 }}>
              <div style={{ display: 'flex' }}>Every sale is a</div>
              <div
                style={{
                  display: 'flex',
                  paddingBottom: 12,
                  marginBottom: -12,
                  backgroundImage: 'linear-gradient(to right, #60A5FA, #22D3EE)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                signal.
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#CBD5E1', marginTop: 24, lineHeight: 1.35 }}>
              Follow one sale from the register to a business decision, with and without Decision Intelligence.
            </div>
          </div>

          {/* Journey rail */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {STOPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: i === 0 ? 16 : 10,
                      height: i === 0 ? 16 : 10,
                      borderRadius: 999,
                      background: i === 0 ? '#22D3EE' : 'rgba(96,165,250,0.7)',
                      boxShadow: i === 0 ? '0 0 16px rgba(34,211,238,0.9)' : 'none',
                    }}
                  />
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: i === 0 ? '#E2E8F0' : '#94A3B8',
                    }}
                  >
                    {s}
                  </div>
                </div>
                {i < STOPS.length - 1 && <div style={{ width: 22, height: 2, background: 'rgba(96,165,250,0.35)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: inter500, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter800, weight: 800, style: 'normal' },
      ],
    }
  )
}
