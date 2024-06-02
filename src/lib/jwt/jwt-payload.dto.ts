import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export class JwtPayloadDto {
  @IsUUID()
  uid: string; // User ID

  @IsNumber()
  ttl: number; // second

  @IsEnum(TokenType)
  tokenType: TokenType;

  @IsNumber()
  @IsOptional()
  exp?: number; // 만료 시점(ms)

  @IsNumber()
  @IsOptional()
  iat?: number; // 발급 시점(ms)

  @IsString()
  @IsOptional()
  scope?: string;
}
