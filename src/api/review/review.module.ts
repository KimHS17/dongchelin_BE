import { Module, forwardRef } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [forwardRef(() => MenuModule)],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
