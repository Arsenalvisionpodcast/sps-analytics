'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

const steps = [
  {
    number: '01',
    title: 'Collect',
    subtitle: 'Automated Ingestion',
    description:
      'SPS connects directly to 500+ retailer portals, EDI systems, SFTP feeds, and data lakes. No more manual downloads, no missed updates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    color: 'from-blue-600 to-blue-700',
    lightColor: 'bg-blue-50 border-blue-100 text-blue-700',
  },
  {
    number: '02',
    title: 'Cleanse',
    subtitle: 'Error Detection & Repair',
    description:
      'Deduplication, missing value resolution, encoding correction, and quality checks catch problems before they pollute your analysis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
      </svg>
    ),
    color: 'from-sky-500 to-sky-600',
    lightColor: 'bg-sky-50 border-sky-100 text-sky-700',
  },
  {
    number: '03',
    title: 'Validate',
    subtitle: 'Business Rules & QA',
    description:
      'Data is tested against business rules, historical patterns, and expected ranges. Anomalies are flagged, investigated, and resolved.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'from-teal-500 to-teal-600',
    lightColor: 'bg-teal-50 border-teal-100 text-teal-700',
  },
  {
    number: '04',
    title: 'Normalize',
    subtitle: 'Unified Schema',
    description:
      'Retailer-specific formats, units, date structures, and field names are harmonized into a consistent, queryable schema.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    color: 'from-indigo-500 to-indigo-600',
    lightColor: 'bg-indigo-50 border-indigo-100 text-indigo-700',
  },
  {
    number: '05',
    title: 'Correlate',
    subtitle: 'Internal Hierarchy Mapping',
    description:
      'Retailer item numbers, store codes, and product descriptions are mapped back to your UPCs, internal product IDs, and organizational hierarchy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    color: 'from-violet-500 to-violet-600',
    lightColor: 'bg-violet-50 border-violet-100 text-violet-700',
  },
  {
    number: '06',
    title: 'Deliver',
    subtitle: 'To Dashboards & Data Stacks',
    description:
      'Clean, trusted data lands in your SPS analytics dashboards or flows directly into Snowflake, Databricks, Azure, GCP, or any cloud data platform.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    color: 'from-blue-600 to-sky-500',
    lightColor: 'bg-blue-50 border-blue-100 text-blue-700',
  },
];

// Before/After data for the animated table
const beforeRows = [
  { cells: ['chips reg 6oz', '00432', '"48.0"', '01/05/2024'], bad: [0, 1, 2, 3] },
  { cells: ['CHIPS REG 6OZ', 'Store 432', '48', '1/5/24'], bad: [1, 3] },
  { cells: ['chips original 6oz', '432', 'forty-eight', 'January 5'], bad: [0, 2, 3] },
  { cells: ['Chips 6 oz Original', '#000432', '48.00', '2024-1-5'], bad: [0, 1, 3] },
];

const afterRows = [
  { cells: ['0012345678901', 'Chips Original 6oz', '000432', '48', '2024-01-05'] },
  { cells: ['0012345678901', 'Chips Original 6oz', '000432', '48', '2024-01-05'] },
  { cells: ['0012345678901', 'Chips Original 6oz', '000432', '48', '2024-01-05'] },
  { cells: ['0012345678901', 'Chips Original 6oz', '000432', '48', '2024-01-05'] },
];

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tableInView = useInView(tableRef, { once: true, margin: '-100px' });
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section id="pipeline" className="py-24 lg:py-32 bg-sps-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>The SPS Data Engine</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            From Chaos to Clarity
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Every retailer data point — collected, cleansed, validated, normalized, correlated, and delivered.
            Automatically. At scale.
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="relative mb-20">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Step badge + icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-2xl font-black text-slate-100">{step.number}</span>
                  </div>

                  <div className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wide mb-2.5 ${step.lightColor}`}>
                    {step.subtitle}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{step.description}</p>
                </div>

                {/* Arrow connector (between steps, desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[52px] -right-3 z-20 items-center">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                      <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Before / After Data Transformation */}
        <motion.div
          ref={tableRef}
          className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="border-b border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-0.5">Data Transformation in Action</h3>
              <p className="text-sm text-slate-500">Watch messy retailer data become clean, structured intelligence</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  !showAfter
                    ? 'bg-white text-red-600 shadow-sm border border-red-100'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Before SPS
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  showAfter
                    ? 'bg-white text-green-600 shadow-sm border border-green-100'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                After SPS
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {!showAfter ? (
              <motion.table
                className="w-full text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <thead>
                  <tr className="bg-red-50 border-b border-red-100">
                    {['Product Description', 'Store ID', 'Units', 'Date'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {beforeRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      {row.cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-5 py-3.5 font-mono text-xs ${
                            row.bad.includes(ci)
                              ? 'text-red-500 bg-red-50/50'
                              : 'text-slate-700'
                          }`}
                        >
                          {row.bad.includes(ci) && (
                            <span className="inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                              {cell}
                            </span>
                          )}
                          {!row.bad.includes(ci) && cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            ) : (
              <motion.table
                className="w-full text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <thead>
                  <tr className="bg-green-50 border-b border-green-100">
                    {['UPC', 'Description', 'Store ID', 'Units', 'Date'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {afterRows.map((row, ri) => (
                    <motion.tr
                      key={ri}
                      className="border-b border-slate-100 last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ri * 0.07, duration: 0.4 }}
                    >
                      {row.cells.map((cell, ci) => (
                        <td key={ci} className="px-5 py-3.5 font-mono text-xs text-slate-700 bg-green-50/30">
                          <span className="inline-flex items-center gap-1">
                            {ci === 0 && <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />}
                            {cell}
                          </span>
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            {!showAfter ? (
              <p className="text-xs text-red-500 font-medium">
                4 rows × 4 columns — every cell has inconsistency issues. This is what manually-collected retailer data looks like.
              </p>
            ) : (
              <p className="text-xs text-green-600 font-medium">
                Same 4 rows — now standardized, mapped to UPC, and ready for dashboards or your data warehouse. SPS does this automatically.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
