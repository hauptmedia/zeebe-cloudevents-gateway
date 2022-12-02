FROM node:16

RUN mkdir /app

ADD package.json /app
ADD package-lock.json /app
ADD config/ /app/config
ADD src/ /app/src
ADD main.ts /app

WORKDIR /app

RUN npm install

ENV NODE_ENV=production
CMD ["./node_modules/.bin/ts-node", "main.ts"]

