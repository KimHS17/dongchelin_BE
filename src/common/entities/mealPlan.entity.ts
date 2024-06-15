import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { IsDate, IsUUID } from 'class-validator';

@Entity()
export class MealPlan {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDate()
  @Column('date')
  date: Date;

  @ManyToOne(() => Menu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @IsUUID()
  @Column('uuid')
  menuId: string;
}
