import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Refresh, ReqUser } from 'src/common/decorator';
import { JwtPayloadDto } from 'src/lib/jwt/jwt-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signout')
  async signOut(@ReqUser() user: JwtPayloadDto) {
    return await this.authService.signOut(user);
  }

  @Refresh()
  @Get('tokens')
  async getTokens(@ReqUser() user: JwtPayloadDto) {
    return await this.authService.getTokens(user);
  }
}
