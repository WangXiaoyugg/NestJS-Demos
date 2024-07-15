import { Controller, Get } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @Get()
  getHello(): string {
    return this.grpcServerService.getHello();
  }

  @GrpcMethod('BookService', 'FindBook')
  findOne(data: {id: number}) {
    const items = [
      {id: 1, name: '前端调试通关秘籍', desc: "网页和node 各种调试"},
      {id: 2, name: "Babel 通关秘籍",  desc: "手写babel各种插件"},
    ]
    return items.find(item => item.id === data.id);
  }

}
