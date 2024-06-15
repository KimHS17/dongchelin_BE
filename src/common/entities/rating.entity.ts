import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { User } from './user.entity';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Entity()
export class Rating {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNumber()
  @Column('tinyint')
  rate: number;

  @IsOptional()
  @IsString()
  @Column({ length: 200, default: null })
  comment: string;

  @ManyToOne(() => Menu, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @IsUUID()
  @Column('uuid')
  menuId: string;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @IsUUID()
  @Column('uuid')
  userId: string;
}
