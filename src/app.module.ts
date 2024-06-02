import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ValidationSchema } from './config/validation-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ApiModule } from './api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { JwtModule } from './lib/jwt/jwt.module';
import { RedisModule } from './lib/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/config/.env.${process.env.NODE_ENV}`,
      load: [Configuration],
      validationSchema: ValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject: [ConfigService],
    }),
    JwtModule,
    RedisModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
