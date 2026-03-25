import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { ApiResponse } from './interfaces/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse<{
    service: string;
    version: string;
  }> {
    return {
      success: true,
      data: this.appService.getHello(),
      message: 'Hello NestJS',
    };
  }
}
