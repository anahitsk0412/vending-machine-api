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
import { ProductDto } from './dtos/product.dto';
import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number): Promise<ProductDto> {
    return this.productService.findOne(id);
  }
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() productData: ProductCreateDto,
    @CurrentUser() user: UserDto,
  ): Promise<ProductDto> {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.create(productData, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() productData: ProductUpdateDto,
    @CurrentUser() user: UserDto,
  ): Promise<ProductDto> {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.update(id, productData, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @CurrentUser() user: UserDto) {
    if (user.role !== UserRole.SELLER) {
      throw new MethodNotAllowedException('Not enough permissions!');
    }
    return this.productService.remove(id, user);
  }
}
