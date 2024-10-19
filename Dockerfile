FROM node:20-alpine AS base
RUN apk add --no-cache su-exec

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm install

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --shell /bin/sh --uid 1001 --disabled-password nextjs

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh
# Set the entrypoint to the script
ENTRYPOINT ["./entrypoint.sh"]

ENV NODE_ENV=production

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
