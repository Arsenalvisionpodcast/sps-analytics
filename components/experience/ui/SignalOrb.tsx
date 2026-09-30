'use client'

import { motion } from 'framer-motion'
import type { Mode } from '../data'

interface SignalOrbProps {
  mode: Mode
  size?: number
  className?: string
}

// The protagonist: one sale's signal. Whole and glowing with SPS,
// flickering and unstable without it.
export default function SignalOrb({ mode, size = 28, className = '' }: SignalOrbProps) {
  const on = mode === 'with'
  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      {on && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1.5px solid rgba(34,211,238,0.6)' }}
          animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={
          on
            ? { opacity: 1, x: 0, scale: [1, 1.06, 1] }
            : { opacity: [1, 0.35, 0.9, 0.2, 1, 0.6, 1], x: [0, -1.5, 1, 0, 1.5, 0], scale: 1 }
        }
        transition={
          on
            ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 1.6, repeat: Infinity, ease: 'linear' }
        }
        style={{
          background: on
            ? 'radial-gradient(circle at 40% 35%, #FFFFFF 0%, #A5F3FC 22%, #22D3EE 45%, #2563EB 100%)'
            : 'radial-gradient(circle at 40% 35%, #FDE68A 0%, #FBBF24 30%, #F87171 70%, #7F1D1D 100%)',
          boxShadow: on
            ? `0 0 ${size * 0.8}px rgba(34,211,238,0.55), 0 0 ${size * 1.8}px rgba(37,99,235,0.35)`
            : `0 0 ${size * 0.5}px rgba(248,113,113,0.35)`,
          transition: 'background 0.6s ease, box-shadow 0.6s ease',
        }}
      />
    </div>
  )
}
