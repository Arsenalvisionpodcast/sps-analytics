'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useCases, problems, getPersona } from './data';
import MiniViz from './MiniViz';

interface UseCaseDetailProps {
  useCaseId: number | null;
  onClose: () => void;
}

export default function UseCaseDetail({ useCaseId, onClose }: UseCaseDetailProps) {
  const uc = useCases.find((u) => u.id === useCaseId);

  // Close on escape key
  useEffect(() => {
    if (!useCaseId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [useCaseId, onClose]);

  return (
    <AnimatePresence>
      {uc && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 w-full md:w-[620px] bg-white z-50 shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Sticky header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 lg:px-8 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-base">
                  {uc.id}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Use Case
                  </div>
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[400px]">
                    {uc.short}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 lg:px-8 py-8">
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                {uc.title}
              </h2>

              {/* Problem chips */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs font-semibold text-slate-500">Solves:</span>
                {uc.problems.map((pid) => {
                  const p = problems[pid];
                  const colorMap: Record<string, string> = {
                    p2: 'bg-blue-50 text-blue-700 border-blue-100',
                    p3: 'bg-pink-50 text-pink-700 border-pink-100',
                  };
                  return (
                    <span
                      key={pid}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${colorMap[pid]}`}
                    >
                      Problem {p.number}: {p.title.split(',')[0]}
                    </span>
                  );
                })}
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md">
                  Built on Problem 1: The POS Data Foundation
                </span>
              </div>

              {/* Pain */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    The Pain Today
                  </h3>
                </div>
                <p className="text-base text-slate-600 leading-relaxed">{uc.pain}</p>
              </section>

              {/* SPS Move */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    What SPS Unlocks
                  </h3>
                </div>
                <p className="text-base text-slate-600 leading-relaxed">{uc.spsMove}</p>
              </section>

              {/* Mini visualization */}
              <section className="mb-8">
                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100 p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Sample view
                  </div>
                  <MiniViz type={uc.visualType} />
                </div>
              </section>

              {/* Outcome — the big callout */}
              <section className="mb-8">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
                    Outcome
                  </div>
                  <p className="text-lg font-bold leading-snug">{uc.outcome}</p>
                </div>
              </section>

              {/* Personas */}
              <section className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Who This Helps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {uc.personas.map((pid) => {
                    const persona = getPersona(pid);
                    return (
                      <div
                        key={pid}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: persona.color }}
                        />
                        <span className="text-sm font-semibold text-slate-700">
                          {persona.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Inline CTA */}
              <section className="border-t border-slate-100 pt-6">
                <a
                  href="mailto:ebsmith@spscommerce.com?subject=SPS%20Analytics%20-%20Use%20Case%20Discussion"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/30"
                >
                  Talk to us about this use case
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
