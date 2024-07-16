import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("sum")
  sum(numArr: Array<number>): number {
    return numArr.reduce((a, b) => a + b, 0);
  }

  @EventPattern("log")
  log(str: string) {
    console.log(str);
  }

}
