import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsString } from 'class-validator';

export const Users = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.users;
  },
);

export class SignUpDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}

export class SignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
