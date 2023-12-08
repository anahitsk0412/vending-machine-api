import { ProductDto } from '../product/dtos/product.dto';
import { Product } from '../product/product.entity';

export const mockedProduct: Product = {
  id: 111,
  name: 'Super Cool Product',
  cost: 2.15,
  amountAvailable: 6,
  sellerId: 3,
  seller: null,
  orders: [],
};
