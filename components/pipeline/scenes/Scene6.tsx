'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SCENARIOS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L2 13h12L8 2z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
        <path d="M8 6v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    color: '#F87171',
    title: 'Retailer data doesn\'t arrive',
    pain: 'Reporting goes dark. Hours of manual investigation begin.',
    sps: 'Gap detected instantly. Data backfilled automatically when delivery resumes.',
    delay: 0.1,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M5 5V3.5a3 3 0 016 0V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M8 9v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="8.5" r="0.75" fill="currentColor" />
      </svg>
    ),
    color: '#FB923C',
    title: 'Retailer updates their data maps',
    pain: 'Mappings break overnight. Reporting halts until engineers rework logic.',
    sps: 'Auto-remapped across our retailer network. Zero downtime, zero manual effort.',
    delay: 0.25,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </svg>
    ),
    color: '#FBBF24',
    title: 'Data is restated retroactively',
    pain: 'Historical records become wrong. Someone has to find and fix them manually.',
    sps: 'Restatements detected, processed, and propagated to your warehouse automatically.',
    delay: 0.4,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="5" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="8" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M6.5 6.5L5 8.5M9.5 6.5L11 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
    color: '#34D399',
    title: 'New store locations open',
    pain: 'New doors invisible to reporting until someone manually adds them.',
    sps: 'New locations appear in your data from day one, no configuration needed.',
    delay: 0.55,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M5 7h6M5 9.5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M10.5 10l1.5-1.5M10.5 10l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    color: '#60A5FA',
    title: 'Item and location details change',
    pain: 'Mismatches break hierarchies. Analysts spend hours investigating.',
    sps: 'Item file updates applied immediately. Hierarchies stay clean and current.',
    delay: 0.7,
  },
]

const VALUE_PROPS = [
  { label: '1,000+ retailers', sub: 'covered in our network', color: '#60A5FA' },
  { label: 'Fully automatic', sub: 'no manual work required', color: '#34D399' },
  { label: 'No additional cost', sub: 'included in your SPS partnership', color: '#818CF8' },
]

export default function Scene6() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 0: disruption cards appear
    // Phase 1 at 1.5s: SPS resolution appears
    const t = setTimeout(() => setPhase(1), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-2.5 px-4 sm:px-10 py-2">

      {/* Column header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-3 pt-1"
      >
        <div className="w-1/2 sm:w-[36%] text-[10px] font-bold tracking-widest text-slate-600 uppercase pl-8">
          Scenario
        </div>
        <div className="hidden sm:block flex-1 text-[10px] font-bold tracking-widest uppercase"
          style={{ color: '#F87171' }}>
          Without SPS
        </div>
        <div className="flex-1 text-[10px] font-bold tracking-widest uppercase"
          style={{ color: '#34D399', opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
          SPS handles it
        </div>
      </motion.div>

      {/* Scenario rows */}
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        {SCENARIOS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: s.delay, duration: 0.35 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: `1px solid ${phase >= 1 ? s.color + '22' : 'rgba(255,255,255,0.05)'}`,
              transition: 'border-color 0.5s',
            }}
          >
            {/* Icon + title */}
            <div className="w-1/2 sm:w-[36%] flex items-center gap-2.5 min-w-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <span className="text-xs font-semibold text-white leading-tight">{s.title}</span>
            </div>

            {/* Pain */}
            <div className="hidden sm:block flex-1 min-w-0">
              <p
                className="text-[10px] leading-snug transition-opacity duration-500"
                style={{ color: '#F87171', opacity: phase >= 1 ? 0.45 : 0.85 }}
              >
                {s.pain}
              </p>
            </div>

            {/* SPS resolution */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
                className="flex items-start gap-1.5"
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-px"
                  style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399' }}
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[10px] text-emerald-400 leading-snug">{s.sps}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom value props */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        className="flex items-center justify-center gap-3 pb-1 flex-shrink-0"
      >
        {VALUE_PROPS.map((vp) => (
          <div
            key={vp.label}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl"
            style={{
              background: `${vp.color}0A`,
              border: `1px solid ${vp.color}25`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: vp.color }}
            />
            <div>
              <div className="text-xs font-bold" style={{ color: vp.color }}>{vp.label}</div>
              <div className="text-[10px] text-slate-600 leading-none mt-0.5">{vp.sub}</div>
            </div>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
