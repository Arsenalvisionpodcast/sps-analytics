'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

// --- Mock chart data ---
const salesData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  walmart: [420, 450, 480, 520, 490, 530, 580, 610, 590, 620, 700, 780],
  target: [280, 300, 310, 340, 330, 360, 380, 400, 390, 420, 480, 510],
  kroger: [180, 190, 200, 220, 210, 230, 250, 270, 260, 280, 320, 340],
};

const barData = [
  { label: 'Walmart', value: 850, pct: 100 },
  { label: 'Amazon', value: 540, pct: 63 },
  { label: 'Target', value: 490, pct: 58 },
  { label: 'Kroger', value: 340, pct: 40 },
  { label: 'Costco', value: 290, pct: 34 },
  { label: 'Other', value: 185, pct: 22 },
];

const kpis = [
  { label: 'Total Revenue', value: '$2.4M', sub: 'vs. prior period', change: '+12.3%', up: true },
  { label: 'Units Sold', value: '847K', sub: 'across all channels', change: '+8.7%', up: true },
  { label: 'Fill Rate', value: '96.4%', sub: 'weighted average', change: '+1.2pp', up: true },
  { label: 'Out-of-Stock', value: '3.2%', sub: 'avg across retailers', change: '-0.8pp', up: false },
];

// SVG line chart helpers
const chartW = 380;
const chartH = 120;
const maxVal = 850;
const minVal = 100;

function toX(i: number) { return (i / 11) * chartW; }
function toY(v: number) { return chartH - ((v - minVal) / (maxVal - minVal)) * chartH; }

function pathFromData(data: number[], close = false) {
  const pts = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
  if (close) {
    return `${pts} L ${toX(11).toFixed(1)} ${chartH} L 0 ${chartH} Z`;
  }
  return pts;
}

// Donut chart data
const channelMix = [
  { label: 'Mass / Club', pct: 34, color: '#1851C6' },
  { label: 'Grocery', pct: 28, color: '#2563EB' },
  { label: 'Online', pct: 21, color: '#0EA5E9' },
  { label: 'Specialty', pct: 17, color: '#60A5FA' },
];

