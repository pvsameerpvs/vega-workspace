# Stage 1: Build
FROM node:20-alpine AS builder
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

# Copy source and build
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter vega-dashboard build

# Stage 2: Production runner
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
EXPOSE 3001

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/vega-dashboard ./apps/vega-dashboard
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/vega-dashboard/.next ./apps/vega-dashboard/.next
COPY --from=builder /app/apps/vega-dashboard/public ./apps/vega-dashboard/public

CMD ["pnpm", "--filter", "vega-dashboard", "start"]
