FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ src/

COPY tsconfig.json tsconfig.json

RUN npm run build

CMD ["node", "./dist/index.js"]