import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from 'src/lib/jwt/jwt.module';
import { RedisModule } from 'src/lib/redis';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
