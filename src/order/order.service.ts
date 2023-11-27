import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { UserDepositValues } from '../user/user.deposit.constant';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(orderData: CreateOrderDto) {
    const userData = await this.userService.findOne(orderData.buyerId);
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
      await this.userService.update(orderData.buyerId, {
        deposit: 0,
      });

      await this.productService.updateQuantity(
        orderData.productId,
        remainingQuantity,
      );
    } catch (e) {
      throw new MethodNotAllowedException('Unable to create order!');
    }

    const change = this.userService.sumToArrayOptions(
      remainingUserBalance,
      UserDepositValues,
    );

    const product = this.repo.create({
      ...orderData,
      price: totalPrice,
    });

    const createdOrder = this.repo.save(product);

    return { ...createdOrder, change };
  }
}
