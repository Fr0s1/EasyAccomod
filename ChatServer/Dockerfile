FROM node:16-alpine3.11

WORKDIR /chatserver

COPY package.json .

RUN apk update && apk upgrade

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "server" ]

