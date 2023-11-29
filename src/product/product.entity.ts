import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Expose()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cost: number;

  @Column()
  amountAvailable: number;

  @Column()
  sellerId: number;

  @ManyToOne(() => User, (user) => user.products)
  @Expose()
  seller: User;

  @ManyToMany(() => Order, (order) => order.products)
  @Expose()
  orders: Order[];
}
