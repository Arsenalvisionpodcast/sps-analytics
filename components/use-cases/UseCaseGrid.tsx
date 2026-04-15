'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useCases, personas, problems, PersonaId, getPersona } from './data';

interface UseCaseGridProps {
  onSelectUseCase: (id: number) => void;
}

export default function UseCaseGrid({ onSelectUseCase }: UseCaseGridProps) {
  const [activePersona, setActivePersona] = useState<PersonaId | null>(null);

  // Sort so persona-relevant ones float to the top when filter is active
  const orderedUseCases = useMemo(() => {
    if (!activePersona) return useCases;
    const match = useCases.filter((uc) => uc.personas.includes(activePersona));
    const rest = useCases.filter((uc) => !uc.personas.includes(activePersona));
    return [...match, ...rest];
  }, [activePersona]);

  return (
    <div>
      {/* Team filter bar */}
      <div className="mb-10">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            View by team
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActivePersona(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activePersona === null
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            All teams
          </button>
          {personas.map((persona) => {
            const isActive = activePersona === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? 'text-white shadow-md border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
                style={
                  isActive
                    ? { backgroundColor: persona.color, borderColor: persona.color }
                    : undefined
                }
              >
                {persona.label}
              </button>
            );
          })}
        </div>
        {activePersona && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-sm text-slate-500"
          >
            Showing use cases most relevant to{' '}
            <span className="font-semibold text-slate-700">
              {getPersona(activePersona).label}
            </span>
            .
          </motion.div>
        )}
      </div>

      {/* Use case card grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" layout>
        <AnimatePresence>
          {orderedUseCases.map((uc, idx) => {
            const isRelevant = !activePersona || uc.personas.includes(activePersona);
            return (
              <motion.button
                key={uc.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: isRelevant ? 1 : 0.45,
                  y: 0,
                }}
                transition={{ duration: 0.4, delay: idx * 0.03, layout: { duration: 0.4 } }}
                onClick={() => onSelectUseCase(uc.id)}
                className="group text-left bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-card-hover transition-all duration-300"
              >
                {/* Number */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg transition-colors ${
                      isRelevant
                        ? 'bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {uc.id}
                  </div>
                  <div className="flex items-center gap-1">
                    {uc.problems.map((pid) => {
                      const p = problems[pid];
                      const colorMap: Record<string, string> = {
                        p2: 'bg-blue-50 text-blue-700 border-blue-100',
                        p3: 'bg-pink-50 text-pink-700 border-pink-100',
                      };
                      return (
                        <span
                          key={pid}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${colorMap[pid]}`}
                          title={p.title}
                        >
                          P{p.number}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {uc.title}
                </h3>

                {/* Short pain */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {uc.pain}
                </p>

                {/* Personas */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {uc.personas.map((pid) => {
                    const persona = getPersona(pid);
                    return (
                      <span
                        key={pid}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: persona.color }}
                        />
                        {persona.short}
                      </span>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                  Explore use case
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
