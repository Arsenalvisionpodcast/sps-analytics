'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Constellation from './Constellation';
import UseCaseGrid from './UseCaseGrid';
import UseCaseDetail from './UseCaseDetail';
import SectionLabel from '../ui/SectionLabel';
import { useCases, problems, getPersona } from './data';

export default function UseCasesExplorer() {
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);

  const constellationRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const constellationInView = useInView(constellationRef, { once: true, margin: '-80px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* ═══ Constellation Section ═══ */}
      <section className="py-20 lg:py-28 bg-white" ref={constellationRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={constellationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>The Constellation</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              How it all connects
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Every use case stands on the same foundation: clean, analytics-ready data. Hover
              over a problem to trace which use cases it drives. Click on a use case to dive deeper.
            </p>
          </motion.div>

          {/* Desktop constellation */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 30 }}
            animate={constellationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Constellation
              onSelectUseCase={setSelectedUseCase}
              selectedUseCase={selectedUseCase}
            />
          </motion.div>

          {/* Mobile fallback */}
          <div className="md:hidden">
            <MobileConstellationFallback onSelectUseCase={setSelectedUseCase} />
          </div>
        </div>
      </section>

      {/* ═══ Persona-filtered grid section ═══ */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Explore by Team</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Which problems are yours?
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Different teams feel different edges of the same data problem. Filter to see the
              use cases that matter most to yours. Click any use case to dive deeper.
            </p>
          </motion.div>

          <UseCaseGrid onSelectUseCase={setSelectedUseCase} />
        </div>
      </section>

      {/* Detail panel (overlay) */}
      <UseCaseDetail
        useCaseId={selectedUseCase}
        onClose={() => setSelectedUseCase(null)}
      />
    </>
  );
}

// ───────────────────────────────────────────────────────────────
// Mobile fallback — simpler stacked layout that preserves the narrative
// ───────────────────────────────────────────────────────────────

function MobileConstellationFallback({
  onSelectUseCase,
}: {
  onSelectUseCase: (id: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* P2 & P3 header cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-center">
          <div className="text-[10px] font-bold tracking-widest text-blue-700 mb-1">
            PROBLEM 2
          </div>
          <div className="text-sm font-bold text-slate-900 leading-tight">
            Reactive Internal Planning
          </div>
        </div>
        <div className="rounded-xl bg-pink-50 border border-pink-100 p-3 text-center">
          <div className="text-[10px] font-bold tracking-widest text-pink-700 mb-1">
            PROBLEM 3
          </div>
          <div className="text-sm font-bold text-slate-900 leading-tight">
            Subpar Partner Collaboration
          </div>
        </div>
      </div>

      {/* 9 use cases as compact tappable list */}
      <div className="grid grid-cols-1 gap-2">
        {useCases.map((uc) => (
          <button
            key={uc.id}
            onClick={() => onSelectUseCase(uc.id)}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-blue-400 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-sm flex-shrink-0">
              {uc.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {uc.short}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {uc.problems.map((pid) => {
                  const p = problems[pid];
                  const colorMap: Record<string, string> = {
                    p2: 'bg-blue-100 text-blue-700',
                    p3: 'bg-pink-100 text-pink-700',
                  };
                  return (
                    <span
                      key={pid}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${colorMap[pid]}`}
                    >
                      P{p.number}
                    </span>
                  );
                })}
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* P1 foundation card */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-300 p-4">
        <div className="text-[10px] font-bold tracking-widest text-amber-800 mb-1">
          PROBLEM 1 · THE FOUNDATION
        </div>
        <div className="text-base font-extrabold text-slate-900 leading-tight mb-2">
          The POS Data Foundation
        </div>
        <div className="text-xs text-slate-700 italic">
          Without this, none of the nine above work. Every use case is built on clean,
          door-level POS data across every sales channel.
        </div>
      </div>
    </div>
  );
}
