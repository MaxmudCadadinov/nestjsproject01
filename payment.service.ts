import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
    }

    // Либо укажи apiVersion корректно (проверь в дашборде Stripe), 
    // либо убери apiVersion вовсе, чтобы использовать версию по умолчанию
    this.stripe = new Stripe(stripeSecretKey /*, { apiVersion: '2022-11-15' }*/);
  }

  async createPaymentIntent(paymentMethodId: string, amount: number) {
    return await this.stripe.paymentIntents.create({
      amount,          // сумма в центах
      currency: 'usd', // лучше тоже вынести в .env, если нужно
      payment_method: paymentMethodId,
      confirm: true,
    });
  }
}
