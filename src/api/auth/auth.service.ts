import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities';
import { JwtService } from 'src/lib/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadDto, TokenType } from 'src/lib/jwt';
import { RedisRepository } from 'src/lib/redis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisRepository: RedisRepository,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await this.authRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      return;
    } else {
      signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
      await this.authRepository.save({
        id: uuid(),
        email: signUpDto.email,
        name: signUpDto.name,
        nickname: signUpDto.nickname,
        password: signUpDto.password,
      });
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.authRepository.findOne({
      where: { email: signInDto.email },
    });
    if (!user) {
      throw new HttpException('INVALID_SIGNIN', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('INVALID_SIGNIN', HttpStatus.BAD_REQUEST);
    }
    // Access Token 발급
    const accessTokenTtl = this.configService.get<number>('jwt.accessTokenTtl');
    const accessTokenPayload = {
      uid: user.id,
      ttl: accessTokenTtl,
      tokenType: TokenType.ACCESS,
    };
    const accessToken = await this.jwtService.generate(
      accessTokenPayload,
      accessTokenTtl,
    );
    // Refresh Token 발급
    const refreshTokenTtl = this.configService.get<number>(
      'jwt.refreshTokenTtl',
    );
    const refreshTokenPayload = {
      uid: user.id,
      ttl: refreshTokenTtl,
      tokenType: TokenType.REFRESH,
    };
    const refreshToken = await this.jwtService.generate(
      refreshTokenPayload,
      refreshTokenTtl,
    );
    // 로그인 성공
    return {
      accessToken,
      refreshToken,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      created: user.created,
    };
  }

  async signOut({ uid }: JwtPayloadDto) {
    await this.redisRepository.delete(
      `dongchelin:user:${uid}:${TokenType.ACCESS}`,
    );
    await this.redisRepository.delete(
      `dongchelin:user:${uid}:${TokenType.REFRESH}`,
    );
  }

  async getTokens(payload: JwtPayloadDto) {
    // Access Token 발급
    const accessTokenTtl = this.configService.get<number>('jwt.accessTokenTtl');
    const accessTokenPayload = {
      uid: payload.uid,
      ttl: accessTokenTtl,
      tokenType: TokenType.ACCESS,
    };
    const accessToken = await this.jwtService.generate(
      accessTokenPayload,
      accessTokenTtl,
    );
    // Refresh Token 발급
    const refreshTokenTtl = this.configService.get<number>(
      'jwt.refreshTokenTtl',
    );
    const refreshTokenPayload = {
      uid: payload.uid,
      ttl: refreshTokenTtl,
      tokenType: TokenType.REFRESH,
    };
    const refreshToken = await this.jwtService.generate(
      refreshTokenPayload,
      refreshTokenTtl,
    );
    // 재발급된 토큰 반환
    return { accessToken, refreshToken };
  }
}
