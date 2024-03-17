import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { email: payload.email, id: payload.sub };
  }
}
