'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Plan } from '@/lib/types';

interface PlanFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: Plan;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-texas-navy text-white py-2 rounded-md hover:bg-texas-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Plan' : 'Create Plan')}
    </button>
  );
}

export default function PlanForm({ action, initialData }: PlanFormProps) {
  const [state, formAction] = useFormState(action, null);
  const isEdit = Boolean(initialData);

  return (
    <form action={formAction} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="provider" className="block text-sm font-medium mb-2">
          Provider *
        </label>
        <input
          id="provider"
          type="text"
          name="provider"
          defaultValue={initialData?.provider}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
          placeholder="e.g., TXU Energy, Reliant"
        />
      </div>

      <div>
        <label htmlFor="planName" className="block text-sm font-medium mb-2">
          Plan Name *
        </label>
        <input
          id="planName"
          type="text"
          name="planName"
          defaultValue={initialData?.planName}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
          placeholder="e.g., Energy Plus 12"
        />
      </div>

      <div>
        <label htmlFor="rateCentsPerKwh" className="block text-sm font-medium mb-2">
          Rate (¢/kWh) *
        </label>
        <input
          id="rateCentsPerKwh"
          type="number"
          name="rateCentsPerKwh"
          step="0.01"
          min="0.01"
          defaultValue={initialData?.rateCentsPerKwh}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
          placeholder="e.g., 12.50"
        />
      </div>

      <div>
        <label htmlFor="termMonths" className="block text-sm font-medium mb-2">
          Term (months) *
        </label>
        <input
          id="termMonths"
          type="number"
          name="termMonths"
          min="1"
          defaultValue={initialData?.termMonths}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
          placeholder="e.g., 12"
        />
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
          ZIP Code *
        </label>
        <input
          id="zipCode"
          type="text"
          name="zipCode"
          maxLength={5}
          pattern="\d{5}"
          defaultValue={initialData?.zipCode}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
          placeholder="e.g., 75001"
        />
        <p className="mt-1 text-sm text-gray-500">Must be 5 digits</p>
      </div>

      {state?.error && (
        <div className="p-4 bg-texas-red/10 border border-texas-red/20 rounded-md">
          <p className="text-texas-red text-sm">{state.error}</p>
        </div>
      )}

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}
