FROM node:18.17.0-bullseye AS base

FROM base AS development

# RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json npm-lock.yaml* ./
COPY . .

RUN corepack enable
RUN npm ci 

COPY --chown=node:node . .

USER node

FROM base AS builder

WORKDIR /app

RUN corepack enable

COPY package.json npm-lock.yaml* ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

USER node

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

CMD ["node", "server.js"]