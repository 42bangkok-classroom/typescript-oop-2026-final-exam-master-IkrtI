import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    service: string;
    version: string;
  } {
    return {
      service: 'purchase-api',
      version: '1.0.0',
    };
  }
}
