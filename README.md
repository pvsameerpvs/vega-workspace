# Vega — B2B Product Catalogue Platform

A professional B2B product catalogue website with a full admin dashboard for managing products, categories, leads, blogs, careers, gallery, catalogs, team members, and website content.

## Architecture

This is a **Turborepo monorepo** with three applications and four shared packages.

```
vega-workspace/
├── apps/
│   ├── vega-frontend/      # Next.js public website (port 3000)
│   ├── vega-dashboard/     # Next.js admin dashboard (port 3001)
│   └── vega-backend/       # Node.js/Express API (port 4000)
├── packages/
│   ├── ui/                 # shadcn/ui shared components
│   ├── db/                 # Drizzle ORM + Supabase schema
│   ├── utils/              # WhatsApp, slugify, validation, upload
│   └── config/             # Shared Tailwind, TSConfig, ESLint
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 App Router, TypeScript, Tailwind CSS |
| UI Components | shadcn/ui + custom Vega variants |
| Backend | Express.js, Node.js |
| Database | Supabase PostgreSQL |
| ORM | Drizzle ORM |
| Storage | Cloudflare R2 |
| Email | Resend |
| Monorepo | Turborepo + pnpm |

## Features

- **Product Catalogue**: Browse products by category, view details, enquire via WhatsApp
- **Admin Dashboard**: Full CRUD for products, categories, leads, blogs, careers, gallery, catalogs, team, FAQs
- **Lead Management**: Store enquiries, track status, export to Excel
- **Bilingual Support**: English and Arabic with RTL layout
- **Image Protection**: CSS + JS protection against casual copying
- **SEO Optimized**: Meta tags, Open Graph, clean URLs, schema markup
- **WhatsApp Integration**: One-click product enquiries with prefilled messages

## Color Theme

- **Primary**: Vega Yellow `#FFD400` — brand highlights, CTAs
- **Secondary**: Vega Blue `#1F3A93` — buttons, headings, icons
- **Base**: White `#FFFFFF` — backgrounds, cards
- **Ratio**: 60% white, 25% yellow, 15% blue

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+
- Supabase account
- Cloudflare R2 account
- Resend API key

### Installation

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
pnpm db:generate
pnpm db:migrate

# Start all apps in development
pnpm dev
```

### Development Ports

- **Frontend**: http://localhost:3000
- **Dashboard**: http://localhost:3001
- **API**: http://localhost:4000

### Build

```bash
pnpm build
```

## Project Structure

### Frontend (`apps/vega-frontend`)

```
app/
  page.tsx              # Homepage (imports sections)
  layout.tsx            # Root layout with RTL support
  globals.css           # Global styles + image protection
  sections/             # Hero, Categories, Stats, FAQ, etc.
  about-us/
  products/             # Product listing + detail pages
  careers/
  blog/
  gallery/
  catalog/
  contact-us/
  privacy-policy/
```

### Dashboard (`apps/vega-dashboard`)

```
app/admin/
  dashboard/          # Overview stats
  products/           # Product CRUD
  categories/         # Category + subcategory manager
  leads/              # Lead/quote manager
  careers/            # Job listings + applications
  blog/               # Blog posts manager
  gallery/            # Image gallery manager
  catalogs/           # PDF catalog manager
  team/               # Team members manager
  faqs/               # FAQ manager
  settings/           # Website settings
```

### Backend (`apps/vega-backend`)

```
src/routes/
  auth.ts
  products.ts
  categories.ts
  leads.ts
  blog.ts
  gallery.ts
  catalogs.ts
  careers.ts
  team.ts
  faqs.ts
  settings.ts
  upload.ts
```

## Database Schema

The database schema is organized into modular files in `packages/db/src/schema/`:

- `enums.ts` — PostgreSQL enums (roles, status, languages)
- `users.ts` — Admin users table
- `categories.ts` — Product categories + subcategories
- `products.ts` — Full product table with specifications
- `leads.ts` — Enquiry/quote submissions
- `careers.ts` — Job listings + applications
- `content.ts` — Blogs, gallery, catalogs, team, FAQs, industries
- `homepage.ts` — Banners, videos, counters, popular categories
- `seo.ts` — SEO meta tags + translations
- `relations.ts` — Drizzle ORM relations

## Admin Roles

- **Super Admin**: Full access
- **Product Manager**: Products, categories, catalogs
- **Content Editor**: Blogs, gallery, FAQs, homepage
- **HR Manager**: Careers, job applications
- **Sales Team**: View and update leads

## API Patterns

- REST JSON under `/api/*`
- Zod validation on request bodies
- Response format: `{ error: string }` on failures, data object on success
- Status codes: `200`, `201`, `400`, `401`, `404`, `500`

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Cloudflare R2
CLOUDFLARE_R2_ENDPOINT=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=...
CLOUDFLARE_R2_PUBLIC_URL=...

# Email
RESEND_API_KEY=re_...

# WhatsApp
WHATSAPP_NUMBER=971567351095

# Auth
JWT_SECRET=...
ADMIN_SECRET=...

# App URLs
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
```

## WhatsApp Enquiry

Each product has a WhatsApp enquiry button. When clicked, it opens WhatsApp with a prefilled message:

```
Hello Vega, I am interested in this product:

Product Name: {{name}}
SKU: {{sku}}
Category: {{category}}
Quantity Required:
Delivery Location:

Please share price and availability.
```

## Image Protection

- CSS: `pointer-events: none`, `user-select: none`, `-webkit-user-drag: none`
- `onContextMenu` handler prevents right-click
- `draggable={false}` on all product images
- Note: 100% protection is impossible, but this reduces casual copying

## Coding Standards

- **Maximum 150 lines per file**
- One component per file
- Keep components under 100 lines
- Extract logic into hooks or utilities
- Use barrel exports (`index.ts`) for grouped folders

## License

© 2026 Vega. All Rights Reserved.
