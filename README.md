## init

```shell
npm i
cp example.env .env
```

## serve

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## db

```shell
docker-compose up -d
# generate migrate file
npm run drizzle:generate
# migrate
npm run drizzle:migrate
```

### php my admin

`http://localhost:8080`

## docker

```shell
docker-compose down
docker-compose down -v
docker images -qa | xargs docker rmi
```

## test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```