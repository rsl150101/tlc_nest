import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //- HTTP GET 데코레이터
  getHello(): string {
    return this.appService.getHello();
  }
}
