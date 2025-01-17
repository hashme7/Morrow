FROM node:18-alpine3.18

RUN apk update && apk add --no-cache \
  libssl3 \
  bash \
  && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "npm", "start" ]