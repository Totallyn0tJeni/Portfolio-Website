# Personal Portfolio Website

## Overview

A personal portfolio website built with a modern full-stack architecture. The application showcases clubs/organizations, marketing work, and coding projects with a glassmorphism-styled UI featuring smooth animations. It includes a contact form for visitor messages stored in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Clubs, Marketing, Coding, and Contact
- **Styling**: Tailwind CSS with custom glassmorphism theme, CSS variables for theming, and custom fonts (Outfit, Plus Jakarta Sans)
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **State Management**: TanStack React Query for server state and data fetching
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all table definitions and Zod insert schemas

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Tables**: 
  - `clubs` - Organization memberships and roles
  - `marketing_work` - Marketing portfolio pieces
  - `projects` - Coding projects with tech stacks
  - `messages` - Contact form submissions
- **Migrations**: Drizzle Kit with `db:push` command for schema sync

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Custom build script using esbuild for server bundling and Vite for client, outputting to `dist/` directory
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets

## External Dependencies

### Database
- PostgreSQL database required (provision via Replit's database feature)
- Connection string via `DATABASE_URL` environment variable

### Key NPM Packages
- **UI**: Radix UI primitives, Lucide React icons, class-variance-authority
- **Data**: Drizzle ORM, TanStack React Query, Zod
- **Animation**: Framer Motion
- **Forms**: React Hook Form

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development tooling