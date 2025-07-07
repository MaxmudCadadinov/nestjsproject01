import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { Cart } from '../order/order.entity'

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Product, Cart]), 
    JwtModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
