import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { Cart } from '../order/order.entity';
import { Order } from 'src/payment/shopped.table.entity';


export enum user_status {
  user = 'user',
  admin = 'admin'
}

@Entity('flawer_user')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_lastname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum', enum: user_status, default: user_status.user})
  status: user_status;

  @Column({ type: 'datetime', nullable: true, default: null })
  active_at: Date | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
