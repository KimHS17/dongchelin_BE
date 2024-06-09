import { RedisRepository } from 'src/lib/redis';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, TokenType } from './jwt-payload.dto';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: _JwtService,
    private readonly redisRepository: RedisRepository,
  ) {}

  async generate(payload: JwtPayloadDto, seconds: number): Promise<string> {
    const { uid, tokenType } = payload;
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: seconds,
    });
    await this.redisRepository.setex(
      `dongchelin:user:${uid}:${tokenType}`,
      seconds,
      token,
    );
    return token;
  }

  async validate(
    token: string,
    secret: string,
    isRefresh: boolean = false,
  ): Promise<JwtPayloadDto> {
    let decodedPayload: JwtPayloadDto;
    try {
      decodedPayload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
    } catch (err) {
      console.log(err);
      // NestJS JWT 모듈 검증 실패
      throw new UnauthorizedException(
        `INVALID_${isRefresh ? 'REFRESH' : 'ACCESS'}_TOKEN`,
      );
    }
    const { uid, tokenType } = decodedPayload;
    // 토큰 종류 검증
    if (isRefresh && tokenType !== TokenType.REFRESH) {
      throw new UnauthorizedException(
        `INVALID_${isRefresh ? 'REFRESH' : 'ACCESS'}_TOKEN`,
      );
    }
    if (!isRefresh && tokenType !== TokenType.ACCESS) {
      throw new UnauthorizedException(
        `INVALID_${isRefresh ? 'REFRESH' : 'ACCESS'}_TOKEN`,
      );
    }
    // Redis 등록 여부 검증
    const redisToken = await this.redisRepository.get(
      `dongchelin:user:${uid}:${tokenType}`,
    );
    if (!redisToken) {
      // Redis에 토큰이 존재하지 않을 경우
      throw new UnauthorizedException(
        `INVALID_${isRefresh ? 'REFRESH' : 'ACCESS'}_TOKEN`,
      );
    } else if (redisToken !== token) {
      // Redis에 저장된 값과 다를 경우
      throw new UnauthorizedException('DUPLICATE_SIGNIN_DETECTED');
    }
    return decodedPayload;
  }
}
