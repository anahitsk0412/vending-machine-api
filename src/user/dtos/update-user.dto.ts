import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  @ApiProperty({
    example: 'someCoolUser',
    required: true,
  })
  username?: string;

  @IsOptional()
  @IsString()
  @Length(4, 255)
  @ApiProperty({
    example: 'someCoolPassword',
    required: true,
  })
  password?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 4,
    required: true,
  })
  deposit?: number;
}
