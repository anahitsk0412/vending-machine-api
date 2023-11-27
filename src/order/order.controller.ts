import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
  ) {}
}