function DonutChart() {
  const total = 100;
  const radius = 45;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;
  let cumPct = 0;

  return (
    <svg viewBox="0 0 160 120" className="w-full h-full">
      {channelMix.map((seg, i) => {
        const dashLen = (seg.pct / total) * circumference;
        const dashOffset = -(cumPct / total) * circumference;
        cumPct += seg.pct;
        return (
          <motion.circle
            key={seg.label}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={dashOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dashLen} ${circumference - dashLen}` }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          />
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" className="text-xs" fill="#0F172A" fontWeight="700" fontSize="11">
        Channel
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#64748B" fontSize="8">
        Mix
      </text>
      {/* Legend */}
      {channelMix.map((seg, i) => (
        <g key={seg.label} transform={`translate(125, ${12 + i * 26})`}>
          <rect x="0" y="-8" width="8" height="8" rx="2" fill={seg.color} />
          <text x="11" y="0" fill="#334155" fontSize="8" fontWeight="500">{seg.label}</text>
          <text x="11" y="10" fill="#94A3B8" fontSize="7">{seg.pct}%</text>
        </g>
      ))}
    </svg>
  );
}

const views = ['Executive Overview', 'Product Performance', 'Retailer Analysis'] as const;
type View = typeof views[number];

export default function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeView, setActiveView] = useState<View>('Executive Overview');

  return (
    <section className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Product Preview</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Analytics Built for the Business
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Role-based dashboards that deliver answers, not just data — for executives,
            sales teams, category managers, and planners.
          </p>
        </motion.div>

        {/* Dashboard frame */}
        <motion.div
          className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/60"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Browser chrome */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              {['#F87171', '#FBBF24', '#34D399'].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200">
              analytics.spscommerce.com/dashboard
            </div>
          </div>

          {/* App shell */}
          <div className="flex bg-sps-surface">
            {/* Sidebar */}
            <div className="hidden md:flex w-48 bg-gradient-to-b from-[#06163D] to-[#0A2156] flex-col p-3 gap-1 flex-shrink-0">
              <div className="flex items-center gap-2 px-2 py-2 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                    <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-bold">SPS Analytics</span>
              </div>

              {[
                { label: 'Overview', active: true },
                { label: 'Sales Performance' },
                { label: 'Inventory' },
                { label: 'Retailer Detail' },
                { label: 'Item Analysis' },
                { label: 'Alerts', badge: '3' },
                { label: 'Reports' },
                { label: 'Settings' },
              ].map((nav) => (
                <div
                  key={nav.label}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer ${
                    nav.active ? 'bg-blue-600 text-white' : 'text-white/50 hover:bg-white/8 hover:text-white/80'
                  } transition-colors`}
                >
                  <span className="text-xs font-medium">{nav.label}</span>
                  {nav.badge && (
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-black flex items-center justify-center">
                      {nav.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 min-w-0">
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Executive Overview</h3>
                  <p className="text-xs text-slate-400">All retailers · Last 12 months · Updated 2h ago</p>
                </div>
                <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-slate-100 shadow-sm">
                  {views.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveView(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeView === v
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {kpis.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  >
                    <div className="text-xs text-slate-400 font-medium mb-1">{kpi.label}</div>
                    <div className="text-xl font-black text-slate-900 mb-0.5">{kpi.value}</div>
                    <div className="text-[10px] text-slate-400 mb-1">{kpi.sub}</div>
                    <div className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        {kpi.up
                          ? <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                          : <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                        }
                      </svg>
                      {kpi.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Line chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Sales Trend by Retailer</div>
                      <div className="text-xs text-slate-400">Units (000s) · 12 months</div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      {[
                        { label: 'Walmart', color: '#1851C6' },
                        { label: 'Target', color: '#0EA5E9' },
                        { label: 'Kroger', color: '#34D399' },
                      ].map((l) => (
                        <div key={l.label} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                          <span className="text-slate-500">{l.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full">
                    {/* Area fill for Walmart */}
                    <motion.path
                      d={pathFromData(salesData.walmart, true)}
                      fill="url(#walmartGrad)"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="walmartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1851C6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#1851C6" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Walmart line */}
                    <motion.path
                      d={pathFromData(salesData.walmart)}
                      stroke="#1851C6"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                    />
                    {/* Target line */}
                    <motion.path
                      d={pathFromData(salesData.target)}
                      stroke="#0EA5E9"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.2, delay: 0.6, ease: 'easeInOut' }}
                    />
                    {/* Kroger line */}
                    <motion.path
                      d={pathFromData(salesData.kroger)}
                      stroke="#34D399"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
                    />
                    {/* Month labels */}
                    {salesData.months.map((m, i) => (
                      <text key={m} x={toX(i)} y={chartH + 16} textAnchor="middle" fill="#94A3B8" fontSize="7">
                        {m}
                      </text>
                    ))}
                  </svg>
                </div>

                {/* Donut chart */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
                  <div className="text-sm font-bold text-slate-900 mb-1">Channel Mix</div>
                  <div className="text-xs text-slate-400 mb-3">% of total revenue</div>
                  <div className="w-full h-32">
                    {inView && <DonutChart />}
                  </div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
                <div className="text-sm font-bold text-slate-900 mb-1">Retailer Revenue Comparison</div>
                <div className="text-xs text-slate-400 mb-4">$K · Current period</div>
                <div className="space-y-2.5">
                  {barData.map((bar, i) => (
                    <div key={bar.label} className="flex items-center gap-3">
                      <div className="w-14 text-xs text-slate-500 font-medium text-right flex-shrink-0">
                        {bar.label}
                      </div>
                      <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 relative"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${bar.pct}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                        >
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                            ${bar.value}K
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          className="text-center text-slate-400 text-xs mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Illustrative dashboard — actual SPS dashboards can be customized to your brand, data, and audience.
          <a href="#cta" className="text-blue-600 ml-1 hover:underline">See a live demo →</a>
        </motion.p>
      </div>
    </section>
  );
}
