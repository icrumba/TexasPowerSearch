'use client';

import { signOut } from '@/lib/actions/auth';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}
