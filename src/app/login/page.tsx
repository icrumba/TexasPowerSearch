'use client';

import { signIn } from '@/lib/actions/auth';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-texas-navy text-white py-2 rounded-md hover:bg-texas-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, null);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-texas-red">
        <h1 className="text-2xl font-bold mb-6 text-center text-texas-navy">Admin Login</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-texas-navy focus:border-texas-navy"
            />
          </div>
          {state?.error && (
            <p className="text-texas-red text-sm bg-texas-red/10 p-3 rounded-md">
              {state.error}
            </p>
          )}
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
