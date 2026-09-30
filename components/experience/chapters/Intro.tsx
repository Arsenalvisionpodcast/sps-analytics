'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { HERO_SALE, PRODUCT } from '../data'
import SignalOrb from '../ui/SignalOrb'

// Deterministic scatter so server and client render the same field
function seeded(n: number) {
  let s = 1147
  return Array.from({ length: n }, () => {
    s = (s * 16807) % 2147483647
    const a = s / 2147483647
    s = (s * 16807) % 2147483647
    const b = s / 2147483647
    s = (s * 16807) % 2147483647
    return { x: a * 100, y: b * 100, d: (s / 2147483647) * 1.6 }
  })
}
const FIELD = seeded(140)
const BARS = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1]

export default function Intro({ onNext }: ChapterProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1300),
      setTimeout(() => setPhase(2), 2100),
      setTimeout(() => setPhase(3), 2900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-center px-5 text-center">
      {/* Field of other signals: every store, every channel */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {FIELD.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 3,
              height: 3,
              background: i % 3 === 0 ? '#22D3EE' : '#3B82F6',
              boxShadow: '0 0 6px rgba(34,211,238,0.7)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={phase >= 2 ? { opacity: [0, 0.9, 0.35], scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1.4, delay: p.d, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* The moment of sale */}
      <div className="relative h-44 sm:h-52 w-full flex items-center justify-center mb-4">
        <AnimatePresence>
          {phase < 2 && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-64 rounded-xl px-5 py-4 text-left font-mono"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="text-[10px] uppercase tracking-widest text-slate-500">
                {HERO_SALE.partner} · {HERO_SALE.store}
              </div>
              <div className="text-[10px] text-slate-600 mb-3">{HERO_SALE.time}</div>
              <div className="flex justify-between text-xs text-slate-200 mb-3">
                <span>{PRODUCT.name.toUpperCase()} {PRODUCT.sku}</span>
                <span>× 1</span>
              </div>
              <div className="relative flex items-end gap-[2px] h-10 overflow-hidden">
                {BARS.map((w, i) => (
                  <span key={i} className="bg-slate-300 h-full" style={{ width: w }} />
                ))}
                <motion.span
                  className="absolute left-0 right-0 h-0.5"
                  style={{ background: '#F87171', boxShadow: '0 0 10px #F87171' }}
                  initial={{ top: '0%' }}
                  animate={{ top: ['0%', '100%', '0%', '100%'] }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
              {phase >= 1 && (
                <motion.div
                  className="absolute -top-3 -right-3 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-300"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(52,211,153,0.4)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ duration: 0.35 }}
                >
                  BEEP
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 1 && (
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 2 ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.6, opacity: 1, y: -70 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <SignalOrb mode="with" size={phase >= 2 ? 64 : 28} />
          </motion.div>
        )}
      </div>

      {/* Copy */}
      <div className="relative max-w-2xl min-h-[230px]">
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              key="line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-cyan-300 mb-3"
            >
              {PRODUCT.name} · {HERO_SALE.partner} {HERO_SALE.store} · {HERO_SALE.time}
            </motion.div>
          )}
        </AnimatePresence>
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4">
              Every sale is a <span className="text-gradient-blue">signal.</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg leading-relaxed mb-7">
              This one holds the answer to whether you&apos;re in stock, priced right, and ready for your next
              buyer review. It&apos;s one of thousands, across every store and every channel, every day.{' '}
              <span className="text-slate-200">What happens to it next decides everything.</span>
            </p>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white transition-transform hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(135deg, #1851C6, #22D3EE)',
                boxShadow: '0 8px 30px rgba(34,211,238,0.35)',
              }}
            >
              Follow the signal →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
