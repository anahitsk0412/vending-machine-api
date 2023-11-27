import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  create(body: ProductCreateDto) {
    const product = this.repo.create(body);

    return this.repo.save(product);
  }

  async update(id: number, attrs: ProductUpdateDto) {
    const product = await this.findOne(id);
    return this.repo.save({ ...product, ...attrs });
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

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repo.remove(product);
  }
}
