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

# Copy source
COPY . .

# Build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter vega-frontend build

# Stage 2: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
EXPOSE 3000

# Copy standalone output (Next.js output: "standalone")
COPY --from=builder /app/apps/vega-frontend/.next/standalone ./

# Copy static assets and public files
COPY --from=builder /app/apps/vega-frontend/.next/static ./.next/static
COPY --from=builder /app/apps/vega-frontend/public ./public

CMD ["node", "server.js"]
