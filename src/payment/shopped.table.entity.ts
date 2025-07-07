import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { Users } from  '../users/users.entity'
export enum Orders_status{
    Paid = 'paid',
    Pending = 'pending'
}


@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  total: number;

  @Column({
    type:'enum',
    enum: Orders_status,
    default: Orders_status.Pending
  })
  
  status: Orders_status;

 @ManyToOne(() => Users, user => user.orders)
  @JoinColumn({ name: 'user_id' }) // эта колонка появится в orders
  user: Users;


  

}
