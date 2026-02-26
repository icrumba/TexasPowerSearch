import { getPlanById, updatePlan } from '@/lib/actions/plans';
import PlanForm from '../../../components/PlanForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditPlanPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPlanPage({ params }: EditPlanPageProps) {
  const { id } = await params;
  const plan = await getPlanById(id);

  if (!plan) {
    notFound();
  }

  // Create a wrapper function that binds the plan ID
  const updatePlanWithId = async (prevState: any, formData: FormData) => {
    'use server';
    return updatePlan(id, formData);
  };

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

      <h2 className="text-2xl font-bold mb-6 text-texas-navy">Edit Plan</h2>

      <PlanForm action={updatePlanWithId} initialData={plan} />
    </div>
  );
}
