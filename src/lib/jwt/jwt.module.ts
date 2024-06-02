import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    _JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.key');
        return { secret: secret };
      },
      inject: [ConfigService],
    }),
    RedisModule,
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
