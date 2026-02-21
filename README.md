# Texas Power Search

A Next.js application for comparing electricity plans in Texas, with a full-featured admin panel powered by Supabase.

## Features

### Public Features
- 🔍 Search electricity plans by ZIP code
- 💰 Compare plans by monthly cost (based on 1000 kWh usage)
- 📊 View plan details (provider, rate, contract term)
- ⚡ Fast server-side rendering with Next.js App Router

### Admin Features
- 🔐 Secure email/password authentication
- ➕ Create new electricity plans
- ✏️ Edit existing plans
- 🗑️ Delete plans
- 📋 View all plans in a searchable table

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Deployment Ready**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/icrumba/TexasPowerSearch.git
   cd TexasPowerSearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**

   Create a new project at [supabase.com](https://supabase.com)

4. **Create environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   Get these values from: Supabase Dashboard → Settings → API

5. **Create the database schema**

   Run this SQL in Supabase SQL Editor:
   ```sql
   -- Power plans table
   CREATE TABLE power_plans (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     provider TEXT NOT NULL,
     plan_name TEXT NOT NULL,
     rate_cents_per_kwh NUMERIC(5,2) NOT NULL CHECK (rate_cents_per_kwh > 0),
     term_months INTEGER NOT NULL CHECK (term_months > 0),
     zip_code TEXT NOT NULL CHECK (zip_code ~ '^\d{5}$'),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Indexes
   CREATE INDEX idx_power_plans_zip_rate ON power_plans(zip_code, rate_cents_per_kwh);
   CREATE INDEX idx_power_plans_created_at ON power_plans(created_at DESC);

   -- Auto-update timestamp
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER update_power_plans_updated_at
     BEFORE UPDATE ON power_plans
     FOR EACH ROW
     EXECUTE FUNCTION update_updated_at_column();

   -- Enable Row Level Security
   ALTER TABLE power_plans ENABLE ROW LEVEL SECURITY;

   -- Public read access
   CREATE POLICY "Public read access"
     ON power_plans FOR SELECT
     USING (true);

   -- Authenticated write access
   CREATE POLICY "Authenticated users can insert"
     ON power_plans FOR INSERT
     TO authenticated
     WITH CHECK (true);

   CREATE POLICY "Authenticated users can update"
     ON power_plans FOR UPDATE
     TO authenticated
     USING (true) WITH CHECK (true);

   CREATE POLICY "Authenticated users can delete"
     ON power_plans FOR DELETE
     TO authenticated
     USING (true);
   ```

6. **Seed the database** (optional)
   ```bash
   npx tsx scripts/seed-database.ts
   ```

7. **Create an admin user**

   In Supabase Dashboard → Authentication → Users → Add User
   - Enter email and password
   - Toggle "Auto Confirm User" to ON

8. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Usage

### Public Search
- Visit the homepage at `http://localhost:3000`
- Enter a ZIP code (e.g., 75001, 75002, 77001)
- View plans sorted by monthly cost

### Admin Panel
- Log in at `http://localhost:3000/login`
- Use your Supabase admin credentials
- Manage plans from the admin dashboard

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Public homepage
│   ├── login/                   # Login page
│   ├── admin/                   # Admin panel
│   │   ├── plans/              # CRUD for plans
│   │   └── components/         # Admin components
│   └── components/             # Public components
├── lib/
│   ├── supabase/               # Supabase clients
│   ├── actions/                # Server Actions
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
└── data/
    └── plans.ts                # Mock data for seeding
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) |

⚠️ **Never commit `.env.local` to version control!**

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Security

- ✅ Row Level Security (RLS) enabled on database
- ✅ Environment variables protected
- ✅ Admin routes protected by middleware
- ✅ Email/password authentication via Supabase Auth

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC

## Author

Built with ❤️ using Next.js and Supabase
