'use server';

import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Sign in with email and password
 */
export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    return { error: 'Invalid email or password.' };
  }

  redirect('/admin/plans');
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect('/');
}
