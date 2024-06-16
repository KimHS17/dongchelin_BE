import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/review.dto';
import { JwtPayloadDto } from 'src/lib/jwt';
import { MenuRepository } from '../menu/menu.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly menuRepository: MenuRepository,
  ) {}

  async createReview(
    { uid }: JwtPayloadDto,
    menuId: string,
    createReviewDto: CreateReviewDto,
  ) {
    await this.reviewRepository.createReview(uid, menuId, createReviewDto);
    const avgRate = await this.reviewRepository.findAvgRate(menuId);
    await this.menuRepository.updateAvgRate(menuId, avgRate);
  }
}
