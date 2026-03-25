import { Purchase } from './purchase.interface';
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Product } from 'src/products/product.interface';

@Injectable()
export class PurchaseService {
  findAll(
    rep: { customerName: string; startDate: string; endDate: string } = {
      customerName: '',
      startDate: '',
      endDate: '',
    },
  ): Purchase[] {
    const data = readFileSync('data/purchases.json', 'utf-8');
    let Purchase = JSON.parse(data) as Purchase[];
    const { customerName, startDate, endDate } = rep;
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
          new Date(p.purchaseDate).getDate() <= new Date(endDate).getDate(),
      );
    }
    return Purchase;
  }

  findOne(id: string): Purchase | null {
    const data = this.findAll();
    const purchase = data.filter((p) => p.id.toString() == id)[0];
    return !purchase ? null : purchase;
  }

  create(dto: CreatePurchaseDto): Purchase {
    const data = this.findAll();
    const newId = (
      data.reduce(
        (maxId, purchase) => Math.max(maxId, Number(purchase.id)),
        0,
      ) + 1
    ).toString();
    const productData = readFileSync('data/products.json', 'utf-8');
    const product = JSON.parse(productData) as Product[];
    const items = dto.items.map((it) => {
      return {
        productId: it.productId,
        quantity: it.quantity,
        price: product.find((p) => p.id == it.productId)?.price || 0,
      };
    });
    const totalPrice = items
      .map((it) => it.price * it.quantity)
      .reduce((x, y) => {
        return x + y;
      }, 0);
    const newPurchase: Purchase = {
      id: Number(newId),
      customerName: dto.customerName,
      purchaseDate: dto.purchaseDate,
      items,
      totalPrice,
    };

    data.push(newPurchase);
    writeFileSync('./data/users.json', JSON.stringify(data, null, 2), 'utf-8');
    return newPurchase;
  }
}
