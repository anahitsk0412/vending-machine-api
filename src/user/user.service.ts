import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './types/user-role.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDepositType } from "./types/user-deposit.type";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string, role: UserRole) {
    const user = this.repo.create({ username, password, role });

    return this.repo.save(user);
  }

  async update(id: number, attrs: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found!');
    }
    return this.repo.save({ ...user, ...attrs });
  }

  async deposit(id: number, deposit: UserDepositType) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found!');
    }
    const depositNumber = user.deposit * 100 + deposit;
    return this.repo.save({ ...user, deposit: depositNumber / 100 });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(username: string) {
    return this.repo.find({ where: { username } });
  }
}
