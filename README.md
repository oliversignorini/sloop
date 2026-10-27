# sloop

Template for the Next.js + Supabase stack: Next.js (App Router), TypeScript
strict, Tailwind v4 + shadcn/ui, local Supabase (Postgres, Auth, Mailpit)
with RLS on every table, a versioned HTTP JSON API with a generated OpenAPI
spec, and Vitest/pgTAP/Playwright tests.

See [`AGENTS.md`](./AGENTS.md) for the full conventions and command
reference. This file is the quick start.

## Prerequisites

- Node.js 22+, pnpm 9+
- Docker (for the local Supabase stack)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (installed as a
  devDependency; use `pnpm exec supabase`)

## Getting started

```bash
cp .env.local.example .env.local
pnpm bootstrap   # install deps, start Supabase, migrate + seed demo data
# fill NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in
# .env.local from `pnpm exec supabase status -o env`, then:
pnpm env:reset   # seeds the demo users (needs those keys)
pnpm dev         # http://localhost:3000
```

Sign in at `/login` as `member@demo.test` / `demo-password-123` (password
`demo-password-123` for every seeded user -- see AGENTS.md > Demo data).

## Everyday commands

| Command                                | What it does                                        |
| -------------------------------------- | --------------------------------------------------- |
| `pnpm dev`                             | Run the app                                         |
| `pnpm env:up`/`env:down`/`env:reset`   | Manage the local Supabase stack                     |
| `pnpm lint` / `pnpm typecheck`         | ESLint + `@shadcn/lint` + Prettier / `tsc --noEmit` |
| `pnpm test:unit`                       | Vitest, DB-free                                     |
| `pnpm test:db`                         | pgTAP against the local Supabase stack              |
| `pnpm test:e2e`                        | Playwright                                          |
| `pnpm api:generate` / `pnpm api:check` | Regenerate `openapi.json` / fail on drift           |
| `pnpm design:check`                    | impeccable design detector                          |

Full command reference and the service-layer/API-first rules are in
[`AGENTS.md`](./AGENTS.md).
