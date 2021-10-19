FROM node:14.16.0-alpine

# Change working directory
WORKDIR /usr/app

# Bundle app source
COPY ./.env ./.env
COPY ./.nuxt ./.nuxt
COPY ./content ./content
COPY ./static ./static
COPY ./nuxt.config.js ./nuxt.config.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

COPY ./healthcheck-pipeline.sh /src/healthcheck-pipeline.sh
RUN chmod +x /src/healthcheck-pipeline.sh

RUN npm install --production

# Install tools
RUN apk add --no-cache curl bash

HEALTHCHECK --interval=30s --timeout=5s CMD curl --fail http://localhost:4000/healthcheck || exit 1

CMD ["npm", "start"]
