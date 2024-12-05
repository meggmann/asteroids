import { Module } from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';
import { AsteroidsController } from './asteroids.controller';
import { InMemoryCacheService } from 'src/cache/in-memory-cache.service';
import { AsteroidsRepository } from './asteroids.repository';

@Module({
  providers: [AsteroidsService, InMemoryCacheService, AsteroidsRepository],
  controllers: [AsteroidsController]
})
export class AsteroidsModule {}
