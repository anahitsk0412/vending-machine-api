import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { UserDepositType } from './types/user-deposit.type';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findUserById(@Param('id') id) {
    return this.userService.findOne(id);
  }
  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const { username, password, role } = body;
    const user = await this.authService.signUp(username, password, role);

    return user;
  }

  @Post('auth')
  async signIn(@Body() body: UpdateUserDto, @Session() session: any) {
    const { username, password } = body;
    const user = await this.authService.signIn(username, password);
    session.userId = user.id;

    return user;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Patch('deposit')
  @UseGuards(AuthGuard)
  deposit(@Body() body: UpdateUserDto, @CurrentUser() user: UserDto) {
    // get current user id
    const deposit: UserDepositType = body.deposit;
    return this.userService.deposit(user.id, deposit);
  }

  @Patch('reset')
  @UseGuards(AuthGuard)
  resetBalance(@CurrentUser() user: UserDto) {
    // get current user id
    return this.userService.resetBalance(user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @CurrentUser() user: UserDto) {
    return this.userService.remove(id);
  }
}
