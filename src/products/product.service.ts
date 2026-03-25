import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    const product = JSON.parse(
      readFileSync('data/products.json', 'utf-8'),
    ) as Product[];
    return product;
  }
}
