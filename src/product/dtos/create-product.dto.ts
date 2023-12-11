import { IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  @ApiProperty({
    example: 'cheeseburger',
    required: true,
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 3.25,
    required: true,
  })
  cost: number;

  @IsNumber()
  @ApiProperty({
    example: 9,
    required: true,
  })
  amountAvailable: number;
}
