# Vega Monorepo — Agent Guidelines

## Architecture

This is a **Turborepo monorepo** with three apps and four shared packages.

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

## Coding Rules

### 1. File Size Limit
- **Maximum 150 lines per file.**
- If a file exceeds 150 lines, split it into smaller files.
- Example: `schema.ts` → `schema/enums.ts`, `schema/users.ts`, `schema/products.ts`, etc.
- Example: `page.tsx` → `sections/HeroSection.tsx`, `sections/FaqSection.tsx`, etc.

### 2. Component Rules
- One component per file.
- Export component from an `index.ts` barrel file if grouped in a folder.
- Keep components under 100 lines. Extract logic into hooks or utilities.

### 3. Naming Conventions
- React components: `PascalCase.tsx`
- Utilities/hooks: `camelCase.ts`
- Constants: `SCREAMING_SNAKE_CASE` inside a file or `constants.ts`
- Database tables: `snake_case` in PostgreSQL, `camelCase` in TypeScript

### 4. Folder Structure

**Frontend (`apps/vega-frontend`)**
```
app/
  page.tsx              # only imports sections
  layout.tsx            # root layout
  globals.css           # global styles
  sections/             # homepage sections (each < 100 lines)
  about-us/
  products/
  careers/
  blog/
  gallery/
  catalog/
  contact-us/
  privacy-policy/
components/
  ui/                   # re-exports from @vega/ui
  layout/               # Header, Footer, Sidebar
  forms/                # LeadForm, ContactForm, JobForm
  product/              # ProductCard, ProductGrid, ProductDetail
hooks/
  use-leads.ts
  use-products.ts
lib/
  api.ts
  i18n.ts
```

**Dashboard (`apps/vega-dashboard`)**
```
app/
  admin/
    layout.tsx          # sidebar layout
    dashboard/
    products/
    categories/
    leads/
    careers/
    blog/
    gallery/
    catalogs/
    team/
    faqs/
    settings/
components/
  admin/                # AdminTable, AdminForm, StatCard
  charts/               # Recharts wrappers
```

**Backend (`apps/vega-backend`)**
```
src/
  index.ts              # Express app entry
  routes/
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
  middleware/
    auth.ts
    error.ts
  lib/
    email.ts
    r2.ts
```

### 5. Database Schema
- All tables live in `packages/db/src/schema/`.
- One file per domain: `users.ts`, `products.ts`, `leads.ts`, etc.
- `relations.ts` holds all Drizzle relations.
- `index.ts` re-exports everything.
- Never import `decimal` or `uuid` unless actively used.

### 6. Styling
- Tailwind CSS only. No inline styles.
- Use Vega color tokens:
  - `vega-yellow` → `#FFD400`
  - `vega-blue` → `#1F3A93`
  - `vega-white` → `#FFFFFF`
- Ratio: 60% white, 25% yellow, 15% blue.

### 7. Image Protection
- CSS: `pointer-events: none`, `user-select: none`, `-webkit-user-drag: none`
- Add `onContextMenu={(e) => e.preventDefault()}` on images
- Use `draggable={false}` on all product images

### 8. Bilingual Support
- English (`en`) is default.
- Arabic (`ar`) requires `dir="rtl"`.
- All content tables have `nameAr`, `descriptionAr`, `contentAr` fields.

### 9. Git — NEVER AUTO-STAGE, NEVER AUTO-COMMIT, NEVER AUTO-PUSH
- **Never auto-stage.** Do not run `git add` unless explicitly requested by the user.
- **Never auto-commit.** Do not run `git commit` unless explicitly requested by the user.
- **Never auto-push.** Do not run `git push` unless explicitly requested by the user.
- Never run `git add`, `git commit`, or `git push` automatically after any action.
- Never push to `main` or any branch without a direct user request.
- Never use `git push --force` or `git push -f`.
- Always ask the user for confirmation before any git operation.

### 10. Environment
- Copy `.env.example` to `.env` and fill credentials before running.
- Required: `DATABASE_URL`, `CLOUDFLARE_R2_*`, `JWT_SECRET`, `RESEND_API_KEY`

### 11. Tech Stack
| Layer | Tool |
|-------|------|
| Frontend | Next.js 14 App Router, TypeScript, Tailwind CSS |
| UI | shadcn/ui + custom Vega variants |
| Backend | Express.js, Node.js |
| Database | Supabase PostgreSQL |
| ORM | Drizzle ORM |
| Storage | Cloudflare R2 |
| Email | Resend |
| Monorepo | Turborepo + pnpm |

### 12. WhatsApp Enquiry
- Use `generateProductEnquiryMessage()` from `@vega/utils`.
- Link format: `https://wa.me/971567351095?text=...`
- Always prefill product name, SKU, and category.

### 13. API Patterns
- REST JSON under `/api/*`.
- Use Zod for validation in routes.
- Return `{ error: string }` on failures, data object on success.
- Status codes: `200`, `201`, `400`, `401`, `404`, `500`.

### 14. Dashboard Auth
- JWT stored in `localStorage` or `httpOnly` cookie.
- Role-based access: `super_admin`, `product_manager`, `content_editor`, `hr_manager`, `sales_team`.
- Middleware checks `Authorization: Bearer <token>`.

### 15. Product Page Rule
- No prices shown unless admin explicitly adds them.
- No checkout. Only "View Details" and "Enquire on WhatsApp".
- Clean URL: `/products/[slug]`.

---

## Commands

```bash
# Install
pnpm install

# Dev (all apps)
pnpm dev

# Build
pnpm build

# Database
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## Ports
- Frontend: `http://localhost:3000`
- Dashboard: `http://localhost:3001`
- API: `http://localhost:4000`

---

**Last updated:** 2026-06-02
