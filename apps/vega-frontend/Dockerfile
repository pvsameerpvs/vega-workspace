# Stage 1: Build
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Install dependencies
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/vega-frontend/package.json ./apps/vega-frontend/
COPY packages/ui/package.json ./packages/ui/
COPY packages/db/package.json ./packages/db/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .

# Build-time ARGs for Next.js public env vars (inlined at build time)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Fallback to .env.production if ARGs aren't provided
RUN if [ -z "$NEXT_PUBLIC_API_URL" ] && [ -f apps/vega-frontend/.env.production ]; then \
      grep NEXT_PUBLIC_ apps/vega-frontend/.env.production > apps/vega-frontend/.env; \
    fi

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter vega-frontend build

# Stage 2: Production runner
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
EXPOSE 3000

# Copy all build artifacts + deps for pnpm workspace
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps ./apps
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/vega-frontend/.next ./apps/vega-frontend/.next
COPY --from=builder /app/apps/vega-frontend/public ./apps/vega-frontend/public

CMD ["pnpm", "--filter", "vega-frontend", "start"]
