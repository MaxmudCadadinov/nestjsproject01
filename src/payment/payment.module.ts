import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Product]), 
    JwtModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
