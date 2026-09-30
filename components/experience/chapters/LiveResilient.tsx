'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { DESTINATIONS, DISRUPTIONS, TEAMS } from '../data'
import TeamIcon from '@/components/ui/TeamIcon'

// Hub geometry in viewBox units; the hub itself is sized in rem so it scales with the type
const SIZE = 300
const C = SIZE / 2
const R = 112

function pos(i: number) {
  const a = ((-90 + i * 60) * Math.PI) / 180
  return { x: C + Math.cos(a) * R, y: C + Math.sin(a) * R }
}

type Status = 'idle' | 'broken' | 'hit' | 'healed'

export default function LiveResilient({ mode }: ChapterProps) {
  const on = mode === 'with'
  const [eventId, setEventId] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  // Flipping the switch resets the stress test
  useEffect(() => {
    setEventId(null)
    setStatus('idle')
  }, [mode])

  useEffect(() => {
    if (status !== 'hit') return
    const t = setTimeout(() => setStatus('healed'), 900)
    return () => clearTimeout(t)
  }, [status, eventId])

  const trigger = (id: string) => {
    setEventId(id)
    setStatus(on ? 'hit' : 'broken')
  }

  const event = DISRUPTIONS.find(d => d.id === eventId)
  const red = status === 'broken' || status === 'hit'
  const live = on && !red

  const spokeColor = red ? '#F87171' : on ? '#22D3EE' : 'rgba(148,163,184,0.3)'

  return (
    <div className="w-full min-h-full flex items-center justify-center px-4 sm:px-8 py-4 short:py-2">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
        {/* ── Hub ── */}
        <div className="flex flex-col items-center">
          <div className="relative w-[21rem] h-[21rem] short:w-[18rem] short:h-[18rem] max-w-full">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full overflow-visible">
              {TEAMS.map((t, i) => {
                const p = pos(i)
                return (
                  <g key={t.label}>
                    <line
                      x1={C}
                      y1={C}
                      x2={p.x}
                      y2={p.y}
                      stroke={spokeColor}
                      strokeOpacity={on || red ? 0.35 : 1}
                      strokeWidth={1}
                      strokeDasharray={on && !red ? undefined : '3 4'}
                      style={{ transition: 'stroke .3s' }}
                    />
                    {live && (
                      <motion.line
                        x1={C}
                        y1={C}
                        x2={p.x}
                        y2={p.y}
                        stroke={t.color}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray="12 88"
                        animate={{ strokeDashoffset: [100, 0] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
                      />
                    )}
                  </g>
                )
              })}
            </svg>

            {/* center */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[7rem] h-[7rem] -ml-[3.5rem] -mt-[3.5rem] rounded-full flex flex-col items-center justify-center text-center"
              style={{ border: '1px solid' }}
              animate={{
                background: red ? 'rgba(127,29,29,0.5)' : on ? 'rgba(8,47,73,0.95)' : 'rgba(15,23,42,0.95)',
                borderColor: red ? 'rgba(248,113,113,0.7)' : on ? 'rgba(34,211,238,0.6)' : 'rgba(100,116,139,0.35)',
                boxShadow: red
                  ? '0 0 40px rgba(248,113,113,0.4)'
                  : on
                  ? '0 0 50px rgba(34,211,238,0.35)'
                  : '0 0 0 rgba(0,0,0,0)',
                x: status === 'hit' || status === 'broken' ? [0, -4, 4, -2, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {status === 'healed' && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: '2px solid #34D399' }}
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
              <div className={`text-xs font-bold uppercase tracking-wide leading-tight ${red ? 'text-red-200' : on ? 'text-cyan-200' : 'text-slate-400'}`}>
                {red ? (on ? 'Detected…' : 'Reporting dark') : on ? 'Your warehouse' : 'Weekly export'}
              </div>
              <div className="text-xs text-slate-300 mt-0.5 px-2 leading-tight">
                {red ? (on ? 'SPS resolving' : 'Manual fix needed') : on ? 'Live share' : 'Spreadsheet, manual'}
              </div>
              {live && (
                <span className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                </span>
              )}
            </motion.div>

            {/* team nodes */}
            {TEAMS.map((t, i) => {
              const p = pos(i)
              return (
                <div
                  key={t.label}
                  className="absolute w-[5.5rem] -ml-[2.75rem] -mt-[1.25rem] flex flex-col items-center"
                  style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    animate={{
                      background: red ? 'rgba(127,29,29,0.6)' : on ? `${t.color}22` : 'rgba(30,41,59,0.9)',
                      borderColor: red ? '#F87171' : on ? t.color : 'rgba(100,116,139,0.3)',
                      color: red ? '#FCA5A5' : on ? t.color : '#475569',
                      scale: live ? [1, 1.08, 1] : 1,
                    }}
                    transition={{ duration: 0.4, delay: live ? i * 0.1 : 0 }}
                    style={{ border: '1px solid' }}
                  >
                    {red ? <span className="text-base font-bold">!</span> : <TeamIcon icon={t.icon} />}
                  </motion.div>
                  <span className={`mt-1 text-xs font-semibold text-center leading-tight ${on && !red ? 'text-slate-200' : 'text-slate-400'}`}>
                    {t.label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8 short:mt-6">
            {DESTINATIONS.map(d => (
              <span
                key={d.name}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-500"
                style={{
                  color: on ? d.color : '#64748B',
                  background: on ? `${d.color}14` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${on ? `${d.color}40` : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {on && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: d.color }} />}
                {d.name}
                {on && <span className="text-slate-400 font-normal">· live share</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stress test ── */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Stress test</div>
          <div className="text-base text-slate-300 mb-3">Throw a real-world disruption at the pipeline:</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {DISRUPTIONS.map(d => {
              const active = d.id === eventId
              return (
                <button
                  key={d.id}
                  onClick={() => trigger(d.id)}
                  className="text-left text-sm font-semibold px-3 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    color: active ? '#fff' : '#CBD5E1',
                    background: !active ? 'rgba(255,255,255,0.04)' : status === 'healed' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.15)',
                    border: `1px solid ${!active ? 'rgba(255,255,255,0.1)' : status === 'healed' ? 'rgba(52,211,153,0.45)' : 'rgba(248,113,113,0.5)'}`,
                  }}
                >
                  ⚡ {d.label}
                </button>
              )
            })}
          </div>

          <div className="min-h-[7rem]">
            <AnimatePresence mode="wait">
              {event ? (
                <motion.div
                  key={`${event.id}-${status}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl p-4"
                  style={
                    status === 'healed'
                      ? { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(52,211,153,0.35)' }
                      : { background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.3)' }
                  }
                >
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${status === 'healed' ? 'text-emerald-300' : 'text-red-300'}`}>
                    {status === 'healed' ? '✓ SPS handles it' : status === 'hit' ? 'Disruption detected…' : '✗ Without SPS'}
                  </div>
                  <div className="text-base text-slate-200 leading-snug">
                    {status === 'healed' ? event.with : status === 'hit' ? `${event.label}.` : event.without}
                  </div>
                  {status === 'broken' && (
                    <div className="text-[0.8125rem] text-slate-400 mt-2">Now flip the switch and try it again.</div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl p-4 text-sm text-slate-400"
                  style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
                >
                  Pick a disruption above to see what happens to every team downstream.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {on && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-sm text-slate-400"
              >
                <span><span className="font-bold text-white">1,000+</span> trading partners covered</span>
                <span><span className="font-bold text-white">Automatic</span> · no manual work</span>
                <span><span className="font-bold text-white">Included</span> · no additional cost</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
