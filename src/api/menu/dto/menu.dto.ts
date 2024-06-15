import { PickType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Category, MealPlan, Restaurant } from 'src/common/entities';

export class FindListDto extends PickType(MealPlan, ['date']) {}

export class CornerDto {
  @IsString()
  corner1: string;

  @IsString()
  corner2: string;

  @IsString()
  corner3: string;
}

export class MenuDto {
  @ValidateNested()
  @Type(() => CornerDto)
  suduk: CornerDto;

  @ValidateNested()
  @Type(() => CornerDto)
  tech: CornerDto;

  @ValidateNested()
  @Type(() => CornerDto)
  dormitory: CornerDto;
}

export class FindRankDto {
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(Restaurant, { each: true })
  restaurant: Restaurant[];

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(Category, { each: true })
  category: Category[];
}
