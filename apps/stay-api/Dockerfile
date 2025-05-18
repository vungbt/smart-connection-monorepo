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

# Verify the build artifacts
RUN ls -la dist/apps/stay-api/src

# Production stage for stay-api
FROM node:20-alpine

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy built artifacts and required files for the API
COPY --from=builder /app/dist/apps/stay-api ./
COPY --from=builder /app/apps/stay-api/.env.prod ./.env
COPY apps/stay-api/package.prod.json ./package.json

# For debugging purposes
RUN echo "Checking file structure:" && \
    ls -la ./ && \
    echo "Checking .env file:" && \
    cat ./.env && \
    echo "Checking directory structure:" && \
    ls -la ./src && \
    ls -la ./src/configs 2>/dev/null || echo "configs directory missing" && \
    find ./src -type d | sort

# Install production dependencies only
RUN npm install --omit=dev

# The API runs on port 3333
EXPOSE 3333

# Use the start script in package.json
CMD ["npm", "start"] 