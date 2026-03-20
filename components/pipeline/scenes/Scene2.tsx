'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Raw incoming rows with issues
const RAW_ROWS = [
  {
    id: 1,
    retailer: 'Walmart',
    store: 'Store 1147',
    product: 'Nike AF1 Wht 10',
    metric: 'Pcs Sold',
    value: '12',
    date: '3/10/25',
    issue: 'DUPLICATE',
    issueColor: '#F87171',
    issueBg: 'rgba(239,68,68,0.12)',
    isDuplicate: true,
  },
  {
    id: 2,
    retailer: 'Walmart',
    store: 'Store 1147',
    product: 'Nike AF1 Wht 10',
    metric: 'Pcs Sold',
    value: '12',
    date: '3/10/25',
    issue: 'DUPLICATE',
    issueColor: '#F87171',
    issueBg: 'rgba(239,68,68,0.12)',
    isDuplicate: true,
    willRemove: true,
  },
  {
    id: 3,
    retailer: 'Target',
    store: 'T-99X ✗',
    product: 'Air Force One W',
    metric: 'Qty Sold',
    value: '7',
    date: '3/10/25',
    issue: 'BAD STORE CODE',
    issueColor: '#FB923C',
    issueBg: 'rgba(251,146,60,0.12)',
  },
  {
    id: 4,
    retailer: 'REI',
    store: 'Store R482',
    product: 'Nike Air Force 1',
    metric: 'Units',
    value: '3',
    date: '—',
    issue: 'MISSING DATE',
    issueColor: '#FBBF24',
    issueBg: 'rgba(251,191,36,0.12)',
  },
  {
    id: 5,
    retailer: 'Amazon',
    store: 'ASIN_AMZ',
    product: 'AF1 WHT B08XX',
    metric: '# Pieces',
    value: '15',
    date: '3/10/25',
    issue: 'FORMAT ERROR',
    issueColor: '#C084FC',
    issueBg: 'rgba(192,132,252,0.12)',
  },
]

// Validated output rows
const CLEAN_ROWS = [
  { retailer: 'Walmart', store: 'Store 1147', product: 'Nike AF1 Wht 10', metric: 'Units Sold', value: '12', date: '3/10/25' },
  { retailer: 'Target', store: 'T-992', product: 'Air Force One W', metric: 'Units Sold', value: '7', date: '3/10/25' },
  { retailer: 'REI', store: 'Store R482', product: 'Nike Air Force 1', metric: 'Units Sold', value: '3', date: '3/10/25' },
  { retailer: 'Amazon', store: 'AMZ-EAST', product: 'Air Force 1 Wht', metric: 'Units Sold', value: '15', date: '3/10/25' },
]

function useCounter(to: number, delay: number, duration: number = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now()
      const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(to * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [to, delay, duration])
  return value
}

export default function Scene2() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 0: rows appear (0-0.8s)
    // Phase 1: duplicate removed (0.9s)
    // Phase 2: errors resolved / clean rows appear (1.4s)
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const dupes = useCounter(847, 2200)
  const errors = useCounter(312, 2400)

  return (
    <div className="w-full h-full flex items-center gap-2 sm:gap-4 px-3 sm:px-8 py-2">

      {/* ── LEFT: RAW INCOMING DATA ── */}
      <div className="hidden sm:flex flex-col gap-1.5 w-[34%]">
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          Raw Incoming Data
        </p>
        <AnimatePresence>
          {RAW_ROWS.map((row, i) => {
            const hidden = row.willRemove && phase >= 1
            return (
              <AnimatePresence key={row.id}>
                {!hidden && (
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="rounded-lg overflow-hidden"
                    style={{
                      background: row.issueBg,
                      border: `1px solid ${row.issueColor}30`,
                    }}
                  >
                    <div className="px-2.5 py-1.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-white text-xs font-medium">{row.retailer}</span>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider"
                          style={{ color: row.issueColor, background: `${row.issueColor}20` }}
                        >
                          {row.issue}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                        <span>{row.store}</span>
                        <span className="text-slate-700">·</span>
                        <span>{row.metric}</span>
                        <span className="text-slate-700">·</span>
                        <span>{row.value}</span>
                        <span className="text-slate-700">·</span>
                        <span>{row.date}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ── CENTER: SPS ENGINE ── */}
      <div className="flex flex-col items-center justify-center w-[38%] sm:w-[28%] gap-4">
        {/* Engine box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative flex flex-col items-center justify-center rounded-2xl px-3 sm:px-6 py-4 sm:py-5 w-full"
          style={{
            background: 'rgba(37,99,235,0.08)',
            border: '1px solid rgba(37,99,235,0.3)',
            boxShadow: '0 0 40px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              border: '1px dashed rgba(59,130,246,0.3)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full"
            style={{
              width: 56,
              height: 56,
              border: '1px dashed rgba(34,211,238,0.2)',
            }}
          />

          <div className="relative z-10 text-center">
            <div
              className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1851C6, #22D3EE)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.2" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <div className="text-white text-xs font-bold tracking-wider uppercase">
              SPS Data Engine
            </div>
          </div>

          {/* Processing steps */}
          <div className="relative z-10 mt-4 w-full flex flex-col gap-1.5">
            {[
              { label: 'Deduplication', delay: 0.6, color: '#F87171' },
              { label: 'Error Resolution', delay: 0.9, color: '#FB923C' },
              { label: 'Gap Filling', delay: 1.2, color: '#FBBF24' },
              { label: 'Format Normalization', delay: 1.5, color: '#C084FC' },
            ].map(step => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay }}
                className="flex items-center gap-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.1, type: 'spring', stiffness: 300 }}
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)' }}
                >
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <path d="M1.5 3.5L3 5L5.5 2" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <span className="text-xs text-slate-400">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="w-full grid grid-cols-2 gap-2"
        >
          <div
            className="text-center px-3 py-2 rounded-lg"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
          >
            <div className="text-lg font-bold text-red-400 tabular-nums">{dupes.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 leading-tight">duplicates<br/>removed</div>
          </div>
          <div
            className="text-center px-3 py-2 rounded-lg"
            style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.15)' }}
          >
            <div className="text-lg font-bold text-orange-400 tabular-nums">{errors.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 leading-tight">errors<br/>resolved</div>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: VALIDATED OUTPUT ── */}
      <div className="flex flex-col gap-1.5 w-[62%] sm:w-[34%]">
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          Validated Output
        </p>
        <AnimatePresence>
          {phase >= 2 && CLEAN_ROWS.map((row, i) => (
            <motion.div
              key={row.retailer + i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.35 }}
              className="rounded-lg overflow-hidden"
              style={{
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div className="px-2.5 py-1.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-white text-xs font-medium">{row.retailer}</span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider"
                    style={{ color: '#34D399', background: 'rgba(52,211,153,0.15)' }}
                  >
                    VERIFIED
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: '#6EE7B7' }}>
                  <span>{row.store}</span>
                  <span className="text-slate-700">·</span>
                  <span className="font-semibold">{row.metric}</span>
                  <span className="text-slate-700">·</span>
                  <span>{row.value}</span>
                  <span className="text-slate-700">·</span>
                  <span>{row.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden sm:block mt-2 px-4 py-3 rounded-xl"
            style={{
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34D399' }} />
              <span className="text-emerald-400 text-xs font-bold">100% Validated</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every record verified against business rules, cross-retailer standards, and historical benchmarks before passing to the next stage.
            </p>
          </motion.div>
        )}
      </div>

    </div>
  )
}
