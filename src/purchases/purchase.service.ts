import { Purchase } from './purchase.interface';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class PurchaseService {
  findAll(): Purchase[] {
    const Purchase = JSON.parse(
      readFileSync('data/purchases.json', 'utf-8'),
    ) as Purchase[];
    return Purchase;
  }
}
