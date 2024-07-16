import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject("MAIN_SERVICE")
  private mainClient: ClientProxy;

  @Get("sum")
  calc(@Query('num') str: string) {
    const numArr = str.split(',').map(Number);
    this.mainClient.emit("log", "sum");
    return this.mainClient.send("sum", numArr);
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
