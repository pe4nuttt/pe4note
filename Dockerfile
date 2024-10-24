ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} as base

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
COPY .env.prod .env
COPY package*.json ./

FROM base as build

RUN npm install --verbose

COPY prisma ./prisma
COPY . .

RUN npx prisma generate
RUN npx prisma db pull
RUN npm run build

FROM node:${NODE_VERSION} as production
ENV APP_ROOT /src
WORKDIR ${APP_ROOT}

ENV PORT=3000
ENV NODE_ENV=production

COPY --from=build ${APP_ROOT}/.output ./

CMD [ "node", ".output/server/index.mjs" ]
