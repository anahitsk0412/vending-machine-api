import { IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDepositEnum } from '../types/user-deposit.type';

export class UpdateDepositDto {
  @IsNumber()
  @IsIn([
    UserDepositEnum.FIVE,
    UserDepositEnum.TEN,
    UserDepositEnum.TWENTY,
    UserDepositEnum.FIFTY,
    UserDepositEnum.HUNDRED,
  ])
  @ApiProperty({
    enum: [
      UserDepositEnum.FIVE,
      UserDepositEnum.TEN,
      UserDepositEnum.TWENTY,
      UserDepositEnum.FIFTY,
      UserDepositEnum.HUNDRED,
    ],
    example: 5,
    type: 'number',
    required: true,
  })
  deposit: UserDepositEnum;
}
