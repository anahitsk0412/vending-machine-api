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

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
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
