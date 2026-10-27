import { defineConfig, devices } from '@playwright/test'

// The specs read NEXT_PUBLIC_SUPABASE_* / E2E_* straight from .env.local,
// the same file `next dev` loads.
try {
  process.loadEnvFile('.env.local')
} catch {
  // no .env.local yet: the specs' own missing-env errors say what to do
}

const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // 0 everywhere, even in CI: a retry that passes hides a real flake
  // instead of surfacing it. Keep a trace on the one attempt instead.
  retries: 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: baseURL,
    reuseExistingServer: true,
  },
})
