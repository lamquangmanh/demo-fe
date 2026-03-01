# 1. Build stage: only install dependencies and prepare source
FROM node:22-bullseye AS builder

WORKDIR /app

# Copy only package files for better cache
COPY package.json yarn.lock ./

# RUN yarn install --frozen-lockfile
RUN yarn install

# Copy the rest of the app
COPY . .

# ⚠️ Don't build here → build later in entrypoint.sh at runtime
# because env vars come from Kubernetes Secret

# 2. Runtime image
FROM node:22-bullseye AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copy dependencies and source code
COPY --from=builder /app /app

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Copy entrypoint script to build and start at runtime
COPY ./scripts/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "run", "start"]
