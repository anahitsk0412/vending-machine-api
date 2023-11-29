import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

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
}
