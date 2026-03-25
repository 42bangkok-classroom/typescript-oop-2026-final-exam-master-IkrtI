import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  'customerName': string;
  @IsNotEmpty()
  'purchaseDate': string;
  @IsNotEmpty()
  'items': PurchaseItemDto[];
}

export class PurchaseItemDto {
  @IsNotEmpty()
  'productId': number;
  @IsNotEmpty()
  'quantity': number;
}
