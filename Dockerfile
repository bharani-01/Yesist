# EcoSure API for Cloud Run. Firebase Hosting serves the web client and rewrites /api/** here.
FROM node:22-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
RUN npm ci --omit=dev --workspace @ecosure/api && npm cache clean --force

COPY apps/api/src apps/api/src
COPY database/certs database/certs

USER node
EXPOSE 8080
CMD ["node", "apps/api/src/server.js"]
