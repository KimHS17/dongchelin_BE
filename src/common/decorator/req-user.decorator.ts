import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CURRENT_USER = 'user';
export const ReqUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[CURRENT_USER];
  },
);
