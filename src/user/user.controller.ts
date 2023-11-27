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
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get(':id')
  findUserById(@Param('id') id) {
    return this.userService.findOne(id);
  }
  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    const { username, password, role } = body;
    return this.authService.signUp(username, password, role);
  }

  @Post('auth')
  signIn(@Body() body: UpdateUserDto) {
    const { username, password } = body;
    //return this.authService.signIn(username, password);
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
