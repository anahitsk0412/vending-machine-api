import { IsIn, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../types/user-role.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  @ApiProperty({
    example: 'someCoolUser',
    required: true,
  })
  username: string;

  @IsString()
  @Length(4, 255)
  @ApiProperty({
    example: 'someCoolPassword',
    required: true,
  })
  password: string;

  @IsOptional()
  @IsNumber()
  deposit?: number;

  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsIn([UserRole.SELLER, UserRole.BUYER])
  @ApiProperty({
    enum: [UserRole.SELLER, UserRole.BUYER],
    example: 'buyer|seller',
    required: true,
  })
  role: UserRole;
}
