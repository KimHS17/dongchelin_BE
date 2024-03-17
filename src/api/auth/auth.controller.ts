import {
  Controller,
  Post,
  Body,
  Res,
  UnprocessableEntityException,
  UseGuards,
  Req,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { IOAuthUser } from './auth.userInterface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() body, @Res() res) {
    const { email, password } = body;

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnprocessableEntityException('존재하지 않는 사용자입니다.');
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    this.authService.setRefreshToken({ user, res });
    const jwt = this.authService.getAccessToken({ user });
    return res.status(200).send({ jwt });
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  restoreAccessToken(@Req() req: Request & IOAuthUser) {
    return this.authService.getAccessToken({ user: req.user });
  }
}
