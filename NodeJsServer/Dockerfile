FROM node:16-alpine3.11

WORKDIR /nodejsserver

COPY package.json .

RUN apk update && apk upgrade

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "run", "server"]

