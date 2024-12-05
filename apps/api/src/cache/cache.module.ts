import { Module } from '@nestjs/common';
import { InMemoryCacheService } from './in-memory-cache.service';

// InMemoryCacheService is a provider in the CacheModule
// Could be implemented with a different cache provider like Redis

@Module({
  providers: [InMemoryCacheService],
  exports: [InMemoryCacheService],
})
export class CacheModule {}
