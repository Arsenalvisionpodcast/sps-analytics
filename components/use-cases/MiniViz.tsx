'use client';

import { motion } from 'framer-motion';

type VizType = 'bars' | 'line' | 'heatmap' | 'scatter' | 'matrix' | 'area' | 'quadrant';

interface MiniVizProps {
  type: VizType;
}

export default function MiniViz({ type }: MiniVizProps) {
  switch (type) {
    case 'bars':
      return <BarsViz />;
    case 'line':
      return <LineViz />;
    case 'heatmap':
      return <HeatmapViz />;
    case 'scatter':
      return <ScatterViz />;
    case 'matrix':
      return <MatrixViz />;
    case 'area':
      return <AreaViz />;
    case 'quadrant':
      return <QuadrantViz />;
    default:
      return <BarsViz />;
  }
}

// Horizontal bars — ranked missed revenue by trading partner
function BarsViz() {
  const data = [
    { label: 'Partner A', value: 92, dollars: '$4.2M' },
    { label: 'Partner B', value: 76, dollars: '$3.4M' },
    { label: 'Partner C', value: 58, dollars: '$2.6M' },
    { label: 'Partner D', value: 41, dollars: '$1.8M' },
    { label: 'Partner E', value: 28, dollars: '$1.2M' },
  ];
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Missed revenue opportunity — ranked by trading partner
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-20 text-[11px] font-medium text-slate-600 flex-shrink-0">
              {d.label}
            </div>
            <div className="flex-1 h-5 bg-slate-100 rounded-md overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: `${d.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
              />
            </div>
            <div className="w-12 text-[11px] font-bold text-slate-900 text-right">
              {d.dollars}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Line chart — forecast accuracy improving
function LineViz() {
  const shipment = [65, 68, 62, 71, 60, 75, 63, 78, 66];
  const pos = [72, 74, 73, 76, 78, 81, 80, 84, 88];
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Forecast accuracy: shipments only vs. POS-fed
      </div>
      <svg viewBox="0 0 320 140" className="w-full h-auto">
        {/* Grid */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={30 + i * 30}
            x2="320"
            y2={30 + i * 30}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        ))}
        {/* Shipment line (gray) */}
        <motion.path
          d={makePath(shipment, 320, 130)}
          stroke="#94A3B8"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        {/* POS line (blue) */}
        <motion.path
          d={makePath(pos, 320, 130)}
          stroke="#2563EB"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        {/* Dots on POS line */}
        {pos.map((v, i) => (
          <circle
            key={i}
            cx={(i * 320) / (pos.length - 1)}
            cy={130 - (v / 100) * 120}
            r="3"
            fill="#2563EB"
          />
        ))}
      </svg>
      <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-slate-400" style={{ borderTop: '1px dashed' }} />
          <span>Shipments only</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-blue-600" />
          <span className="font-semibold">With SPS POS feed</span>
        </div>
      </div>
    </div>
  );
}

