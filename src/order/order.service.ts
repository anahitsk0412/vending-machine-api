import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, QueryRunner, Repository } from 'typeorm';
import { Order } from './order.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { DepositRefillConstants } from '../utils/deposit-refill.constant';
import { sumToArrayOptions } from '../utils/sum-to-array-options';
import { OrderDto } from './dtos/order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private productService: ProductService,
    private userService: UserService,

    private readonly connection: Connection,
    private readonly dataSource: DataSource,
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

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.decreaseProductAvailAmount(
        orderData.productId,
        orderData.quantity,
        queryRunner,
      );
      const updatedUser = await this.updateUserDeposit(userData, queryRunner);

      const createdOrder = await this.createOrder(
        {
          ...orderData,
          price: totalPrice / 100,
          buyerId: updatedUser.id,
          sellerId: productData.sellerId,
        },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      // Calculate change to give back to user using available coin options
      const change = sumToArrayOptions(
        remainingUserBalance,
        DepositRefillConstants,
      );

      return { ...createdOrder, change };
    } catch (e) {
      //Using transaction to be able to roll back if something does not go well in between
      await queryRunner.rollbackTransaction();
      throw new MethodNotAllowedException('Unable to create order!');
    } finally {
      await queryRunner.release();
    }
  }

  async updateUserDeposit(payload, queryRunner: QueryRunner) {
    return await queryRunner.manager.save(User, {
      ...payload,
      deposit: 0,
    });
  }
  async decreaseProductAvailAmount(
    productId,
    quantity,
    queryRunner: QueryRunner,
  ) {
    // Using query builder here in case someone else has already decreased the
    // available amount of the product
    return await queryRunner.manager
      .createQueryBuilder()
      .update<Product>('product')
      .set({
        amountAvailable: () => `amountAvailable - ${quantity}`,
      })
      .where('id = :productId', { productId })
      .execute();
  }

  async createOrder(payload, queryRunner: QueryRunner) {
    return await queryRunner.manager.save(Order, {
      ...payload,
    });
  }
}
