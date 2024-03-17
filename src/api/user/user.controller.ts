import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() body) {
    await this.userService.signup(
      body.email,
      body.name,
      body.nickname,
      body.password,
    );
  }
}
