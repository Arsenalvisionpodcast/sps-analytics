'use client'

import { motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { CONTACT_HREF, DECISION_FRAMES } from '../data'
import { useCases } from '@/components/use-cases/data'
import SignalOrb from '../ui/SignalOrb'

const OUTCOMES = useCases.map((u, i) => {
  const a = ((-90 + i * (360 / useCases.length)) * Math.PI) / 180
  return {
    id: u.id,
    short: u.short,
    impact: DECISION_FRAMES[u.id].impact,
    label: DECISION_FRAMES[u.id].impactLabel,
    x: 50 + Math.cos(a) * 41,
    y: 50 + Math.sin(a) * 40,
  }
})

function OutcomeChip({ o, i }: { o: (typeof OUTCOMES)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 180, damping: 16 }}
      className="rounded-xl px-3 py-2 text-left w-full md:w-44"
      style={{
        background: 'rgba(8,20,45,0.9)',
        border: '1px solid rgba(96,165,250,0.25)',
        boxShadow: '0 0 20px rgba(37,99,235,0.15)',
      }}
    >
      <div className="text-base font-extrabold text-gradient-blue leading-tight">{o.impact}</div>
      <div className="text-[10px] text-slate-400 leading-snug">{o.label}</div>
      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-1 truncate">{o.short}</div>
    </motion.div>
  )
}

export default function Close(_props: ChapterProps) {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center px-4 sm:px-8 py-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
      >
        One signal. <span className="text-gradient-blue">Every decision.</span>
      </motion.h1>

      {/* Radial outcome map (desktop) */}
      <div className="hidden md:block relative w-full max-w-4xl h-[340px] lg:h-[380px] mt-8 mb-4">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {OUTCOMES.map((o, i) => (
            <motion.line
              key={o.id}
              x1={50}
              y1={50}
              x2={o.x}
              y2={o.y}
              stroke="#22D3EE"
              strokeOpacity={0.35}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <SignalOrb mode="with" size={54} />
        </div>
        {OUTCOMES.map((o, i) => (
          <div
            key={o.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${o.x}%`, top: `${o.y}%` }}
          >
            <OutcomeChip o={o} i={i} />
          </div>
        ))}
      </div>

      {/* Grid (mobile) */}
      <div className="md:hidden grid grid-cols-2 gap-2 w-full my-5">
        {OUTCOMES.map((o, i) => (
          <OutcomeChip key={o.id} o={o} i={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="max-w-2xl"
      >
        <p className="text-slate-300 text-sm sm:text-base mb-5">
          One foundation. Aligned decisions. Better outcomes.{' '}
          <span className="text-slate-500">That&apos;s SPS Decision Intelligence.</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={CONTACT_HREF}
            className="px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #1851C6, #22D3EE)', boxShadow: '0 8px 30px rgba(34,211,238,0.3)' }}
          >
            Start a conversation →
          </a>
          <a href="/use-cases" className="px-5 py-3 rounded-full text-sm font-semibold text-slate-200 border border-white/15 hover:border-white/35 transition-colors">
            Explore all use cases
          </a>
          <a href="/pipeline" className="px-5 py-3 rounded-full text-sm font-semibold text-slate-200 border border-white/15 hover:border-white/35 transition-colors">
            See how it works
          </a>
        </div>
      </motion.div>
    </div>
  )
}
