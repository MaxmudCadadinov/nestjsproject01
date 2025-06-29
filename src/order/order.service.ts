import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './order.entity'
import { Repository } from 'typeorm';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Cart)
        private cart_repo: Repository<Cart>,

    ){}

    async add_to_cart(dto, user_id) {
        const new_shop = {
            product_id: dto.product_id,
            user_id: user_id,
            quantity: dto.quantity
        }
        await this.cart_repo.save(new_shop)
        return new_shop
    }

    async return_shops(user_id: number){
        const user = await this.cart_repo.find({where: {user_id: user_id}, relations: ['product'],})
        console.log(user)
        if (!user.length){return 'пустая корзина'}
        
        const list = user.map(
            item => ({
                user_id: item.user_id,
                product_name: item.product.product_name,
                product_price: item.product.price,
                product_quantity: item.quantity,
                total: item.quantity * item.product.price
            }) 
            

            )
            
            

            const total_sum = list.reduce((sum, item) => sum + item.total, 0);
            
            return {items:list, total: total_sum}
        
            
        
        }
        
        
    }


