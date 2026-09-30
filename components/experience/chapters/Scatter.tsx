'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { CHANNELS } from '../data'
import SignalOrb from '../ui/SignalOrb'

// Where each lane lands in "without" mode: tangled, crossing, nowhere in particular
const SCATTER_ENDS = [78, 14, 60, 92, 30, 46]
const INBOX_FLAGS = ['v3? FINAL?', 'late', 'login expired', 'columns changed', 'duplicate?', '']

const STATS = [
  { value: '12+', unit: 'hrs / week collecting' },
  { value: '6+', unit: 'portals & logins' },
  { value: '0', unit: 'shared standard' },
]

function lanePath(i: number, on: boolean) {
  const y0 = ((i + 0.5) / CHANNELS.length) * 100
  if (on) return `M0 ${y0} C 55 ${y0}, 45 50, 100 50`
  const ye = SCATTER_ENDS[i]
  return `M0 ${y0} C 40 ${ye}, 60 ${y0}, 100 ${ye}`
}

export default function Scatter({ mode }: ChapterProps) {
  const on = mode === 'with'

  return (
    <div className="w-full min-h-full flex items-center justify-center px-4 sm:px-8 py-4 short:py-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0 md:h-[24rem] short:md:h-[21rem]">
        {/* ── Channels ── */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-6 gap-2 md:gap-0 md:w-[26%]">
          {CHANNELS.map((c, i) => (
            <motion.div
              key={c.id}
              className="flex items-center"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div
                className="w-full flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 px-3 py-2 rounded-lg transition-colors duration-500"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${on ? 'rgba(96,165,250,0.25)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-[0.8125rem] sm:text-sm font-semibold text-slate-200 truncate">{c.name}</span>
                </div>
                <span
                  className="text-[0.6875rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded flex-shrink-0 transition-colors duration-500"
                  style={{
                    color: on ? '#93C5FD' : '#FBBF24',
                    background: on ? 'rgba(59,130,246,0.12)' : 'rgba(251,191,36,0.1)',
                  }}
                >
                  {c.format}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Lanes ── */}
        <div className="hidden md:block relative flex-1">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
            {CHANNELS.map((c, i) => {
              const d = lanePath(i, on)
              return (
                <g key={c.id}>
                  <motion.path
                    initial={false}
                    animate={{ d }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    fill="none"
                    stroke={on ? 'rgba(96,165,250,0.25)' : 'rgba(248,113,113,0.3)'}
                    strokeWidth={1}
                    strokeDasharray={on ? undefined : '3 4'}
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    initial={false}
                    animate={{
                      d,
                      strokeDashoffset: on ? [100, 0] : [100, 55, 55, 30, 30],
                      opacity: on ? 1 : [0.9, 0.9, 0.2, 0.8, 0],
                    }}
                    transition={{
                      d: { duration: 0.9, ease: 'easeInOut' },
                      strokeDashoffset: { duration: on ? 1.6 : 3.2, repeat: Infinity, ease: on ? 'linear' : 'easeInOut', delay: i * 0.18 },
                      opacity: { duration: on ? 0.3 : 3.2, repeat: on ? 0 : Infinity, delay: i * 0.18 },
                    }}
                    pathLength={100}
                    strokeDasharray="7 93"
                    fill="none"
                    stroke={on ? c.color : i % 2 ? '#F87171' : '#FBBF24'}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: on ? `drop-shadow(0 0 4px ${c.color})` : 'none' }}
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* ── Destination ── */}
        <div className="md:w-[34%] flex items-center">
          <AnimatePresence mode="wait">
            {on ? (
              <motion.div
                key="hub"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(160deg, rgba(37,99,235,0.16), rgba(34,211,238,0.06))',
                  border: '1px solid rgba(34,211,238,0.35)',
                  boxShadow: '0 0 50px rgba(34,211,238,0.15)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <SignalOrb mode="with" size={30} />
                  <div>
                    <div className="text-base font-bold text-white">SPS Decision Intelligence</div>
                    <div className="text-[0.8125rem] text-cyan-300">6 of 6 channels collected automatically</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
                  {CHANNELS.map((c, i) => (
                    <motion.div
                      key={c.id}
                      className="flex items-center gap-1.5 text-[0.8125rem] text-slate-300"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.12 }}
                    >
                      <span className="text-emerald-400">✓</span>
                      <span className="truncate">{c.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-3 pt-3 border-t border-white/10">
                  <div className="flex-1">
                    <div className="text-xl font-extrabold text-gradient-blue">1,000+</div>
                    <div className="text-xs text-slate-400 leading-snug">trading partners in the SPS network</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-extrabold text-gradient-blue">0 hrs</div>
                    <div className="text-xs text-slate-400 leading-snug">spent collecting. No logins, no downloads.</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="inbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div
                  className="rounded-xl p-3 mb-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(248,113,113,0.3)' }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-red-300/80 mb-2">
                    Your team&apos;s inbox · Monday 8:02 AM
                  </div>
                  <div className="space-y-1">
                    {CHANNELS.map((c, i) => (
                      <motion.div
                        key={c.id}
                        className="flex items-center justify-between gap-2 px-2 py-1 rounded font-mono text-[0.8125rem]"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                        animate={{ x: [0, i % 2 ? 1.5 : -1.5, 0], rotate: [0, i % 2 ? 0.6 : -0.6, 0] }}
                        transition={{ duration: 0.4 + i * 0.07, repeat: Infinity, repeatDelay: 1.5 + i * 0.3 }}
                      >
                        <span className="text-slate-300 truncate">{c.file}</span>
                        {INBOX_FLAGS[i] && <span className="text-amber-300 flex-shrink-0">{INBOX_FLAGS[i]}</span>}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {STATS.map((s, i) => (
                    <motion.div
                      key={s.unit}
                      className="flex flex-col gap-1 rounded-lg px-3 py-2.5"
                      style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                    >
                      <span className="text-2xl font-extrabold text-red-300 leading-none">{s.value}</span>
                      <span className="text-[0.8125rem] font-semibold text-red-100/80 leading-snug">{s.unit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
