import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../user/user.entity';

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

  @ManyToOne(() => User, (user) => user.products)
  @Expose()
  seller: User;
}
