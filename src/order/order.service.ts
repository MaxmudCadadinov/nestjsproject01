import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './order.entity'
import { Repository } from 'typeorm';
import { Order } from 'src/payment/shopped.table.entity';
import { Product } from 'src/product/product.entity';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Cart)
        private cart_repo: Repository<Cart>,
        @InjectRepository(Order)
        private order_repo: Repository<Order>,
        @InjectRepository(Product)
        private product_product: Repository<Product>,

    ){}

    async add_to_cart(dto, user_id) {
        const new_shop = {product_id: dto.product_id, user_id: user_id, quantity: dto.quantity}
        await this.cart_repo.save(new_shop)

        const user_cart = await this.cart_repo.find({where:{user_id:user_id}})//находим данного пользователья
        const productIds = user_cart.map(item => ({'product_id': item.product_id, 'product_quantity':item.quantity}))
        let total = 0
        for (let i of productIds){
            let product = await this.product_product.findOne({where:{id: i.product_id}})
            if (!product){throw new Error('Продукт не найден')}
            total += product.price * i.product_quantity
        }
        
        const new_order = {user_id: user_id, total: total}
        await this.order_repo.save(new_order)
        return new_order
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


