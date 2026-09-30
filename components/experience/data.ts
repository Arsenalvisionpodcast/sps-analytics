// Single source of truth for the /experience "Follow the Signal" story.
// Scenario names are deliberately neutral archetypes so the story works for
// any vertical (CPG, industrial distribution, grocery, apparel…). To add a
// vertical picker later, swap these objects — no chapter visuals need to change.

export type Mode = 'without' | 'with'

// ───────────────────────────────────────────────────────────────
// SCENARIO
// ───────────────────────────────────────────────────────────────

export const PRODUCT = {
  name: 'Widget Pro',
  sku: 'WP-4417',
  variant: 'Large · Black',
  upc: '00847291044170',
}

export const HERO_SALE = {
  partner: 'Big Retailer',
  store: 'Store 1147',
  time: '10:42 AM',
  qty: 12,
}

export interface Channel {
  id: string
  name: string
  format: string
  file: string // what lands in your team's inbox without SPS
  metric: string // what this channel calls "units sold"
  units: number // units of Widget Pro this week
  color: string
}

export const CHANNELS: Channel[] = [
  { id: 'big-retailer', name: 'Big Retailer', format: 'Portal', file: 'BR_wk42_FINAL_v3.xlsx', metric: 'Pcs Sold', units: 12, color: '#60A5FA' },
  { id: 'distributor', name: 'National Distributor', format: 'EDI 852', file: 'NATDIST_852.edi', metric: 'Qty Sold', units: 5, color: '#818CF8' },
  { id: 'marketplace', name: 'Online Marketplace', format: 'API', file: 'mkt_api_dump.json', metric: '# Pieces', units: 9, color: '#FBBF24' },
  { id: 'regional', name: 'Regional Chain', format: 'SFTP', file: 'regional_sales.csv', metric: 'Units', units: 4, color: '#34D399' },
  { id: 'club', name: 'Wholesale Club', format: 'CSV · Email', file: 'club_sales (1).csv', metric: 'Each', units: 6, color: '#F472B6' },
  { id: 'dtc', name: 'Your DTC Site', format: 'Commerce feed', file: 'dtc_orders_export.csv', metric: 'Sold Qty', units: 3, color: '#22D3EE' },
]

export const TOTAL_UNITS = CHANNELS.reduce((sum, c) => sum + c.units, 0)

// How three partners name the same item (Match chapter)
export const PARTNER_NAMES = [
  { partner: 'Big Retailer', idLabel: 'Item #', id: '55102938', name: 'WDGT PRO BLK LG', units: 12, color: '#60A5FA' },
  { partner: 'National Distributor', idLabel: 'Part #', id: '88-4417', name: '88-4417 WIDGET PRO L/BK', units: 5, color: '#818CF8' },
  { partner: 'Online Marketplace', idLabel: 'Listing', id: 'B0WP4417XL', name: 'Widget-Pro Large Black (Pack of 1)', units: 9, color: '#FBBF24' },
]

export const TAXONOMY = ['Your Brand', 'Widgets', 'Pro Series', 'Widget Pro', 'Large', 'Black']

// ───────────────────────────────────────────────────────────────
// CHAPTERS
// ───────────────────────────────────────────────────────────────

export type ChapterId = 'intro' | 'scatter' | 'cleanse' | 'translate' | 'match' | 'live' | 'decide' | 'close'

