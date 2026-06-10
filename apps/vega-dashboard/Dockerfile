# Vega Dashboard - Railway Production Dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Install dependencies
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/vega-dashboard/package.json ./apps/vega-dashboard/
COPY packages/ui/package.json ./packages/ui/
COPY packages/db/package.json ./packages/db/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
RUN pnpm install --frozen-lockfile

# Accept public env vars at build time
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Copy source and build
COPY . .
RUN pnpm --filter vega-dashboard build

# Copy static files into standalone output (required for Next.js standalone mode)
RUN cd apps/vega-dashboard && cp -r .next/static .next/standalone/.next/static

# Production runtime
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "--filter", "vega-dashboard", "start"]
