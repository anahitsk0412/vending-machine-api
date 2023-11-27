import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProductModule, UserModule],
  providers: [OrderService],
  controllers: [OrderController],
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