export interface Chapter {
  id: ChapterId
  rail: string // label on the journey rail
  tag: string
  flippable: boolean // does the Without/With switch apply?
  title: Record<Mode, string>
  subtitle: Record<Mode, string>
  readout?: { label: string } & Record<Mode, string>
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    rail: 'Sale',
    tag: 'The Sale',
    flippable: false,
    title: { without: 'Every sale is a signal.', with: 'Every sale is a signal.' },
    subtitle: { without: '', with: '' },
  },
  {
    id: 'scatter',
    rail: 'Scatter',
    tag: 'The Scatter',
    flippable: true,
    title: {
      without: 'One product. Six channels. Six ways of reporting it.',
      with: 'Every channel, collected for you.',
    },
    subtitle: {
      without: 'Each trading partner delivers data its own way — portals, EDI, APIs, SFTP, emailed spreadsheets. Before anyone can answer a question, someone has to go get it.',
      with: 'SPS connects to every channel automatically. No logins, no downloads, no chasing partners when a file is late.',
    },
    readout: { label: 'Hours collecting', without: '12+ / week', with: '0' },
  },
  {
    id: 'cleanse',
    rail: 'Cleanse',
    tag: 'The Cleanse',
    flippable: true,
    title: {
      without: 'Your reporting is wrong before anyone opens it.',
      with: 'Every record validated before it moves.',
    },
    subtitle: {
      without: 'Duplicates double-count sales. Bad store codes orphan records. Missing dates silently drop rows. The number your team sees is not the number that sold.',
      with: 'The SPS data engine removes duplicates, resolves errors, fills gaps, and checks every record against business rules and history.',
    },
    readout: { label: 'Store 1147 units', without: '24 ✗', with: '12 ✓' },
  },
  {
    id: 'translate',
    rail: 'Translate',
    tag: 'The Translation',
    flippable: true,
    title: {
      without: '“Pcs Sold.” “Qty Sold.” “# Pieces.” Try adding them up.',
      with: 'One standard. Every metric. Every level.',
    },
    subtitle: {
      without: 'Every partner defines the same metric differently. Totals don’t reconcile, and detail gets lost in roll-ups.',
      with: 'Every metric resolves to a single standard — with granularity preserved all the way down to the individual store door and UPC.',
    },
    readout: { label: 'Definitions of “units”', without: '6', with: '1' },
  },
  {
    id: 'match',
    rail: 'Match',
    tag: 'The Match',
    flippable: true,
    title: {
      without: 'Three partners. Three names. One product.',
      with: 'Mapped to your world.',
    },
    subtitle: {
      without: 'Every partner has its own item numbers and naming. In your reports, one product looks like three — and none of them match your catalog.',
      with: 'Your item file is the key. Every partner’s naming is translated into your internal taxonomy, so every channel speaks your language.',
    },
    readout: { label: 'Product records', without: '3', with: '1' },
  },
  {
    id: 'live',
    rail: 'Deliver',
    tag: 'Live & Resilient',
    flippable: true,
    title: {
      without: 'A weekly export. And it breaks when anything changes.',
      with: 'Live in your warehouse. Resilient by design.',
    },
    subtitle: {
      without: 'Data arrives late, lands in a spreadsheet, and goes dark the moment a partner changes something. Try it — throw a disruption at the pipeline.',
      with: 'Delivered as a live share into Snowflake or Databricks, updated daily. When partners change things, SPS handles it. Throw a disruption at it.',
    },
    readout: { label: 'Data freshness', without: 'Weekly, manual', with: 'Live, daily' },
  },
  {
    id: 'decide',
    rail: 'Decide',
    tag: 'The Decision',
    flippable: true,
    title: {
      without: 'So the decision gets made on gut feel.',
      with: 'Now the signal makes the decision.',
    },
    subtitle: {
      without: 'Pick a team. See what their decisions run on today.',
      with: 'Same team, same decision — made on clean, door-level signal from every channel.',
    },
    readout: { label: 'Decisions run on', without: 'Gut feel', with: 'Signal' },
  },
  {
    id: 'close',
    rail: 'Impact',
    tag: 'Impact',
    flippable: false,
    title: { without: 'One signal. Every decision.', with: 'One signal. Every decision.' },
    subtitle: { without: '', with: '' },
  },
]

// Signal integrity in "Without" mode degrades as the story compounds.
// Shown as a gauge + status word, not a claimed statistic.
export const INTEGRITY: Partial<Record<ChapterId, { level: number; status: string }>> = {
  scatter: { level: 0.72, status: 'Scattered' },
  cleanse: { level: 0.5, status: 'Corrupted' },
  translate: { level: 0.34, status: 'Unreadable' },
  match: { level: 0.22, status: 'Fragmented' },
  live: { level: 0.12, status: 'Stale' },
  decide: { level: 0.04, status: 'Lost' },
}

// ───────────────────────────────────────────────────────────────
// CLEANSE
// ───────────────────────────────────────────────────────────────

export interface RawRecord {
  id: number
  partner: string
  store: string
  storeFixed?: string
  units: number
  date: string
  dateFixed?: string
  issue: string
  issueColor: string
  removed?: boolean
}

