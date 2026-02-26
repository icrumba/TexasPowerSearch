import { Plan, PlanWithPricing, FilterOption } from './types';
import { TduInfo, DEFAULT_TDU_RATES } from './tdu';

export type SortOption = 'cheapest' | 'lowest-risk' | 'shortest-term';

/**
 * Calculate full pricing breakdown for a plan at a given usage level
 */
export function calculatePricing(
  plan: Plan,
  usageKwh: number,
  tduRates: TduInfo = DEFAULT_TDU_RATES
): PlanWithPricing {
  const energyCharge = (plan.rateCentsPerKwh / 100) * usageKwh;
  const tduCharge = tduRates.baseCharge + (tduRates.deliveryCentsPerKwh / 100) * usageKwh;
  const totalMonthlyCost = energyCharge + tduCharge;

  return {
    ...plan,
    energyCharge,
    tduCharge,
    totalMonthlyCost,
    whyThisPlan: '', // filled in after sorting
  };
}

/**
 * Apply high-intent filters. Missing metadata = false/0.
 */
export function applyFilters(
  plans: PlanWithPricing[],
  activeFilters: Set<FilterOption>
): PlanWithPricing[] {
  if (activeFilters.size === 0) return plans;

  return plans.filter((plan) => {
    if (activeFilters.has('no-deposit') && plan.noDeposit !== true) return false;
    if (activeFilters.has('prepaid') && plan.isPrepaid !== true) return false;
    if (activeFilters.has('same-day') && plan.sameDayService !== true) return false;
    if (activeFilters.has('green') && !((plan.greenEnergyPercent ?? 0) > 0)) return false;
    return true;
  });
}

/**
 * Get warning badge labels based on optional plan metadata
 */
export function getWarningBadges(plan: Plan): string[] {
  const badges: string[] = [];

  if (plan.isVariableRate) badges.push('Variable Rate');
  if (plan.billCreditKwhThreshold != null) {
    badges.push(`Bill Credit @ ${plan.billCreditKwhThreshold} kWh`);
  }
  if (plan.minimumUsageFee != null) badges.push('Min Usage Fee');
  if (plan.earlyTerminationFee != null) badges.push('ETF');
  if (plan.baseMonthlyFee != null) badges.push('Base Fee');

  return badges;
}

/**
 * Generate a one-sentence "Why this plan?" explanation
 */
export function getWhyThisPlan(
  plan: PlanWithPricing,
  index: number,
  allPlans: PlanWithPricing[]
): string {
  if (index === 0) {
    return 'Lowest estimated total at your usage.';
  }
  if (plan.billCreditKwhThreshold != null) {
    return 'Watch usage threshold to keep savings.';
  }
  if (plan.termMonths <= 6) {
    return 'Shorter contract term with competitive pricing.';
  }
  if (!plan.isVariableRate) {
    if (plan.termMonths >= 24) {
      return 'Lock in your rate for long-term savings.';
    }
    return 'Good fit if you want price stability.';
  }
  return 'Competitive plan from a trusted provider.';
}

/**
 * Calculate a risk score for sorting (lower = less risky)
 */
function getRiskScore(plan: PlanWithPricing): number {
  let score = 0;
  if (plan.isVariableRate) score += 100;
  if (plan.earlyTerminationFee != null) score += 50;
  if (plan.minimumUsageFee != null) score += 30;
  if (plan.baseMonthlyFee != null) score += 10;
  return score;
}

/**
 * Sort plans by the selected sort option
 */
export function sortPlans(plans: PlanWithPricing[], sortOption: SortOption): PlanWithPricing[] {
  const sorted = [...plans];

  switch (sortOption) {
    case 'cheapest':
      sorted.sort((a, b) => a.totalMonthlyCost - b.totalMonthlyCost);
      break;
    case 'lowest-risk':
      sorted.sort((a, b) => {
        const riskDiff = getRiskScore(a) - getRiskScore(b);
        if (riskDiff !== 0) return riskDiff;
        return a.totalMonthlyCost - b.totalMonthlyCost;
      });
      break;
    case 'shortest-term':
      sorted.sort((a, b) => {
        if (a.termMonths !== b.termMonths) return a.termMonths - b.termMonths;
        return a.totalMonthlyCost - b.totalMonthlyCost;
      });
      break;
  }

  return sorted;
}
