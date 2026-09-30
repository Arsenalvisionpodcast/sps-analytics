import type { Mode } from './data'

// Contract every chapter implements. The shell owns all state;
// chapters only animate in response to `mode`.
export interface ChapterProps {
  mode: Mode
  onNext: () => void
  onRestart: () => void
}
