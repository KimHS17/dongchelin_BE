import { BaseRepository } from 'src/lib/typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Menu } from 'src/common/entities';
import { FindListDto, FindRankDto } from './dto/menu.dto';

@Injectable({ scope: Scope.REQUEST })
export class MenuRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async findList(findListDto: FindListDto) {
    return await this.getRepository(Menu).find({
      select: { restaurant: true, corner: true, name: true },
      relations: { mealPlans: true },
      where: { mealPlans: { date: findListDto.date } },
    });
  }

  async findRecommend() {
    return await this.getRepository(Menu).find({
      select: {
        id: true,
        name: true,
        avgRate: true,
        image: true,
      },
      order: { avgRate: 'DESC' },
      take: 6,
    });
  }

  async findRank(findRankDto: FindRankDto): Promise<Menu[]> {
    const query = this.getRepository(Menu)
      .createQueryBuilder()
      .select(['id', 'name', 'reataurant', 'avg_rate AS avgRate']);
    if (findRankDto.restaurant) {
      query.where('restaurant IN (:...restaurant)', {
        restaurant: findRankDto.restaurant,
      });
    }
    if (findRankDto.category) {
      query.andWhere('category IN (:...category)', {
        category: findRankDto.category,
      });
    }

    return await query.orderBy('avg_rate', 'DESC').limit(5).getRawMany();
  }

  async findDetail(id: string) {
    return await this.getRepository(Menu).findOne({
      select: {
        id: true,
        restaurant: true,
        name: true,
        avgRate: true,
        image: true,
      },
      where: { id },
    });
  }

  async updateAvgRate(id: string, avgRate: Partial<Menu>) {
    await this.getRepository(Menu).update({ id }, avgRate);
  }
}
