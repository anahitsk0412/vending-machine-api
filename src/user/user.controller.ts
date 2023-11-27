import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { UserDepositType } from './types/user-deposit.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // deposit [5, 10, 20, 50 and 100]
  // reset back to 0 by deposit [5, 10, 20, 50 and 100]
  @Get(':id')
  findUserById(@Param('id') id) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): string {
    return 'This is me';
  }

  @Post()
  signUp(@Body() body: CreateUserDto) {
    const { username, password, role } = body;
    return this.userService.create(username, password, role);
  }

  @Patch('deposit')
  deposit(@Body() body: UpdateUserDto) {
    const deposit: UserDepositType = body.deposit;
    return this.userService.deposit(2, deposit);
  }

  @Patch('reset')
  reset() {
    return 'reset';
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(2, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {}
}
