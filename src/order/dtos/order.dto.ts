import { IsNumber, IsOptional } from 'class-validator';

export class OrderDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  sellerId: number;

  @IsNumber()
  @IsOptional()
  buyerId: number;

  @IsNumber()
  @IsOptional()
  price: number;
}
