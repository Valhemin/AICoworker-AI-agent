---
name: frontend-react
description: Build React/Next.js UI correctly — component boundaries, state management, forms, error boundaries, design tokens, accessibility, and testing.
---

TRIGGER: implementing a React or Next.js screen, component, or UI feature
OUTPUT: compact — component written, state properly scoped, forms validated, error boundary present, design tokens used, lint passes
SKIP: backend-only work with no React components

---

# Frontend React

## Before writing any component

1. Run `follow-design` — read `docs/design/DESIGN.md` and `docs/design/interface.md`. No design file → stop, request from architect.
2. Check if a similar component already exists — grep before creating.
3. Read `docs/architecture/STRUCTURE.md` if it exists — do not invent a second component layout.

---

## Component boundaries

One component = one responsibility. Split when a component does more than one of: fetch data, manage form state, render a list, render a detail view.

```
// ✓ — data fetching and rendering are separate
<UserList />        ← fetches, passes data down
  <UserCard />      ← pure rendering, no fetching

// ✗ — one component doing both
<UserListWithFetching />  ← fetches AND renders AND handles click events
```

**Composition over prop drilling**: when props pass through 3+ layers to reach their consumer, switch to Context or lift the component higher — do not add more props.

---

## State placement rule

Place state at the **lowest common ancestor**, not higher:

| State type | Where it lives |
|---|---|
| UI-only (open/closed, active tab, hover) | Component local `useState` |
| Shared between 2–3 siblings | Closest common parent |
| Server data (user, products, orders) | Server component, React Query, or SWR |
| Global app state (auth session, theme, cart) | Context or Zustand — only when truly global |

Never put server data in Zustand. Never put UI-only state in global store.

**React Query / SWR over useEffect for server data:**

```typescript
// ✓ — handles loading, error, cache, refetch
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.users.get(userId),
  staleTime: 5 * 60 * 1000,   // don't refetch if data < 5 min old
})

// ✗ — no caching, fires on every render, race conditions
useEffect(() => {
  fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser)
}, [userId])
```

---

## Forms — React Hook Form + Zod (standard pattern)

Never manage form state manually with `useState` per field:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
})
type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    await authService.login(data)   // typed, validated
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} aria-invalid={!!errors.email} />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <input type="password" {...register('password')} aria-invalid={!!errors.password} />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
```

**Common form traps:**
- Never call `setError` inside `onSubmit` for server errors — use React Hook Form's `setError('root', { message })`.
- Uncontrolled inputs are faster — avoid `value` + `onChange` for text inputs unless you need to watch the value for live preview.
- Reset the form on success: `reset()` — do not rely on remounting.

---

## Error boundaries (mandatory for every page/feature)

React does not catch async errors or promise rejections. An unhandled render error crashes the entire app unless you have an error boundary.

```typescript
// components/ErrorBoundary.tsx
'use client'   // Error boundaries must be Client Components in Next.js App Router
import { Component, ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Log to observability sink — not console.error in production
    logger.error('react-error-boundary', { error: error.message, stack: info.componentStack })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert">Something went wrong. <button onClick={() => this.setState({ hasError: false })}>Retry</button></div>
      )
    }
    return this.props.children
  }
}
```

Wrap every major feature section:
```tsx
<ErrorBoundary fallback={<FeatureError />}>
  <CheckoutFlow />
</ErrorBoundary>
```

In Next.js App Router, `error.tsx` serves as the error boundary for a route segment — still add `ErrorBoundary` around individual features within the page.

---

## useEffect traps (most common source of bugs)

```typescript
// ✗ TRAP 1 — missing dependency causes stale closure
useEffect(() => {
  fetchData(userId)   // userId changes but effect doesn't re-run
}, [])   // should be [userId]

// ✗ TRAP 2 — object/array dependency causes infinite loop
useEffect(() => {
  doSomething(options)
}, [options])   // options is a new object on every render → infinite loop
// Fix: useMemo the object, or use individual primitive values as deps

