import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/product.entity'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Cart } from '../order/order.entity'
import Stripe from 'stripe';





@Injectable()
export class PaymentService {
  private stripe: Stripe
  constructor(
    
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    
    private jwtServise: JwtService

  ){
    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) {
      throw new Error('Stripe secret key is not set in .env');
    }
    this.stripe = new Stripe(stripeSecret);
  }
  
  


  async pay(dto: CreateOrderDto){

    let total = 0
    for (let i of dto.items){
      const product = await this.productRepo.findOne({where:{id: i.productID}})
      if (!product) {throw new Error(`Product with id ${i.productID} not found`);}
      total += product.price * i.quantity
    }
    console.log(total)

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      
      line_items: [
        {
          price_data: {
            recurring:{interval: "month"},
            currency: 'usd',
            product_data: {
              name: 'Beautiful Bouquet',
            },
            unit_amount: total * 100
          },
          quantity: 1,
        },
      ],
      success_url: 'https://your-site.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://your-site.com/cancel',
    });
    
    return { url: session.url };
  }



  } 
  
  

  


