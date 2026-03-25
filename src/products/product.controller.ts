import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import type { ApiResponse } from 'src/interfaces/response.interface';
import { Product } from './product.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): ApiResponse<Product[]> {
    return {
      success: true,
      data: this.productService.findAll(),
      message: 'Fetched products successfully',
    };
  }
}
