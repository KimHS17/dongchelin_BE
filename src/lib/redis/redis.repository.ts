import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT_KEY } from './redis.provider';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT_KEY) private readonly redisClient: Redis) {}

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<string> {
    return await this.redisClient.set(key, value);
  }

  async setex(key: string, seconds: number, value: string): Promise<string> {
    return await this.redisClient.setex(key, seconds, value);
  }

  async delete(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
}
