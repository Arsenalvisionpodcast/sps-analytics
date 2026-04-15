// Single source of truth for the Use Cases page.
// 3 problems × 9 use cases × 4 personas (from the 2026 Analytics Deck).

export type PersonaId =
  | 'planning-ops'
  | 'sales-teams'
  | 'marketing-revops'
  | 'analytics-bi';

export type ProblemId = 'p1' | 'p2' | 'p3';

export interface Persona {
  id: PersonaId;
  label: string;
  short: string;
  color: string;
}

export interface Problem {
  id: ProblemId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

export interface UseCase {
  id: number; // 1-9
  title: string;
  short: string; // one-liner for the constellation node
  pain: string;
  spsMove: string;
  outcome: string;
  personas: PersonaId[];
  problems: ProblemId[]; // outcome problems (P2, P3). P1 is implicit for all.
  visualType: 'bars' | 'line' | 'heatmap' | 'scatter' | 'matrix' | 'area' | 'quadrant';
}

// ───────────────────────────────────────────────────────────────
// PERSONAS — matches the 2026 Analytics Deck (4 teams)
// ───────────────────────────────────────────────────────────────

export const personas: Persona[] = [
  {
    id: 'planning-ops',
    label: 'Planning & Operations',
    short: 'Planning & Ops',
    color: '#0EA5E9',
  },
  {
    id: 'sales-teams',
    label: 'Sales Teams',
    short: 'Sales',
    color: '#2563EB',
  },
  {
    id: 'marketing-revops',
    label: 'Marketing & RevOps',
    short: 'Marketing & RevOps',
    color: '#DB2777',
  },
  {
    id: 'analytics-bi',
    label: 'Analytics & BI',
    short: 'Analytics & BI',
    color: '#7C3AED',
  },
];

// ───────────────────────────────────────────────────────────────
// PROBLEMS
// ───────────────────────────────────────────────────────────────

export const problems: Record<ProblemId, Problem> = {
  p1: {
    id: 'p1',
    number: 1,
    title: 'The POS Data Foundation',
    subtitle: 'The foundation under everything',
    description:
      "Without clean, consistent POS data across every sales channel — retailers, distributors, eCommerce, marketplaces, DTC — teams get stuck running endless manual jobs. Collecting files, chasing trading partners when data is missing or wrong, rebuilding the same pipelines each week. None of the nine use cases below can happen. The decision never gets made.",
    bullets: [
      'Each sales channel delivers data differently — formats, cadences, definitions',
      'Teams burn hours stitching UPC and door-level data into a single view',
      'No consistent platform to view and act on what the data is saying',
    ],
  },
  p2: {
    id: 'p2',
    number: 2,
    title: 'Reactive Internal Planning & Execution',
    subtitle: 'Decisions made without the signal',
    description:
      "When teams can't see what's actually happening at the shelf or the door, they plan with gut feel, outdated reports, and yesterday's shipments. Forecasts miss. Assortments bloat. Opportunities sit unseen.",
    bullets: [
      'Missing data for essential daily decisions',
      'Inaccurate sales forecasts',
      'Guesswork on which products to keep, cut, or develop',
    ],
  },
  p3: {
    id: 'p3',
    number: 3,
    title: 'Subpar External Partner Collaboration',
    subtitle: 'Credibility gaps with trading partners',
    description:
      "Buyers expect suppliers to bring insight, not questions. Without a clean view of door-level performance, you arrive at reviews underprepared and leave with chargebacks instead of growth commitments.",
    bullets: [
      'Poor fill rates and customer experience',
      'Limited credibility with trading partners',
      'No data to proactively recommend actions',
    ],
  },
};

// ───────────────────────────────────────────────────────────────
// USE CASES
// Note: P1 (POS Data Foundation) underpins all 9.
// The `problems` array only lists P2/P3 outcome mappings.
// ───────────────────────────────────────────────────────────────

export const useCases: UseCase[] = [
  {
    id: 1,
    title: 'Identify Missed Revenue & Margin Opportunities',
    short: 'Missed Revenue & Margin',
    pain:
      "You're leaving money on the table at trading partners you already sell to — door-level voids, underperforming SKUs in specific regions, assortment gaps in your own portfolio you could be filling. Without door-level visibility across every sales channel, you can't see these opportunities, let alone quantify them for a joint business review.",
    spsMove:
      "SPS unifies UPC- and door-level POS sell-through across every sales channel into one view. Your team gets a ranked list of missed revenue — by trading partner, by store cluster, by SKU — and the evidence to act on it.",
    outcome:
      "Recapture 3–7% of revenue within the first year by acting on door-level voids and underperformance.",
    personas: ['sales-teams', 'planning-ops', 'marketing-revops'],
    problems: ['p2', 'p3'],
    visualType: 'bars',
  },
  {
    id: 2,
    title: 'SKU Rationalization & Assortment Performance',
    short: 'SKU Rationalization',
    pain:
      "Every year your team debates which SKUs to keep, cut, or expand — and does it with incomplete data, gut feel, and a spreadsheet from last quarter. You over-invest in the long tail and under-invest in what's actually moving.",
    spsMove:
      "SPS delivers unified SKU-level performance across every sales channel — velocity, distribution, margin contribution, on-shelf availability — in one consistent view. Rationalization decisions become data-backed, defensible, and repeatable.",
    outcome:
      "Cut the bottom 15% of the portfolio without revenue loss. Double down on the top 20% with confidence.",
    personas: ['sales-teams', 'marketing-revops', 'planning-ops'],
    problems: ['p2', 'p3'],
    visualType: 'quadrant',
  },
  {
    id: 3,
    title: 'Trade Spend Efficiency & Promotion ROI',
    short: 'Trade Spend & Promo ROI',
    pain:
      "You're spending 15–20% of gross revenue on trade, but measuring ROI on a handful of promotions using partner-provided PDFs weeks after the fact. Was the lift real or coincidence? Did the promotion cannibalize base sales? No one can answer with confidence.",
    spsMove:
      "With consistent, timely door-level POS sales and promotion data across every channel, SPS gives RevOps and trade teams incremental lift measurement in days, not quarters. Promotions get graded. Budget shifts to what works.",
    outcome:
      "Identify the portion of promotional spend that isn't generating incremental lift — and redirect it.",
    personas: ['marketing-revops', 'sales-teams'],
    problems: ['p2', 'p3'],
    visualType: 'area',
  },
  {
    id: 4,
    title: 'Optimize Pricing & Margin Based on Demand',
    short: 'Pricing & Margin',
    pain:
      "Pricing decisions get debated for months, then rolled out on shipment-level assumptions and stale references. By the time they land, demand has already shifted — and you can't tell whether your items held their velocity, softened, or only moved on promotion.",
    spsMove:
      "SPS surfaces the real relationship between your pricing and your own sell-through — by item, by trading partner, by region. You see which SKUs hold volume at higher price points and which are sensitive, grounded in actual POS data across every sales channel. Pricing becomes a rolling strategic lever, not an annual exercise.",
    outcome:
      "Capture 50–150 bps of margin on price-insensitive SKUs without volume loss.",
    personas: ['marketing-revops', 'sales-teams'],
    problems: ['p2'],
    visualType: 'scatter',
  },
  {
    id: 5,
    title: 'Improve In-Stock & On-Shelf Availability',
    short: 'In-Stock & On-Shelf',
    pain:
      "Out-of-stocks cost you 4–8% of revenue and quietly damage your trading partner scorecard. But you're finding out days or weeks after the fact — often only when a buyer complains. Fill rate penalties pile up. Replenishment teams firefight.",
    spsMove:
      "SPS delivers daily door-level POS inventory and sales data across every sales channel, turning out-of-stock detection continuous instead of retrospective. Your team intervenes upstream — before the chargeback lands and before the shopper buys somewhere else.",
    outcome:
      "Lift in-stock rates 2–5 points. Reduce fill-rate penalties measurably within a quarter.",
    personas: ['planning-ops', 'sales-teams', 'marketing-revops'],
    problems: ['p2', 'p3'],
    visualType: 'heatmap',
  },
  {
    id: 6,
    title: 'Demand Planning Efficiency & Forecast Accuracy',
    short: 'Demand Planning & Forecasting',
    pain:
      "Your forecasts are built on shipment data — what you sold to the trading partner — not sell-through. You miss the early signal of demand shifts. Every peak or dip surprises you, and your planners spend 40% of their time in reactive re-forecasting.",
    spsMove:
      "SPS feeds clean, door-level POS data directly into your planning stack (S&OP, IBP, Kinaxis, o9, and the like) so forecasts reflect true consumer demand. Planners move from chasing variance to shaping outcomes.",
    outcome:
      "Improve forecast accuracy 10–20%. Cut manual re-planning cycles in half.",
    personas: ['planning-ops', 'analytics-bi'],
    problems: ['p2'],
    visualType: 'line',
  },
  {
    id: 7,
    title: 'Expand Distribution & Sales Penetration',
    short: 'Distribution & Penetration',
    pain:
      "You don't have a clear view of where your own SKUs are distributed across your trading partners, how deeply they're penetrating each account, or where the whitespace sits. You walk into JBPs without the evidence to prove where your items are earning their shelf space — or where expansion would land.",
    spsMove:
      "SPS shows you item-by-trading-partner distribution and sell-through in one view. You see which SKUs are on shelf where, which are performing at which doors, and where your distribution has room to grow. You enter every JBP with the receipts.",
    outcome:
      "Walk into every JBP with quantified expansion opportunities. Turn distribution conversations into commitments.",
    personas: ['sales-teams', 'marketing-revops'],
    problems: ['p2', 'p3'],
    visualType: 'matrix',
  },
  {
    id: 8,
    title: 'Reduce Reactive Ship Plan Changes',
    short: 'Ship Plan Stability',
    pain:
      "Monday: a trading partner calls with an emergency expedite. Tuesday: a DC is stocked out. Thursday: a ship plan gets reshuffled. Your supply team spends the week putting out fires because they're always one signal behind.",
    spsMove:
      "Consistent, daily POS inventory signals across every sales channel let your supply and demand teams get ahead of exceptions. Expedite requests drop. Ship plans stabilize. The operation stops running on adrenaline.",
    outcome:
      "Cut reactive ship plan changes by 30%+. Redirect the hours to strategic planning.",
    personas: ['planning-ops', 'sales-teams'],
    problems: ['p2', 'p3'],
    visualType: 'line',
  },
  {
    id: 9,
    title: 'Inform Inventory Allocation Strategy',
    short: 'Inventory Allocation',
    pain:
      "You're allocating inventory to trading partners based on last year's ratios or whoever called loudest. Some partners run hot and stock out; others sit on excess. Cash is tied up in the wrong places; sales are lost in the others.",
    spsMove:
      "Door-level POS sell-through tells you where inventory will actually turn — which trading partners, which regions, which SKUs. Allocation becomes a function of demand signal, not politics or legacy habit.",
    outcome:
      "Reduce stranded inventory 10–15%. Improve turns while raising in-stock rates.",
    personas: ['planning-ops', 'sales-teams'],
    problems: ['p2', 'p3'],
    visualType: 'bars',
  },
];

// ───────────────────────────────────────────────────────────────
// Five Decision Categories — the 2026 Analytics Deck framing
// ───────────────────────────────────────────────────────────────

export interface DecisionCategory {
  id: string;
  title: string;
  description: string;
  useCases: number[]; // IDs
}

export const decisionCategories: DecisionCategory[] = [
  {
    id: 'inventory',
    title: 'Inventory & Replenishment',
    description: 'Keep the right stock in the right place at the right time.',
    useCases: [5, 8, 9],
  },
  {
    id: 'forecasting',
    title: 'Forecasting & Demand Planning',
    description: 'Plans grounded in real consumer sell-through, not shipments.',
    useCases: [6],
  },
  {
    id: 'promotions',
    title: 'Promotions, Pricing & Launches',
    description: 'Grade every promo. Price to the real demand curve. Launch with visibility.',
    useCases: [3, 4],
  },
  {
    id: 'assortment',
    title: 'Assortment, Distribution & Sales',
    description: 'Fill voids, rationalize SKUs, and expand distribution with evidence.',
    useCases: [1, 2, 7],
  },
  {
    id: 'collaboration',
    title: 'Buyer Collaboration & Conversations',
    description: 'Walk into every review with credibility the buyer can\u2019t match.',
    useCases: [1, 2, 3, 5, 7, 8, 9], // cross-cutting — most use cases feed buyer conversations
  },
];

// ───────────────────────────────────────────────────────────────
// Helper lookups
// ───────────────────────────────────────────────────────────────

export const getUseCasesByPersona = (personaId: PersonaId) =>
  useCases.filter((uc) => uc.personas.includes(personaId));

export const getUseCasesByProblem = (problemId: ProblemId) => {
  if (problemId === 'p1') return useCases; // P1 underpins all
  return useCases.filter((uc) => uc.problems.includes(problemId));
};

export const getPersona = (id: PersonaId) => personas.find((p) => p.id === id)!;
