import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';
import { mockedProduct } from '../mocks/single-product.stub';
import { DataSource } from 'typeorm';

// ProductService, UserService, Connection, DataSource

describe('OrderService', () => {
  let service: OrderService;
  let productService: Partial<ProductService>;
  let dataSource: Partial<DataSource>;

  beforeEach(async () => {
    productService = {
      findOne: () => {
        return Promise.resolve(mockedProduct);
      },
    };

    dataSource = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      createQueryRunner: () => {
        return jest.fn();
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ProductService,
          useValue: productService,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should throw error when user does not have enough deposit', async () => {
    const result = service.create(mockOffer(), 'test');
    expect(result).toMatchObject(mockPriceQuoteQuery);
  });

  it('Should throw error when there is not enough available quantity of the product', async () => {
    const result = service.create(mockOffer(), 'test');
    expect(result).toMatchObject(mockPriceQuoteQuery);
  });

  it('Should create the order and return the change', async () => {
    const result = service.create(mockOffer(), 'test');
    expect(result).toMatchObject(mockPriceQuoteQuery);
  });
});
