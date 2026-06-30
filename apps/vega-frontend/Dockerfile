# Vega Frontend - Railway Production Dockerfile
FROM node:20-alpine AS base
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

# Fallback to .env.production if build args aren't provided
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Copy source and build
COPY . .
RUN if [ -z "$NEXT_PUBLIC_API_URL" ] && [ -f apps/vega-frontend/.env.production ]; then \
      cp apps/vega-frontend/.env.production apps/vega-frontend/.env; \
    fi
RUN pnpm --filter vega-frontend build

# Production runtime
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "--filter", "vega-frontend", "start"]
