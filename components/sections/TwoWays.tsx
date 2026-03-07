'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

const analyticsFeatures = [
  { text: 'Executive & category dashboards, prebuilt and ready on day one' },
  { text: 'Customizable reports by brand, retailer, region, or channel' },
  { text: 'UPC-level and door-level performance visibility' },
  { text: 'Out-of-stock alerts, velocity trends, and inventory risk signals' },
  { text: 'Role-based views for sales, planning, marketing, and leadership' },
  { text: 'Fast time-to-value — no data engineering required from your team' },
];

const integrationFeatures = [
  { text: 'Clean, normalized data delivered to Snowflake, Databricks, Azure, or GCP' },
  { text: 'Compatible with your existing BI tools — Tableau, Power BI, Looker, and more' },
  { text: 'Supports AI, ML, and forecasting models with trusted retail input data' },
  { text: 'No rip-and-replace of your current data stack' },
  { text: 'Consistent schema across all retailer sources — no custom ETL needed' },
  { text: 'Item-level and location-level granularity available in your environment' },
];

const cloudPlatforms = [
  { name: 'Snowflake', color: '#29B5E8', letter: 'S' },
  { name: 'Databricks', color: '#FF3621', letter: 'D' },
  { name: 'Azure', color: '#0078D4', letter: 'Az' },
  { name: 'GCP', color: '#4285F4', letter: 'G' },
  { name: 'BigQuery', color: '#669DF6', letter: 'BQ' },
  { name: 'Redshift', color: '#8C4FFF', letter: 'RS' },
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function TwoWays() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="two-ways" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Two Powerful Motions</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            One Platform, Two Ways to Win
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Use SPS as your complete analytics solution, as data infrastructure for your own stack,
            or both. No constraints. No compromise.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Card A: Analytics Platform */}
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-blue-100"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-[#0F3785]" />
            <div className="absolute inset-0 dot-pattern opacity-30" />

            <div className="relative p-8 lg:p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                <span className="text-xs font-bold text-sky-200 uppercase tracking-widest">
                  Motion A
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
                SPS Analytics Platform
              </h3>
              <p className="text-blue-200 text-base leading-relaxed mb-8">
                A fully managed analytics experience — from data collection to dashboard. Your team
                gets insights on day one, without building a data pipeline.
              </p>

              {/* Mock dashboard preview */}
              <div className="rounded-2xl bg-white/10 border border-white/20 p-4 mb-8">
                {/* Mini dashboard */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Total Units', value: '847K', trend: '+8.7%', up: true },
                    { label: 'Fill Rate', value: '96.4%', trend: '+1.2pp', up: true },
                    { label: 'Out-of-Stock', value: '3.2%', trend: '-0.8pp', up: false },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white/10 rounded-xl p-2.5">
                      <div className="text-[9px] text-blue-200 font-medium mb-0.5">{kpi.label}</div>
                      <div className="text-white font-bold text-sm">{kpi.value}</div>
                      <div className={`text-[9px] font-semibold ${kpi.up ? 'text-green-300' : 'text-red-300'}`}>
                        {kpi.trend}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-12 bg-white/5 rounded-lg px-2 py-2">
                  {[65, 82, 74, 90, 85, 95, 88, 100, 92, 87, 96, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-sky-400 to-blue-300 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] text-blue-300 mt-1.5 text-center">Sales trend — 12 months across all channels</div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {analyticsFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-sky-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-blue-100 leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
                >
                  Explore Analytics Platform
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card B: Data Integration */}
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-slate-100"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="relative p-8 lg:p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">
                  Motion B
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
                SPS Data Integration
              </h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Clean, normalized, correlated retail data delivered directly into your data environment.
                Power your own BI, AI, and planning tools with trusted retail fuel.
              </p>

              {/* Cloud platform grid */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-8">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                  Supported Destinations
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {cloudPlatforms.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-xl bg-white/8 border border-white/10 px-3 py-2.5 flex items-center gap-2 hover:bg-white/12 transition-colors"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                        style={{ background: p.color }}
                      >
                        {p.letter}
                      </div>
                      <span className="text-white text-[11px] font-medium truncate">{p.name}</span>
                    </div>
                  ))}
                </div>
                {/* Flow diagram */}
                <div className="mt-4 flex items-center gap-1 justify-center text-xs text-slate-500">
                  <div className="px-2 py-1 rounded bg-white/8 text-slate-400 font-medium text-[10px]">SPS</div>
                  <div className="flex gap-0.5 text-slate-600">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1 h-px bg-slate-600 mt-0.5" />
                    ))}
                    <svg className="w-3 h-3 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/8 text-slate-400 font-medium text-[10px]">Your Stack</div>
                </div>
                <div className="text-center text-[9px] text-slate-600 mt-1">Clean data in, insights out</div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {integrationFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-900/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-bold rounded-xl text-sm hover:bg-teal-600 transition-colors shadow-md"
                >
                  Explore Data Integration
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            Many customers use{' '}
            <span className="font-semibold text-slate-700">both</span> — dashboards for business teams,
            data integration for analysts and data engineers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
