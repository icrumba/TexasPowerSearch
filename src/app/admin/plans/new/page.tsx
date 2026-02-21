import { createPlan } from '@/lib/actions/plans';
import PlanForm from '../../components/PlanForm';
import Link from 'next/link';

export default function NewPlanPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/plans"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Plans
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Plan</h2>

      <PlanForm action={createPlan} />
    </div>
  );
}
