'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';

const aiCapabilities = [
  {
    title: 'Demand Forecasting',
    description: 'ML models require consistent, granular, historicized sales signals. SPS provides exactly that — clean, item-level, store-level data at scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    delay: 0,
  },
  {
    title: 'Replenishment Automation',
    description: 'Automated reorder triggers and inventory signals depend on trustworthy POS and inventory data. Garbage in, garbage out — SPS ensures the input is clean.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    delay: 0.08,
  },
  {
    title: 'AI Copilots & Assistants',
    description: 'LLM-powered retail copilots that answer "why are sales down at Kroger?" require structured, correlated data — not a mess of mismatched formats.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    delay: 0.16,
  },
  {
    title: 'Anomaly Detection',
    description: 'AI that flags unexpected velocity shifts, pricing anomalies, or distribution losses needs a clean baseline to compare against. SPS builds that baseline.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    delay: 0.24,
  },
];

const dataQualityLayers = [
  { label: 'Raw Retailer Data', desc: 'Inconsistent, messy, fragmented', bad: true },
  { label: 'SPS Collected', desc: 'Ingested from thousands of retailers & distributors', bad: false },
  { label: 'SPS Cleansed', desc: 'Errors removed, values standardized', bad: false },
  { label: 'SPS Normalized', desc: 'Unified schema across all retailers', bad: false },
  { label: 'SPS Correlated', desc: 'Mapped to your internal hierarchy', bad: false },
  { label: 'AI-Ready Foundation', desc: 'Trusted, structured, historicized', bad: false },
];

export default function AIReadiness() {
  const ref = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const stackInView = useInView(stackRef, { once: true, margin: '-80px' });

  return (
    <section id="ai-readiness" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <SectionLabel>AI Strategy</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Your AI Strategy Starts With Clean Data
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-6">
              Every AI model, every copilot, every automated signal is only as good as the data
              underneath it. Fragmented, inconsistent, uncorrelated retail data doesn&apos;t just
              limit your analytics — it actively undermines your AI roadmap.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              SPS creates the clean, structured, historicized retail data foundation that modern
              AI and ML workflows depend on. Not someday — starting with your first data delivery.
            </p>

            {/* Quote callout */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <div className="text-blue-700 font-semibold text-base leading-snug mb-2">
                &ldquo;AI is only as intelligent as the data you feed it. Most retail AI failures are
                data quality problems disguised as model problems.&rdquo;
              </div>
              <div className="text-blue-500 text-xs font-medium">— Common insight from enterprise data teams</div>
            </div>
          </motion.div>

          {/* Right: data quality stack visualization */}
          <motion.div
            ref={stackRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="space-y-2">
              {dataQualityLayers.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  className={`rounded-xl p-4 border flex items-center gap-4 ${
                    layer.bad
                      ? 'bg-red-50 border-red-100'
                      : i === dataQualityLayers.length - 1
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 border-blue-500'
                      : 'bg-white border-slate-100 shadow-card'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={stackInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  {/* Step indicator */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black ${
                      layer.bad
                        ? 'bg-red-200 text-red-600'
                        : i === dataQualityLayers.length - 1
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {layer.bad ? (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className={`w-4 h-4 ${i === dataQualityLayers.length - 1 ? 'text-white' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-bold text-sm ${
                        layer.bad
                          ? 'text-red-700'
                          : i === dataQualityLayers.length - 1
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    >
                      {layer.label}
                    </div>
                    <div
                      className={`text-xs ${
                        layer.bad
                          ? 'text-red-500'
                          : i === dataQualityLayers.length - 1
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}
                    >
                      {layer.desc}
                    </div>
                  </div>

                  {/* SPS badge */}
                  {!layer.bad && i < dataQualityLayers.length - 1 && i > 0 && (
                    <span className="text-[9px] font-bold text-blue-400 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-md flex-shrink-0">
                      SPS
                    </span>
                  )}

                  {i === dataQualityLayers.length - 1 && (
                    <span className="text-[9px] font-black text-white bg-white/20 px-2 py-1 rounded-lg flex-shrink-0">
                      AI READY
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI capabilities grid */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
            AI use cases enabled by SPS clean data
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-sps-surface rounded-2xl p-5 border border-slate-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + cap.delay, duration: 0.5 }}
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${cap.color}`}>
                  {cap.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{cap.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
