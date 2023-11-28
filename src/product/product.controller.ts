import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  MethodNotAllowedException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { UserDto } from '../user/dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../user/types/user-role.type';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id) {
    return this.productService.findOne(id);
  }
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() productData, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.create(productData, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id, @Body() productData, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.update(id, productData, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.remove(id, user);
  }
}
