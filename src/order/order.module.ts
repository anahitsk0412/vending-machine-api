import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}

// productId
// buyerId
// sellerId
// quantity
// price
// date
// status

//: buy check only for buyer role
