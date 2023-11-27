import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  productId: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column('decimal')
  price: number;

  @Column('datetime')
  date: string;
}
