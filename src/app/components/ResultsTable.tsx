'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plan, FilterOption } from '@/lib/types';
import { SUGGESTED_ZIP, DEFAULT_USAGE_KWH } from '@/data/plans';
import {
  calculatePricing,
  applyFilters,
  sortPlans,
  getWarningBadges,
  getWhyThisPlan,
  SortOption,
} from '@/lib/pricing';
import { getTduByZip, getTduRates } from '@/lib/tdu';

interface ResultsTableProps {
  zip: string;
  plans: Plan[];
  found: boolean;
}

const USAGE_PRESETS = [500, 1000, 2000] as const;

const FILTER_OPTIONS: { key: FilterOption; label: string }[] = [
  { key: 'no-deposit', label: 'No Deposit' },
  { key: 'prepaid', label: 'Prepaid' },
  { key: 'same-day', label: 'Same-Day' },
  { key: 'green', label: 'Green' },
];

export default function ResultsTable({ zip, plans, found }: ResultsTableProps) {
  const [usageKwh, setUsageKwh] = useState(DEFAULT_USAGE_KWH);
  const [customUsage, setCustomUsage] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('cheapest');
  const [activeFilters, setActiveFilters] = useState<Set<FilterOption>>(new Set());
  const [isManualMode, setIsManualMode] = useState(false);
  const [showManualPanel, setShowManualPanel] = useState(false);
  const [manualInput, setManualInput] = useState('');

  // Detect TDU from ZIP
  const tduName = useMemo(() => getTduByZip(zip), [zip]);
  const tduRates = useMemo(() => getTduRates(tduName), [tduName]);

  // Pipeline: price → filter → sort → microcopy
  const displayPlans = useMemo(() => {
    const priced = plans.map((plan) => calculatePricing(plan, usageKwh, tduRates));
    const filtered = applyFilters(priced, activeFilters);
    const sorted = sortPlans(filtered, sortOption);
    return sorted.map((plan, index, all) => ({
      ...plan,
      whyThisPlan: getWhyThisPlan(plan, index, all),
    }));
  }, [plans, usageKwh, tduRates, activeFilters, sortOption]);

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const removeFilter = (filter: FilterOption) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.delete(filter);
      return next;
    });
  };

  const handlePresetClick = (kwh: number) => {
    setIsCustom(false);
    setCustomUsage('');
    setUsageKwh(kwh);
    setIsManualMode(false);
    setShowManualPanel(false);
    setManualInput('');
  };

  const handleCustomClick = () => {
    setIsCustom(true);
  };

  const handleCustomChange = (value: string) => {
    setCustomUsage(value);
    const parsed = parseInt(value, 10);
    if (parsed > 0) {
      setUsageKwh(parsed);
    }
  };

  // Manual usage helpers
  const manualParsed = parseInt(manualInput, 10);
  const manualValid = !isNaN(manualParsed) && manualParsed > 0 && manualParsed <= 50000;
  const manualError =
    manualInput.length > 0 && !manualValid
      ? manualParsed > 50000
        ? 'Maximum 50,000 kWh'
        : 'Enter a number greater than 0'
      : '';

  const handleApplyManual = () => {
    if (!manualValid) return;
    setUsageKwh(manualParsed);
    setIsCustom(false);
    setCustomUsage('');
    setIsManualMode(true);
    setShowManualPanel(false);
  };

  const handleCancelManual = () => {
    setShowManualPanel(false);
    setManualInput('');
  };

  if (!found) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-texas-red">
          <h2 className="text-xl font-semibold text-texas-navy mb-4">
            No Plans Found
          </h2>
          <p className="text-texas-navy/60 mb-6">
            Sorry, we don&apos;t have plans available for ZIP code {zip}.
          </p>
          <Link
            href={`/search?zip=${SUGGESTED_ZIP}`}
            className="inline-block bg-texas-navy text-white px-6 py-2 rounded-md hover:bg-texas-navy/90 transition-colors"
          >
            Try {SUGGESTED_ZIP}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* TDU Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-2">
        <span className="text-sm font-medium text-texas-navy">Delivery utility (TDU):</span>
        <span className="text-sm text-texas-navy/70">
          {tduName ? tduRates.displayName : 'Not identified yet'}
        </span>
      </div>

      {/* Usage Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <label className="block text-sm font-medium text-texas-navy mb-2">
          Monthly Usage (kWh)
        </label>
        <div className="flex flex-wrap gap-2 items-center">
          {USAGE_PRESETS.map((kwh) => (
            <button
              key={kwh}
              onClick={() => handlePresetClick(kwh)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isCustom && usageKwh === kwh
                  ? 'bg-texas-navy text-white'
                  : 'bg-texas-navy/10 text-texas-navy hover:bg-texas-navy/20'
              }`}
            >
              {kwh.toLocaleString()} kWh
            </button>
          ))}
          <button
            onClick={handleCustomClick}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isCustom
                ? 'bg-texas-navy text-white'
                : 'bg-texas-navy/10 text-texas-navy hover:bg-texas-navy/20'
            }`}
          >
            Custom
          </button>
          {isCustom && (
            <input
              type="number"
              min="1"
              value={customUsage}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="Enter kWh"
              className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-texas-navy focus:border-texas-navy outline-none"
            />
          )}
          <button
            onClick={() => { setShowManualPanel(true); setIsCustom(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isManualMode
                ? 'bg-texas-gold text-white'
                : 'border border-texas-gold text-texas-gold hover:bg-texas-gold/10'
            }`}
          >
            Use My Real Usage
          </button>
        </div>
        <p className="text-xs text-texas-navy/50 mt-2">
          Electricity plans can look cheaper at one usage level and cost more at another.
        </p>
        {isManualMode && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-texas-gold/20 text-texas-gold">
            Using your actual usage: {usageKwh.toLocaleString()} kWh
            <button
              onClick={() => { setIsManualMode(false); setManualInput(''); setUsageKwh(DEFAULT_USAGE_KWH); }}
              className="ml-1 hover:text-texas-red transition-colors"
              aria-label="Exit manual usage mode"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      {/* Manual Usage Panel */}
      {showManualPanel && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-texas-gold">
          <p className="text-sm text-texas-navy mb-3">
            Enter your average monthly kWh from a recent electricity bill for a more accurate comparison.
          </p>
          <p className="text-xs text-texas-navy/50 mb-3">
            Tip: Check your bill for &ldquo;kWh used&rdquo; or &ldquo;average monthly usage.&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <input
                type="number"
                min="1"
                max="50000"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 1243"
                className="w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-texas-gold focus:border-texas-gold outline-none"
              />
              {manualError && (
                <p className="text-xs text-texas-red mt-1">{manualError}</p>
              )}
            </div>
            <button
              onClick={handleApplyManual}
              disabled={!manualValid}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                manualValid
                  ? 'bg-texas-gold text-white hover:bg-texas-gold/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Apply Usage
            </button>
            <button
              onClick={handleCancelManual}
              className="px-4 py-2 rounded-md text-sm font-medium text-texas-navy/60 hover:text-texas-navy transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <label className="block text-sm font-medium text-texas-navy mb-2">
          Filter Plans
        </label>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilters.has(key)
                  ? 'bg-texas-gold text-white'
                  : 'bg-texas-navy/10 text-texas-navy hover:bg-texas-navy/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.size > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTER_OPTIONS.filter(({ key }) => activeFilters.has(key)).map(({ key, label }) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-texas-gold/20 text-texas-gold"
            >
              {label}
              <button
                onClick={() => removeFilter(key)}
                className="ml-1 hover:text-texas-red transition-colors"
                aria-label={`Remove ${label} filter`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with sort */}
        <div className="p-6 bg-texas-navy border-b border-texas-navy flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Results for ZIP {zip}
            </h2>
            <p className="text-sm text-white/70 mt-1">
              {isManualMode
                ? `Based on your actual usage: ${usageKwh.toLocaleString()} kWh/month`
                : `Assuming ${usageKwh.toLocaleString()} kWh/month`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-white/70">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-3 py-1.5 rounded-md text-sm bg-white text-texas-navy border-0 focus:ring-2 focus:ring-texas-gold outline-none"
            >
              <option value="cheapest">Cheapest Total</option>
              <option value="lowest-risk">Lowest Risk</option>
              <option value="shortest-term">Shortest Term</option>
            </select>
          </div>
        </div>

        {/* Table or empty state */}
        {displayPlans.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-texas-navy/60">
              No plans match your selected filters yet. Try removing a filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-texas-navy/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Energy
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    TDU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Total/mo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Warnings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Why This Plan?
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayPlans.map((plan, index) => {
                  const badges = getWarningBadges(plan);
                  return (
                    <tr key={plan.id || index} className="hover:bg-texas-cream">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-texas-navy">
                        {plan.provider}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {plan.planName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {plan.rateCentsPerKwh.toFixed(2)}¢
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {plan.termMonths} mo
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${plan.energyCharge.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${plan.tduCharge.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-texas-gold">
                        ${plan.totalMonthlyCost.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {badges.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {badges.map((badge) => (
                              <span
                                key={badge}
                                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-texas-red/10 text-texas-red"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-300">&mdash;</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-texas-navy/70 max-w-[200px]">
                        {plan.whyThisPlan}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {(() => {
                          const url = plan.affiliateUrl || plan.planUrl || plan.providerUrl;
                          if (url) {
                            return (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 rounded-md text-sm font-medium bg-texas-gold text-white hover:bg-texas-gold/90 transition-colors"
                              >
                                View Plan
                              </a>
                            );
                          }
                          return (
                            <span className="inline-block px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
                              Link coming soon
                            </span>
                          );
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 bg-texas-navy/5 border-t border-gray-200 text-center text-sm text-texas-navy/60">
          {displayPlans.length} plan{displayPlans.length !== 1 ? 's' : ''} found
          {activeFilters.size > 0 && ` (filtered from ${plans.length})`}
        </div>
      </div>
    </div>
  );
}
