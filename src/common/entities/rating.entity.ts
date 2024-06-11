import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { User } from './user.entity';

@Entity({ name: 'rating' })
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('char', { length: 1 })
  rate: string;

  @Column({ length: 200, default: null })
  comment: string;

  @ManyToOne(() => Menu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column('uuid')
  menuId?: string;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  userId?: string;
}
