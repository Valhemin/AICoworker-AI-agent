---
name: nextjs-patterns
description: Next.js App Router patterns — routing, data fetching, caching, mutations, auth, metadata/SEO, streaming, and build correctness.
---

TRIGGER: building a Next.js feature — new route, page, API route handler, middleware, data-fetching pattern, SEO metadata, or streaming
OUTPUT: compact — route works correctly, caching explicit, auth enforced in middleware, metadata present, build passes
SKIP: React component internals with no Next.js routing/data-fetching — use `frontend-react` instead

---

# Next.js Patterns (App Router)

## Mental model: file conventions

```
app/
  layout.tsx          ← shared UI + providers, server component, runs on every request in the segment
  page.tsx            ← server component by default, renders the route
  loading.tsx         ← Suspense fallback shown while page.tsx is streaming
  error.tsx           ← error boundary for the segment — MUST be 'use client'
  not-found.tsx       ← shown when notFound() is called anywhere in the segment
  route.ts            ← API route handler (replaces pages/api/)
  template.tsx        ← like layout but remounts on navigation (rare — use for animations)
```

**Server component** (default): runs on server, can `await` directly, accesses DB/fs, no browser APIs.
**Client component** (`'use client'`): runs in browser, can use hooks/events, cannot `await` at top level.

---

## Data fetching — choose the right pattern

| Situation | Pattern |
|---|---|
| Data known at build time, rarely changes | `generateStaticParams` + no `cache: 'no-store'` |
| Data changes per request | `fetch(url, { cache: 'no-store' })` in server component |
| Data can be cached and revalidated | `fetch(url, { next: { revalidate: 60 } })` (ISR) |
| Data changes after a mutation | `fetch` with `next: { tags: ['products'] }` + `revalidateTag` |
| DB query without fetch (Prisma direct) | `import { unstable_cache } from 'next/cache'` — see below |
| Mutation (form submit) | Server Action (`'use server'` function) |
| Client-side live updates | SWR or React Query in `'use client'` component |
| Sensitive data (API keys, DB) | Server component or Route Handler — NEVER client component |

**`unstable_cache` for non-fetch data sources (Prisma, Redis):**

```typescript
import { unstable_cache } from 'next/cache'

const getProducts = unstable_cache(
  async (categoryId: string) => db.products.findMany({ where: { categoryId } }),
  ['products-by-category'],   // cache key prefix
  { tags: ['products'], revalidate: 60 }
)

// In a server component:
const products = await getProducts(categoryId)
```

After a mutation: `import { revalidateTag } from 'next/cache'; revalidateTag('products')`

---

## Caching — be explicit (Next.js 15 changed defaults)

In Next.js 15, `fetch` is **not cached by default** (unlike Next.js 14 where it was). Be explicit in every case:

```typescript
// No cache — always fresh (database-level data)
const data = await fetch(url, { cache: 'no-store' })

// Cache with tag-based invalidation
const data = await fetch(url, { next: { tags: ['products', `product-${id}`] } })
// To invalidate: revalidateTag('products') or revalidateTag(`product-${id}`)

// Time-based revalidation (ISR)
const data = await fetch(url, { next: { revalidate: 3600 } })   // refresh at most every hour
```

If you rely on implicit caching behavior, it will differ between Next.js versions. Always be explicit.

---

## Server Actions (mutations)

```typescript
// app/products/actions.ts
'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const CreateProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
})

export async function createProduct(formData: FormData) {
  const session = await auth()
  if (!session) redirect('/login')   // redirect() throws — no return needed

  const parsed = CreateProductSchema.safeParse({
    name: formData.get('name'),
    price: Number(formData.get('price')),
  })
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }   // return error for client to display
  }

  await db.products.create({ data: { ...parsed.data, userId: session.user.id } })
  revalidateTag('products')          // invalidate cached product lists
  redirect('/products')              // redirect after success
}
```

**Use with `useActionState` for error display (React 19 / Next.js 15):**

```typescript
'use client'
import { useActionState } from 'react'
import { createProduct } from './actions'

export function ProductForm() {
  const [state, action, isPending] = useActionState(createProduct, null)

  return (
    <form action={action}>
      <input name="name" />
      <input name="price" type="number" />
      {state?.error && <p role="alert">{state.error}</p>}
      <button disabled={isPending}>{isPending ? 'Saving…' : 'Create'}</button>
    </form>
  )
}
```

