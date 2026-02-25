# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for AbsoluteJS, built with Bun, Elysia, and React. It demonstrates and tests the `@absolutejs/absolute` and `@absolutejs/auth` packages.

## Commands

- **Type check**: `bun run typecheck`
- **Format**: `bun run format`
- **Database studio**: `bun run db:studio`
- **Push schema to DB**: `bun run db:push`

## Architecture

### Backend (`src/backend/`)

- **server.ts**: Elysia server entry point. Uses `@absolutejs/absolute` for React SSR via `handleReactPageRequest` and asset bundling via `build()`. Integrates `@absolutejs/auth` for OAuth authentication.
- **handlers/**: Database operations for users, providers, and error logging
- **plugins/**: Elysia plugins (e.g., `providerPlugin` for OAuth provider status API)
- **utils/absoluteAuthConfig.ts**: Auth configuration with lifecycle hooks (`onCallbackSuccess`, `onProfileSuccess`, etc.) that update provider testing statuses in the database

### Frontend (`src/frontend/`)

- **pages/**: Top-level page components (Home, Documentation, AuthTesting) - these are full HTML documents rendered server-side
- **components/**: React components organized by feature (navbar, sidebar, home, documentation, testing, auth, utils)
- **hooks/**: Custom hooks including `useAuthStatus` for auth state, `useTheme` for theming with react-spring
- **eden/treaty.ts**: Type-safe API client using Eden treaty with the server type
- **styles/**: Style objects (not CSS files) - styles are colocated as TypeScript objects
- **data/**: Static content data for documentation pages

### Database (`db/`)

- Uses Drizzle ORM with Neon (serverless Postgres)
- **schema.ts**: Defines `users`, `providers`, `errorLogs`, `unknownErrorLogs` tables
- **scripts/**: Database maintenance scripts for provider status management

### Type System (`src/types/`)

- **typebox.ts**: TypeBox schemas for API validation (used with Elysia)
- **types.ts**: Shared TypeScript types

## Rules

- **No type assertions.** Never use `as any`, `as unknown`, or other TypeScript type assertions (`as X`). They break type inference chains — especially in Elysia plugin composition where eden treaty relies on full type flow through `.use()`. If TypeScript can't infer a type, fix the underlying type issue instead of casting.

## Key Patterns

### React Components

- Props are defined as separate `type` declarations (e.g., `type HomeProps = {...}`)
- Components return full HTML documents for pages (including `<html>`, `<Head>`, `<body>`)
- Uses react-spring for animations via `animated` components and spring hooks
- Theme state flows through `themeSprings` prop

### API Type Safety

The frontend uses Eden treaty (`src/frontend/eden/treaty.ts`) to create a type-safe client from the server type, enabling end-to-end type safety between backend and frontend.
