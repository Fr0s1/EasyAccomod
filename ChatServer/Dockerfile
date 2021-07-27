FROM node:16-alpine3.11

RUN apk update \
    && apk upgrade \
    && apk add curl

WORKDIR /chatserver

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

CMD [ "npm", "run", "server" ]

