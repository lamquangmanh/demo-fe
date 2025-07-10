# 1. Install dependencies and build the app
FROM node:22-bullseye AS builder

WORKDIR /app

# Copy only package files first for better cache
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the Next.js app for production
RUN yarn build

# 2. Run the production app with npm start
FROM node:22-bullseye AS runner

# Set NODE_ENV to production for optimized performance
ENV NODE_ENV production

WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy build output and static files from the builder image
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.js .
# COPY --from=builder /app/.env .env
COPY ./scripts/entrypoint.sh .

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["/app/entrypoint.sh"]

# Expose the app on port 3000
EXPOSE 3000

# Use npm to start the Next.js app
CMD ["npm", "run", "start"]
