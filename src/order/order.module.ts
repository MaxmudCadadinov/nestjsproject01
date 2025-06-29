import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from './order.entity'
import {  Product } from '../product/product.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
