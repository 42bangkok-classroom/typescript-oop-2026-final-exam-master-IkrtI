import type { ApiResponse } from 'src/interfaces/response.interface';
import { Controller, Query, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.interface';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}
  @Get()
  findAll(
    @Query('customerName') customerName: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): ApiResponse<Purchase[]> {
    return {
      success: true,
      data: this.purchaseService.findAll(customerName, startDate, endDate),
      message:
        customerName || startDate || endDate
          ? 'Filtered purchases successfully'
          : 'Fetched purchases successfully',
    };
  }
}
