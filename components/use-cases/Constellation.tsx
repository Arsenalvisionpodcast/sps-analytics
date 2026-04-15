'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCases, problems, ProblemId } from './data';

interface ConstellationProps {
  onSelectUseCase: (id: number) => void;
  selectedUseCase: number | null;
}

// ───────────────────────────────────────────────────────────────
// Layout constants (SVG viewBox: 1200 × 780)
// ───────────────────────────────────────────────────────────────

const VB = { w: 1200, h: 780 };

const PROBLEM_CARD = { w: 340, h: 100 };
const USECASE_CARD = { w: 220, h: 86 };

// Problem node positions (center coords)
const problemPositions: Record<'p2' | 'p3', { cx: number; cy: number }> = {
  p2: { cx: 340, cy: 80 },
  p3: { cx: 860, cy: 80 },
};

// Use case grid (3 × 3)
const col = [220, 600, 980];
const row = [260, 400, 540];
const useCasePositions: Record<number, { cx: number; cy: number }> = {
  1: { cx: col[0], cy: row[0] },
  2: { cx: col[1], cy: row[0] },
  3: { cx: col[2], cy: row[0] },
  4: { cx: col[0], cy: row[1] },
  5: { cx: col[1], cy: row[1] },
  6: { cx: col[2], cy: row[1] },
  7: { cx: col[0], cy: row[2] },
  8: { cx: col[1], cy: row[2] },
  9: { cx: col[2], cy: row[2] },
};

// Foundation bar
const FOUNDATION = { x: 50, y: 650, w: 1100, h: 72 };

// ───────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────

function problemToUseCasePath(px: number, py: number, ux: number, uy: number): string {
  // Problem is above, use case is below. Start from bottom of problem, end at top of use case.
  const startY = py + PROBLEM_CARD.h / 2;
  const endY = uy - USECASE_CARD.h / 2;
  const midY = (startY + endY) / 2;
  return `M ${px} ${startY} C ${px} ${midY}, ${ux} ${midY}, ${ux} ${endY}`;
}

function useCaseToFoundationPath(ux: number, uy: number): string {
  const startY = uy + USECASE_CARD.h / 2;
  const endY = FOUNDATION.y;
  return `M ${ux} ${startY} L ${ux} ${endY}`;
}

// ───────────────────────────────────────────────────────────────

