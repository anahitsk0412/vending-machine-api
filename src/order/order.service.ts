import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { DepositRefillConstants } from '../utils/deposit-refill.constant';
import { sumToArrayOptions } from '../utils/sum-to-array-options';
import { OrderDto } from './dtos/order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(
    orderData: CreateOrderDto,
    buyerId: number,
  ): Promise<OrderDto & { change: number[] }> {
    const userData = await this.userService.findOne(buyerId);
    const productData = await this.productService.findOne(orderData.productId);

    const totalPrice = productData.cost * 100 * orderData.quantity;

    const remainingUserBalance = userData.deposit * 100 - totalPrice;
    const remainingQuantity = productData.amountAvailable - orderData.quantity;

    if (remainingUserBalance < 0) {
      throw new MethodNotAllowedException('Not enough balance in deposit!');
    }

    if (remainingQuantity < 0) {
      throw new MethodNotAllowedException(
        'Not enough product quantity in stock!',
      );
    }

    try {
      await this.productService.updateQuantity(
        orderData.productId,
        remainingQuantity,
      );
      await this.userService.update(buyerId, {
        deposit: 0,
      });
      const change = sumToArrayOptions(
        remainingUserBalance,
        DepositRefillConstants,
      );

      const product = this.repo.create({
        ...orderData,
        price: totalPrice / 100,
        buyerId,
        sellerId: productData.sellerId,
      });

      const createdOrder = await this.repo.save(product);

      return { ...createdOrder, change };
    } catch (e) {
      // rollback if there was something wrong between
      await this.productService.updateQuantity(
        orderData.productId,
        remainingQuantity + orderData.quantity,
      );
      await this.userService.update(buyerId, {
        deposit: userData.deposit,
      });
      throw new MethodNotAllowedException('Unable to create order!');
    }
  }
}
