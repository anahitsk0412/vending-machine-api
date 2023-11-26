import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('decimal')
  deposit: number;

  @Column()
  role: 'seller' | 'buyer' | 'admin';
}
