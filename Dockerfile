FROM node:18 as builder

COPY . /src
WORKDIR /src
RUN yarn install && yarn build
CMD [ "node", "/src/dist/layout.js" ]


#FROM node:18
#WORKDIR /app
#COPY --from=builder /src/dist/ /app/
#COPY yarn.lock /app/
#COPY package.json /app/
#COPY pods.json /app/
#RUN yarn install --production
#CMD [ "node", "/app/layout.js" ]