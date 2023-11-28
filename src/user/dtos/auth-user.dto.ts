import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
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
}
