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
    pnpm exec nx build stay-api --prod

# Production stage for stay-api
FROM node:20-alpine

WORKDIR /app

# Copy built artifacts and required files for the API
COPY --from=builder /app/dist/apps/stay-api ./
COPY apps/stay-api/package.prod.json ./package.json

# Install production dependencies only
RUN npm install --omit=dev

# The API runs on port 3333
EXPOSE 3333

# Use the start script in package.json
CMD ["npm", "start"] 