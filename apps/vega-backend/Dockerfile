# Stage 1: Install + type-check
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/vega-backend/package.json ./apps/vega-backend/
COPY packages/db/package.json ./packages/db/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter vega-backend build

# Stage 2: Production runner (tsx runs TS directly)
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

ENV NODE_ENV=production
EXPOSE 4000

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/vega-backend ./apps/vega-backend
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

CMD ["pnpm", "--filter", "vega-backend", "start"]
