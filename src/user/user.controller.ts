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
  MethodNotAllowedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthUserDto } from './dtos/auth-user.dto';
import { UpdateDepositDto } from './dtos/update-deposit.dto';
import { UserRole } from './types/user-role.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findUserById(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const { username, password, role } = body;
    const user = await this.authService.signUp(username, password, role);
    session.userId = user.id;

    return user;
  }

  @Post('auth')
  async signIn(
    @Body() body: AuthUserDto,
    @Session() session: any,
  ): Promise<UserDto> {
    const { username, password } = body;
    const user = await this.authService.signIn(username, password);
    session.userId = user.id;

    return user;
  }

  @Post('signout')
  async signOut(@Session() session: any) {
    if (!session) {
      throw new HttpException(
        ' No authenticated user to sign out.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    session.userId = null;
    session.currentUser = null;
    return { message: 'User signed out successfully!' };
  }

  @Patch('deposit')
  @UseGuards(AuthGuard)
  deposit(@Body() body: UpdateDepositDto, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.BUYER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    const deposit: number = body.deposit;
    return this.userService.deposit(user.id, deposit);
  }

  @Patch('resetbalance')
  @UseGuards(AuthGuard)
  resetBalance(@CurrentUser() user: UserDto) {
    if (user.role !== UserRole.BUYER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    // get current user id
    return this.userService.resetBalance(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: UserDto,
  ) {
    if (user.role !== UserRole.ADMIN || user.id !== id) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.ADMIN) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.userService.remove(id);
  }
}
