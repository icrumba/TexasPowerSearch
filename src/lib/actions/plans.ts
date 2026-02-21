'use server';

import { createServerClient } from '@/lib/supabase/server';
import { Plan, DatabasePlan } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Fetches all plans for a given ZIP code (public search)
 */
export async function getPlansByZip(zipCode: string): Promise<Plan[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('power_plans')
    .select('*')
    .eq('zip_code', zipCode)
    .order('rate_cents_per_kwh', { ascending: true });

  if (error || !data) {
    console.error('Error fetching plans:', error);
    return [];
  }

  // Transform database format (snake_case) to application format (camelCase)
  return data.map((plan: DatabasePlan) => ({
    id: plan.id,
    provider: plan.provider,
    planName: plan.plan_name,
    rateCentsPerKwh: plan.rate_cents_per_kwh,
    termMonths: plan.term_months,
    zipCode: plan.zip_code,
  }));
}

/**
 * Fetches all plans (admin panel)
 */
export async function getAllPlans(): Promise<Plan[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('power_plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching all plans:', error);
    return [];
  }

  return data.map((plan: DatabasePlan) => ({
    id: plan.id,
    provider: plan.provider,
    planName: plan.plan_name,
    rateCentsPerKwh: plan.rate_cents_per_kwh,
    termMonths: plan.term_months,
    zipCode: plan.zip_code,
  }));
}

/**
 * Fetches a single plan by ID (for editing)
 */
export async function getPlanById(id: string): Promise<Plan | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('power_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching plan by ID:', error);
    return null;
  }

  return {
    id: data.id,
    provider: data.provider,
    planName: data.plan_name,
    rateCentsPerKwh: data.rate_cents_per_kwh,
    termMonths: data.term_months,
    zipCode: data.zip_code,
  };
}

/**
 * Creates a new plan (admin)
 */
export async function createPlan(formData: FormData) {
  const supabase = await createServerClient();

  const planData = {
    provider: formData.get('provider') as string,
    plan_name: formData.get('planName') as string,
    rate_cents_per_kwh: parseFloat(formData.get('rateCentsPerKwh') as string),
    term_months: parseInt(formData.get('termMonths') as string, 10),
    zip_code: formData.get('zipCode') as string,
  };

  // Validation
  if (
    !planData.provider ||
    !planData.plan_name ||
    isNaN(planData.rate_cents_per_kwh) ||
    isNaN(planData.term_months) ||
    !planData.zip_code
  ) {
    return { error: 'Invalid form data. Please check all fields.' };
  }

  if (planData.rate_cents_per_kwh <= 0 || planData.term_months <= 0) {
    return { error: 'Rate and term must be positive numbers.' };
  }

  if (!/^\d{5}$/.test(planData.zip_code)) {
    return { error: 'ZIP code must be 5 digits.' };
  }

  const { error } = await supabase.from('power_plans').insert(planData);

  if (error) {
    console.error('Error creating plan:', error);
    return { error: 'Failed to create plan. Please try again.' };
  }

  revalidatePath('/admin/plans');
  revalidatePath('/'); // Update public search cache
  redirect('/admin/plans');
}

/**
 * Updates an existing plan (admin)
 */
export async function updatePlan(id: string, formData: FormData) {
  const supabase = await createServerClient();

  const planData = {
    provider: formData.get('provider') as string,
    plan_name: formData.get('planName') as string,
    rate_cents_per_kwh: parseFloat(formData.get('rateCentsPerKwh') as string),
    term_months: parseInt(formData.get('termMonths') as string, 10),
    zip_code: formData.get('zipCode') as string,
  };

  // Validation
  if (
    !planData.provider ||
    !planData.plan_name ||
    isNaN(planData.rate_cents_per_kwh) ||
    isNaN(planData.term_months) ||
    !planData.zip_code
  ) {
    return { error: 'Invalid form data. Please check all fields.' };
  }

  if (planData.rate_cents_per_kwh <= 0 || planData.term_months <= 0) {
    return { error: 'Rate and term must be positive numbers.' };
  }

  if (!/^\d{5}$/.test(planData.zip_code)) {
    return { error: 'ZIP code must be 5 digits.' };
  }

  const { error } = await supabase
    .from('power_plans')
    .update(planData)
    .eq('id', id);

  if (error) {
    console.error('Error updating plan:', error);
    return { error: 'Failed to update plan. Please try again.' };
  }

  revalidatePath('/admin/plans');
  revalidatePath('/');
  redirect('/admin/plans');
}

/**
 * Deletes a plan (admin)
 */
export async function deletePlan(id: string) {
  const supabase = await createServerClient();

  const { error } = await supabase.from('power_plans').delete().eq('id', id);

  if (error) {
    console.error('Error deleting plan:', error);
    return { error: 'Failed to delete plan. Please try again.' };
  }

  revalidatePath('/admin/plans');
  revalidatePath('/');
  return { success: true };
}
