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
    let Purchase = JSON.parse(
      readFileSync('/data/purchases.json', 'utf-8'),
    ) as Purchase[];

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
