import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/product.entity'
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private readonly configService: ConfigService,
    private jwtServise: JwtService
  ){}
  

  async pay(dto: CreateOrderDto){
    
  }
}