export const RAW_RECORDS: RawRecord[] = [
  { id: 1, partner: 'Big Retailer', store: 'Store 1147', units: 12, date: '10/14', issue: 'DUPLICATE', issueColor: '#F87171' },
  { id: 2, partner: 'Big Retailer', store: 'Store 1147', units: 12, date: '10/14', issue: 'DUPLICATE', issueColor: '#F87171', removed: true },
  { id: 3, partner: 'Big Retailer', store: 'BR-11X ✗', storeFixed: 'Store 1162', units: 7, date: '10/14', issue: 'BAD STORE CODE', issueColor: '#FB923C' },
  { id: 4, partner: 'Natl. Distributor', store: 'DC-04', units: 5, date: '—', dateFixed: '10/14', issue: 'MISSING DATE', issueColor: '#FBBF24' },
]

// ───────────────────────────────────────────────────────────────
// LIVE & RESILIENT
// ───────────────────────────────────────────────────────────────

export const DESTINATIONS = [
  { name: 'Snowflake', color: '#60A5FA' },
  { name: 'Databricks', color: '#FB923C' },
  { name: 'Delta Share', color: '#34D399' },
]

export const TEAMS = [
  { label: 'Analytics', icon: 'chart', color: '#60A5FA' },
  { label: 'Demand Planning', icon: 'trend', color: '#818CF8' },
  { label: 'Finance', icon: 'dollar', color: '#34D399' },
  { label: 'Sales', icon: 'target', color: '#FBBF24' },
  { label: 'Marketing', icon: 'megaphone', color: '#F472B6' },
  { label: 'Operations', icon: 'cog', color: '#22D3EE' },
]

export interface Disruption {
  id: string
  label: string
  without: string
  with: string
}

export const DISRUPTIONS: Disruption[] = [
  {
    id: 'late',
    label: 'Partner data is late',
    without: 'Reporting goes dark. Hours of manual investigation begin.',
    with: 'Gap detected instantly. Data backfilled automatically when delivery resumes.',
  },
  {
    id: 'map',
    label: 'Partner changes its data map',
    without: 'Mappings break overnight. Reporting halts until someone reworks the logic.',
    with: 'Auto-remapped across the SPS network. Zero downtime, zero manual effort.',
  },
  {
    id: 'restate',
    label: 'Retroactive restatement',
    without: 'Historical records are now wrong. Someone has to find and fix them by hand.',
    with: 'Restatements detected, processed, and propagated to your warehouse automatically.',
  },
  {
    id: 'store',
    label: 'New store opens',
    without: 'New doors are invisible to reporting until someone adds them manually.',
    with: 'New locations appear in your data from day one. No configuration needed.',
  },
]

// ───────────────────────────────────────────────────────────────
// DECISION — story framing layered on top of components/use-cases/data.ts
// Impact figures are taken directly from each use case's `outcome` copy.
// ───────────────────────────────────────────────────────────────

export const DECISION_FRAMES: Record<number, { without: string; impact: string; impactLabel: string }> = {
  1: { without: 'Voids and underperforming doors stay invisible until a buyer points them out.', impact: '3–7%', impactLabel: 'of revenue recaptured in year one' },
  2: { without: 'Keep, cut, or expand — decided on gut feel and last quarter’s spreadsheet.', impact: '15%', impactLabel: 'of the portfolio cut without revenue loss' },
  3: { without: 'Promo ROI measured weeks later from partner PDFs — if it’s measured at all.', impact: 'Days', impactLabel: 'to grade a promotion — not quarters' },
  4: { without: 'Pricing debated for months, then rolled out on shipment-level assumptions.', impact: '50–150 bps', impactLabel: 'of margin on price-insensitive SKUs' },
  5: { without: 'Out-of-stocks discovered days or weeks late — usually by the buyer.', impact: '+2–5 pts', impactLabel: 'lift in in-stock rates' },
  6: { without: 'Forecasts built on what you shipped, not what actually sold through.', impact: '+10–20%', impactLabel: 'forecast accuracy' },
  7: { without: 'Walking into JBPs without evidence of where your items should grow.', impact: 'Every JBP', impactLabel: 'backed by quantified expansion opportunities' },
  8: { without: 'Expedites and reshuffled ship plans every week — always one signal behind.', impact: '30%+', impactLabel: 'fewer reactive ship plan changes' },
  9: { without: 'Allocation by last year’s ratios — or whoever called loudest.', impact: '10–15%', impactLabel: 'less stranded inventory' },
}

export const CONTACT_HREF =
  'mailto:ebsmith@spscommerce.com?subject=SPS%20Decision%20Intelligence%20-%20Let%27s%20Talk'
