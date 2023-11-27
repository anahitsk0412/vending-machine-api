import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';

@Module({
  imports: [ProductModule, UserModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

//: buy check only for buyer role
