'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5.25-4.5a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Dozens of Retailer Portals',
    description:
      'Your team logs into 20+ separate portals — Walmart Luminate, Target POL, Kroger Partner Portal — downloading files one by one, every week.',
    tag: 'Manual & Repetitive',
    tagColor: 'bg-red-50 text-red-600 border-red-100',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
    title: 'Emailed Spreadsheets',
    description:
      'Sales reps forward Excel files attached to emails. Version control is chaos. Which spreadsheet is current? Which numbers were from last Tuesday\'s pull?',
    tag: 'Version Chaos',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-100',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: 'Inconsistent Formats',
    description:
      'One retailer sends a CSV. Another sends a pipe-delimited TXT. A third emails a PDF report. Dates are MM/DD/YY here, YYYY-MM-DD there. Units are "each" or "EA" or "1".',
    tag: 'Format Fragmentation',
    tagColor: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: 'No Link to Internal Data',
    description:
      'Retailer data uses their item numbers, not yours. You spend days — or weeks — manually mapping "WMT SKU 004632" back to your UPC 0012345678901.',
    tag: 'Unmapped Hierarchies',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Data Arrives Late',
    description:
      'By the time you\'ve collected, cleaned, and loaded retailer data, the window for action has often passed. Out-of-stocks go undetected. Opportunities are missed.',
    tag: 'Delayed Insights',
    tagColor: 'bg-red-50 text-red-600 border-red-100',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Analysts Stuck in the Weeds',
    description:
      'Your best analytics people spend 60–70% of their time collecting and cleaning data. They were hired to find insights — not to manage spreadsheet pipelines.',
    tag: 'Misallocated Talent',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-100',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            The Reality of Retail Data Today
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Before SPS, retail data looks like this. Every one of these pain points is costing your organization time, money, and competitive edge.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={cardItem}
              className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-card-hover transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 mb-4 shadow-sm group-hover:border-slate-300 transition-colors">
                {point.icon}
              </div>

              {/* Tag */}
              <div className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-semibold mb-3 ${point.tagColor}`}>
                {point.tag}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{point.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          className="mt-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div>
            <p className="text-white font-bold text-xl mb-1">
              Sound familiar?
            </p>
            <p className="text-blue-100 text-base">
              You shouldn&apos;t have to run a data management operation just to use your own retail data.
            </p>
          </div>
          <a
            href="#pipeline"
            className="flex-shrink-0 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
          >
            See How SPS Solves This →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
