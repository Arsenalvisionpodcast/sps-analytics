'use client'

import { motion } from 'framer-motion'
import type { Mode } from '../data'

interface JourneyRailProps {
  labels: string[]
  current: number
  mode: Mode
  onJump: (i: number) => void
}

// Bottom progress rail. The signal dot travels stop to stop and
// takes on the current chapter's Without/With state.
export default function JourneyRail({ labels, current, mode, onJump }: JourneyRailProps) {
  const last = labels.length - 1
  const pct = (current / last) * 100
  const on = mode === 'with'

  return (
    <div className="relative w-full max-w-2xl mx-auto px-3 pt-1 pb-5 sm:pb-6">
      <div className="relative h-5">
        {/* track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(90deg, #2563EB, #22D3EE)' }}
        />

        {/* stops */}
        {labels.map((label, i) => {
          const left = (i / last) * 100
          const done = i <= current
          return (
            <button
              key={label}
              onClick={() => onJump(i)}
              aria-label={`Go to ${label}`}
              aria-current={i === current ? 'step' : undefined}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 group"
              style={{ left: `${left}%` }}
            >
              <span
                className="block w-2 h-2 rounded-full transition-colors duration-300 group-hover:bg-white"
                style={{ background: done ? '#60A5FA' : 'rgba(255,255,255,0.18)' }}
              />
              <span
                className={`absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  i === current ? '' : 'hidden sm:block'
                }`}
                style={{ color: i === current ? '#E2E8F0' : done ? '#64748B' : '#334155' }}
              >
                {label}
              </span>
            </button>
          )
        })}

        {/* travelling signal */}
        <motion.div
          className="absolute top-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            x: '-50%',
            y: '-50%',
            background: on
              ? 'radial-gradient(circle, #FFFFFF 0%, #22D3EE 55%, #2563EB 100%)'
              : 'radial-gradient(circle, #FDE68A 0%, #F87171 100%)',
            boxShadow: on ? '0 0 14px rgba(34,211,238,0.8)' : '0 0 10px rgba(248,113,113,0.6)',
            transition: 'background 0.5s, box-shadow 0.5s',
          }}
        />
      </div>
    </div>
  )
}
