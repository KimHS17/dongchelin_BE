import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/common/entities';
import { Menu } from 'src/common/entities/menu.entity';
import { Rating } from 'src/common/entities/rating.entity';

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
      entities: [User, Menu, Rating],
      synchronize: isLocal,
      logging: isLocal,
      dropSchema: isLocal,
      bigNumberStrings: false,
    };
  }
}
