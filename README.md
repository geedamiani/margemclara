# Margem Clara

Inteligência financeira para transportadoras.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts (dashboard charts)
- Supabase (lead capture)

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (marketing) |
| `/calculadora` | Cost-per-km calculator + lead capture |
| `/painel` | Dashboard — Visão Geral |
| `/clientes` | Dashboard — Clientes |
| `/rotas` | Dashboard — Rotas |
| `/simulacao` | Dashboard — Simulação |
| `/importar` | Dashboard — Importar Dados |
| `/relatorios` | Dashboard — Relatórios |
| `/configuracoes` | Dashboard — Configurações |

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

The landing page and calculator render without Supabase. A lead is saved only when the insert into `leads` succeeds. If `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing, or the insert fails, the form shows an error instead of a success message.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Supabase setup

Create the `leads` table in your Supabase project:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  source text not null,
  nome text not null,
  email text not null,
  whatsapp text not null,
  empresa text not null,
  frota integer,
  faturamento_anual text,
  objetivo text,
  mensagem text
);

-- Enable Row Level Security
alter table leads enable row level security;

-- Anonymous visitors may insert a lead. No select, update, or delete.
revoke all on table leads from public, anon;
grant insert on table leads to anon;

create policy "Allow anonymous inserts"
  on leads
  for insert
  to anon
  with check (true);
```

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, globals)
│   ├── globals.css
│   ├── (marketing)/            # Public marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page (/)
│   │   └── calculadora/
│   │       └── page.tsx        # Calculator (/calculadora)
│   └── (dashboard)/            # App dashboard (demo)
│       ├── layout.tsx          # Wraps with AppShell + Sidebar
│       ├── painel/page.tsx
│       ├── clientes/page.tsx
│       └── ...
├── components/
│   ├── marketing-header.tsx    # Shared header for marketing pages
│   ├── lead-form.tsx           # Reusable lead capture form
│   ├── app-shell.tsx           # Dashboard shell (sidebar + content)
│   └── ...
└── lib/
    ├── supabase.ts             # Supabase client + insertLead()
    ├── demo-data.ts            # Dashboard demo data
    ├── company-context.tsx     # Company switching context
    └── format.ts               # BR formatting utilities
```
