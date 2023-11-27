import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './types/user-role.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDepositType } from './types/user-deposit.type';
import { UserDepositValues } from './user.deposit.constant';

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
    const depositToReturnArray = this.sumToArrayOptions(
      user.deposit * 100,
      UserDepositValues,
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

  sumToArrayOptions(sum: number, options: number[]) {
    const resultArr = [];
    let i = options.length - 1;

    while (sum && i >= 0) {
      const currentSum = sum - options[i];
      if (currentSum >= 0) {
        resultArr.push(options[i]);
        sum = currentSum;
      } else {
        i -= 1;
      }
    }
    return resultArr;
  }
}
