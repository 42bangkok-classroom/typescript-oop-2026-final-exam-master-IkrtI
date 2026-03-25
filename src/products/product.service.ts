import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  async findAll(): Promise<Product[]> {
    const data = fs.readFileSync('data/products.json', 'utf-8');
    const product = (await JSON.parse(data)) as Product[];
    return product;
  }
}
