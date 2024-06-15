import { BaseRepository } from 'src/lib/typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Review } from 'src/common/entities';

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
}
