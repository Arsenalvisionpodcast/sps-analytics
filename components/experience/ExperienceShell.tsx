'use client'

import { useState, useEffect, useCallback, useRef, type ComponentType } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { CHAPTERS, type ChapterId, type Mode } from './data'
import type { ChapterProps } from './types'
import NoiseField from './ui/NoiseField'
import ModeSwitch from './ui/ModeSwitch'
import JourneyRail from './ui/JourneyRail'
import SignalReadout from './ui/SignalReadout'
import Intro from './chapters/Intro'
import Scatter from './chapters/Scatter'
import Cleanse from './chapters/Cleanse'
import Translate from './chapters/Translate'
import Match from './chapters/Match'
import LiveResilient from './chapters/LiveResilient'
import Decision from './chapters/Decision'
import Close from './chapters/Close'

const CHAPTER_COMPONENTS: Record<ChapterId, ComponentType<ChapterProps>> = {
  intro: Intro,
  scatter: Scatter,
  cleanse: Cleanse,
  translate: Translate,
  match: Match,
  live: LiveResilient,
  decide: Decision,
  close: Close,
}

const FLIPPABLE_COUNT = CHAPTERS.filter(c => c.flippable).length

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ExperienceShell() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [modes, setModes] = useState<Record<number, Mode>>({})
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const chapter = CHAPTERS[current]
  const mode: Mode = chapter.flippable ? modes[current] ?? 'without' : 'with'
  const chaos = !chapter.flippable ? (chapter.id === 'intro' ? 0.2 : 0) : mode === 'without' ? 1 : 0

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= CHAPTERS.length || i === current) return
      setDirection(i > current ? 1 : -1)
      setCurrent(i)
    },
    [current]
  )
  const goNext = useCallback(() => goTo(current + 1), [goTo, current])
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current])

  const toggle = useCallback(() => {
    if (!CHAPTERS[current].flippable) return
    setModes(m => ({ ...m, [current]: (m[current] ?? 'without') === 'with' ? 'without' : 'with' }))
    setFlipped(f => ({ ...f, [current]: true }))
  }, [current])

  const restart = useCallback(() => {
    setModes({})
    setFlipped({})
    goTo(0)
  }, [goTo])

  // Keyboard: arrows / page keys navigate, S flips the switch
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        goNext()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goPrev()
      } else if (e.key === 's' || e.key === 'S') {
        toggle()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, toggle])

  // Wheel: one chapter step per gesture (trackpad momentum counts as one gesture)
  const wheel = useRef({ last: 0, fired: false, acc: 0 })
  const onWheel = (e: React.WheelEvent) => {
    const scroller = (e.target as HTMLElement).closest('[data-scroll]') as HTMLElement | null
    if (scroller && scroller.scrollHeight > scroller.clientHeight + 2) {
      const atTop = scroller.scrollTop <= 0
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return
    }
    const now = Date.now()
    const g = wheel.current
    if (now - g.last > 250) {
      g.fired = false
      g.acc = 0
    }
    g.last = now
    if (g.fired) return
    g.acc += e.deltaY
    if (Math.abs(g.acc) > 60) {
      g.fired = true
      if (g.acc > 0) goNext()
      else goPrev()
    }
  }

  // Touch: horizontal swipe navigates (vertical is left for content scroll)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const Active = CHAPTER_COMPONENTS[chapter.id]
  const isLast = current === CHAPTERS.length - 1
  const nextEmphasis = !chapter.flippable || flipped[current]
  const showHeader = chapter.flippable

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative w-full h-[100dvh] overflow-hidden flex flex-col text-white"
        style={{ background: '#030B18' }}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Mood lighting: red vignette without, blue glow with */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: chaos,
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(127,29,29,0.28) 100%), radial-gradient(ellipse at 50% 110%, rgba(251,191,36,0.06), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 1 - chaos,
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.16), transparent 70%), radial-gradient(ellipse 40% 40% at 50% 100%, rgba(34,211,238,0.07), transparent 70%)',
          }}
        />
        <NoiseField chaos={chaos} />

        {/* ── TOP BAR ── */}
        <div className="relative z-10 flex items-center justify-between gap-4 px-4 sm:px-8 py-3 flex-shrink-0">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md shadow-blue-400/20 overflow-hidden flex-shrink-0">
              <img src="/sps-logo-mark.png" alt="SPS Commerce" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <span className="text-white font-bold text-base tracking-tight group-hover:text-blue-300 transition-colors">
                SPS Commerce
              </span>
              <span className="block text-[10px] font-medium leading-none text-cyan-300">Decision Intelligence</span>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <SignalReadout chapter={chapter} mode={mode} />
            <a
              href="/"
              className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
              aria-label="Exit experience"
            >
              Exit ✕
            </a>
          </div>
        </div>

        {/* ── CHAPTER HEADER ── */}
        {showHeader && (
          <div className="relative z-10 text-center px-4 sm:px-8 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                style={{
                  color: mode === 'with' ? '#67E8F9' : '#FCA5A5',
                  background: mode === 'with' ? 'rgba(34,211,238,0.08)' : 'rgba(248,113,113,0.08)',
                  border: `1px solid ${mode === 'with' ? 'rgba(34,211,238,0.2)' : 'rgba(248,113,113,0.2)'}`,
                  transition: 'color .4s, background .4s, border-color .4s',
                }}
              >
                Chapter {current} of {FLIPPABLE_COUNT} &nbsp;·&nbsp; {chapter.tag}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${current}-${mode}`}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                <h1
                  className={`text-xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-1.5 ${
                    mode === 'with' ? 'text-gradient-hero' : 'text-slate-200'
                  }`}
                >
                  {chapter.title[mode]}
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                  {chapter.subtitle[mode]}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3">
              <ModeSwitch mode={mode} onToggle={toggle} prompt={!flipped[current]} />
            </div>
          </div>
        )}

        {/* ── STAGE ── */}
        <div className="relative z-10 flex-1 min-h-0">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={`chapter-${current}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-scroll
            >
              <Active mode={mode} onNext={goNext} onRestart={restart} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM NAV ── */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-6 px-3 sm:px-8 pt-2 flex-shrink-0">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="px-3 sm:px-5 py-2 rounded-full text-sm font-medium text-slate-400 border border-white/10 hover:border-white/25 transition-colors disabled:opacity-20 disabled:cursor-not-allowed mb-4"
            aria-label="Previous chapter"
          >
            ←<span className="hidden sm:inline"> Back</span>
          </button>
          <div className="flex-1 min-w-0">
            <JourneyRail labels={CHAPTERS.map(c => c.rail)} current={current} mode={mode} onJump={goTo} />
          </div>
          <button
            onClick={isLast ? restart : goNext}
            className="px-3 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-500 mb-4 whitespace-nowrap"
            style={
              nextEmphasis
                ? {
                    color: '#fff',
                    background: 'linear-gradient(135deg, #1851C6, #2563EB)',
                    boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                  }
                : { color: '#94A3B8', border: '1px solid rgba(255,255,255,0.12)' }
            }
            aria-label={isLast ? 'Replay experience' : 'Next chapter'}
          >
            {isLast ? '↺ Replay' : current === 0 ? 'Begin →' : 'Next →'}
          </button>
        </div>
      </div>
    </MotionConfig>
  )
}
