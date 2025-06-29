import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Product } from '../product/product.entity';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_at: Date;

  @ManyToOne(() => Users, user => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Product, product => product.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
