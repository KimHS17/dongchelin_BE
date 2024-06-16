# syntax=docker/dockerfile:1

# Build stage
FROM node:lts-alpine AS build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

# Production stage
FROM node:lts-alpine

ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node --from=build /app/src/config ./config
COPY --chown=node:node --from=build /app/dist ./dist

CMD node dist/main.js