import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './types/user-role.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DepositRefillConstants } from '../utils/deposit-refill.constant';
import { sumToArrayOptions } from '../utils/sum-to-array-options';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string, role: UserRole) {
    const user = this.repo.create({ username, password, role });

    return this.repo.save(user);
  }

  async update(id: number, attrs: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.repo.save({ ...user, ...attrs });
  }

  async deposit(id: number, deposit: number) {
    const user = await this.findOne(id);
    const depositNumber = user.deposit * 100 + deposit;
    return this.repo.save({ ...user, deposit: depositNumber / 100 });
  }

  async resetBalance(id: number) {
    const user = await this.findOne(id);
    const depositToReturnArray = sumToArrayOptions(
      user.deposit * 100,
      DepositRefillConstants,
    );

    const updatedUser = await this.repo.save({ ...user, deposit: 0 });

    return { ...updatedUser, change: depositToReturnArray };
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  find(username: string) {
    return this.repo.find({ where: { username } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
