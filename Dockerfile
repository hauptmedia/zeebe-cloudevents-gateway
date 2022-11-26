FROM node:16

RUN mkdir /app
ADD package.json /app
ADD package-lock.json /app
ADD src/ /app/src

WORKDIR /app

RUN npm install
CMD ["./node_modules/.bin/ts-node", "main.ts"]

