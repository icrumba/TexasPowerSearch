'use client';

import { deletePlan } from '@/lib/actions/plans';
import { useState } from 'react';

interface DeletePlanButtonProps {
  planId: string;
}

export default function DeletePlanButton({ planId }: DeletePlanButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    const result = await deletePlan(planId);

    if (result?.error) {
      alert(result.error);
      setIsDeleting(false);
    }
    // If successful, the page will revalidate and re-render
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-texas-red hover:text-texas-red/70 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
