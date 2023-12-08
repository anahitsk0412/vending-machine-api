import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  change: number[];

  @IsOptional()
  @IsString()
  productName: string;
}
