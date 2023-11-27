import {
  Body,
  Controller,
  MethodNotAllowedException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { UserDto } from '../user/dtos/user.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() orderData: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ) {
    if (user.role !== 'buyer') {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.orderService.create({ ...orderData, buyerId: user.id });
  }
}
