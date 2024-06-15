import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';
import { MealPlan } from './mealPlan.entity';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export enum Restaurant {
  SUDUK = 'suduk',
  TECH = 'tech',
  DORMITORY = 'dormitory',
}

export enum Category {
  KOREAN = 'korean',
  CHINESE = 'chinese',
  JAPANESE = 'japanese',
  WESTERN = 'western',
}

export enum Corner {
  CORNER1 = '1',
  CORNER2 = '2',
  CORNER3 = '3',
}

@Entity()
export class Menu {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @MaxLength(100)
  @Column({ length: 190 })
  name: string;

  @IsEnum(Restaurant)
  @Column('enum', { enum: Restaurant })
  restaurant: Restaurant;

  @IsEnum(Corner)
  @Column('enum', { enum: Corner })
  corner: Corner;

  @IsOptional()
  @IsEnum(Category)
  @Column('enum', { enum: Category, default: null })
  category: Category;

  @IsOptional()
  @Column('mediumblob', { default: null })
  image;

  @IsOptional()
  @IsNumber()
  @Column('float', { default: null })
  avgRate: number;

  @OneToMany(() => MealPlan, (mealPlan) => mealPlan.menu)
  mealPlans: MealPlan[];

  @OneToMany(() => Review, (review) => review.menu)
  reviews: Review[];
}
