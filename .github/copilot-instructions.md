# AI Copilot Instructions for Portfolio Website

## Architecture Overview

This is a **full-stack portfolio website** using:
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, Framer Motion for animations
- **Backend**: Express.js with TypeScript, PostgreSQL with Drizzle ORM
- **Shared**: Type-safe API contracts via Zod schemas in `/shared` directory
- **Build**: esbuild for server, Vite for client

**Key insight**: The `/shared` folder defines both database schemas AND API contracts in a single source. This allows type-safe communication between client and server without duplication.

## Critical Architecture Patterns

### 1. Shared Schema & API Routes (Single Source of Truth)
- **Location**: [shared/schema.ts](shared/schema.ts) and [shared/routes.ts](shared/routes.ts)
- **Pattern**: Drizzle ORM tables + Zod validation schemas are exported and reused for both database and API contracts
- **Example**: A clubs table gets `Club` type and `insertClubSchema` automatically for validation
- **When adding features**: Define schema in `shared/schema.ts`, then API route contracts in `shared/routes.ts`, then implement in server/routes.ts

### 2. Three-Tier Request Flow
1. **Client**: Uses React Query with `apiRequest()` helper ([client/src/lib/queryClient.ts](client/src/lib/queryClient.ts))
2. **API Routes**: Express handlers in [server/routes.ts](server/routes.ts) validate with Zod, call storage layer
3. **Storage**: [server/storage.ts](server/storage.ts) wraps Drizzle ORM database queries (DatabaseStorage class)

### 3. Type-Safe API Integration
- Pages use React Query hooks for data fetching with proper error handling
- API responses validated against Zod schemas defined in `shared/`
- All API paths defined in `api` object for consistency (avoid hardcoded URLs)

## Project Structure Logic

```
client/src/
├── pages/         # Page components (route-level), e.g., Clubs.tsx, Coding.tsx
├── components/    # Reusable UI components, shadcn-like ui/* components
├── hooks/         # Custom React hooks (use-portfolio.ts, use-toast.ts)
└── lib/           # Utilities (queryClient.ts, utils.ts)

server/
├── routes.ts      # Express route handlers (GET /api/clubs, POST /api/contact)
├── storage.ts     # DatabaseStorage class implementing IStorage interface
├── db.ts          # Drizzle database connection
└── index.ts       # Express app setup

shared/
├── schema.ts      # Drizzle tables + Zod schemas (single source of truth)
└── routes.ts      # API route definitions with types (buildUrl, api object)
```

## Development Workflows

### Build Command
```bash
npm run build  # Compiles client with Vite, server with esbuild to dist/
```
Uses allowlist pattern in [script/build.ts](script/build.ts) - only specified node_modules bundled into server to reduce cold start.

### Dev Command
```bash
npm run dev  # Runs server with tsx (hot reload), serves Vite dev client
```

### Type Checking
```bash
npm run check  # Run tsc without emitting, validates entire project
```

### Database
```bash
npm run db:push  # Drizzle kit command to migrate schema to PostgreSQL
```

## UI Component Conventions

- **shadcn-inspired** components in `client/src/components/ui/*` - Radix UI primitives + TailwindCSS
- **Animations**: Framer Motion with `PageTransition` wrapper ([client/src/components/PageTransition.tsx](client/src/components/PageTransition.tsx))
- **Layout**: Mobile-first TailwindCSS with responsive breakpoints (lg:, md:, etc.)
- **Icons**: lucide-react library

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

Used consistently across imports - prefer aliases over relative paths.

## Common Modifications

### Adding a New Resource (e.g., new data type)
1. Define Drizzle table + Zod schema in `shared/schema.ts`
2. Add route definition to `api` object in `shared/routes.ts`
3. Implement GET/POST handlers in `server/routes.ts`
4. Add storage methods to `DatabaseStorage` in `server/storage.ts`
5. Create React page component using React Query in `client/src/pages/`

### Styling New Components
- Use TailwindCSS utility classes (no CSS files needed for most cases)
- Dark mode via next-themes context (check Navbar.tsx for example)
- Glass morphism patterns: `backdrop-blur-xl bg-white/5 border border-white/10`

### Form Handling
- React Hook Form with Zod validation ([package.json](package.json) has @hookform/resolvers)
- Leverage ui/form.tsx component for consistent styling

## Database Notes

- **ORM**: Drizzle with PostgreSQL
- **Connection**: Managed in [server/db.ts](server/db.ts)
- **Migrations**: Use `npm run db:push` (not migrations folder - schema-driven)
- **Types**: Exported from schema tables (e.g., `typeof clubs.$inferSelect`)

## Deployment Context

Built for Replit with runtime error overlays and dev banner plugins (conditional in vite.config.ts).
