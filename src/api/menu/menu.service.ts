import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { Corner, Restaurant } from 'src/common/entities';
import { CornerDto, FindListDto, FindRankDto, MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findList(findListDto: FindListDto) {
    const menus = await this.menuRepository.findList(findListDto);
    const menuDto: MenuDto = {
      suduk: new CornerDto(),
      tech: new CornerDto(),
      dormitory: new CornerDto(),
    };
    for (const menu of menus) {
      if (menu.restaurant === Restaurant.SUDUK) {
        if (menu.corner === Corner.CORNER1) {
          menuDto.suduk.corner1 = menu.name;
        } else if (menu.corner === Corner.CORNER2) {
          menuDto.suduk.corner2 = menu.name;
        } else if (menu.corner === Corner.CORNER3) {
          menuDto.suduk.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.TECH) {
        if (menu.corner === Corner.CORNER1) {
          menuDto.tech.corner1 = menu.name;
        } else if (menu.corner === Corner.CORNER2) {
          menuDto.tech.corner2 = menu.name;
        } else if (menu.corner === Corner.CORNER3) {
          menuDto.tech.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.DORMITORY) {
        if (menu.corner === Corner.CORNER1) {
          menuDto.dormitory.corner1 = menu.name;
        } else if (menu.corner === Corner.CORNER2) {
          menuDto.dormitory.corner2 = menu.name;
        } else if (menu.corner === Corner.CORNER3) {
          menuDto.dormitory.corner3 = menu.name;
        }
      }
    }

    return menuDto;
  }

  async findRecommend() {
    return await this.menuRepository.findRecommend();
  }

  async findRank(findRankDto: FindRankDto) {
    return await this.menuRepository.findRank(findRankDto);
  }
}
