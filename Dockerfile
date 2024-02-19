FROM node:alpine

RUN apk add build-base zlib-dev autoconf automake nasm libtool libpng-dev jpeg-dev g++ gcc libgcc libstdc++ linux-headers make python3 curl chromium nss freetype harfbuzz ca-certificates ttf-freefont
RUN mkdir /app

COPY package.json /app
COPY yarn.lock /app
WORKDIR /app
RUN yarn install
RUN yarn add sharp

RUN mkdir bot
COPY bot/package.json bot
WORKDIR /app/bot
RUN npm install

WORKDIR /app
COPY . /app
RUN yarn build

EXPOSE 3000

CMD "./run.sh"
