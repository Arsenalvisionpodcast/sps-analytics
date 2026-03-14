'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SIZE = 360
const CENTER = SIZE / 2
const RADIUS = 138

const TEAM_NODES = [
  { label: 'Analytics', icon: 'chart', color: '#60A5FA', angle: -90, delay: 0.4 },
  { label: 'Demand Planning', icon: 'trend', color: '#818CF8', angle: -30, delay: 0.65 },
  { label: 'Finance', icon: 'dollar', color: '#34D399', angle: 30, delay: 0.9 },
  { label: 'Sales', icon: 'target', color: '#FBBF24', angle: 90, delay: 1.15 },
  { label: 'Marketing', icon: 'megaphone', color: '#F472B6', angle: 150, delay: 1.4 },
  { label: 'Operations', icon: 'cog', color: '#22D3EE', angle: 210, delay: 1.65 },
]

function angleToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

function TeamIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactElement> = {
    chart: (
      <g>
        <rect x="3" y="9" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.7" />
        <rect x="8" y="6" width="3" height="10" rx="0.5" fill="currentColor" />
        <rect x="13" y="4" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.8" />
      </g>
    ),
    trend: (
      <path d="M3 13L7.5 8.5L10.5 11.5L16.5 5.5M14 5.5H16.5V8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    dollar: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9.5 5V14M7 7.5C7 7.5 7 6 9.5 6s2.5 1.5 2.5 2.5S9.5 10 9.5 10s-2.5 0-2.5 1.5S8.5 13 9.5 13s2.5-1 2.5-1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    ),
    target: (
      <g>
        <circle cx="9.5" cy="9.5" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" />
      </g>
    ),
    megaphone: (
      <path d="M3.5 7.5H7L13 4V15L7 11.5H3.5V7.5ZM7 11.5V15.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    cog: (
      <g>
        <circle cx="9.5" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M9.5 3.5V5.5M9.5 13.5V15.5M3.5 9.5H5.5M13.5 9.5H15.5M5.4 5.4L6.8 6.8M12.2 12.2L13.6 13.6M13.6 5.4L12.2 6.8M6.8 12.2L5.4 13.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    ),
  }
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      {paths[icon]}
    </svg>
  )
}

const INTEGRATIONS = [
  { name: 'Snowflake', color: '#60A5FA', logo: 'S' },
  { name: 'Databricks', color: '#FB923C', logo: 'D' },
  { name: 'Delta Share', color: '#34D399', logo: '△' },
]

export default function Scene5() {
  const [showNodes, setShowNodes] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowNodes(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center gap-6 px-4 py-2">

      {/* ── LEFT: CLEAN DATA SUMMARY ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-3 w-40 flex-shrink-0"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
          Data delivered as
        </p>

        {INTEGRATIONS.map((intg, i) => (
          <motion.div
            key={intg.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${intg.color}30`,
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
              style={{ background: `${intg.color}20`, color: intg.color }}
            >
              {intg.logo}
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold">{intg.name}</div>
              <div className="text-slate-600 text-[10px]">Live Share</div>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: intg.color }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="px-3 py-2.5 rounded-xl"
          style={{
            background: 'rgba(52,211,153,0.06)',
            border: '1px solid rgba(52,211,153,0.18)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
            />
            <span className="text-emerald-400 text-xs font-bold">Live — updates daily</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            No manual exports. Data stays current automatically.
          </p>
        </motion.div>
      </motion.div>

      {/* ── CENTER: HUB AND SPOKE ── */}
      <div
        className="relative flex-shrink-0"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* SVG layer — spoke lines only, no Framer Motion transform conflicts */}
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {showNodes && TEAM_NODES.map((node) => {
            const { x, y } = angleToXY(node.angle, RADIUS)
            return (
              <motion.line
                key={`spoke-${node.label}`}
                x1={CENTER}
                y1={CENTER}
                x2={CENTER + x}
                y2={CENTER + y}
                stroke={node.color}
                strokeWidth={1}
                strokeOpacity={0.35}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: node.delay - 0.15, duration: 0.35 }}
              />
            )
          })}
        </svg>

        {/* Central warehouse — plain div for centering, motion.div for animation only */}
        <div
          className="absolute z-10"
          style={{
            top: CENTER - 60,
            left: CENTER - 60,
            width: 120,
            height: 120,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 18 }}
            className="w-full h-full flex flex-col items-center justify-center rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(24,81,198,0.25), rgba(34,211,238,0.15))',
              border: '1.5px solid rgba(99,102,241,0.5)',
              boxShadow: '0 0 60px rgba(37,99,235,0.25), 0 0 20px rgba(34,211,238,0.1)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-2xl inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(99,102,241,0.4)' }}
            />
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1851C6, #22D3EE)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="5" width="14" height="10" rx="2" stroke="white" strokeWidth="1.4" fill="none" />
                <path d="M7 5V4M10 5V3.5M13 5V4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6 10h8M6 12.5h5" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
              </svg>
            </div>
            <div className="text-white text-xs font-bold text-center leading-tight">
              Data<br />Warehouse
            </div>
          </motion.div>
        </div>

        {/* Team nodes — plain div for positioning, inner motion.div for animation only */}
        {TEAM_NODES.map((node) => {
          const { x, y } = angleToXY(node.angle, RADIUS)
          return (
            <div
              key={node.label}
              className="absolute flex flex-col items-center gap-1"
              style={{
                top: CENTER + y,
                left: CENTER + x,
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={showNodes ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: node.delay, type: 'spring', stiffness: 250, damping: 18 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${node.color}18`,
                    border: `1.5px solid ${node.color}45`,
                    color: node.color,
                    boxShadow: `0 0 14px ${node.color}20`,
                  }}
                >
                  <TeamIcon icon={node.icon} />
                </div>
                <span
                  className="text-[10px] font-semibold text-center whitespace-nowrap"
                  style={{ color: node.color }}
                >
                  {node.label}
                </span>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* ── RIGHT: OUTCOME CALLOUTS ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.4 }}
        className="flex flex-col gap-2 w-40 flex-shrink-0"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
          Teams empowered
        </p>
        {[
          { team: 'Analytics', outcome: 'SKU, store, and channel dashboards always current' },
          { team: 'Demand Planning', outcome: 'Forecast from clean sell-through signals' },
          { team: 'Finance', outcome: 'Margin visibility across all retail partners' },
          { team: 'Sales', outcome: 'Retailer scorecards for line reviews' },
        ].map((item, i) => (
          <motion.div
            key={item.team}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 + i * 0.1 }}
            className="px-3 py-2 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="text-white text-xs font-semibold mb-0.5">{item.team}</div>
            <div className="text-slate-500 text-[10px] leading-relaxed">{item.outcome}</div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
