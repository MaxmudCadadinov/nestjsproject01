import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Users } from './users/users.entity'
import { ConfigModule } from '@nestjs/config';
import { Cart } from './order/order.entity'
import { PaymentModule } from './payment/payment.module';
import { Order } from './payment/shopped.table.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // чтобы доступен был везде
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',           // ← укажи своего пользователя MySQL
      password: '5588',           // ← укажи свой пароль
      database: 'myb',    // ← укажи имя своей базы данных
      entities: [Product, Users, Cart, Order],
      synchronize: true,
    }),
    
    ProductModule, UsersModule, OrdersModule, PaymentModule],

})
export class AppModule {}
