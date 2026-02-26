import Link from 'next/link';
import SearchForm from '../components/SearchForm';
import ResultsTable from '../components/ResultsTable';
import Navbar from '../components/landing/Navbar';
import { Plan } from '@/lib/types';
import { getPlansByZip } from '@/lib/actions/plans';

interface SearchPageProps {
  searchParams: Promise<{ zip?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const zip = params?.zip;
  const hasSearched = Boolean(zip);

  let plans: Plan[] = [];
  let found = false;

  if (zip) {
    const rawPlans = await getPlansByZip(zip);
    if (rawPlans && rawPlans.length > 0) {
      found = true;
      plans = rawPlans;
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16" style={{ backgroundColor: '#030305' }}>
        <div className="container mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="font-space font-black text-4xl text-white mb-2">
              <span className="text-texas-gold">&#9733;</span> Compare Plans
            </h1>
            <p className="font-jetbrains text-white/45 text-sm">
              Enter your ZIP code to see real TDU-inclusive prices
            </p>
            <Link href="/chat" className="inline-block mt-3 text-electric-blue hover:text-electric-blue/80 font-jetbrains text-sm transition-colors">
              Ask AI Advisor about power plans &rarr;
            </Link>
          </div>

          <SearchForm currentZip={zip} />

          {hasSearched && <ResultsTable zip={zip!} plans={plans} found={found} />}
        </div>
      </main>
    </>
  );
}
