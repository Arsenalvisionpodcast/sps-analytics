'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RETAILER_RECORDS = [
  {
    retailer: 'Walmart',
    color: '#60A5FA',
    fields: [
      { key: 'Dept', value: '07 – Athletic Footwear' },
      { key: 'Category', value: 'Athletic / Running' },
      { key: 'Vendor Item', value: 'NIKE AIR FORCE 1 \'07 WHT 10M' },
      { key: 'UPC', value: '00194501234567' },
    ],
  },
  {
    retailer: 'Target',
    color: '#A78BFA',
    fields: [
      { key: 'TCIN', value: '12345678' },
      { key: 'Dept Name', value: 'Mens Athletic' },
      { key: 'Item Desc', value: 'AF1 Low Mens White 10.0' },
      { key: 'UPC', value: '00194501234567' },
    ],
  },
  {
    retailer: 'Amazon',
    color: '#FBBF24',
    fields: [
      { key: 'ASIN', value: 'B08XYZ12345' },
      { key: 'Parent ASIN', value: 'B08XYZ00001' },
      { key: 'Title', value: 'Nike Men\'s AF-1 WHT SZ10' },
      { key: 'EAN', value: '00194501234567' },
    ],
  },
]

const INTERNAL_RECORD = {
  fields: [
    { key: 'Brand', value: 'Nike' },
    { key: 'Category', value: 'Footwear' },
    { key: 'Subcategory', value: 'Lifestyle' },
    { key: 'Style Name', value: 'Air Force 1 \'07' },
    { key: 'Gender', value: 'Mens' },
    { key: 'Color', value: 'White' },
    { key: 'Size', value: '10' },
    { key: 'UPC', value: '00194501234567' },
  ],
}

export default function Scene4() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 0: retailer records appear
    // Phase 1: arrows animate through item file (1.5s)
    // Phase 2: internal record revealed (2.5s)
    const t1 = setTimeout(() => setPhase(1), 1400)
    const t2 = setTimeout(() => setPhase(2), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="w-full h-full flex items-center gap-4 px-8 py-2">

      {/* ── LEFT: RETAILER RECORDS ── */}
      <div className="flex flex-col gap-2.5 w-[35%]">
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          Retailer Naming
        </p>
        {RETAILER_RECORDS.map((rec, ri) => (
          <motion.div
            key={rec.retailer}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: ri * 0.15, duration: 0.35 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${rec.color}25`,
            }}
          >
            <div
              className="px-3 py-1.5 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${rec.color}20` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rec.color }} />
              <span className="text-xs font-bold" style={{ color: rec.color }}>{rec.retailer}</span>
            </div>
            <div className="px-3 py-2 grid grid-cols-1 gap-1">
              {rec.fields.map(f => (
                <div key={f.key} className="flex gap-2 text-[10px]">
                  <span className="text-slate-600 font-medium w-20 flex-shrink-0">{f.key}:</span>
                  <span className="text-slate-300 font-mono">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CENTER: ITEM FILE GATEWAY ── */}
      <div className="flex flex-col items-center justify-center w-[22%] gap-3">
        {/* Arrow in */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="arrow-in"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full flex items-center justify-center"
              style={{ transformOrigin: 'left' }}
            >
              <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.6), rgba(34,211,238,0.6))' }} />
              <div style={{ color: '#22D3EE', fontSize: 12, marginLeft: -1 }}>▶</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Item File box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 180 }}
          className="relative w-full flex flex-col items-center px-4 py-5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.08))',
            border: '1px solid rgba(99,102,241,0.35)',
            boxShadow: '0 0 32px rgba(99,102,241,0.12)',
          }}
        >
          {/* Key icon */}
          <motion.div
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #22D3EE)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8" cy="8" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M11.5 11.5L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 14.5L15.5 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>

          <div className="text-white text-sm font-bold text-center mb-1">Your Item File</div>
          <div className="text-slate-500 text-[10px] text-center leading-relaxed">
            Maps any retailer's product naming to your internal taxonomy
          </div>

          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: '1px solid rgba(99,102,241,0.3)' }}
          />
        </motion.div>

        {/* Arrow out */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="arrow-out"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
              className="w-full flex items-center justify-center"
              style={{ transformOrigin: 'left' }}
            >
              <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.6), rgba(52,211,153,0.6))' }} />
              <div style={{ color: '#34D399', fontSize: 12, marginLeft: -1 }}>▶</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RIGHT: INTERNAL RECORD ── */}
      <div className="flex flex-col gap-2.5 w-[39%]">
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-1">
          Your Internal Taxonomy
        </p>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(52,211,153,0.25)',
              }}
            >
              <div
                className="px-4 py-2 flex items-center gap-2"
                style={{ borderBottom: '1px solid rgba(52,211,153,0.15)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34D399' }} />
                <span className="text-xs font-bold text-emerald-400">Normalized Product Record</span>
              </div>
              <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {INTERNAL_RECORD.fields.map((f, i) => (
                  <motion.div
                    key={f.key}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="flex flex-col"
                  >
                    <span className="text-[9px] font-bold tracking-wider uppercase text-slate-600">
                      {f.key}
                    </span>
                    <span className="text-xs font-medium text-emerald-300 font-mono">
                      {f.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-2"
          >
            {[
              'Walmart\'s "NIKE AIR FORCE 1 \'07 WHT 10M" →  Air Force 1 \'07 / White / Mens / 10',
              'Target\'s "AF1 Low Mens White 10.0" → same record',
              'Amazon\'s "Nike Men\'s AF-1 WHT SZ10" → same record',
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed"
              >
                <div className="w-1 h-1 rounded-full bg-emerald-700 mt-1 flex-shrink-0" />
                {text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  )
}
