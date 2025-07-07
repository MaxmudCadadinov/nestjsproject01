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

  @OneToMany(() => Cart, cart => cart.product)
  carts: Cart[];

}
