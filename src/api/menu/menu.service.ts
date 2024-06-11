import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { Restaurant } from 'src/common/entities';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findList() {
    const menus = await this.menuRepository.findList();
    const menuList = {
      suduk: { corner1: '', corner2: '', corner3: '' },
      tech: { corner1: '', corner2: '', corner3: '' },
      dormitory: { corner1: '', corner2: '', corner3: '' },
    };

    for (const menu of menus) {
      if (menu.restaurant === Restaurant.SUDUK) {
        if (menu.corner == '1') {
          menuList.suduk.corner1 = menu.name;
        } else if (menu.corner == '2') {
          menuList.suduk.corner2 = menu.name;
        } else if (menu.corner == '3') {
          menuList.suduk.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.TECH) {
        console.log(menu.restaurant);
        if (menu.corner == '1') {
          menuList.tech.corner1 = menu.name;
        } else if (menu.corner == '2') {
          menuList.tech.corner2 = menu.name;
        } else if (menu.corner == '3') {
          menuList.tech.corner3 = menu.name;
        }
      } else if (menu.restaurant === Restaurant.DORMITORY) {
        if (menu.corner == '1') {
          menuList.dormitory.corner1 = menu.name;
        }
      }
    }

    return menuList;
  }
}
