import { Injectable, MethodNotAllowedException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';
import { UserDto } from '../user/dtos/user.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  create(body: ProductCreateDto, user: UserDto) {
    const product = this.repo.create({ ...body, sellerId: user.id });

    return this.repo.save(product);
  }

  async update(id: number, attrs: ProductUpdateDto, user: UserDto) {
    const product = await this.findOne(id);
    if (user.id !== product.sellerId) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.repo.save({ ...product, ...attrs });
  }

  async updateQuantity(id: number, amountAvailable: number) {
    const product = await this.findOne(id);
    return this.repo.save({ ...product, amountAvailable });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  findAll() {
    return this.repo.find();
  }

  async remove(id: number, user: UserDto) {
    const product = await this.findOne(id);
    if (user.id !== product.sellerId) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.repo.remove(product);
  }
}
