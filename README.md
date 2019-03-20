# frontend-seed
Frontend seed

## Configuration

Clone `.env.sample` to `.env` in the same directory and update configuration for project.

## Quick Start

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload
$ npm run dev

# build for staging and production
$ npm run build
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Quick Start With Docker

- Start docker container: `docker-compose up` or `docker-compose up -d`
- Refer to docker compose document in [here](https://docs.docker.com/compose/overview/#compose-documentation).

> If `node_modules` is not exists, it will run `npm install` before into docker container.

## Setup auto deployment

- You should setup the testing step for make sure anything is good. Example:
```
npm install && npm run build
```

- Setup the deployment step like this:
```
- apk add --update openssh
- ssh $STAG_USER@$STAG_ADDR "cd $STAG_PROJECT_PATH && git pull && docker system prune -f && docker-compose build && docker-compose up -d && exit;"
```