export default function Constellation({
  onSelectUseCase,
  selectedUseCase,
}: ConstellationProps) {
  const [hoveredProblem, setHoveredProblem] = useState<ProblemId | null>(null);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);

  // Determine if a given edge (problem → use case) should be highlighted
  const isEdgeActive = (problemId: 'p2' | 'p3', ucId: number) => {
    if (hoveredProblem === problemId) return true;
    if (hoveredProblem === 'p1') return true; // P1 hover lights all
    if (hoveredUseCase === ucId) {
      return useCases.find((u) => u.id === ucId)?.problems.includes(problemId) ?? false;
    }
    return false;
  };

  // Foundation edge (every use case → P1)
  const isFoundationEdgeActive = (ucId: number) => {
    if (hoveredProblem === 'p1') return true;
    if (hoveredUseCase === ucId) return true;
    return false;
  };

  // Is there any active highlight?
  const anyActive = hoveredProblem !== null || hoveredUseCase !== null;

  // Is a use case "active" (part of current highlight)?
  const isUseCaseActive = (ucId: number) => {
    if (hoveredUseCase === ucId) return true;
    if (hoveredProblem === 'p1') return true;
    // hoveredProblem is narrowed to 'p2' | 'p3' | null here
    if (hoveredProblem) {
      return useCases.find((u) => u.id === ucId)?.problems.includes(hoveredProblem) ?? false;
    }
    return false;
  };

  const isProblemActive = (pid: ProblemId) => {
    if (hoveredProblem === pid) return true;
    if (pid === 'p1' && hoveredUseCase !== null) return true; // every UC lights P1
    if (hoveredUseCase !== null && (pid === 'p2' || pid === 'p3')) {
      return useCases.find((u) => u.id === hoveredUseCase)?.problems.includes(pid) ?? false;
    }
    return false;
  };

  // Default edge opacity when nothing hovered
  const baseEdgeOpacity = 0.18;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* ══════════════════════════════════════════════════════ */}
        {/* CONNECTION LINES — problem → use case                */}
        {/* ══════════════════════════════════════════════════════ */}
        {useCases.map((uc) => {
          const upos = useCasePositions[uc.id];
          return (
            <g key={`edges-${uc.id}`}>
              {uc.problems.map((pid) => {
                if (pid === 'p1') return null; // P1 handled separately (foundation)
                const ppos = problemPositions[pid as 'p2' | 'p3'];
                const active = isEdgeActive(pid as 'p2' | 'p3', uc.id);
                const dimmed = anyActive && !active;
                return (
                  <g key={`edge-${uc.id}-${pid}`}>
                    {/* Base path */}
                    <path
                      d={problemToUseCasePath(ppos.cx, ppos.cy, upos.cx, upos.cy)}
                      stroke={pid === 'p2' ? '#60A5FA' : '#F472B6'}
                      strokeWidth={active ? 2 : 1.25}
                      fill="none"
                      opacity={active ? 0.85 : dimmed ? 0.04 : baseEdgeOpacity}
                      style={{ transition: 'opacity 0.25s, stroke-width 0.25s' }}
                    />
                    {/* Animated flow dashes when active */}
                    {active && (
                      <motion.path
                        d={problemToUseCasePath(ppos.cx, ppos.cy, upos.cx, upos.cy)}
                        stroke={pid === 'p2' ? '#93C5FD' : '#FBCFE8'}
                        strokeWidth={1.5}
                        fill="none"
                        strokeDasharray="6 10"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -32 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Root line: use case → foundation bar */}
              {(() => {
                const active = isFoundationEdgeActive(uc.id);
                const dimmed = anyActive && !active;
                return (
                  <g>
                    <path
                      d={useCaseToFoundationPath(upos.cx, upos.cy)}
                      stroke="#FBBF24"
                      strokeWidth={active ? 2 : 1.25}
                      fill="none"
                      opacity={active ? 0.85 : dimmed ? 0.06 : baseEdgeOpacity}
                      strokeDasharray={active ? '0' : '3 4'}
                      style={{ transition: 'opacity 0.25s, stroke-width 0.25s' }}
                    />
                    {active && (
                      <motion.path
                        d={useCaseToFoundationPath(upos.cx, upos.cy)}
                        stroke="#FEF3C7"
                        strokeWidth={1.5}
                        fill="none"
                        strokeDasharray="4 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -20 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* ══════════════════════════════════════════════════════ */}
        {/* P1 FOUNDATION BAR                                    */}
        {/* ══════════════════════════════════════════════════════ */}
        <g
          onMouseEnter={() => setHoveredProblem('p1')}
          onMouseLeave={() => setHoveredProblem(null)}
          style={{ cursor: 'pointer' }}
        >
          {/* Outer glow */}
          <rect
            x={FOUNDATION.x - 6}
            y={FOUNDATION.y - 6}
            width={FOUNDATION.w + 12}
            height={FOUNDATION.h + 12}
            rx={20}
            fill="url(#foundationGlow)"
            opacity={isProblemActive('p1') ? 0.9 : 0.4}
            style={{ transition: 'opacity 0.3s' }}
          />
          <rect
            x={FOUNDATION.x}
            y={FOUNDATION.y}
            width={FOUNDATION.w}
            height={FOUNDATION.h}
            rx={14}
            fill="url(#foundationFill)"
            stroke={isProblemActive('p1') ? '#FDE68A' : '#F59E0B'}
            strokeWidth={isProblemActive('p1') ? 2 : 1.25}
            style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
          />
          {/* Diagonal shimmer pattern */}
          <rect
            x={FOUNDATION.x}
            y={FOUNDATION.y}
            width={FOUNDATION.w}
            height={FOUNDATION.h}
            rx={14}
            fill="url(#foundationStripes)"
            opacity={0.35}
          />
          {/* Label */}
          <g>
            <text
              x={FOUNDATION.x + 24}
              y={FOUNDATION.y + 32}
              fill="#78350F"
              fontSize="11"
              fontWeight="700"
              letterSpacing="2.5"
              style={{ textTransform: 'uppercase' }}
            >
              PROBLEM 1 · THE FOUNDATION
            </text>
            <text
              x={FOUNDATION.x + 24}
              y={FOUNDATION.y + 56}
              fill="#1F2937"
              fontSize="22"
              fontWeight="800"
            >
              The POS Data Foundation
            </text>
          </g>
          <text
            x={FOUNDATION.x + FOUNDATION.w - 24}
            y={FOUNDATION.y + 45}
            fill="#78350F"
            fontSize="12"
            fontWeight="600"
            textAnchor="end"
            fontStyle="italic"
          >
            Without this, none of the above works.
          </text>
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/* P2 & P3 PROBLEM CARDS                                */}
        {/* ══════════════════════════════════════════════════════ */}
        {(['p2', 'p3'] as const).map((pid) => {
          const pos = problemPositions[pid];
          const active = isProblemActive(pid);
          const dimmed = anyActive && !active;
          const color = pid === 'p2' ? '#2563EB' : '#DB2777';
          const lightColor = pid === 'p2' ? '#DBEAFE' : '#FCE7F3';
          const prob = problems[pid];
          return (
            <g
              key={pid}
              onMouseEnter={() => setHoveredProblem(pid)}
              onMouseLeave={() => setHoveredProblem(null)}
              style={{ cursor: 'pointer' }}
              opacity={dimmed ? 0.45 : 1}
            >
              {/* Glow */}
              {active && (
                <rect
                  x={pos.cx - PROBLEM_CARD.w / 2 - 8}
                  y={pos.cy - PROBLEM_CARD.h / 2 - 8}
                  width={PROBLEM_CARD.w + 16}
                  height={PROBLEM_CARD.h + 16}
                  rx={18}
                  fill={color}
                  opacity={0.25}
                />
              )}
              <rect
                x={pos.cx - PROBLEM_CARD.w / 2}
                y={pos.cy - PROBLEM_CARD.h / 2}
                width={PROBLEM_CARD.w}
                height={PROBLEM_CARD.h}
                rx={14}
                fill={lightColor}
                stroke={color}
                strokeWidth={active ? 2.5 : 1.5}
                style={{ transition: 'stroke-width 0.2s' }}
              />
              <text
                x={pos.cx}
                y={pos.cy - 18}
                fill={color}
                fontSize="11"
                fontWeight="700"
                letterSpacing="2.5"
                textAnchor="middle"
                style={{ textTransform: 'uppercase' }}
              >
                PROBLEM {prob.number}
              </text>
              <text
                x={pos.cx}
                y={pos.cy + 6}
                fill="#0F172A"
                fontSize="15"
                fontWeight="800"
                textAnchor="middle"
              >
                {pid === 'p2' ? 'Reactive Internal' : 'Subpar Partner'}
              </text>
              <text
                x={pos.cx}
                y={pos.cy + 26}
                fill="#0F172A"
                fontSize="15"
                fontWeight="800"
                textAnchor="middle"
              >
                {pid === 'p2' ? 'Planning & Execution' : 'Collaboration'}
              </text>
            </g>
          );
        })}

        {/* ══════════════════════════════════════════════════════ */}
        {/* USE CASE NODES (9 cards, 3×3 grid)                   */}
        {/* ══════════════════════════════════════════════════════ */}
        {useCases.map((uc) => {
          const pos = useCasePositions[uc.id];
          const active = isUseCaseActive(uc.id);
          const dimmed = anyActive && !active;
          const isSelected = selectedUseCase === uc.id;
          return (
            <g
              key={uc.id}
              onMouseEnter={() => setHoveredUseCase(uc.id)}
              onMouseLeave={() => setHoveredUseCase(null)}
              onClick={() => onSelectUseCase(uc.id)}
              style={{ cursor: 'pointer' }}
              opacity={dimmed ? 0.35 : 1}
            >
              {/* Glow when active */}
              {(active || isSelected) && (
                <rect
                  x={pos.cx - USECASE_CARD.w / 2 - 6}
                  y={pos.cy - USECASE_CARD.h / 2 - 6}
                  width={USECASE_CARD.w + 12}
                  height={USECASE_CARD.h + 12}
                  rx={16}
                  fill="#0EA5E9"
                  opacity={0.22}
                />
              )}
              <rect
                x={pos.cx - USECASE_CARD.w / 2}
                y={pos.cy - USECASE_CARD.h / 2}
                width={USECASE_CARD.w}
                height={USECASE_CARD.h}
                rx={12}
                fill="#FFFFFF"
                stroke={isSelected ? '#0EA5E9' : active ? '#2563EB' : '#CBD5E1'}
                strokeWidth={isSelected ? 2.5 : active ? 2 : 1.25}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
              {/* Number badge */}
              <circle
                cx={pos.cx - USECASE_CARD.w / 2 + 20}
                cy={pos.cy - USECASE_CARD.h / 2 + 20}
                r={13}
                fill={active || isSelected ? '#2563EB' : '#EFF6FF'}
                stroke={active || isSelected ? '#1D4ED8' : '#BFDBFE'}
                strokeWidth={1}
                style={{ transition: 'fill 0.2s' }}
              />
              <text
                x={pos.cx - USECASE_CARD.w / 2 + 20}
                y={pos.cy - USECASE_CARD.h / 2 + 24}
                fill={active || isSelected ? '#FFFFFF' : '#2563EB'}
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
                style={{ transition: 'fill 0.2s' }}
              >
                {uc.id}
              </text>
              {/* Title (split onto 2 lines manually) */}
              <text
                x={pos.cx + 8}
                y={pos.cy - 4}
                fill="#0F172A"
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
              >
                {splitTitle(uc.short).line1}
              </text>
              {splitTitle(uc.short).line2 && (
                <text
                  x={pos.cx + 8}
                  y={pos.cy + 14}
                  fill="#0F172A"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {splitTitle(uc.short).line2}
                </text>
              )}
              {/* "Click" hint on active */}
              {active && (
                <text
                  x={pos.cx + 8}
                  y={pos.cy + USECASE_CARD.h / 2 - 8}
                  fill="#2563EB"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="middle"
                  letterSpacing="1.5"
                  style={{ textTransform: 'uppercase' }}
                >
                  Click to explore →
                </text>
              )}
            </g>
          );
        })}

        {/* ══════════════════════════════════════════════════════ */}
        {/* DEFS (gradients and patterns)                        */}
        {/* ══════════════════════════════════════════════════════ */}
        <defs>
          <linearGradient id="foundationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <radialGradient id="foundationGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="foundationStripes"
            patternUnits="userSpaceOnUse"
            width="16"
            height="16"
            patternTransform="rotate(45)"
          >
            <rect width="16" height="16" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="16" stroke="#F59E0B" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      {/* Hover hint */}
      <div className="mt-4 text-center text-xs text-slate-500 tracking-wide">
        Hover a problem or use case to see how they connect. Click any use case to explore it.
      </div>
    </div>
  );
}

// Split a short title into two balanced lines
function splitTitle(title: string): { line1: string; line2: string | null } {
  if (title.length <= 18) return { line1: title, line2: null };
  const words = title.split(' ');
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(' '),
    line2: words.slice(mid).join(' '),
  };
}
