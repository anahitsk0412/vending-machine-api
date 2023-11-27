import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column('decimal', { nullable: true, default: 0 })
  deposit: number;

  @Column()
  role: 'seller' | 'buyer' | 'admin';

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
