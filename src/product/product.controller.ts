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
// import { User } from './user.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get(':id')
  findOne(@Param('id') id) {
    return `Hi product with ${id}`;
  }

  @Get()
  findAll(): string {
    return 'This are all products';
  }

  @Get('/search/:name')
  searchByName(@Param('name') name): string {
    return 'This are all searched products';
  }

  @Post()
  create(@Body() productData) {}

  @Patch(':id')
  update(@Param('id') id, @Body() productData) {}

  @Delete(':id')
  remove(@Param('id') id) {}
}
