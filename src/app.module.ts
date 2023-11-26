import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password123',
      database: 'vending-machine',
      entities: [User, Product],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
