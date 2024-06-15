import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Public } from 'src/common/decorator';
import { FindListDto, FindRankDto } from './dto/menu.dto';
import { Menu } from 'src/common/entities';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Get('list')
  async findList(@Query() findListDto: FindListDto) {
    return await this.menuService.findList(findListDto);
  }

  @Public()
  @Get('recommend')
  async findRecommend() {
    return await this.menuService.findRecommend();
  }

  @Public()
  @Get('rank')
  async findRank(@Query() findRankDto: FindRankDto): Promise<Menu[]> {
    return await this.menuService.findRank(findRankDto);
  }
}
