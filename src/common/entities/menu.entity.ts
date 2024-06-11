import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 190 })
  name: string;

  @Column('enum', { enum: Restaurant })
  restaurant: Restaurant;

  @Column({ length: 100 })
  corner: string;

  @Column()
  date: Date;

  @Column('enum', { enum: Category, default: null })
  category: Category;

  @Column('mediumblob', { default: null })
  image: Blob;
}
