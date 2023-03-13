FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock*.json ./
RUN yarn install
COPY . .
RUN yarn build




CMD [ "node", "layout.js" ]