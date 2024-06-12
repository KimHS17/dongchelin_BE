import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { Restaurant } from 'src/common/entities';
import { CornerDto, MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findList() {
    const menus = await this.menuRepository.findList();
    const suduk: CornerDto = { corner1: '', corner2: '', corner3: '' };
    const tech: CornerDto = { corner1: '', corner2: '', corner3: '' };
    const dormitory: CornerDto = { corner1: '' };
    const menuDto: MenuDto = { suduk, tech, dormitory };
    for (const menu of menus) {
      if (menu.restaurant === Restaurant.SUDUK) {
        if (menu.corner == '1') {
          suduk.corner1 = menu.name;
        } else if (menu.corner == '2') {
          suduk.corner2 = menu.name;
        } else if (menu.corner == '3') {
          suduk.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.TECH) {
        if (menu.corner == '1') {
          tech.corner1 = menu.name;
        } else if (menu.corner == '2') {
          tech.corner2 = menu.name;
        } else if (menu.corner == '3') {
          tech.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.DORMITORY) {
        if (menu.corner == '1') {
          dormitory.corner1 = menu.name;
        }
      }
    }

    return menuDto;
  }

  async findRecommend() {}
}
