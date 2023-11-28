import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.orders)
  @Expose()
  sellers: User[];

  @ManyToMany(() => User, (user) => user.purchases)
  @Expose()
  buyers: User[];

  @ManyToMany(() => Product, (product) => product.orders)
  @Expose()
  products: Product[];
}
