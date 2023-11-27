import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from 'class-transformer';
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  productId: number;

  @Column()
  productAmount: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column('decimal')
  price: number;

  @Column('datetime')
  date: string;

  @ManyToMany(() => User, (user) => user.orders)
  @Expose()
  sellers: User[];

  @ManyToMany(() => Product, (product) => product.orders)
  @Expose()
  products: Product[];
}
