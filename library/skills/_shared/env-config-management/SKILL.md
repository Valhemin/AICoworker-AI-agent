---
name: env-config-management
description: Manage environment variables and feature flags correctly — typed central config, validated at startup, secrets in the right store, never leaked.
---

TRIGGER: adding a new environment variable, secret, feature flag, or external service configuration
OUTPUT: compact — variable typed and validated in `config.ts`, `.env.example` updated, no secret in code, no NEXT_PUBLIC_ prefix on secrets
SKIP: constants that are not environment-specific (e.g., `const MAX_RETRIES = 3`)

---

# Environment & Configuration Management

## Core rule

There is one place where all environment variables are read: the `config.ts` (or `env.ts`) file. Nothing else reads `process.env` directly. This means: if a variable is missing, the app fails immediately at startup with a clear message — not silently at runtime.

---

## Central config file

```typescript
// lib/config.ts (Node.js / Express / Electron)
function required(name: string): string {
  const val = process.env[name]
  if (!val) throw new Error(`Missing required environment variable: ${name}`)
  return val
}

function optional(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue
}

function requiredInt(name: string): number {
  const val = required(name)
  const num = parseInt(val, 10)
  if (isNaN(num)) throw new Error(`Environment variable ${name} must be an integer, got: ${val}`)
  return num
}

export const config = {
  app: {
    env: optional('NODE_ENV', 'development') as 'development' | 'staging' | 'production',
    port: requiredInt('PORT'),
    baseUrl: required('BASE_URL'),
  },
  db: {
    url: required('DATABASE_URL'),
    poolSize: parseInt(optional('DB_POOL_SIZE', '10'), 10),
  },
  auth: {
    secret: required('AUTH_SECRET'),
    tokenTtlSeconds: parseInt(optional('AUTH_TOKEN_TTL', '3600'), 10),
  },
  stripe: {
    secretKey: required('STRIPE_SECRET_KEY'),
    webhookSecret: required('STRIPE_WEBHOOK_SECRET'),
    publicKey: required('STRIPE_PUBLIC_KEY'),
  },
  redis: {
    url: optional('REDIS_URL', 'redis://localhost:6379'),
  },
  features: {
    newCheckout: optional('FEATURE_NEW_CHECKOUT', 'false') === 'true',   // default OFF
  },
} as const

// Validate at module load — import this before anything else
// If any required var is missing, this throws and the process exits
```

Import `config` at the top of `app.ts` / `main.ts` — before any other imports that might use env vars.

---

## Next.js — `@t3-oss/env-nextjs` (strongly preferred)

```typescript
// env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
    STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().startsWith('pk_'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
  emptyStringAsUndefined: true,
})
```

`npm run build` fails immediately if any required variable is missing — before deployment.

---

## .env.example — keep in sync (committed to git)

```bash
# .env.example — no real values, all placeholders

# Application
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000

# Database — use docker-compose.yml for local dev
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp_dev

# Auth — generate with: openssl rand -base64 32
AUTH_SECRET=<generate: openssl rand -base64 32>
AUTH_TOKEN_TTL=3600

# Stripe (use test keys from dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_<your-test-key>
STRIPE_PUBLIC_KEY=pk_test_<your-test-key>
STRIPE_WEBHOOK_SECRET=whsec_<from: stripe listen --print-secret>

# Feature flags (true|false — default false if unset)
FEATURE_NEW_CHECKOUT=false
```

Every time you add a variable to `config.ts`, add the corresponding placeholder to `.env.example`. Reviewers check this file — if the PR adds a var that's not in `.env.example`, the PR is not ready.

---

## Secret storage by environment

| Secret type | Local dev | CI/CD | Production |
|---|---|---|---|
| API keys, DB credentials | `.env.local` (gitignored) | CI secrets/variables | Secret manager (AWS Secrets Manager, Vault, etc.) |
| Electron app credentials | OS keychain (`keytar`) | N/A | OS keychain |
| Session tokens | HTTP-only cookie | N/A | HTTP-only cookie |
| Short-lived tokens | Memory only | N/A | Memory only |

Never:
- Commit `.env`, `.env.local`, `.env.production` — `.gitignore` should block these
- Put secrets in `NEXT_PUBLIC_` vars — they are embedded in the client bundle
- Log config values at startup — `logger.info('Starting', config)` leaks secrets to log aggregators
- Store API keys in `electron-store` or `localStorage` — these are readable from the filesystem

---

## Feature flags

Feature flags are boolean environment variables with a `FEATURE_` prefix. They default to `false` (disabled):

```typescript
// ✓ — safe default: new feature is OFF in all environments unless explicitly enabled
featureNewCheckout: optional('FEATURE_NEW_CHECKOUT', 'false') === 'true',

// ✓ — using in code
if (config.features.newCheckout) {
  return <NewCheckout />
}
return <LegacyCheckout />
```

To enable in staging: `FEATURE_NEW_CHECKOUT=true` in the staging environment config.
To enable in production: add to production env vars after staging verification.

For more complex flag management (user-level targeting, gradual rollout): use LaunchDarkly, Unleash, or equivalent. Do not build A/B logic into environment variables.

---

## Validation checklist

```typescript
// startup check in main.ts / app.ts
try {
  // This import triggers all required() calls
  const { config } = await import('./lib/config')
  logger.info('Config validated', {
    env: config.app.env,
    port: config.app.port,
    // ✗ NEVER: logger.info('Config', config)   — logs secrets
  })
} catch (err) {
  console.error('FATAL: Invalid config:', err.message)
  process.exit(1)   // Hard fail — do not start the app with missing config
}
```

---

## Checklist before marking scope done

- [ ] New variable added to `lib/config.ts` or `env.ts` — not read directly via `process.env` anywhere else
- [ ] Required variables use `required()` / Zod `.min(1)` — not `optional` with empty default
- [ ] `.env.example` updated with placeholder and comment explaining what the value is
- [ ] No real credentials in `.env.example`
- [ ] No secret in `NEXT_PUBLIC_` variable
- [ ] `.env` and `.env.local` are in `.gitignore`
- [ ] Feature flags default to `false` (off)
- [ ] Startup config validation prints env name and port — not secret values
