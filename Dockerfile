FROM node:alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add git

COPY . ./
RUN npm install

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "dev" ]
