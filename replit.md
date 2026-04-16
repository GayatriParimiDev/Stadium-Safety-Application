# Sahara Event Core

## Overview

Smart Event Experience Platform — a venue intelligence dashboard for large-scale sporting events. Implements "Sun-Baked Simplicity" design system with warm minimalist aesthetics.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/sahara-event-core)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI**: Tailwind CSS + Radix UI + shadcn/ui
- **Charts**: Recharts
- **Routing**: Wouter
- **State**: TanStack Query

## Features

1. **Dashboard** (`/`) — Live event status (Lions FC vs Hawks SC), crowd density, real-time alerts, quick actions
2. **Live Feed** (`/live-feed`) — Gate intelligence, crowd zone density, amenity capacity, AI congestion forecast
3. **Concierge** (`/concierge`) — Food vendor listings, optimal pickup windows chart, order placement
4. **Notifications** (`/notifications`) — Priority-based alerts (critical/high/medium/low), dismiss support
5. **Profile** (`/profile`) — User preferences, accessibility toggles, topic interests, catering prefs

## Design System

- **Primary**: #c2652a (burnt sienna)
- **Background**: #faf5ee (warm linen)
- **Headlines**: EB Garamond (Google Font)
- **Body**: Manrope (Google Font)
- **Icons**: Material Symbols Outlined

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## API Routes

- `GET /api/dashboard/event` — Live event status
- `GET /api/dashboard/stats` — Dashboard summary stats
- `GET /api/crowd/zones` — Crowd zone density
- `GET /api/crowd/gates` — Gate wait times
- `GET /api/crowd/amenities` — Amenity capacity
- `GET /api/crowd/forecast` — AI congestion forecast
- `GET /api/orders/vendors` — Vendor list (with ?category filter)
- `GET /api/orders/vendors/:id` — Vendor details + menu
- `GET /api/orders/pickup-windows` — Optimal pickup times
- `POST /api/orders` — Place order
- `GET /api/orders` — Get orders
- `GET /api/notifications` — Get notifications
- `POST /api/notifications/:id/dismiss` — Dismiss notification
- `GET /api/profile` — Get user profile
- `PUT /api/profile` — Update profile preferences

## DB Schema

- `events` — Live event data
- `crowd_zones` — Zone density (low/moderate/high/peak)
- `gate_status` — Gate wait times and congestion
- `amenity_status` — Restroom/lounge capacity
- `vendors` — Food vendor listings
- `menu_items` — Vendor menu items
- `orders` — Placed orders
- `notifications` — Priority alerts
- `profiles` — User profile and preferences

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
