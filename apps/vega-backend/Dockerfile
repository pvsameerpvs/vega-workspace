# Vega Backend - Railway Production Dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Install dependencies
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/vega-backend/package.json ./apps/vega-backend/
COPY packages/db/package.json ./packages/db/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY packages/ui/package.json ./packages/ui/
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm --filter vega-backend build

# Production runtime
ENV NODE_ENV=production
EXPOSE 4000
CMD ["pnpm", "--filter", "vega-backend", "start"]
