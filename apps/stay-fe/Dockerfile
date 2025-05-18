FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy the entire project for building
COPY . .

# Install dependencies
RUN pnpm install

# Build using nx but ensure we clean any previous build artifacts first
RUN rm -rf dist && \
    pnpm exec nx build stay-fe --prod

# Production stage for stay-fe
FROM node:20-alpine

WORKDIR /app

# Copy the production-ready package.json
COPY apps/stay-fe/package.prod.json ./package.json

# Install production dependencies only
RUN npm install --omit=dev

# Copy the build output from the builder stage
COPY --from=builder /app/dist/apps/stay-fe/.next ./.next
COPY --from=builder /app/dist/apps/stay-fe/public ./public
COPY --from=builder /app/dist/apps/stay-fe/next.config.js ./next.config.js
COPY --from=builder /app/dist/apps/stay-fe/.nx-helpers ./.nx-helpers
COPY --from=builder /app/apps/stay-fe/.env.prod ./.env

EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"] 