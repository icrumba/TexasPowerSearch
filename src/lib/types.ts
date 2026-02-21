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
}

// Application format (camelCase for JavaScript/TypeScript)
export interface Plan {
  id?: string;
  provider: string;
  planName: string;
  rateCentsPerKwh: number;
  termMonths: number;
  zipCode?: string;
}

export interface PlanWithCost extends Plan {
  monthlyEstimate: number;
}
