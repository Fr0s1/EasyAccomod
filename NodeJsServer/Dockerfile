FROM node:16-alpine3.11

RUN apk update \
    && apk upgrade \
    && apk add curl

WORKDIR /nodejsserver

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl -f http://localhost:8080/ || exit 1

CMD [ "npm", "run", "server"]

