import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from './components/LogoutButton';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <header className="bg-texas-navy shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/admin/plans" className="text-xl font-bold text-white">
              Admin Panel
            </Link>
            <Link
              href="/"
              className="text-sm text-texas-gold hover:text-texas-gold/80"
            >
              ← View Public Site
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white/70">{session.user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
