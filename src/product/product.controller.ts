import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get(':id')
  findOne(@Param('id') id) {
    return this.productService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() productData) {
    return this.productService.create(productData);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() productData) {
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.productService.remove(id);
  }
}
