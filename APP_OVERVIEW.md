# Texas Power Search - App Overview

A full-stack Next.js application for comparing electricity plans in Texas by ZIP code, with an AI chat assistant and a secure admin panel.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth (email/password) |
| Styling | Tailwind CSS (custom Texas theme) |
| AI | OpenAI GPT-4o-mini |
| Deployment | Vercel |

## Features

### 1. Plan Search (Homepage `/`)

Users enter a 5-digit Texas ZIP code to compare electricity plans. Results display in a table sorted by lowest monthly cost, with estimates based on 1,000 kWh/month usage.

- ZIP code validation (client-side)
- Plans fetched from Supabase `power_plans` table
- Monthly cost calculated automatically
- "No Plans Found" fallback with suggested ZIP

### 2. AI Chat (`/chat`)

A conversational AI assistant specialized in Texas electricity plans. Users can ask questions and get real-time answers powered by OpenAI with web search capability.

- Chat bubbles (user = navy, assistant = cream)
- Conversation memory via `previousResponseId`
- Web search enabled for current information
- Auto-scroll to latest message

### 3. Prompt Optimizer

A button in the chat interface that improves user prompts before sending. Uses AI to make questions more specific and structured (max 3 sentences).

### 4. Admin Panel (`/admin`)

A protected area for managing electricity plans. Requires email/password login.

**CRUD Operations:**
- **Create** — Add new plans with provider, name, rate, term, and ZIP code
- **Read** — View all plans in a table (sorted by newest)
- **Update** — Edit any plan's details
- **Delete** — Remove plans with confirmation dialog

**Validation on all forms:**
- All fields required
- Rate must be positive
- Term must be positive
- ZIP code must be exactly 5 digits

### 5. Authentication

- Email/password login via Supabase Auth
- Middleware protects all `/admin/*` routes
- Server-side session check in admin layout (double protection)
- Logout redirects to homepage

### 6. Database Security

- Row Level Security (RLS) enabled on `power_plans` table
- Public users can only read plans
- Only authenticated users can create, update, or delete
- Auto-updating `updated_at` timestamps

## Pages

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Search and compare plans by ZIP |
| `/chat` | Public | AI chat about electricity plans |
| `/login` | Public | Admin authentication |
| `/admin/plans` | Protected | View and manage all plans |
| `/admin/plans/new` | Protected | Create a new plan |
| `/admin/plans/[id]/edit` | Protected | Edit an existing plan |

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chat` | POST | AI chat with web search |
| `/api/optimize` | POST | Prompt optimization |

## Data Model

```
power_plans
├── id (UUID, auto-generated)
├── provider (text) — e.g., "TXU Energy"
├── plan_name (text) — e.g., "Energy Plus 12"
├── rate_cents_per_kwh (numeric) — e.g., 12.50
├── term_months (integer) — e.g., 12
├── zip_code (text) — e.g., "75001"
├── created_at (timestamp)
└── updated_at (timestamp)
```

**Indexes:**
- `(zip_code, rate_cents_per_kwh)` — Optimizes search queries
- `(created_at DESC)` — Optimizes admin list sorting

## Texas Theme

| Color | Hex | Usage |
|-------|-----|-------|
| Texas Navy | #002868 | Buttons, headers, table headers |
| Texas Red | #BF0A30 | Accents, card borders, delete actions |
| Texas Gold | #D4A017 | Star icon, cost highlights, optimize button |
| Texas Cream | #FDF6E3 | Page background, AI chat bubbles |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (seeding) |
| `OPENAI_API_KEY` | OpenAI API key for chat & optimizer |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    — Homepage (search)
│   ├── layout.tsx                  — Root layout
│   ├── globals.css                 — Global styles
│   ├── chat/page.tsx               — AI chat page
│   ├── login/page.tsx              — Login page
│   ├── components/
│   │   ├── SearchForm.tsx          — ZIP code search form
│   │   └── ResultsTable.tsx        — Plans results table
│   ├── admin/
│   │   ├── layout.tsx              — Admin layout (auth guard)
│   │   ├── page.tsx                — Redirects to /admin/plans
│   │   ├── plans/page.tsx          — Plans list
│   │   ├── plans/new/page.tsx      — Create plan
│   │   ├── plans/[id]/edit/page.tsx — Edit plan
│   │   └── components/
│   │       ├── PlanForm.tsx        — Reusable plan form
│   │       ├── DeletePlanButton.tsx — Delete with confirmation
│   │       └── LogoutButton.tsx    — Logout action
│   └── api/
│       ├── chat/route.ts           — AI chat endpoint
│       └── optimize/route.ts       — Prompt optimizer endpoint
├── lib/
│   ├── types.ts                    — TypeScript interfaces
│   ├── utils.ts                    — Helper functions
│   ├── actions/
│   │   ├── auth.ts                 — Sign in/out actions
│   │   └── plans.ts                — Plan CRUD actions
│   └── supabase/
│       ├── client.ts               — Browser Supabase client
│       ├── server.ts               — Server Supabase client
│       └── middleware.ts           — Middleware Supabase client
├── data/
│   └── plans.ts                    — Mock/seed data
middleware.ts                       — Route protection
```

## Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npx tsx scripts/seed-database.ts  # Seed database with mock data
```
