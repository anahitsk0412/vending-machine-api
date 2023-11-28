import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  amountAvailable: number;

  @IsNumber()
  sellerId?: number;
}
