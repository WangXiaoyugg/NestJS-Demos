# grpc-nestjs-example
不同语言的微服务之间可以基于 gRPC 来相互调用对方的方法。
它的实现方式是通过 protocol buffer 的语法来定义通信数据的格式，定义 package、service。
然后 server 端实现 service 对应的方法，client 端远程调用这些 service。
这样就可以实现在 java、node、go、python 等多种语言之间实现微服务的远程方法调用。

nestjs 中实现 grpc 需要 `@nestjs/microservices` , `@grpc/grpc-js`, `@grpc/proto-loader`等包 

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev grpc-server

# production mode
$ npm run start:prod grpc-client
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


