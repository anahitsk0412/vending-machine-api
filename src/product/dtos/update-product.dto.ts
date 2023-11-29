import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductUpdateDto {
  @IsOptional()
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  @ApiProperty({
    example: 'cheeseburger',
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 3.25,
  })
  cost?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 9,
  })
  amountAvailable?: number;
}
