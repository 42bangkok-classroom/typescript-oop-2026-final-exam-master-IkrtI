import { Purchase } from './purchase.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Product } from 'src/products/product.interface';

@Injectable()
export class PurchaseService {
  findAll(
    rep: { customerName?: string; startDate?: string; endDate?: string } = {},
  ): Purchase[] {
    const data = readFileSync('data/purchases.json', 'utf-8');
    let purchases = JSON.parse(data) as Purchase[];
    const { customerName, startDate, endDate } = rep;

    if (customerName) {
      const normalizedCustomerName = customerName.toLowerCase().trim();
      purchases = purchases.filter((p) =>
        p.customerName
          .toLowerCase()
          .split(/\s+/)
          .includes(normalizedCustomerName),
      );
    }

    if (startDate || endDate) {
      purchases = purchases.filter((p) => {
        const isAfterOrEqualStart = !startDate || p.purchaseDate >= startDate;
        const isBeforeEnd = !endDate || p.purchaseDate < endDate;
        return isAfterOrEqualStart && isBeforeEnd;
      });
    }

    return purchases;
  }

  findOne(id: string | number): Purchase | null {
    const data = this.findAll();
    const targetId = String(id);
    const purchase = data.find((p) => String(p.id) === targetId);
    return !purchase ? null : purchase;
  }

  create(dto: CreatePurchaseDto): Purchase {
    const data = this.findAll();
    const lastPurchase = data[data.length - 1];
    const newId = (lastPurchase?.id ?? 0) + 1;

    const productData = readFileSync('data/products.json', 'utf-8');
    const products = JSON.parse(productData) as Product[];

    const items = dto.items.map((it) => {
      const matchedProduct = products.find(
        (product) => product.id === it.productId,
      );
      if (!matchedProduct) {
        throw new BadRequestException(
          `Product with id '${it.productId}' not found`,
        );
      }

      return {
        productId: it.productId,
        quantity: it.quantity,
        price: matchedProduct.price,
      };
    });

    const totalPrice = items
      .map((it) => it.price * it.quantity)
      .reduce((x, y) => {
        return x + y;
      }, 0);

    const newPurchase: Purchase = {
      id: newId,
      customerName: dto.customerName,
      purchaseDate: dto.purchaseDate,
      items,
      totalPrice,
    };

    data.push(newPurchase);
    writeFileSync(
      'data/purchases.json',
      JSON.stringify(data, null, 2),
      'utf-8',
    );

    return newPurchase;
  }
}
