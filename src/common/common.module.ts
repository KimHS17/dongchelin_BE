import { Module } from '@nestjs/common';
import { JwtAccessStrategy } from './auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './auth/jwt-refresh.strategy';

@Module({
  imports: [],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
  exports: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class CommonModule {}
