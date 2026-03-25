import { Purchase } from './purchase.interface';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class PurchaseService {
  findAll(
    customerName: string = '',
    startDate: string = '',
    endDate: string = '',
  ): Purchase[] {
    const data = readFileSync('data/purchases.json', 'utf-8');
    let Purchase = JSON.parse(data) as Purchase[];

    if (customerName) {
      Purchase = Purchase.filter((p) =>
        p.customerName
          .toLocaleLowerCase()
          .split(' ')
          .includes(
            (typeof customerName == 'string'
              ? customerName
              : String(customerName)
            ).toLocaleLowerCase(),
          ),
      );
    }

    if (startDate || endDate) {
      Purchase = Purchase.filter(
        (p) =>
          new Date(p.purchaseDate).getDate() >= new Date(startDate).getDate() &&
          new Date(p.purchaseDate).getDate() < new Date(endDate).getDate(),
      );
    }
    return Purchase;
  }

  findOne(id: string): Purchase {
    const data = this.findAll();
    const purchase = data.filter((p) => p.id.toString() == id)[0];
    return purchase;
  }
}
