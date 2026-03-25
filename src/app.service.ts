import { Injectable } from '@nestjs/common';
import { ApiResponse } from './interfaces/response.interface';

@Injectable()
export class AppService {
  getHello(): ApiResponse<{
    service: string;
    version: string;
  }> {
    return {
      success: true,
      data: {
        service: 'purchase-api',
        version: '1.0.0',
      },
      message: 'Hello NestJS',
    };
  }
}
