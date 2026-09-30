'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { CHANNELS, TOTAL_UNITS, HERO_SALE, PRODUCT } from '../data'

const GEO = ['National', 'Region', 'State', HERO_SALE.store, 'Door']
const PROD = ['Brand', 'Category', PRODUCT.name, PRODUCT.variant, 'UPC']

function lanePath(i: number, on: boolean) {
  const y0 = ((i + 0.5) / CHANNELS.length) * 100
  return on ? `M0 ${y0} C 50 ${y0}, 50 50, 100 50` : `M0 ${y0} C 50 ${y0}, 50 ${y0}, 100 ${y0}`
}

function DepthStrip({ label, levels, on, delay }: { label: string; levels: string[]; on: boolean; delay: number }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</div>
      <div className="flex flex-wrap items-center gap-1">
        {levels.map((lvl, i) => {
          const lit = on || i === 0
          const last = i === levels.length - 1
          return (
            <div key={lvl} className="flex items-center gap-1">
              <motion.span
                className="text-xs sm:text-[0.8125rem] font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                animate={{
                  opacity: lit ? 1 : 0.3,
                  filter: lit ? 'blur(0px)' : 'blur(1.5px)',
                }}
                transition={{ delay: on ? delay + i * 0.15 : 0, duration: 0.35 }}
                style={{
                  color: on && last ? '#030B18' : lit ? '#E2E8F0' : '#64748B',
                  background: on && last ? 'linear-gradient(90deg, #60A5FA, #22D3EE)' : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {lvl}
              </motion.span>
              {!last && <span className={`text-xs ${on ? 'text-cyan-400/70' : 'text-slate-600'}`}>›</span>}
            </div>
          )
        })}
        {!on && <span className="text-xs text-red-300/80 ml-1">detail lost in roll-ups</span>}
      </div>
    </div>
  )
}

export default function Translate({ mode }: ChapterProps) {
  const on = mode === 'with'

  return (
    <div className="w-full min-h-full flex items-center justify-center px-4 sm:px-8 py-4 short:py-2">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* ── Funnel ── */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 md:h-[15rem]">
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-6 gap-1.5 md:gap-0 md:w-[30%]">
            {CHANNELS.map((c, i) => (
              <motion.div
                key={c.id}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div
                  className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-[0.8125rem] text-slate-400 truncate">{c.name}</span>
                  <span className="flex items-baseline gap-1.5 flex-shrink-0">
                    <span
                      className="font-mono text-sm font-semibold transition-colors duration-500"
                      style={{ color: on ? '#93C5FD' : '#FBBF24' }}
                    >
                      “{c.metric}”
                    </span>
                    <span className="font-mono text-sm text-slate-200">{c.units}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block relative flex-1">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
              {CHANNELS.map((c, i) => (
                <motion.path
                  key={`base-${c.id}`}
                  initial={false}
                  animate={{ d: lanePath(i, on) }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  fill="none"
                  stroke={on ? 'rgba(96,165,250,0.22)' : 'transparent'}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {CHANNELS.map((c, i) => (
                <motion.path
                  key={c.id}
                  initial={false}
                  animate={{ d: lanePath(i, on), strokeDashoffset: on ? [100, 0] : 0 }}
                  transition={{
                    d: { duration: 0.9, ease: 'easeInOut' },
                    strokeDashoffset: { duration: 1.6, repeat: on ? Infinity : 0, ease: 'linear', delay: i * 0.12 },
                  }}
                  pathLength={100}
                  strokeDasharray={on ? '12 88' : '2 3'}
                  fill="none"
                  stroke={on ? c.color : 'rgba(251,191,36,0.35)'}
                  strokeWidth={on ? 2 : 1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          <div className="md:w-[30%] flex items-center">
            <AnimatePresence mode="wait">
              {on ? (
                <motion.div
                  key="std"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-full rounded-2xl p-5 text-center"
                  style={{
                    background: 'linear-gradient(160deg, rgba(37,99,235,0.18), rgba(34,211,238,0.06))',
                    border: '1px solid rgba(34,211,238,0.35)',
                    boxShadow: '0 0 40px rgba(34,211,238,0.15)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-1">SPS standard metric</div>
                  <div className="text-lg font-bold text-white">Units Sold</div>
                  <div className="text-5xl font-extrabold text-gradient-blue tabular-nums my-1">{TOTAL_UNITS}</div>
                  <div className="text-[0.8125rem] text-slate-400">across all six channels, reconciled</div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-[0.8125rem] text-slate-300">
                    <span className="font-extrabold text-white">1,300+</span> metrics standardized across every partner in the network
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="q"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full rounded-2xl p-5 text-center"
                  style={{ background: 'rgba(248,113,113,0.05)', border: '1px dashed rgba(248,113,113,0.35)' }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-red-300/80 mb-2">Total units, all channels</div>
                  <div className="font-mono text-[0.8125rem] text-slate-400 mb-1">
                    {CHANNELS.map(c => c.units).join(' + ')} =
                  </div>
                  <motion.div
                    className="text-5xl font-extrabold text-red-300"
                    animate={{ x: [0, -2, 2, -1, 0], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1.8 }}
                  >
                    ?
                  </motion.div>
                  <div className="text-[0.8125rem] text-slate-400 mt-1">Six definitions. Nothing reconciles.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Granularity ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl px-4 py-3 transition-colors duration-500"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${on ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <DepthStrip label="Geographic depth" levels={GEO} on={on} delay={0.6} />
          <DepthStrip label="Product depth" levels={PROD} on={on} delay={0.9} />
        </div>
      </div>
    </div>
  )
}
