import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReqUser } from 'src/common/decorator';
import { CreateReviewDto } from './dto/review.dto';
import { JwtPayloadDto } from 'src/lib/jwt';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:menuId')
  async createReview(
    @ReqUser() user: JwtPayloadDto,
    @Param('menuId') menuId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    await this.reviewService.createReview(user, menuId, createReviewDto);
  }
}
