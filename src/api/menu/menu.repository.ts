import { BaseRepository } from 'src/lib/typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Menu } from 'src/common/entities';

@Injectable({ scope: Scope.REQUEST })
export class MenuRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async findList() {
    return await this.getRepository(Menu).find({
      select: { restaurant: true, corner: true, name: true },
      //   where: {}
    });
  }
}
