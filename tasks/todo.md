# Texas Power Search — Task Log

---

## Task 1: Texas Theme Redesign

### Summary
Rebranded all UI with Texas colors (navy, red, gold, cream). CSS-only changes across 15 files.

**Status: Complete**

---

## Task 2: Homepage Comparison Upgrade (Priority 1 Features)

### Summary
Added usage selector, price breakdown (energy + TDU + total), sort options, warning badges, and "Why this plan?" microcopy.

**Status: Complete**

---

## Task 3: TDU Detection + High-Intent Filters (Priority 2 Features)

### Goal
Help users identify their delivery utility and filter plans by high-intent criteria.

### Plan
- [x] Create `src/lib/tdu.ts` with ZIP→TDU mapping and per-TDU rate config
- [x] Update `src/lib/types.ts` with filter metadata fields and `FilterOption` type
- [x] Update `src/lib/pricing.ts` to accept `TduInfo` param (replaces hardcoded constants) and add `applyFilters()`
- [x] Update `src/lib/actions/plans.ts` to pass through new optional fields
- [x] Update `ResultsTable.tsx` with TDU display, filter bar, filter chips, empty state
- [x] TypeScript check passes
- [x] Build passes

### Files Changed (5 files, 1 new)
1. `src/lib/tdu.ts` — **NEW** — `TduName` type, `TDU_RATES` config per utility, `getTduByZip()`, `getTduRates()`, ZIP mapping for Oncor/CenterPoint/AEP North/AEP Central/TNMP
2. `src/lib/types.ts` — Added `noDeposit`, `isPrepaid`, `sameDayService`, `greenEnergyPercent` to Plan/DatabasePlan; exported `FilterOption` type
3. `src/lib/pricing.ts` — Replaced hardcoded TDU constants with `TduInfo` param on `calculatePricing()`; added `applyFilters()` function
4. `src/lib/actions/plans.ts` — `getPlansByZip` passes through 4 new optional filter fields
5. `src/app/components/ResultsTable.tsx` — Added TDU info row, filter toggle buttons, removable filter chips, filtered empty state, updated pipeline: price → filter → sort → microcopy

### Features Delivered
1. **TDU Detection** — Detects utility by ZIP (Oncor, CenterPoint, AEP North, AEP Central, TNMP). Shows name above results or "Not identified yet".
2. **Per-TDU Pricing** — Each TDU has its own base charge and delivery rate. Falls back to defaults for unknown ZIPs.
3. **Filter Bar** — 4 toggle buttons: No Deposit, Prepaid, Same-Day, Green. Gold highlight when active.
4. **Filter Chips** — Active filters shown as removable badges with × button.
5. **AND Logic** — Multiple filters combine with AND. Missing metadata treated as false/0.
6. **Empty State** — "No plans match your selected filters yet. Try removing a filter."
7. **Footer Count** — Shows "X plans found (filtered from Y)" when filters active.

### TDU Rate Config
| TDU | Base Charge | Delivery (¢/kWh) |
|-----|------------|-------------------|
| Oncor | $4.23 | 5.10¢ |
| CenterPoint | $4.39 | 5.31¢ |
| AEP Texas North | $4.15 | 4.89¢ |
| AEP Texas Central | $4.27 | 5.05¢ |
| TNMP | $7.85 | 4.65¢ |
| Default (unknown) | $4.23 | 5.10¢ |

### Future DB Migration (optional, not required)
```sql
ALTER TABLE power_plans
  ADD COLUMN no_deposit BOOLEAN,
  ADD COLUMN is_prepaid BOOLEAN,
  ADD COLUMN same_day_service BOOLEAN,
  ADD COLUMN green_energy_percent NUMERIC(5,2);
```

**Status: Complete**

---

## Task 4: Provider/Plan Outbound Links

### Goal
Add CTA buttons to each plan row so users can click through to the provider/plan page.

