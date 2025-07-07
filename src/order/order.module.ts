import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from './order.entity'
import {  Product } from '../product/product.entity'
import { Order } from 'src/payment/shopped.table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
