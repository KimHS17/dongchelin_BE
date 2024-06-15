import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rating } from './rating.entity';
import { MealPlan } from './mealPlan.entity';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 190 })
  name: string;

  @Column('enum', { enum: Restaurant })
  restaurant: Restaurant;

  @Column('enum', { enum: Corner })
  corner: Corner;

  @Column('enum', { enum: Category, default: null })
  category: Category;

  @Column('mediumblob', { default: null })
  image: Blob;

  @Column('float', { default: null })
  avgRate: number;

  @OneToMany(() => MealPlan, (mealPlan) => mealPlan.menu)
  mealPlans: MealPlan[];

  @OneToMany(() => Rating, (rating) => rating.menu)
  ratings: Rating[];
}
