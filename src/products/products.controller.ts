import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { ApiResponse } from 'src/interfaces/response.interface';
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): ApiResponse<Product[]> {
    return {
      success: true,
      data: this.productsService.findAll(),
      message: 'Fetched products successfully',
    };
  }
}
