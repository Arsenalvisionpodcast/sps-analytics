'use client'

import { motion } from 'framer-motion'
import type { Mode } from '../data'

interface ModeSwitchProps {
  mode: Mode
  onToggle: () => void
  prompt: boolean // pulse + hint until the visitor flips this chapter once
}

export default function ModeSwitch({ mode, onToggle, prompt }: ModeSwitchProps) {
  const on = mode === 'with'
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Turn on SPS Decision Intelligence"
        onClick={onToggle}
        className="group relative flex items-center gap-3 pl-4 pr-2 sm:pl-5 py-1.5 rounded-full transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        style={{
          background: on ? 'rgba(37,99,235,0.14)' : 'rgba(248,113,113,0.08)',
          border: `1px solid ${on ? 'rgba(34,211,238,0.35)' : 'rgba(248,113,113,0.3)'}`,
        }}
      >
        {prompt && !on && (
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full pointer-events-none"
            style={{ border: '1.5px solid rgba(34,211,238,0.7)' }}
            animate={{ opacity: [0.9, 0], scale: [1, 1.12] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <span
          className="text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300"
          style={{ color: on ? '#475569' : '#FCA5A5' }}
        >
          Without
        </span>

        <span
          className="relative w-12 h-6 rounded-full transition-colors duration-500 flex-shrink-0"
          style={{
            background: on ? 'linear-gradient(90deg, #2563EB, #22D3EE)' : 'rgba(255,255,255,0.1)',
            boxShadow: on ? '0 0 18px rgba(34,211,238,0.5)' : 'none',
          }}
        >
          <motion.span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
            animate={{ left: on ? 26 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          />
        </span>

        <span
          className="text-[11px] sm:text-xs font-bold uppercase tracking-widest pr-2 transition-colors duration-300 whitespace-nowrap"
          style={{ color: on ? '#67E8F9' : '#64748B' }}
        >
          With <span className="hidden sm:inline">SPS </span>Decision Intelligence
        </span>
      </button>

      <motion.span
        className="text-[10px] sm:text-[11px] font-medium h-4"
        animate={{ opacity: prompt && !on ? [0.5, 1, 0.5] : 0 }}
        transition={{ duration: 2, repeat: prompt && !on ? Infinity : 0 }}
        style={{ color: '#67E8F9' }}
      >
        Flip the switch to turn on Decision Intelligence <span className="hidden sm:inline">· or press S</span>
      </motion.span>
    </div>
  )
}
