import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MealPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: Date;

  @ManyToOne(() => Menu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column('uuid')
  menuId: string;
}
