FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run clean

COPY . .

CMD [ "npm","start" ]