import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Product } from '../product/product.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deposit: number;

  @Column()
  role: 'seller' | 'buyer' | 'admin';

  @OneToMany(() => Product, (product) => product.seller)
  @Expose()
  products: Product[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user id:', this.id);
  }
}
