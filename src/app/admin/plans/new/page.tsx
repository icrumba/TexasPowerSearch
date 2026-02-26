import { createPlan } from '@/lib/actions/plans';
import PlanForm from '../../components/PlanForm';
import Link from 'next/link';

export default function NewPlanPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/plans"
          className="text-texas-navy hover:text-texas-navy/70 hover:underline"
        >
          ← Back to Plans
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-texas-navy">Add New Plan</h2>

      <PlanForm action={createPlan} />
    </div>
  );
}
