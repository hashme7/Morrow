FROM node:18-alpine3.18

# RUN apk update && apk add --no-cache \
#   libssl3 \
#   bash \
#   && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json ./

RUN npm install

COPY src/ src/

COPY prisma/ prisma/

COPY tsconfig.json tsconfig.json

RUN npm run build 

RUN npx prisma generate

CMD [ "npm", "start" ]