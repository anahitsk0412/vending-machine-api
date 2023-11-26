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

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}
  // deposit [5, 10, 20, 50 and 100]
  // reset back to 0 by deposit [5, 10, 20, 50 and 100]
  @Get(':id')
  findOne(@Param('id') id) {
    return `Hi user with ${id}`;
  }

  @Get()
  findAll(): string {
    return 'This is me';
  }

  @Post()
  create(@Body() body: CreateUserDto) {}

  @Patch('deposit')
  deposit(@Body() body: UpdateUserDto) {
    return 'deposit';
  }

  @Patch('reset')
  reset() {
    return 'reset';
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return 'update';
  }

  @Delete(':id')
  remove(@Param('id') id: number) {}
}
