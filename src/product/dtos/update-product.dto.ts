import { ProductCreateDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
