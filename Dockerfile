ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION}


ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
COPY .env.prod .env

RUN npm install --verbose
RUN npx prisma generate
RUN npx prisma db pull
RUN npm run build