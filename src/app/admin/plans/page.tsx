import { getAllPlans } from '@/lib/actions/plans';
import Link from 'next/link';
import DeletePlanButton from '../components/DeletePlanButton';

export default async function AdminPlansPage() {
  const plans = await getAllPlans();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-texas-navy">Manage Plans</h2>
        <Link
          href="/admin/plans/new"
          className="px-4 py-2 bg-texas-navy text-white rounded-md hover:bg-texas-navy/90 transition-colors"
        >
          + Add New Plan
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No plans found. Create your first plan to get started.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-texas-navy/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  Rate (¢/kWh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  Term
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  ZIP Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-texas-navy uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-texas-cream">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.provider}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.planName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.rateCentsPerKwh.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.termMonths} mo
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {plan.zipCode}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <Link
                      href={`/admin/plans/${plan.id}/edit`}
                      className="text-texas-navy hover:text-texas-navy/70 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeletePlanButton planId={plan.id!} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
