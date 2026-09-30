'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterProps } from '../types'
import { DECISION_FRAMES } from '../data'
import { personas, useCases, type PersonaId } from '@/components/use-cases/data'
import MiniViz from '@/components/use-cases/MiniViz'
import Nudge from '../ui/Nudge'

export default function Decision({ mode }: ChapterProps) {
  const on = mode === 'with'
  const [personaId, setPersonaId] = useState<PersonaId | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)

  const persona = personas.find(p => p.id === personaId)
  const cases = persona ? useCases.filter(u => u.personas.includes(persona.id)) : []
  const active = cases.find(u => u.id === activeId) ?? cases[0]
  const frame = active ? DECISION_FRAMES[active.id] : null

  const pick = (id: PersonaId) => {
    setPersonaId(id)
    setActiveId(null)
  }

  return (
    <div className="w-full min-h-full flex items-start md:items-center justify-center px-4 sm:px-8 py-4 short:py-2">
      <div className="w-full max-w-6xl">
        {/* ── Persona picker ── */}
        <div className="flex flex-col items-center mb-3">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Whose decision is it?</div>
          <div className="flex flex-wrap justify-center gap-2">
            {personas.map((p, i) => {
              const sel = p.id === personaId
              return (
                <Nudge key={p.id} active={i === 0 && !personaId} delay={1.5}>
                  <button
                    onClick={() => pick(p.id)}
                    className="px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200"
                    style={{
                      color: sel ? '#fff' : '#CBD5E1',
                      background: sel ? `${p.color}40` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${sel ? p.color : 'rgba(255,255,255,0.12)'}`,
                      boxShadow: sel ? `0 0 24px ${p.color}55` : 'none',
                    }}
                  >
                    {p.label}
                  </button>
                </Nudge>
              )
            })}
          </div>
        </div>

        {!persona ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-base text-slate-500 py-10"
          >
            Choose a team to see the decisions the signal feeds.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.7fr)] gap-4 md:gap-6">
            {/* ── Decision list ── */}
            <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {cases.map((u, i) => {
                const sel = active?.id === u.id
                return (
                  <motion.button
                    key={`${persona.id}-${u.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveId(u.id)}
                    className="flex-shrink-0 md:w-full flex items-center justify-between gap-3 text-left px-3 py-2 short:py-1.5 rounded-lg transition-colors duration-200"
                    style={{
                      background: sel ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${sel ? (on ? 'rgba(34,211,238,0.45)' : 'rgba(248,113,113,0.4)') : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span className={`text-sm font-semibold whitespace-nowrap md:whitespace-normal ${sel ? 'text-white' : 'text-slate-300'}`}>
                      {u.short}
                    </span>
                    <span
                      className="hidden md:inline text-xs font-bold flex-shrink-0 transition-colors duration-500"
                      style={{ color: on ? '#67E8F9' : '#64748B' }}
                    >
                      {on ? DECISION_FRAMES[u.id].impact : '?'}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* ── Decision card ── */}
            {active && frame && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.id}-${mode}`}
                  initial={{ opacity: 0, y: 12, rotateX: -8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl p-5 sm:p-6"
                  style={
                    on
                      ? { background: '#FFFFFF', boxShadow: '0 20px 60px rgba(34,211,238,0.25)' }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(248,113,113,0.35)' }
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${on ? 'text-blue-600' : 'text-red-300/80'}`}>
                        {on ? 'With SPS Decision Intelligence' : 'Today · running on gut feel'}
                      </div>
                      <h3 className={`text-lg sm:text-xl font-extrabold leading-tight ${on ? 'text-slate-900' : 'text-slate-200'}`}>
                        {active.title}
                      </h3>
                    </div>
                    {on ? (
                      <div className="sm:text-right flex-shrink-0 sm:max-w-[11rem]">
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.25 }}
                          className="text-3xl sm:text-4xl font-extrabold leading-none bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent"
                        >
                          {frame.impact}
                        </motion.div>
                        <div className="text-sm font-semibold text-slate-700 leading-snug mt-1">{frame.impactLabel}</div>
                      </div>
                    ) : (
                      <div className="text-4xl font-extrabold text-red-300/70 leading-none">?</div>
                    )}
                  </div>

                  {on ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
                      <p className="text-[0.9375rem] text-slate-600 leading-relaxed">{active.spsMove}</p>
                      <div className="rounded-xl p-3 bg-slate-50 border border-slate-100">
                        <MiniViz type={active.visualType} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg text-slate-200 leading-relaxed mb-3">{frame.without}</p>
                      <p className="text-[0.9375rem] text-slate-400 leading-relaxed">{active.pain}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
