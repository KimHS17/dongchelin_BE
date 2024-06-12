import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CornerDto {
  @IsString()
  corner1: string;

  @IsString()
  corner2?: string;

  @IsString()
  corner3?: string;
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
