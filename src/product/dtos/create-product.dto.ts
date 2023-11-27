import { IsNumber, IsString, Length } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  name: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  amountAvailable: number;

  @IsNumber()
  sellerId?: number;
}
