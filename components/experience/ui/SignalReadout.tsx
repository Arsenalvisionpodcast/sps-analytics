'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { INTEGRITY, type Chapter, type Mode } from '../data'

interface SignalReadoutProps {
  chapter: Chapter
  mode: Mode
}

// Compact HUD: the chapter's key number plus a signal-integrity gauge.
export default function SignalReadout({ chapter, mode }: SignalReadoutProps) {
  if (!chapter.readout) return null
  const on = mode === 'with'
  const integrity = INTEGRITY[chapter.id]
  const level = on ? 1 : integrity?.level ?? 1
  const status = on ? 'Intact' : integrity?.status ?? ''

  return (
    <div
      className="hidden md:flex items-center gap-4 px-3.5 py-2 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${on ? 'rgba(34,211,238,0.2)' : 'rgba(248,113,113,0.2)'}`,
        transition: 'border-color 0.5s',
      }}
    >
      <div className="text-right">
        <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">{chapter.readout.label}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${chapter.id}-${mode}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-bold tabular-nums"
            style={{ color: on ? '#67E8F9' : '#FCA5A5' }}
          >
            {chapter.readout[mode]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-px h-7 bg-white/10" />
      <div>
        <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Signal</div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${level * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: on ? 'linear-gradient(90deg, #2563EB, #22D3EE)' : 'linear-gradient(90deg, #F87171, #FBBF24)',
              }}
            />
          </div>
          <span className="text-[11px] font-semibold w-16" style={{ color: on ? '#67E8F9' : '#FCA5A5' }}>
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
