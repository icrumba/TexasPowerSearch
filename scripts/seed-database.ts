import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { plansByZip } from '../src/data/plans';

// Load environment variables from .env.local
config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  for (const [zipCode, plans] of Object.entries(plansByZip)) {
    const dbPlans = plans.map(plan => ({
      provider: plan.provider,
      plan_name: plan.planName,
      rate_cents_per_kwh: plan.rateCentsPerKwh,
      term_months: plan.termMonths,
      zip_code: zipCode
    }));

    const { error } = await supabase.from('power_plans').insert(dbPlans);

    if (error) {
      console.error(`❌ Error seeding ${zipCode}:`, error);
    } else {
      console.log(`✅ Seeded ${plans.length} plans for ZIP ${zipCode}`);
    }
  }

  console.log('\n✨ Database seeding complete!');
  process.exit(0);
}

seedDatabase();