### Plan
- [x] Add `provider_url`, `plan_url`, `affiliate_url` to `DatabasePlan` in `types.ts`
- [x] Add `providerUrl`, `planUrl`, `affiliateUrl` to `Plan` in `types.ts`
- [x] Update `getPlansByZip` in `plans.ts` to pass through URL fields
- [x] Add "View Plan" CTA button column to `ResultsTable.tsx` with fallback chain: affiliate → plan → provider → disabled
- [x] TypeScript check passes
- [x] Build passes

### Fallback Chain
1. `affiliateUrl` (if set) → use as link
2. `planUrl` (if set) → use as link
3. `providerUrl` (if set) → use as link
4. None → show disabled "Link coming soon" button

### Rules
- All URL fields optional (`string | null`)
- Links open in new tab with `rel="noopener noreferrer"`
- Fully backward compatible — no DB migration required

### Files Changed (3 files)
1. `src/lib/types.ts` — Added `provider_url`, `plan_url`, `affiliate_url` to `DatabasePlan`; added `providerUrl`, `planUrl`, `affiliateUrl` to `Plan`
2. `src/lib/actions/plans.ts` — Added 3 URL field mappings to `getPlansByZip` transform
3. `src/app/components/ResultsTable.tsx` — Added "Action" column header and CTA button cell with fallback chain

### Review
- **3 files changed**, no new files created
- All URL fields are optional with `string | null` — fully backward compatible
- CTA uses gold button ("View Plan") when a URL exists, gray disabled button ("Link coming soon") when no URLs are set
- Fallback priority: `affiliateUrl` → `planUrl` → `providerUrl`
- Links open in new tab with `rel="noopener noreferrer"` for security
- TypeScript and build both pass clean
- No DB migration required — columns can be added later when ready

### Future DB Migration (optional)
```sql
ALTER TABLE power_plans
  ADD COLUMN provider_url TEXT,
  ADD COLUMN plan_url TEXT,
  ADD COLUMN affiliate_url TEXT;
```

**Status: Complete**

---

## Task 5: "Use My Real Usage" (Phase 1 — Manual Input)

### Goal
Let users enter their actual monthly kWh from a bill for more accurate plan comparisons. Frontend-only, no backend changes.

### Plan
- [x] Add `isManualMode` and `showManualPanel` state to `ResultsTable.tsx`
- [x] Add "Use My Real Usage" button next to usage presets
- [x] Add collapsible manual input panel with validation (>0, ≤50000, integer)
- [x] Add manual usage badge near results header when active
- [x] Add "Why this matters" helper text near usage area
- [x] Clicking a preset exits manual mode and hides badge
- [x] TypeScript check passes
- [x] Build passes

### Files Changed (1 file)
1. `src/app/components/ResultsTable.tsx` — Added manual usage state, panel, badge, helper text, and preset-exit logic

### Review
- **1 file changed**, no new files, no backend changes
- Added 3 new state variables: `isManualMode`, `showManualPanel`, `manualInput`
- "Use My Real Usage" button appears next to preset buttons, highlighted gold when manual mode is active
- Collapsible panel appears with integer input, validation (>0, ≤50,000), Apply/Cancel buttons, and tip text
- Gold badge shows "Using your actual usage: X,XXX kWh" with × dismiss button when manual mode is active
- Results header changes from "Assuming X kWh/month" to "Based on your actual usage: X kWh/month"
- Clicking any preset (500/1000/2000) exits manual mode, clears badge, and uses preset value
- "Why this matters" one-liner added below usage buttons for trust-building
- All existing features (filters, sort, TDU, badges, CTA links) work unchanged
- Reuses existing `usageKwh` state — manual usage feeds into the same pricing pipeline

### How It Works
- **Manual mode** is a UI-only concept tracked by `isManualMode` boolean
- When user clicks "Apply Usage", it calls `setUsageKwh(manualParsed)` — the exact same setter used by presets
- The pricing pipeline (`calculatePricing → applyFilters → sortPlans → getWhyThisPlan`) automatically recalculates via `useMemo` dependency on `usageKwh`
- No new pricing logic, no duplicated formulas

### Validation
- Integer only (strips non-digit characters)
- Must be > 0
- Maximum 50,000 kWh
- "Apply Usage" button disabled until input is valid
- Inline error messages for invalid values

**Status: Complete**
