import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Public } from 'src/common/decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Get('list')
  async findList() {
    return await this.menuService.findList();
  }
}
