// Database format (snake_case matching PostgreSQL schema)
export interface DatabasePlan {
  id: string;
  provider: string;
  plan_name: string;
  rate_cents_per_kwh: number;
  term_months: number;
  zip_code: string;
  created_at: string;
  updated_at: string;
  // Optional metadata fields (may not exist in DB yet)
  is_variable_rate?: boolean;
  bill_credit_kwh_threshold?: number | null;
  minimum_usage_fee?: number | null;
  early_termination_fee?: number | null;
  base_monthly_fee?: number | null;
  // High-intent filter fields
  no_deposit?: boolean | null;
  is_prepaid?: boolean | null;
  same_day_service?: boolean | null;
  green_energy_percent?: number | null;
  // Outbound link fields
  provider_url?: string | null;
  plan_url?: string | null;
  affiliate_url?: string | null;
}

// Application format (camelCase for JavaScript/TypeScript)
export interface Plan {
  id?: string;
  provider: string;
  planName: string;
  rateCentsPerKwh: number;
  termMonths: number;
  zipCode?: string;
  // Optional metadata fields (safe to be missing)
  isVariableRate?: boolean;
  billCreditKwhThreshold?: number | null;
  minimumUsageFee?: number | null;
  earlyTerminationFee?: number | null;
  baseMonthlyFee?: number | null;
  // High-intent filter fields
  noDeposit?: boolean | null;
  isPrepaid?: boolean | null;
  sameDayService?: boolean | null;
  greenEnergyPercent?: number | null;
  // Outbound link fields
  providerUrl?: string | null;
  planUrl?: string | null;
  affiliateUrl?: string | null;
}

export type FilterOption = 'no-deposit' | 'prepaid' | 'same-day' | 'green';

export interface PlanWithCost extends Plan {
  monthlyEstimate: number;
}

export interface PlanWithPricing extends Plan {
  energyCharge: number;
  tduCharge: number;
  totalMonthlyCost: number;
  whyThisPlan: string;
}
