import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({
    example: 4,
    required: true,
  })
  productId: number;

  @IsNumber()
  @ApiProperty({
    example: 2,
    required: true,
  })
  quantity: number;
}