// ✗ TRAP 3 — no cleanup causes memory leak and stale updates
useEffect(() => {
  let isMounted = true
  fetch('/api/data').then(data => {
    if (isMounted) setData(data)   // ✓ — guards against unmounted update
  })
  return () => { isMounted = false }   // ✓ — cleanup
}, [])

// ✗ TRAP 4 — using useEffect for derived state
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)   // ✗ — causes extra render
}, [firstName, lastName])
// Fix: const fullName = `${firstName} ${lastName}`  — just compute it
```

**Rule**: if `eslint-plugin-react-hooks` (`exhaustive-deps`) reports a warning, fix the deps — do not add `// eslint-disable`.

---

## Key prop — do not use index

```tsx
// ✗ — reorders cause wrong items to update
{items.map((item, index) => <Item key={index} {...item} />)}

// ✓ — stable identity
{items.map(item => <Item key={item.id} {...item} />)}
```

Index as key causes wrong component instances to receive wrong props when the list order changes (drag-and-drop, prepend, sort).

---

## Design tokens — mandatory

Read `DESIGN.md` before using any color, spacing, or typography value:

```tsx
// ✓ — uses token
<div className="text-foreground bg-background p-4 rounded-md gap-2">

// ✗ — hardcodes value, won't respect dark mode or theme changes
<div style={{ color: '#1a1a1a', background: '#fff', padding: '16px' }}>
```

If a token does not exist in `DESIGN.md`, add it there and use it — never hardcode.

---

## Next.js App Router specifics

- **Server vs Client components**: default to Server Component. Add `'use client'` only for: `useState`, `useEffect`, event handlers, browser APIs. Keep the `'use client'` boundary as low as possible.
- **Data fetching in server components**: `await fetch()` or direct DB call — not in `useEffect`.
- **Images**: `next/image` always — set `width`+`height` or `fill`. Never raw `<img>`.
- **Fonts**: `next/font` only — never `@import` in CSS.
- **`use server` actions**: for form mutations — simpler than a Route Handler for basic CRUD.

---

## Accessibility (non-negotiable)

- Every interactive element has an accessible name: `aria-label`, visible `<label>`, or button text.
- Buttons use `<button>`, links use `<a href>` — never `<div onClick>`.
- Error messages use `role="alert"` or `aria-live="polite"` so screen readers announce them.
- Focus is visible on all interactive elements — do not `outline: none` without a replacement.
- `aria-invalid={!!error}` on inputs with validation errors.
- Color alone is never the only indicator of meaning.
- Images: `alt=""` for decorative, descriptive text for informational.

---

## Component testing (React Testing Library)

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('submits login form with valid data', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.type(screen.getByLabelText('Password'), 'password123')
  await user.click(screen.getByRole('button', { name: /sign in/i }))

  await waitFor(() => expect(mockAuthService.login).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  }))
})

test('shows validation error for invalid email', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  await user.type(screen.getByLabelText('Email'), 'not-an-email')
  await user.click(screen.getByRole('button', { name: /sign in/i }))

  expect(screen.getByRole('alert')).toHaveTextContent('Invalid email')
})
```

Query priority: `getByRole` > `getByLabelText` > `getByTestId`. Never query by class name or DOM structure.

---

## Performance

- Lazy load routes: `dynamic(() => import('./Page'), { loading: () => <Skeleton /> })`
- Never import full library for one function: `import { format } from 'date-fns'`
- Large lists (>50 items): use `@tanstack/virtual` — never `map` without virtualization
- `useMemo` / `useCallback`: only after profiling confirms a real cost — not preemptively

---

## Checklist before marking scope done

- [ ] No hardcoded colors, spacing, or fonts — design tokens from `DESIGN.md`
- [ ] State at correct level — server data in React Query/SWR, not Zustand
- [ ] Forms use React Hook Form + Zod — no manual `useState` per field
- [ ] Error boundary wraps the feature — no raw render crash
- [ ] `useEffect` deps complete — no ESLint `exhaustive-deps` warnings suppressed
- [ ] Keys are stable IDs — not array indexes
- [ ] All interactive elements keyboard-accessible with visible focus
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] At least one component test covering the critical user action