function makePath(values: number[], w: number, h: number): string {
  const max = 100;
  const min = 0;
  const range = max - min;
  return values
    .map((v, i) => {
      const x = (i * w) / (values.length - 1);
      const y = h - ((v - min) / range) * (h - 10);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

// Heatmap — OOS frequency by store cluster
function HeatmapViz() {
  const data = Array.from({ length: 7 }, () =>
    Array.from({ length: 12 }, () => Math.random())
  );
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Out-of-stock incidents — last 12 weeks × store clusters
      </div>
      <div className="grid grid-cols-12 gap-0.5">
        {data.flat().map((v, i) => {
          const intensity = v;
          const color =
            intensity > 0.75
              ? '#DC2626'
              : intensity > 0.5
              ? '#F59E0B'
              : intensity > 0.25
              ? '#FCD34D'
              : '#DCFCE7';
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-sm"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: (i % 12) * 0.02 }}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500">
        <span>Low</span>
        <div className="flex gap-0.5">
          {['#DCFCE7', '#FCD34D', '#F59E0B', '#DC2626'].map((c) => (
            <div key={c} className="w-4 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}

// Scatter — price elasticity
function ScatterViz() {
  const points = [
    { x: 15, y: 82, label: 'SKU 104' },
    { x: 28, y: 74, label: '' },
    { x: 35, y: 90, label: '' },
    { x: 42, y: 55, label: '' },
    { x: 55, y: 68, label: '' },
    { x: 62, y: 40, label: '' },
    { x: 70, y: 48, label: '' },
    { x: 78, y: 30, label: '' },
    { x: 85, y: 38, label: '' },
    { x: 88, y: 22, label: 'SKU 817' },
  ];
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Price elasticity by SKU — price change vs. volume impact
      </div>
      <svg viewBox="0 0 320 160" className="w-full h-auto">
        {/* Axes */}
        <line x1="30" y1="140" x2="310" y2="140" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="30" y1="10" x2="30" y2="140" stroke="#CBD5E1" strokeWidth="1" />
        {/* Trend line */}
        <line
          x1="30"
          y1="20"
          x2="310"
          y2="130"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        {/* Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={30 + (p.x / 100) * 280}
            cy={140 - (p.y / 100) * 130}
            r="5"
            fill="#2563EB"
            opacity="0.75"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          />
        ))}
        <text x="170" y="158" fontSize="9" fill="#64748B" textAnchor="middle">
          Price change →
        </text>
        <text
          x="10"
          y="75"
          fontSize="9"
          fill="#64748B"
          textAnchor="middle"
          transform="rotate(-90 10 75)"
        >
          Volume impact →
        </text>
      </svg>
    </div>
  );
}

// Matrix — your SKUs × trading partners distribution + sell-through
// Cells colored by sell-through performance; empty cells = whitespace (distribution gap)
function MatrixViz() {
  const partners = ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E'];
  const skus = ['SKU 101', 'SKU 102', 'SKU 103', 'SKU 104', 'SKU 105', 'SKU 106'];
  // value: -1 = whitespace (not distributed), 0..1 = sell-through performance
  const grid: number[][] = [
    [0.85, 0.72, 0.6, -1, -1],
    [0.78, 0.55, -1, 0.62, -1],
    [0.45, 0.5, 0.4, 0.35, -1],
    [0.9, 0.82, 0.75, 0.7, 0.62],
    [-1, 0.4, -1, -1, -1],
    [0.6, -1, 0.45, -1, -1],
  ];

  const cellColor = (v: number) => {
    if (v < 0) return 'transparent';
    if (v >= 0.75) return '#059669';
    if (v >= 0.5) return '#10B981';
    if (v >= 0.3) return '#FBBF24';
    return '#F87171';
  };

  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Your distribution & sell-through — by SKU × trading partner
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-[9px] font-semibold text-slate-400 text-left pr-2 pb-2"></th>
              {partners.map((p) => (
                <th
                  key={p}
                  className="text-[9px] font-semibold text-slate-500 px-1 pb-2 text-center"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, rowIdx) => (
              <tr key={sku}>
                <td className="text-[10px] font-medium text-slate-600 pr-2 py-0.5 whitespace-nowrap">
                  {sku}
                </td>
                {partners.map((_, colIdx) => {
                  const v = grid[rowIdx][colIdx];
                  const isWhitespace = v < 0;
                  return (
                    <td key={colIdx} className="px-0.5 py-0.5">
                      <motion.div
                        className={`w-full h-6 rounded-sm flex items-center justify-center text-[8px] font-bold ${
                          isWhitespace
                            ? 'border border-dashed border-slate-300 text-slate-400'
                            : 'text-white'
                        }`}
                        style={{
                          backgroundColor: cellColor(v),
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (rowIdx * 5 + colIdx) * 0.02 }}
                      >
                        {isWhitespace ? '—' : ''}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-600" />
          <span>Strong sell-through</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-amber-400" />
          <span>Mid</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span>Weak</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-dashed border-slate-300" />
          <span className="font-semibold text-slate-700">Whitespace (gap)</span>
        </div>
      </div>
    </div>
  );
}

// Area — promo lift
function AreaViz() {
  // Week indices and baseline vs with-promo
  const baseline = [40, 42, 44, 43, 45, 46, 45, 47];
  const actual = [41, 42, 44, 68, 72, 70, 46, 45]; // promo in weeks 3-5
  const w = 320;
  const h = 130;
  const baselinePath = makePath(baseline.map((v) => v * 1.1), w, h);
  const actualPath = makePath(actual.map((v) => v * 1.1), w, h);
  // Fill between the two — approximate as polygon
  const lift = actual.map((v, i) => ({
    x: (i * w) / (actual.length - 1),
    top: h - ((actual[i] * 1.1) / 100) * (h - 10),
    bot: h - ((baseline[i] * 1.1) / 100) * (h - 10),
  }));
  const liftPath =
    'M ' +
    lift.map((p) => `${p.x.toFixed(1)} ${p.top.toFixed(1)}`).join(' L ') +
    ' L ' +
    [...lift].reverse().map((p) => `${p.x.toFixed(1)} ${p.bot.toFixed(1)}`).join(' L ') +
    ' Z';
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        Promotional lift vs. baseline — incremental units
      </div>
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full h-auto">
        {/* Grid */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={20 + i * 30}
            x2={w}
            y2={20 + i * 30}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        ))}
        {/* Lift area */}
        <motion.path
          d={liftPath}
          fill="#2563EB"
          fillOpacity="0.25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {/* Baseline (dashed) */}
        <motion.path
          d={baselinePath}
          stroke="#94A3B8"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Actual */}
        <motion.path
          d={actualPath}
          stroke="#2563EB"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        {/* Promo indicator */}
        <rect
          x={(3 * w) / 7}
          y={8}
          width={(2 * w) / 7}
          height={12}
          fill="#DBEAFE"
          rx={2}
        />
        <text
          x={(3 * w) / 7 + (w / 7)}
          y={17}
          fontSize="9"
          fontWeight="700"
          fill="#1D4ED8"
          textAnchor="middle"
        >
          PROMO WINDOW
        </text>
      </svg>
      <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-slate-400" />
          <span>Baseline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-blue-600" />
          <span>Actual sales</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-600/25 rounded-sm" />
          <span className="font-semibold text-blue-700">Incremental lift</span>
        </div>
      </div>
    </div>
  );
}

// Quadrant — SKU rationalization
function QuadrantViz() {
  const points = [
    { x: 80, y: 85, size: 18, color: '#059669', label: 'Invest' },
    { x: 70, y: 70, size: 14, color: '#059669' },
    { x: 85, y: 78, size: 12, color: '#059669' },
    { x: 60, y: 65, size: 10, color: '#059669' },
    { x: 25, y: 80, size: 14, color: '#2563EB', label: 'Fix distribution' },
    { x: 30, y: 72, size: 11, color: '#2563EB' },
    { x: 70, y: 28, size: 13, color: '#F59E0B', label: 'Review' },
    { x: 78, y: 22, size: 9, color: '#F59E0B' },
    { x: 25, y: 22, size: 12, color: '#DC2626', label: 'Cut' },
    { x: 20, y: 18, size: 10, color: '#DC2626' },
    { x: 30, y: 28, size: 8, color: '#DC2626' },
  ];
  return (
    <div>
      <div className="text-xs font-semibold text-slate-700 mb-3">
        SKU performance quadrant — velocity vs. distribution
      </div>
      <div className="relative aspect-[2/1] bg-white rounded-lg border border-slate-100 overflow-hidden">
        {/* Quadrant lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200" />
        </div>
        {/* Quadrant labels */}
        <div className="absolute top-1 right-2 text-[9px] font-bold text-emerald-700">
          INVEST
        </div>
        <div className="absolute top-1 left-2 text-[9px] font-bold text-blue-700">
          DISTRIBUTION GAP
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] font-bold text-amber-700">
          REVIEW
        </div>
        <div className="absolute bottom-1 left-2 text-[9px] font-bold text-red-700">
          CUT
        </div>
        {/* Points */}
        {points.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${100 - p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: 0.6,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-[9px] text-slate-500">
        <span>Distribution →</span>
        <span>Velocity ↑</span>
      </div>
    </div>
  );
}
