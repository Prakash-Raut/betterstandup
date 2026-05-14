@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Bun** (`bun.lock` is the source of truth — do not generate `package-lock.json` or `pnpm-lock.yaml`).

- `bun run dev` — start Next.js dev server on http://localhost:3000
- `bun run build` — production build
- `bun run start` — serve the production build
- `bun run lint` — Biome check (lint + import sort + format check)
- `bun run format` — Biome auto-format

There is no test runner configured.

## Stack notes that override defaults

- **Next.js 16.2.6 + React 19.2.4**, App Router. The repo's `AGENTS.md` warns that this version has breaking changes vs. older Next.js — when touching framework APIs (routing, caching, middleware, fetch, server components, etc.), consult `node_modules/next/dist/docs/` before writing code rather than relying on memorized patterns.
- **React Compiler is on** (`next.config.ts` → `reactCompiler: true`, plus `babel-plugin-react-compiler`). Don't add manual `useMemo`/`useCallback`/`memo` for the compiler's sake — let it do the work. Code must still follow the Rules of React or the compiler will bail out.
- **Biome (not ESLint/Prettier)** at v2.2.0 with `next` and `react` domain rules enabled. The `lint` script runs `biome check`, which also enforces import organization (`assist.actions.source.organizeImports: on`).
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.{js,ts}`. Theme tokens live as CSS variables in `app/globals.css` under `@theme inline { ... }`. Add new design tokens there, not in a JS config.
- **TypeScript path alias** `@/*` resolves to the repo root (so `@/components/ui/button`, `@/lib/utils`, etc.).

## Architecture

Single-page marketing/waitlist site for "BetterStandup".

- `app/layout.tsx` — root layout, loads the Cormorant Garamond Google font as the `--font-cormorant-garamond` CSS variable.
- `app/page.tsx` — the landing page (server component): hero, mock menu-bar popover, features, footer. Composes `<WaitlistForm />`.
- `components/sections/waitlist-form.tsx` — client component owning the email/joined/error/pending state. On submit it `await`s the `joinWaitlist` Server Action inside `useTransition`; Amplitude `setUserId` / `identify` / `track("Waitlist Joined")` only fire on the success branch.
- `app/actions/` — Server Actions (server-only side effects, `"use server"` at file top). `join-waitlist.ts` validates the email, adds the contact to a Resend segment via `resend.contacts.create({ segments: [{ id }] })`, then sends an admin notification via `resend.emails.send` with an idempotency key. Errors return a discriminated `{ ok, error }` rather than throwing.
- `lib/resend.ts` — `getResend()`, a lazy singleton that throws clearly if `RESEND_API_KEY` is missing at call time (deliberately not constructed at import time so `next build` doesn't bake an undefined key).
- `components/email-template.tsx` — **React Email template**, not a regular UI component. Built from `@react-email/components`; rendered server-side by `resend.emails.send({ react: ... })`. Despite living under `components/`, never import it from a client component.
- `instrumentation-client.ts` — Next.js 15.3+ client-side instrumentation entry point. Initializes `@amplitude/unified` (Analytics + Session Replay + Engagement) at app boot using `NEXT_PUBLIC_AMPLITUDE_API_KEY`. All autocapture (page views, sessions, form/element interactions, web vitals, network) is enabled here; the waitlist form only fires the manual `Waitlist Joined` event on success. See `amplitude-setup-report.md` for the full instrumentation contract.
- `components/ui/` — shadcn/ui components, **style `base-nova`** (configured in `components.json`). This style is built on `@base-ui/react`, not Radix — use Base UI primitives when adding new shadcn components. Icons come from `lucide-react`.
- `lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`). Use it for any conditional `className` composition.

## Environment

All values live in `.env.local` locally and must be set in the deployment platform for production.

- `NEXT_PUBLIC_AMPLITUDE_API_KEY` — inlined into the client bundle at build time.
- `RESEND_API_KEY` — server-only. Read lazily by `lib/resend.ts`.
- `RESEND_AUDIENCE_ID` — server-only. UUID copied from the Resend dashboard. Passed as `segments: [{ id }]` (the new shape; `audienceId` on `contacts.create` is deprecated in resend@6.x).
- `NOTIFY_EMAIL` — server-only. Recipient of the admin waitlist notification. **Must equal the Resend account's signup email** while the sender is `onboarding@resend.dev` — Resend silently drops anything else. Switching to a verified domain in `from` removes that restriction.
