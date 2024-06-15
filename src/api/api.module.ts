import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [AuthModule, MenuModule],
  exports: [AuthModule, MenuModule],
})
export class ApiModule {}