---

## Streaming with Suspense

Stream slow data without blocking the whole page:

```typescript
// app/dashboard/page.tsx — server component
import { Suspense } from 'react'

export default async function Dashboard() {
  // Fast data — resolve immediately
  const user = await getUser()

  return (
    <div>
      <h1>Welcome, {user.name}</h1>

      {/* Slow data — stream when ready */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />   {/* This component fetches slowly */}
      </Suspense>

      <Suspense fallback={<RecentOrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}
```

Each `<Suspense>` boundary streams independently. The page shell renders immediately; slow sections fill in as data arrives.

---

## Metadata and SEO (`generateMetadata`)

Every public page must export metadata. Static pages use the `metadata` export; dynamic pages use `generateMetadata`:

```typescript
// app/products/[id]/page.tsx

// ✓ Dynamic metadata — receives params and searchParams
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) return {}   // not-found.tsx will handle the missing case

  return {
    title: `${product.name} — YourStore`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.imageUrl, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://yourstore.com/products/${product.id}`,
    },
  }
}

// ✓ Static metadata for non-dynamic pages
export const metadata = {
  title: 'Products — YourStore',
  description: 'Browse our product catalog.',
  robots: { index: true, follow: true },
}
```

Set root metadata in `app/layout.tsx`:

```typescript
export const metadata = {
  metadataBase: new URL('https://yourstore.com'),   // needed for relative OG image URLs
  title: { default: 'YourStore', template: '%s — YourStore' },
  description: 'Default description',
}
```

---

## Auth (next-auth v5 / auth.js)

```typescript
// middleware.ts — runs at the edge, before any page renders
export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*',
    // Exclude public assets and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
```

In server components — never protect only in the component, always in middleware first:

```typescript
// app/dashboard/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/login')   // fallback — middleware should have caught this

  return <div>Welcome {session.user.name}</div>
}
```

---

## Route Handlers (API routes)

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ code: 'UNAUTHORIZED' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ code: 'INVALID_JSON' }, { status: 400 })

  const parsed = CreateProductSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ code: 'VALIDATION_ERROR', errors: parsed.error.errors }, { status: 400 })
  }

  const product = await productService.create(parsed.data, session.user.id)
  return NextResponse.json(product, { status: 201 })
}

// Force dynamic rendering for this route (opt out of caching)
export const dynamic = 'force-dynamic'
```

**Reading cookies and headers in server components (Next.js 15 — async):**

```typescript
import { cookies, headers } from 'next/headers'

// Next.js 15: these are async
const cookieStore = await cookies()
const token = cookieStore.get('token')?.value

const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

---

## Parallel Routes and Intercepting Routes

Use Parallel Routes for simultaneously rendered sections (e.g., modal + page):

```
app/
  @modal/
    (.)photos/[id]/
      page.tsx     ← intercepted modal view
  photos/
    [id]/
      page.tsx     ← full page view when accessed directly
  layout.tsx       ← receives { children, modal } props
```

Use when: user clicks photo → sees modal; shares URL → sees full page.

---

## Environment variables

- `NEXT_PUBLIC_` prefix: bundled into client code — **no secrets**.
- No prefix: server-only — API keys, DB URLs, secrets.
- Validate at build time with `@t3-oss/env-nextjs`:

```typescript
// env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
})
```

Build fails immediately if a required env var is missing — no silent runtime crash.

---

## Build verification

```bash
npm run build     # catches type errors, missing env vars, invalid imports
npm run lint      # catches style and correctness issues
```

Never mark a Next.js feature done without a clean `npm run build`. TypeScript and the Next.js compiler have different error sets — passing `tsc --noEmit` does not guarantee the build passes.

---

## Checklist before marking scope done

- [ ] Server vs Client component choice is intentional — `'use client'` only where needed
- [ ] Caching is explicit — `cache: 'no-store'` or `revalidate` set deliberately
- [ ] `revalidatePath` or `revalidateTag` called after every mutation
- [ ] `generateMetadata` exported for all public-facing pages
- [ ] Auth enforced in middleware — not only in page components
- [ ] `NEXT_PUBLIC_` vars contain no secrets
- [ ] Slow data wrapped in `<Suspense>` with a skeleton fallback
- [ ] `npm run build` passes clean
