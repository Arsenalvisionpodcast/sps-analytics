'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { RAW_RECORDS, PRODUCT, HERO_SALE } from '../data'
import { useCounter } from '@/lib/hooks/useCounter'
import SignalOrb from '../ui/SignalOrb'

const CHECKS = ['Deduplication', 'Error resolution', 'Gap filling', 'Format normalization']

export default function Cleanse({ mode }: ChapterProps) {
  const on = mode === 'with'
  const dupes = useCounter(847, 900, 1400, on)
  const errors = useCounter(312, 1100, 1400, on)
  const rows = RAW_RECORDS.filter(r => !(on && r.removed))

  return (
    <div className="w-full min-h-full flex items-center justify-center px-4 sm:px-8 py-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1.25fr_0.8fr_1.1fr] gap-4 md:gap-6 items-center">
        {/* ── Incoming records ── */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Incoming records · {PRODUCT.name}
          </div>
          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {rows.map(r => {
                const store = on && r.storeFixed ? r.storeFixed : r.store
                const date = on && r.dateFixed ? r.dateFixed : r.date
                return (
                  <motion.div
                    key={r.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 30, height: 0, marginTop: 0, transition: { duration: 0.45 } }}
                    className="overflow-hidden"
                  >
                    <div
                      className="grid grid-cols-[1fr_auto] gap-2 items-center px-3 py-2 rounded-lg font-mono text-[11px] transition-colors duration-500"
                      style={{
                        background: on ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${on ? 'rgba(52,211,153,0.25)' : `${r.issueColor}33`}`,
                      }}
                    >
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-slate-300">
                        <span className="text-slate-400">{r.partner}</span>
                        <span className={on && r.storeFixed ? 'text-emerald-300' : r.store.includes('✗') ? 'text-orange-300' : ''}>
                          {store}
                        </span>
                        <span>{r.units} u</span>
                        <span className={on && r.dateFixed ? 'text-emerald-300' : r.date === '—' ? 'text-amber-300' : ''}>{date}</span>
                      </div>
                      <span
                        className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                        style={
                          on
                            ? { color: '#34D399', background: 'rgba(52,211,153,0.12)' }
                            : { color: r.issueColor, background: `${r.issueColor}1F` }
                        }
                      >
                        {on ? 'VERIFIED' : r.issue}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Engine ── */}
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px dashed ${on ? 'rgba(96,165,250,0.55)' : 'rgba(100,116,139,0.3)'}`,
                transition: 'border-color .5s',
              }}
              animate={{ rotate: on ? 360 : 0 }}
              transition={on ? { duration: 10, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{
                border: `1.5px dashed ${on ? 'rgba(34,211,238,0.5)' : 'rgba(100,116,139,0.2)'}`,
                transition: 'border-color .5s',
              }}
              animate={{ rotate: on ? -360 : 0 }}
              transition={on ? { duration: 7, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
            />
            <div className="relative text-center">
              {on ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-1.5">
                  <SignalOrb mode="with" size={26} />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">SPS Data Engine</div>
                </motion.div>
              ) : (
                <div className="px-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No validation layer</div>
                  <div className="text-[10px] text-slate-600 mt-1">Records pass straight through</div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 space-y-1 min-h-[88px]">
            {CHECKS.map((c, i) => (
              <motion.div
                key={c}
                className="flex items-center gap-2 text-[11px]"
                animate={{ opacity: on ? 1 : 0.35 }}
                transition={{ delay: on ? 0.3 + i * 0.2 : 0 }}
              >
                <motion.span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  animate={{
                    background: on ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                    color: on ? '#34D399' : '#475569',
                  }}
                  transition={{ delay: on ? 0.3 + i * 0.2 : 0 }}
                >
                  {on ? '✓' : '·'}
                </motion.span>
                <span className={on ? 'text-slate-300' : 'text-slate-600'}>{c}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Report ── */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            What your report says · {HERO_SALE.store}
          </div>
          <div
            className="rounded-2xl p-5 transition-all duration-500"
            style={{
              background: on ? 'linear-gradient(160deg, rgba(37,99,235,0.14), rgba(34,211,238,0.05))' : 'rgba(248,113,113,0.05)',
              border: `1px solid ${on ? 'rgba(34,211,238,0.3)' : 'rgba(248,113,113,0.25)'}`,
            }}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode}
                  initial={{ opacity: 0, y: on ? 10 : -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: on ? -10 : 10 }}
                  transition={{ duration: 0.35 }}
                  className={`text-6xl font-extrabold tabular-nums ${on ? 'text-gradient-blue' : 'text-red-300'}`}
                >
                  {on ? HERO_SALE.qty : HERO_SALE.qty * 2}
                </motion.span>
              </AnimatePresence>
              <div>
                <div className="text-sm text-slate-300 font-semibold">units sold</div>
                <div className={`text-xs font-bold ${on ? 'text-emerald-400' : 'text-red-400'}`}>
                  {on ? '✓ Verified' : '✗ Double-counted'}
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-[11px] leading-snug">
              <div className={on ? 'text-slate-300' : 'text-orange-300/90'}>
                {on ? '✓ Store 1162 resolved — 7 units attributed' : '⚠ Store “BR-11X” unknown — 7 units orphaned'}
              </div>
              <div className={on ? 'text-slate-300' : 'text-amber-300/90'}>
                {on ? '✓ Date backfilled — 5 units restored' : '⚠ 1 record dropped — no date (5 units)'}
              </div>
            </div>
            {on && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/10"
              >
                <div>
                  <div className="text-xl font-extrabold text-white tabular-nums">{dupes}</div>
                  <div className="text-[10px] text-slate-400">duplicates removed</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white tabular-nums">{errors}</div>
                  <div className="text-[10px] text-slate-400">errors resolved</div>
                </div>
                <div className="col-span-2 text-[10px] text-cyan-300/90 leading-snug">
                  100% validated against business rules, cross-partner standards, and historical benchmarks.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
