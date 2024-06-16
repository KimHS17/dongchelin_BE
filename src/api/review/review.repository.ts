import { BaseRepository } from 'src/lib/typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Review } from 'src/common/entities';
import { CreateReviewDto } from './dto/review.dto';

@Injectable({ scope: Scope.REQUEST })
export class ReviewRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async findList(menuId: string) {
    return await this.getRepository(Review).find({
      select: {
        id: true,
        rate: true,
        comment: true,
        created: true,
        user: { nickname: true },
      },
      relations: { user: true },
      where: { menuId: menuId },
      order: { created: 'DESC' },
      take: 6,
    });
  }

  async createReview(
    uid: string,
    menuId: string,
    createReviewDto: CreateReviewDto,
  ) {
    await this.getRepository(Review).save({
      userId: uid,
      menuId,
      rate: createReviewDto.rate,
      comment: createReviewDto.comment,
    });
  }

  async findAvgRate(menuId: string) {
    return await this.getRepository(Review)
      .createQueryBuilder()
      .select('AVG(rate)', 'avgRate')
      .where('menu_id = :menuId', { menuId })
      .getRawOne();
  }
}
