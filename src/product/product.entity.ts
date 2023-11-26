import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  cost: number;

  @Column()
  amountAvailable: number;

  @Column()
  sellerId: number;

  @Column()
  status: number;
}
