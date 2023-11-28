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
import { OrderDto } from './dtos/order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../user/types/user-role.type';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() orderData: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ): Promise<OrderDto & { change: number[] }> {
    if (user.role !== UserRole.BUYER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.orderService.create(orderData, user.id);
  }
}
