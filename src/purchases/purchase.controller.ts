import type { ApiResponse } from 'src/interfaces/response.interface';
import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.interface';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

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
      data: this.purchaseService.findAll({ customerName, startDate, endDate }),
      message:
        customerName || startDate || endDate
          ? 'Filtered purchases successfully'
          : 'Fetched purchases successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Purchase> {
    const data = this.purchaseService.findOne(id);
    if (!data) {
      return {
        success: false,
        data: null,
        message: `Purchase with id '${id}' not found`,
      };
    }
    return {
      success: true,
      data: data,
      message: 'Fetched purchase successfully',
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreatePurchaseDto): ApiResponse<Purchase> {
    const data = this.purchaseService.create(dto);
    return {
      success: true,
      data: data,
      message: 'Created purchase successfully',
    };
  }
}
