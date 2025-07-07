import { Controller, Get, Post, Body, Req, Headers, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateOrderDto } from './dto/create-payment.dto'
import { JwtAuthGuard } from 'src/jwt/jwt_auth.guard';
import Stripe from 'stripe'

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/pay')
  async pay(@Body() dto: CreateOrderDto){
    console.log(dto)
    const paymentIntent = await this.paymentService.pay(dto)
    return paymentIntent
    
  }

  @UseGuards(JwtAuthGuard)
  @Post('/webhook')
  async handleStripeWebhook(
    @Req() req,
    @Headers('stripe-signature') signature: string,
  ) {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
    if (!stripeSecret || !webhookSecret) {throw new Error('Stripe keys are not set');}


    const stripe = new Stripe(stripeSecret);
    

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
      console.log('⚠️ Webhook signature verification failed.', (err as Error).message);
      throw new Error('Webhook Error');
    }
    // Пример обработчика события
    if (event) {
      console.log(event.type)
      //console.log(event)

      
    }

    return { received: true };
  }




}


