import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ValidationSchema } from './config/validation-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/config.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema: ValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject: [ConfigService],
    }),
    ApiModule,
  ],
})
export class AppModule {}
