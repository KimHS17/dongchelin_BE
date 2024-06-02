import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisRepository } from './redis.repository';

@Module({
  providers: [RedisProvider, RedisRepository],
  exports: [RedisProvider, RedisRepository],
})
export class RedisModule {}
