import Link from 'next/link';
import { PlanWithCost } from '@/lib/types';
import { SUGGESTED_ZIP, DEFAULT_USAGE_KWH } from '@/data/plans';

interface ResultsTableProps {
  zip: string;
  plans: PlanWithCost[];
  found: boolean;
}

export default function ResultsTable({ zip, plans, found }: ResultsTableProps) {
  if (!found) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No Plans Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we don't have plans available for ZIP code {zip}.
          </p>
          <Link
            href={`/?zip=${SUGGESTED_ZIP}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try {SUGGESTED_ZIP}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Results for ZIP {zip}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Assuming {DEFAULT_USAGE_KWH.toLocaleString()} kWh/month
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Rate (¢/kWh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Term (months)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Est. Monthly Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.map((plan, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {plan.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {plan.planName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {plan.rateCentsPerKwh.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {plan.termMonths}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ${plan.monthlyEstimate.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
          {plans.length} plan{plans.length !== 1 ? 's' : ''} found • Sorted by lowest monthly cost
        </div>
      </div>
    </div>
  );
}
