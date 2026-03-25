import { Purchase } from './purchase.interface';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class PurchaseService {
  findAll(
    customerName: string,
    startDate: string,
    endDate: string,
  ): Purchase[] {
    const data = readFileSync('data/purchases.json', 'utf-8');
    let Purchase = JSON.parse(data) as Purchase[];

    if (customerName) {
      Purchase = Purchase.filter((p) =>
        p.customerName
          .toLocaleLowerCase()
          .split(' ')
          .includes(customerName.toLocaleLowerCase()),
      );
    }
    if (startDate || endDate) {
      return Purchase;
    }
    return Purchase;
  }
}
