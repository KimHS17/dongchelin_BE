import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis, RedisOptions } from 'ioredis';

export type RedisClient = Redis;
export const REDIS_CLIENT_KEY = 'REDIS_CLIENT';

export const RedisProvider: FactoryProvider<Redis> = {
  provide: REDIS_CLIENT_KEY,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<RedisClient> => {
    const options: RedisOptions = {
      host: configService.get<string>('redis.host'),
      port: configService.get<number>('redis.port'),
      db: configService.get<number>('redis.db'),
    };
    const client = new Redis(options);
    client.on('error', (err) => {
      throw new Error(`Redis connection failed: ${err}`);
    });
    return client;
  },
};
