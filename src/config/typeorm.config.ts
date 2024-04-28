import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isLocal =
      this.configService.get<string>('env') === 'local' ? true : false;
    return {
      type: 'mariadb',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      entities: [`${__dirname}/src/entities/*.entity.{ts,js}`],
      synchronize: isLocal,
      logging: isLocal,
      dropSchema: isLocal,
      bigNumberStrings: false,
    };
  }
}
