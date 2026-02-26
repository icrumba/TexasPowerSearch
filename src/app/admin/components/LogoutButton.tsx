'use client';

import { signOut } from '@/lib/actions/auth';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-texas-red text-white rounded-md hover:bg-texas-red/90 transition-colors"
    >
      Logout
    </button>
  );
}
