'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { PARTNER_NAMES, TAXONOMY, PRODUCT } from '../data'

const N = PARTNER_NAMES.length
const MATCHED_UNITS = PARTNER_NAMES.reduce((s, p) => s + p.units, 0)

function inPath(i: number, on: boolean) {
  const y = ((i + 0.5) / N) * 100
  return on ? `M0 ${y} C 25 ${y}, 25 50, 50 50` : `M0 ${y} C 25 ${y}, 25 ${y}, 50 ${y}`
}

function KeyIcon({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M21 12v2" />
    </svg>
  )
}

export default function Match({ mode }: ChapterProps) {
  const on = mode === 'with'

  return (
    <div className="w-full min-h-full flex items-center justify-center px-4 sm:px-8 py-4 short:py-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0 md:h-[20rem]">
        {/* ── Partner naming ── */}
        <div className="grid grid-cols-1 md:grid-rows-3 gap-2 md:gap-0 md:w-[32%]">
          {PARTNER_NAMES.map((p, i) => (
            <motion.div
              key={p.partner}
              className="flex items-center"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="w-full rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.color}40` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>
                    {p.partner}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {p.idLabel} {p.id}
                  </span>
                </div>
                <div className="font-mono text-sm text-slate-200 truncate">“{p.name}”</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Item file key ── */}
        <div className="relative md:flex-1 h-24 md:h-auto">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden md:block absolute inset-0 w-full h-full overflow-visible">
            {PARTNER_NAMES.map((p, i) => (
              <motion.path
                key={`base-${p.partner}`}
                initial={false}
                animate={{ d: inPath(i, on) }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                fill="none"
                stroke={on ? `${p.color}40` : 'transparent'}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {PARTNER_NAMES.map((p, i) => (
              <motion.path
                key={p.partner}
                initial={false}
                animate={{ d: inPath(i, on), strokeDashoffset: on ? [100, 0] : 0 }}
                transition={{
                  d: { duration: 0.8, ease: 'easeInOut' },
                  strokeDashoffset: { duration: 1.4, repeat: on ? Infinity : 0, ease: 'linear', delay: i * 0.2 },
                }}
                pathLength={100}
                strokeDasharray={on ? '14 86' : '2 3'}
                fill="none"
                stroke={on ? p.color : 'rgba(148,163,184,0.3)'}
                strokeWidth={on ? 2 : 1}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {PARTNER_NAMES.map((p, i) => {
              const y = ((i + 0.5) / N) * 100
              return (
                <motion.path
                  key={`out-${p.partner}`}
                  initial={false}
                  animate={{ d: on ? 'M50 50 L100 50' : `M50 ${y} L100 ${y}`, opacity: on && i > 0 ? 0 : 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  fill="none"
                  stroke={on ? '#22D3EE' : 'rgba(148,163,184,0.3)'}
                  strokeWidth={on ? 2 : 1}
                  strokeDasharray={on ? undefined : '2 3'}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative flex flex-col items-center justify-center w-24 h-24 rounded-2xl text-center"
              animate={{
                scale: on ? 1 : 0.92,
                background: on ? 'rgba(8,47,73,0.95)' : 'rgba(15,23,42,0.9)',
                borderColor: on ? 'rgba(34,211,238,0.6)' : 'rgba(100,116,139,0.3)',
              }}
              style={{ border: '1px solid', boxShadow: on ? '0 0 40px rgba(34,211,238,0.3)' : 'none' }}
            >
              {on && (
                <motion.span
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: '1.5px solid rgba(34,211,238,0.6)' }}
                  animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
              <motion.div
                animate={{ rotate: on ? [0, -25, 0] : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <KeyIcon color={on ? '#67E8F9' : '#475569'} />
              </motion.div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${on ? 'text-cyan-200' : 'text-slate-400'}`}>
                Your item file
              </div>
              {!on && <div className="text-[0.6875rem] text-slate-500">not connected</div>}
            </motion.div>
          </div>
        </div>

        {/* ── Your report ── */}
        <div className="md:w-[36%] flex items-center">
          <AnimatePresence mode="wait">
            {on ? (
              <motion.div
                key="one"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="w-full rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(160deg, rgba(37,99,235,0.16), rgba(34,211,238,0.05))',
                  border: '1px solid rgba(34,211,238,0.35)',
                  boxShadow: '0 0 40px rgba(34,211,238,0.12)',
                }}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-2">
                  One record · your taxonomy
                </div>
                <div className="flex flex-wrap items-center gap-1 mb-3">
                  {TAXONOMY.map((t, i) => (
                    <motion.span
                      key={t}
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <span className="text-[0.8125rem] font-semibold px-2 py-0.5 rounded bg-white/10 text-white">{t}</span>
                      {i < TAXONOMY.length - 1 && <span className="text-cyan-400/60 text-xs">›</span>}
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div className="font-mono text-[0.8125rem] text-slate-400">
                    UPC {PRODUCT.upc}
                    <div className="text-slate-400">matched across 3 partners</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-extrabold text-gradient-blue tabular-nums leading-none">{MATCHED_UNITS}</div>
                    <div className="text-xs text-slate-400">units sold</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="three"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-red-300/80 mb-2">Your report</div>
                <div className="space-y-2">
                  {PARTNER_NAMES.map(p => (
                    <div
                      key={p.partner}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)' }}
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-[0.8125rem] text-slate-200 truncate">{p.name}</div>
                        <div className="text-xs text-red-300/80">not found in your catalog</div>
                      </div>
                      <span className="font-mono text-base text-slate-300 flex-shrink-0">{p.units}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[0.8125rem] text-slate-400 mt-2">
                  Three “products.” It&apos;s one. Nobody can see that it sold {MATCHED_UNITS}.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
