import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import { DEFAULT_USAGE_KWH } from '@/data/plans';
import { calculateMonthlyCost, sortPlansByCost } from '@/lib/utils';
import { PlanWithCost } from '@/lib/types';
import { getPlansByZip } from '@/lib/actions/plans';

interface HomeProps {
  searchParams: Promise<{ zip?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const zip = params?.zip;
  const hasSearched = Boolean(zip);

  let plans: PlanWithCost[] = [];
  let found = false;

  if (zip) {
    const rawPlans = await getPlansByZip(zip);
    if (rawPlans && rawPlans.length > 0) {
      found = true;
      plans = sortPlansByCost(
        rawPlans.map((plan) => ({
          ...plan,
          monthlyEstimate: calculateMonthlyCost(plan.rateCentsPerKwh, DEFAULT_USAGE_KWH),
        }))
      );
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Texas Power Search
        </h1>
        <p className="text-gray-600">
          Compare electricity plans by ZIP code
        </p>
      </div>

      <SearchForm currentZip={zip} />

      {hasSearched && <ResultsTable zip={zip!} plans={plans} found={found} />}
    </main>
  );
}
