import {Entity,PrimaryGeneratedColumn,Column,OneToMany,} from 'typeorm';
import { Cart } from '../order/order.entity';
import { Order } from '../payment/shopped.table.entity'

@Entity('flawer_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ default: 'image-1751973996603-240036705.png' })
  image: string

  @OneToMany(() => Cart, cart => cart.product)
  carts: Cart[];

}
