import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, MenuModule, ReviewModule],
  exports: [AuthModule, MenuModule, ReviewModule],
})
export class ApiModule {}
