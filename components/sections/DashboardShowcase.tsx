'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

// ========== Chart helpers ==========
const chartW = 380;
const chartH = 120;

function toX(i: number) { return (i / 11) * chartW; }

function pathFromValues(data: number[], minV: number, maxV: number, close = false) {
  const range = maxV - minV;
  const pts = data.map((v, i) =>
    `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${(chartH - ((v - minV) / range) * chartH).toFixed(1)}`
  ).join(' ');
  if (close) return `${pts} L ${toX(11).toFixed(1)} ${chartH} L 0 ${chartH} Z`;
  return pts;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ========== Shared UI components ==========
function DonutChart({ segments, centerLabel, centerSub }: {
  segments: { label: string; pct: number; color: string }[];
  centerLabel: string;
  centerSub: string;
}) {
  const radius = 45;
  const cx = 60;
  const cy = 60;
  const circ = 2 * Math.PI * radius;
  let cum = 0;
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full">
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const offset = -(cum / 100) * circ;
        cum += seg.pct;
        return (
          <motion.circle
            key={seg.label}
            cx={cx} cy={cy} r={radius}
            fill="none" stroke={seg.color} strokeWidth="18"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={offset}
            initial={{ strokeDasharray: `0 ${circ}` }}
            animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          />
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#0F172A" fontWeight="700" fontSize="11">{centerLabel}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#64748B" fontSize="8">{centerSub}</text>
      {segments.map((seg, i) => (
        <g key={seg.label} transform={`translate(125, ${12 + i * 26})`}>
          <rect x="0" y="-8" width="8" height="8" rx="2" fill={seg.color} />
          <text x="11" y="0" fill="#334155" fontSize="8" fontWeight="500">{seg.label}</text>
          <text x="11" y="10" fill="#94A3B8" fontSize="7">{seg.pct}%</text>
        </g>
      ))}
    </svg>
  );
}

function KpiCard({ kpi, inView, delay }: {
  kpi: { label: string; value: string; sub: string; change: string; up: boolean };
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
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
  );
}

function BarRows({ rows, inView }: {
  rows: { label: string; value: number; pct: number; suffix?: string }[];
  inView: boolean;
}) {
  return (
    <div className="space-y-2.5">
      {rows.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <div className="w-24 text-xs text-slate-500 font-medium text-right flex-shrink-0 truncate">{bar.label}</div>
          <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-500 relative"
              initial={{ width: 0 }}
              animate={inView ? { width: `${bar.pct}%` } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
            >
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                {bar.value}{bar.suffix ?? 'K'}
              </span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== Executive Overview data ==========
const execKpis = [
  { label: 'Total Revenue', value: '$2.4M', sub: 'vs. prior period', change: '+12.3%', up: true },
  { label: 'Units Sold', value: '847K', sub: 'across all channels', change: '+8.7%', up: true },
  { label: 'Fill Rate', value: '96.4%', sub: 'weighted average', change: '+1.2pp', up: true },
  { label: 'Out-of-Stock', value: '3.2%', sub: 'avg across retailers', change: '-0.8pp', up: false },
];
const execLineData = {
  walmart: [420, 450, 480, 520, 490, 530, 580, 610, 590, 620, 700, 780],
  target:  [280, 300, 310, 340, 330, 360, 380, 400, 390, 420, 480, 510],
  kroger:  [180, 190, 200, 220, 210, 230, 250, 270, 260, 280, 320, 340],
};
const execDonut = [
  { label: 'Mass / Club', pct: 34, color: '#1851C6' },
  { label: 'Grocery',     pct: 28, color: '#2563EB' },
  { label: 'Online',      pct: 21, color: '#0EA5E9' },
  { label: 'Specialty',   pct: 17, color: '#60A5FA' },
];
const execBars = [
  { label: 'Walmart', value: 850, pct: 100 },
  { label: 'Amazon',  value: 540, pct: 64  },
  { label: 'Target',  value: 490, pct: 58  },
  { label: 'Kroger',  value: 340, pct: 40  },
  { label: 'Costco',  value: 290, pct: 34  },
  { label: 'Other',   value: 185, pct: 22  },
];

// ========== Product Performance data ==========
const prodKpis = [
  { label: 'Top SKU Revenue', value: '$312K', sub: 'SKU #4821 — 12-pk',     change: '+18.2%', up: true  },
  { label: 'Avg Sell Price',  value: '$18.40', sub: 'blended across channels', change: '+$1.20', up: true  },
  { label: 'Active SKUs',     value: '284',    sub: 'in-stock, on-shelf',       change: '-3',     up: false },
  { label: 'On Promo',        value: '24%',    sub: 'of units sold',            change: '+4pp',   up: true  },
];
const velocityData = {
  sku4821: [3.2, 3.4, 3.6, 4.0, 3.8, 4.1, 4.4, 4.7, 4.5, 4.8, 5.3, 5.9],
  sku4822: [2.1, 2.3, 2.4, 2.6, 2.5, 2.7, 2.9, 3.0, 3.0, 3.2, 3.6, 3.8],
  sku4830: [1.4, 1.5, 1.5, 1.7, 1.6, 1.7, 1.9, 2.0, 2.0, 2.1, 2.4, 2.6],
};
const prodDonut = [
  { label: 'Core Line', pct: 42, color: '#1851C6' },
  { label: 'Premium',   pct: 31, color: '#2563EB' },
  { label: 'Value',     pct: 17, color: '#0EA5E9' },
  { label: 'Seasonal',  pct: 10, color: '#60A5FA' },
];
const prodBars = [
  { label: 'SKU #4821 (12-pk)', value: 312, pct: 100 },
  { label: 'SKU #4822 (6-pk)',  value: 248, pct: 79  },
  { label: 'SKU #4830 (Value)', value: 196, pct: 63  },
  { label: 'SKU #4801 (Single)',value: 154, pct: 49  },
  { label: 'SKU #4855 (Bundle)',value: 118, pct: 38  },
  { label: 'All Other',         value: 90,  pct: 29  },
];

// ========== Retailer Analysis data ==========
const retailKpis = [
  { label: 'Fill Rate',       value: '96.4%',  sub: 'weighted avg',       change: '+1.2pp', up: true  },
  { label: 'On-Time Delivery',value: '94.2%',  sub: 'all shipments',      change: '+0.8pp', up: true  },
  { label: 'Compliance',      value: '98.7%',  sub: 'label & EDI accuracy',change: '+0.4pp', up: true  },
  { label: 'Chargebacks',     value: '$12.4K', sub: 'current period',     change: '-18%',   up: false },
];
const fillRateTrend = {
  walmart: [94, 95, 95, 96, 95, 96, 97, 97, 96, 97, 97, 97],
  target:  [93, 94, 94, 95, 94, 95, 96, 96, 95, 96, 96, 96],
  amazon:  [91, 92, 92, 93, 92, 93, 94, 94, 93, 93, 94, 94],
};
const retailDonut = [
  { label: 'Walmart', pct: 38, color: '#1851C6' },
  { label: 'Amazon',  pct: 24, color: '#2563EB' },
  { label: 'Target',  pct: 22, color: '#0EA5E9' },
  { label: 'Costco',  pct: 16, color: '#60A5FA' },
];
const scorecard = [
  { name: 'Costco',  fill: 98, onTime: 96, comp: 99 },
  { name: 'Walmart', fill: 97, onTime: 95, comp: 99 },
  { name: 'Target',  fill: 96, onTime: 94, comp: 99 },
  { name: 'Kroger',  fill: 95, onTime: 92, comp: 97 },
  { name: 'Amazon',  fill: 94, onTime: 93, comp: 98 },
];
function scoreColor(v: number) {
  if (v >= 97) return '#22C55E';
  if (v >= 94) return '#F59E0B';
  return '#EF4444';
}

// ========== View components ==========
function ExecutiveOverview({ inView }: { inView: boolean }) {
  return (
    <motion.div
      key="exec"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {execKpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} inView={inView} delay={0.3 + i * 0.08} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-slate-900">Sales Trend by Retailer</div>
              <div className="text-xs text-slate-400">Units (000s) · 12 months</div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              {[{ label: 'Walmart', color: '#1851C6' }, { label: 'Target', color: '#0EA5E9' }, { label: 'Kroger', color: '#34D399' }].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full">
            <defs>
              <linearGradient id="execGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1851C6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1851C6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={pathFromValues(execLineData.walmart, 100, 850, true)} fill="url(#execGrad)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }} />
            {[
              { data: execLineData.walmart, color: '#1851C6', width: 2,   delay: 0.4 },
              { data: execLineData.target,  color: '#0EA5E9', width: 1.5, delay: 0.6 },
              { data: execLineData.kroger,  color: '#34D399', width: 1.5, delay: 0.8 },
            ].map(({ data, color, width, delay }, idx) => (
              <motion.path key={idx} d={pathFromValues(data, 100, 850)} stroke={color} strokeWidth={width} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay, ease: 'easeInOut' }} />
            ))}
            {months.map((m, i) => (
              <text key={m} x={toX(i)} y={chartH + 16} textAnchor="middle" fill="#94A3B8" fontSize="7">{m}</text>
            ))}
          </svg>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="text-sm font-bold text-slate-900 mb-1">Channel Mix</div>
          <div className="text-xs text-slate-400 mb-3">% of total revenue</div>
          <div className="w-full h-32">
            {inView && <DonutChart segments={execDonut} centerLabel="Channel" centerSub="Mix" />}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="text-sm font-bold text-slate-900 mb-1">Retailer Revenue Comparison</div>
        <div className="text-xs text-slate-400 mb-4">$K · Current period</div>
        <BarRows rows={execBars} inView={inView} />
      </div>
    </motion.div>
  );
}

function ProductPerformance({ inView }: { inView: boolean }) {
  return (
    <motion.div
      key="prod"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {prodKpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} inView={inView} delay={i * 0.08} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-slate-900">Sales Velocity by SKU</div>
              <div className="text-xs text-slate-400">Units / store / week · 12 months</div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              {[{ label: 'SKU #4821', color: '#1851C6' }, { label: 'SKU #4822', color: '#0EA5E9' }, { label: 'SKU #4830', color: '#F59E0B' }].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full">
            <defs>
              <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1851C6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1851C6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={pathFromValues(velocityData.sku4821, 1.0, 6.5, true)} fill="url(#velGrad)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} />
            {[
              { data: velocityData.sku4821, color: '#1851C6', width: 2,   delay: 0.2 },
              { data: velocityData.sku4822, color: '#0EA5E9', width: 1.5, delay: 0.35 },
              { data: velocityData.sku4830, color: '#F59E0B', width: 1.5, delay: 0.5 },
            ].map(({ data, color, width, delay }, idx) => (
              <motion.path key={idx} d={pathFromValues(data, 1.0, 6.5)} stroke={color} strokeWidth={width} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.0, delay, ease: 'easeInOut' }} />
            ))}
            {months.map((m, i) => (
              <text key={m} x={toX(i)} y={chartH + 16} textAnchor="middle" fill="#94A3B8" fontSize="7">{m}</text>
            ))}
          </svg>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="text-sm font-bold text-slate-900 mb-1">Category Mix</div>
          <div className="text-xs text-slate-400 mb-3">% of total units</div>
          <div className="w-full h-32">
            <DonutChart segments={prodDonut} centerLabel="Product" centerSub="Mix" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="text-sm font-bold text-slate-900 mb-1">Top Products by Revenue</div>
        <div className="text-xs text-slate-400 mb-4">$K · Current period</div>
        <BarRows rows={prodBars} inView={inView} />
      </div>
    </motion.div>
  );
}

function RetailerAnalysis({ inView }: { inView: boolean }) {
  return (
    <motion.div
      key="retail"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {retailKpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} inView={inView} delay={i * 0.08} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-slate-900">Fill Rate Trend by Retailer</div>
              <div className="text-xs text-slate-400">% · 12 months</div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              {[{ label: 'Walmart', color: '#1851C6' }, { label: 'Target', color: '#0EA5E9' }, { label: 'Amazon', color: '#F59E0B' }].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full">
            <defs>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1851C6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1851C6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={pathFromValues(fillRateTrend.walmart, 88, 100, true)} fill="url(#fillGrad)"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} />
            {[
              { data: fillRateTrend.walmart, color: '#1851C6', width: 2,   delay: 0.2 },
              { data: fillRateTrend.target,  color: '#0EA5E9', width: 1.5, delay: 0.35 },
              { data: fillRateTrend.amazon,  color: '#F59E0B', width: 1.5, delay: 0.5 },
            ].map(({ data, color, width, delay }, idx) => (
              <motion.path key={idx} d={pathFromValues(data, 88, 100)} stroke={color} strokeWidth={width} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.0, delay, ease: 'easeInOut' }} />
            ))}
            {months.map((m, i) => (
              <text key={m} x={toX(i)} y={chartH + 16} textAnchor="middle" fill="#94A3B8" fontSize="7">{m}</text>
            ))}
          </svg>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
          <div className="text-sm font-bold text-slate-900 mb-1">Revenue Share</div>
          <div className="text-xs text-slate-400 mb-3">% by retailer</div>
          <div className="w-full h-32">
            <DonutChart segments={retailDonut} centerLabel="Retailer" centerSub="Split" />
          </div>
        </div>
      </div>
      {/* Scorecard table */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="text-sm font-bold text-slate-900 mb-1">Retailer Performance Scorecard</div>
        <div className="text-xs text-slate-400 mb-3">Fill Rate · On-Time Delivery · EDI Compliance</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100">
                <th className="text-left pb-2 pr-4">Retailer</th>
                <th className="text-center pb-2 px-3">Fill Rate</th>
                <th className="text-center pb-2 px-3">On-Time</th>
                <th className="text-center pb-2 px-3">Compliance</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.map((row, i) => (
                <motion.tr
                  key={row.name}
                  className="border-b border-slate-50"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                >
                  <td className="py-2 pr-4 font-semibold text-slate-700">{row.name}</td>
                  {[row.fill, row.onTime, row.comp].map((v, j) => (
                    <td key={j} className="text-center py-2 px-3">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-white font-bold text-[10px]"
                        style={{ background: scoreColor(v) }}
                      >
                        {v}%
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ========== Main component ==========
const views = ['Executive Overview', 'Product Performance', 'Retailer Analysis'] as const;
type View = typeof views[number];

const viewSubtitles: Record<View, string> = {
  'Executive Overview':  'All retailers · Last 12 months · Updated 2h ago',
  'Product Performance': 'All SKUs · Last 12 months · Updated 2h ago',
  'Retailer Analysis':   'All retailers · Last 12 months · Updated 2h ago',
};

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
                { label: 'Overview',         active: activeView === 'Executive Overview' },
                { label: 'Sales Performance',active: activeView === 'Product Performance' },
                { label: 'Inventory' },
                { label: 'Retailer Detail',  active: activeView === 'Retailer Analysis' },
                { label: 'Item Analysis' },
                { label: 'Alerts',           badge: '3' },
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
                  <h3 className="text-base font-bold text-slate-900">{activeView}</h3>
                  <p className="text-xs text-slate-400">{viewSubtitles[activeView]}</p>
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

              {/* View content — switches on tab click */}
              <AnimatePresence mode="wait">
                {activeView === 'Executive Overview'  && <ExecutiveOverview  key="exec"   inView={inView} />}
                {activeView === 'Product Performance' && <ProductPerformance key="prod"   inView={inView} />}
                {activeView === 'Retailer Analysis'   && <RetailerAnalysis   key="retail" inView={inView} />}
              </AnimatePresence>
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
