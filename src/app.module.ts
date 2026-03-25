import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiExceptionFilter } from './common/api-exception.filter';
import { ProductsModule } from './products/product.module';
import { PurchasesModule } from './purchases/purchase.module';

@Module({
  imports: [ProductsModule, PurchasesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule {}
