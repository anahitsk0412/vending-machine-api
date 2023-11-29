import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './types/user-role.type';
import { UserService } from './user.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { generatedHashedPassword } from '../utils/generated-hashed-password';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private userService: UserService,
  ) {}

  async signUp(username: string, password: string, role: UserRole) {
    // Hash the users password
    // Generate a salt
    const saltedPass = await generatedHashedPassword(password);

    // Create a new user and save it
    try {
      return await this.userService.create(username, saltedPass, role);
    } catch (e) {
      throw new BadRequestException('Username in use!');
    }
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password!');
    }

    return user;
  }
}
