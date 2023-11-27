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
  @Post()
  signUp(@Body() body: CreateUserDto) {
    const { username, password, role } = body;
    return this.userService.create(username, password, role);
  }

  @Patch('deposit')
  deposit(@Body() body: UpdateUserDto) {
    // get current user id
    const deposit: UserDepositType = body.deposit;
    return this.userService.deposit(2, deposit);
  }

  @Patch('reset')
  resetBalance() {
    // get current user id
    return this.userService.resetBalance(2);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
