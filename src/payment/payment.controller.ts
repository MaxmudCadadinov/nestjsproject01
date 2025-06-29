import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateOrderDto } from './dto/create-payment.dto'

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/pay')
  async pay(@Body() dto: CreateOrderDto){
    return this.paymentService.pay(dto)
  }
}

