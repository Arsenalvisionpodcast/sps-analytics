'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'
import Scene5 from './scenes/Scene5'

const SCENES = [
  {
    step: 1,
    tag: 'The Problem',
    title: 'Retail data arrives from everywhere.',
    subtitle: 'Each retailer delivers data differently — different portals, formats, schedules, and naming conventions. Your team spends hours collecting before any analysis can begin.',
  },
  {
    step: 2,
    tag: 'The Engine',
    title: 'Every record is validated and cleaned.',
    subtitle: 'The SPS Data Engine ingests raw retailer data, removes duplicates, resolves check-digit errors, fills gaps, and validates every record before it moves forward.',
  },
  {
    step: 3,
    tag: 'Normalization',
    title: 'One standard. Every metric. Every level.',
    subtitle: '"Pcs Sold," "Qty Sold," "# Pieces" — all resolved to a single standard. Granularity preserved from national level all the way down to UPC and individual door.',
  },
  {
    step: 4,
    tag: 'Correlation',
    title: 'Retailer naming mapped to your world.',
    subtitle: 'Your item file is the key. Every retailer\'s product hierarchy and naming convention is translated into your internal taxonomy — so data across all partners speaks the same language.',
  },
  {
    step: 5,
    tag: 'Delivery',
    title: 'Clean data. Live. Everywhere it needs to be.',
    subtitle: 'Normalized, correlated data delivered directly into your data warehouse as a live share — powering analytics, demand planning, finance, sales, and more in real time.',
  },
]

const SceneComponents = [Scene1, Scene2, Scene3, Scene4, Scene5]

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
  }),
}

export default function PipelineDemo() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = useCallback(() => {
    if (current < SCENES.length - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }, [current])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const ActiveScene = SceneComponents[current]
  const scene = SCENES[current]

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ background: '#030B18' }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '30%',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-5 h-5 rounded"
            style={{ background: 'linear-gradient(135deg, #1851C6, #22D3EE)' }}
          />
          <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
            SPS Commerce
          </span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {SCENES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                height: 6,
                width: i === current ? 28 : 6,
                background: i === current
                  ? 'linear-gradient(90deg, #3B82F6, #22D3EE)'
                  : i < current
                  ? 'rgba(59,130,246,0.4)'
                  : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        <span className="text-slate-600 text-xs font-mono tabular-nums">
          {current + 1} / {SCENES.length}
        </span>
      </div>

      {/* ── SCENE TITLE AREA ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 text-center px-8 pb-3 flex-shrink-0"
        >
          <div
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
            style={{
              color: '#60A5FA',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            Step {scene.step} of {SCENES.length} &nbsp;·&nbsp; {scene.tag}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
            {scene.title}
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            {scene.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── MAIN SCENE AREA ── */}
      <div className="relative flex-1 overflow-hidden min-h-0">
        <AnimatePresence custom={direction}>
          <motion.div
            key={`scene-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ActiveScene />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 flex-shrink-0">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
          style={{
            color: '#94A3B8',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          ← Previous
        </button>

        <span className="text-slate-700 text-xs">
          ← → arrow keys to navigate
        </span>

        <button
          onClick={goNext}
          disabled={current === SCENES.length - 1}
          className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed text-white"
          style={{
            background: current === SCENES.length - 1
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #1851C6, #2563EB)',
            boxShadow: current === SCENES.length - 1
              ? 'none'
              : '0 4px 20px rgba(37,99,235,0.4)',
          }}
        >
          {current === SCENES.length - 1 ? 'Complete' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
