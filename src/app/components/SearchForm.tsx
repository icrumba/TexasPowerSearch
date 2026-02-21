'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { isValidZip } from '@/lib/utils';

interface SearchFormProps {
  currentZip?: string;
}

export default function SearchForm({ currentZip }: SearchFormProps) {
  const router = useRouter();
  const [zip, setZip] = useState(currentZip || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!zip.trim()) {
      setError('Please enter a ZIP code');
      return;
    }

    if (!isValidZip(zip)) {
      setError('Please enter exactly 5 digits');
      return;
    }

    setError('');
    router.push(`/?zip=${zip}`);
  };

  const handleReset = () => {
    setZip('');
    setError('');
    router.push('/');
  };

  const handleChange = (value: string) => {
    setZip(value);
    if (error) {
      setError('');
    }
  };

  const isValid = isValidZip(zip);

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
            Enter ZIP Code
          </label>
          <input
            id="zip"
            type="text"
            value={zip}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="e.g., 75001"
            maxLength={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Compare Plans
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
