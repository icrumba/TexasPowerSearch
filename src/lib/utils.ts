import { PlanWithCost } from './types';

/**
 * Calculate monthly cost based on rate and usage
 * Formula: (rate_cents_per_kwh / 100) * usage_kwh
 */
export function calculateMonthlyCost(
  rateCentsPerKwh: number,
  usageKwh: number = 1000
): number {
  return (rateCentsPerKwh / 100) * usageKwh;
}

/**
 * Sort plans by monthly estimate (ascending - lowest first)
 */
export function sortPlansByCost(plans: PlanWithCost[]): PlanWithCost[] {
  return [...plans].sort((a, b) => a.monthlyEstimate - b.monthlyEstimate);
}

/**
 * Validate ZIP code (exactly 5 digits)
 */
export function isValidZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}
