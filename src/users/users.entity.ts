import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Cart } from '../order/order.entity';

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

  @Column({ type: 'datetime', nullable: true, default: null })
  active_at: Date | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];
}
