import { Module, forwardRef } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [forwardRef(() => ReviewModule)],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
})
export class MenuModule {}
