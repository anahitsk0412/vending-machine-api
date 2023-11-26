import { IsDecimal, IsEnum, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../types/user-role.type';

export class CreateUserDto {
  @IsString()
  @Length(2, 255, { message: 'The name length is wrong' })
  username: string;

  @IsString()
  @Length(4, 255)
  password: string;

  @IsDecimal()
  deposit: number;

  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(UserRole)
  role: UserRole;
}